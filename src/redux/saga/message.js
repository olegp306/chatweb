import { call, put, select } from "redux-saga/effects";

import { add, isAdding, addSuccess, addFail } from "../actions/message";
import api from "../../api";
import { getSession, getCurrentChat, getNewMessages } from "../selectors";

function* addMessageSaga() {
  yield put(isAdding());

  const store = yield select()
  const chat=getCurrentChat(store);
  const newMessages=getNewMessages(store);
  const messageText=newMessages.items[chat.id].message
  try {
      const message = {
      chatId: chat.id,      
      text: messageText,
      type: 2768777882000,
      tempFrontId: new Date()+ chat.id + messageText
    };

    const response = yield call(api.addMessage, message);

    yield put(addSuccess(response.data));
  } catch (error) {
    yield put(addFail(error));
  }
}

export default addMessageSaga;
