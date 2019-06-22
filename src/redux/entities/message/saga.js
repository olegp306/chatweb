import { call, put, select } from "redux-saga/effects";

import { add, isAdding, addSuccess, addFail } from "../message/actions";
import { cleanNewMessage } from "../../actions/newMessages";
import { addNewMessageInMesssageList } from "../messages/actions";
import ImageTools from "../../../utils/ImageTools";

import api from "../../../api";
import {
  getCurrentUserId,
  getCurrentChat,
  getNewMessages
} from "../../selectors";

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

        
        // let { blob } = yield call(
        //   ImageTools.resize,
        //   file,
        //   {
        //     width: 1280, // maximum width
        //     height: 960 // maximum height
        //   },
        //   (blob, didItResize) => {
        //     console.log(`CallBack ImageTools.resize${blob}`);
        //   }
        // );


        //сжатая картинка        
        //const file = newMessage.file;
        //const blob = newMessage.blob;
        // blob.lastModifiedDate = new Date();
        // blob.name = file.name;
        // const response = yield call(api.postFile, fileFormBlob);

        //оригинальная картинка
        const postFIleResponse = yield call(api.postFile, file);
        const fileId = postFIleResponse.data[0].id;

        const message = {
          chatId: chat.id,
          text: newMessage.messageText,
          type: newMessage.type,
          tempFrontId: new Date() + chat.id + newMessage.messageText,
          userId: userId,
          creationDate: new Date(),
          fileId: fileId
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
