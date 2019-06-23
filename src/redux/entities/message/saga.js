import { call, put, select } from "redux-saga/effects";

import { add, isAdding, addSuccess, addFail } from "../message/actions";
import { cleanNewMessage } from "../../actions/newMessages";
import { addNewMessageInMesssageList } from "../messages/actions";
import ImageTools from "../../../utils/ImageTools";
import imageCompression from "browser-image-compression";

import api from "../../../api";
import {
  getCurrentUserId,
  getCurrentChat,
  getNewMessages
} from "../../selectors";

function imageCompressionHandler(imageFile, options) {
  return imageCompression(imageFile, options)
    .then(function(compressedFile) {
      return compressedFile; // write your own logic
    })
    .catch(function(error) {
      console.log(error.message);
    });
}

function blobToFile(theBlob, fileName) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}

function* addMessageSaga() {
  yield put(isAdding());

  const store = yield select();
  const chat = getCurrentChat(store);
  const newMessages = getNewMessages(store);
  const userId = getCurrentUserId(store);

  const newMessage = newMessages.items[chat.id];
  try {
    //если картинка то отсылаем картинку на сервер и ждем id картинки с сервера
    if (newMessage.type == "2768654243000") {
      //can be array of files
      for (let i = 0; i < newMessage.files.length; i++) {
        const file = newMessage.files[i];

        // МАЛЕНЬКАЯ сжатая картинка
        const smallImgOptions = {
          maxSizeMB: 1,
          maxWidthOrHeight: 320,
          useWebWorker: true
        };
        let smallCompressedBLob = yield call(
          imageCompressionHandler,
          file,
          smallImgOptions
        );
        const smallCompressedFile = new File(
          [smallCompressedBLob],
          "small" + file.name,
          { lastModified: Date.now() }
        );
        const responseSmallImg = yield call(api.postFile, smallCompressedFile);

        const smallImgFileId = responseSmallImg.data[0].id;

        // БОЛЬШАЯ сжатая картинка
        const bigImgOptions = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        };
        const bigCompressedBlob = yield call(
          imageCompressionHandler,
          file,
          bigImgOptions
        );
        const bigCompressedFile = new File(
          [bigCompressedBlob],
          "big" + file.name,
          { lastModified: Date.now() }
        );
        const responseBigImg = yield call(api.postFile, bigCompressedFile);

        const bigImgFileId = responseBigImg.data[0].id;

        //оригинальная картинка
        //const postFIleResponse = yield call(api.postFile, file);
        //const fileId = postFIleResponse.data[0].id;

        const message = {
          chatId: chat.id,
          text: newMessage.messageText,
          type: newMessage.type,
          tempFrontId: new Date() + chat.id + newMessage.messageText,
          userId: userId,
          creationDate: new Date(),
          // fileId: fileId,
          fileId: bigImgFileId,
          smallImgFileId: smallImgFileId
        };

        const response = yield call(api.addMessage, message);

        yield put(addSuccess(response.data));
        yield put(addNewMessageInMesssageList(message));

        // todo lastMessagein chat in chatsList
      }
      yield put(cleanNewMessage(chat.id));
    } else if (newMessage.type == "2768777882000") {
      const message = {
        chatId: chat.id,
        text: newMessage.messageText,
        type: newMessage.type,
        tempFrontId: new Date() + chat.id + newMessage.messageText,
        userId: userId,
        creationDate: new Date(),
        fileId: newMessage.fileId
      };

      const response = yield call(api.addMessage, message);

      yield put(addSuccess(response.data));
      yield put(addNewMessageInMesssageList(message));
      yield put(cleanNewMessage(chat.id));
    }
  } catch (error) {
    yield put(addFail(error));
  }
}

export default addMessageSaga;
