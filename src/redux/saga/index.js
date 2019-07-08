import { takeLatest, call ,select} from "redux-saga/effects";

import { LOGIN_REQUEST, LOGIN_BY_USERID } from "../actions/Session";
import { FETCH_CHATS } from "../entities/chats/actions";
import { FETCH_USERS } from "../entities/users/actions";
import { FETCH_CHAT_USERS } from "../actions/chatUsers";

import { FETCH_MESSAGES } from "../entities/messages/actions";
import { ADD_MESSAGE } from "../entities/message/actions";

import { UPDATE_MESSAGES_READ_STATUS } from "../entities/unReadMessages/actions";

import {
  FETCH_APPCHAT_DATA,
  SET_CURRENT_CHAT,
  NEW_MESSAGE_RECIEVED,
  NEW_CHAT_RECIEVED,
  NEW_USERS_IN_CHAT_RECIEVED,
  NEW_MESSAGE_STATUS_INFO_RECIEVED
} from "../actions/chatApp";
import { ADD_SELECTED_USERS_TO_CHAT } from "../actions/usersListWithSelect";

import loginSaga from "./Session.js";
import chatsSaga from "../entities/chats/saga";

import usersSaga from "../entities/users/saga";
import chatUsersSaga from "./chatUsers";
import messagesSaga from "../entities/messages/saga";
import messageSaga from "../entities/message/saga";

import { updateReadMessagesStatus as updateReadMessagesStatusSaga } from "../entities/unReadMessages/saga";
import { fetchUnReadMessagesSaga } from "../entities/unReadMessages/saga";

import addSelectesUsersToChat from "./usersListWithSelect";

import { fetchChatAppDataSaga, setCurrentChatSaga } from "./chatApp";
import { getCurrentChat } from "../selectors";

function* sagaWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGIN_BY_USERID, loginSaga);

  yield takeLatest(FETCH_CHATS, chatsSaga);
  yield takeLatest(FETCH_USERS, usersSaga);
  yield takeLatest(FETCH_MESSAGES, messagesSaga);

  yield takeLatest(FETCH_APPCHAT_DATA, fetchChatAppDataSaga);
  yield takeLatest(SET_CURRENT_CHAT, setCurrentChatSaga);

  yield takeLatest(NEW_MESSAGE_RECIEVED, newMessageRecievedSaga);
  yield takeLatest(NEW_CHAT_RECIEVED, newChatRecievedSaga);
  yield takeLatest(NEW_USERS_IN_CHAT_RECIEVED, newUsersInChatRecievedSaga);
  


  yield takeLatest(NEW_MESSAGE_STATUS_INFO_RECIEVED, newMessageRecievedSaga);

  yield takeLatest(ADD_MESSAGE, messageSaga);

  yield takeLatest(ADD_SELECTED_USERS_TO_CHAT, addSelectesUsersToChat);

  yield takeLatest(FETCH_CHAT_USERS, chatUsersSaga);

  yield takeLatest(UPDATE_MESSAGES_READ_STATUS, updateReadMessagesStatusSaga);
}

function* newMessageRecievedSaga(action) {
  const store = yield select();

  const currentChat = getCurrentChat(store);
  const recivedMessage = action.payload;

  if (currentChat.id == recivedMessage.chatId) {
    yield call(messagesSaga);
  } else {
    yield call(fetchUnReadMessagesSaga);
  }
}

function* newUsersInChatRecievedSaga(action) {
  const store = yield select();  
  const currentChat = getCurrentChat(store);
  const recivedMessage = action.payload;

  if (currentChat.id == recivedMessage.chatId) {
    yield call(chatUsersSaga);
  } 

}

function* newChatRecievedSaga(action) {
  yield call(chatsSaga);
}

export default sagaWatcher;
