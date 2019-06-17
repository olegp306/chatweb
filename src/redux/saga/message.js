import { call, put, select } from "redux-saga/effects";

import { add, isAdding, addSuccess, addFail } from "../actions/message";
import { cleanNewMessage } from "../actions/newMessages";
import { addNewMessageInMesssageList } from "../actions/messages";

import api from "../../api";
import { getCurrentUserId, getCurrentChat, getNewMessages } from "../selectors";

function* addMessageSaga() {
  yield put(isAdding());

  const store = yield select();
  const chat = getCurrentChat(store);
  const newMessages = getNewMessages(store);
  const userId = getCurrentUserId(store);

  const messageText = newMessages.items[chat.id].message;
  try {
    const message = {
      chatId: chat.id,
      text: messageText,
      type: 2768777882000,
      tempFrontId: new Date() + chat.id + messageText,
      userId: userId,
      creationDate: new Date()
    };

    const response = yield call(api.addMessage, message);

    yield put(addSuccess(response.data));

    yield put(addNewMessageInMesssageList(message));

    //yield put(setNewLastMessageForChat());

    yield put(cleanNewMessage(chat.id));


  } catch (error) {
    yield put(addFail(error));
  }
}

export default addMessageSaga;
