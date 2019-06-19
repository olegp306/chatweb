import { takeLatest } from "redux-saga/effects";

import { LOGIN_REQUEST, LOGIN_BY_USERID } from "../actions/Session";
import { FETCH_CHATS } from "../entities/chats/actions";
import { FETCH_USERS } from "../entities/users/actions";
import { FETCH_CHAT_USERS } from "../actions/chatUsers";

import { FETCH_MESSAGES } from "../entities/messages/actions";
import { ADD_MESSAGE } from "../entities/message/actions";

import { FETCH_APPCHAT_DATA, SET_CURRENT_CHAT } from "../actions/chatApp";
import { ADD_SELECTED_USERS_TO_CHAT } from "../actions/usersListWithSelect";

import loginSaga from "./Session.js";
import chatsSaga from "../entities/chats/saga";

import usersSaga from "../entities/users/saga";
import chatUsersSaga from "./chatUsers";
import messagesSaga from "../entities/messages/saga";
import messageSaga from "../entities/message/saga";

import addSelectesUsersToChat from "./usersListWithSelect"

import { fetchChatAppDataSaga, setCurrentChatSaga } from "./chatApp";



function* sagaWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGIN_BY_USERID, loginSaga);

  yield takeLatest(FETCH_CHATS, chatsSaga);
  yield takeLatest(FETCH_USERS, usersSaga);
  yield takeLatest(FETCH_MESSAGES, messagesSaga);

  yield takeLatest(FETCH_APPCHAT_DATA, fetchChatAppDataSaga);
  yield takeLatest(SET_CURRENT_CHAT, setCurrentChatSaga);

  yield takeLatest(ADD_MESSAGE, messageSaga);

  yield takeLatest(ADD_SELECTED_USERS_TO_CHAT, addSelectesUsersToChat);

  yield takeLatest(FETCH_CHAT_USERS, chatUsersSaga);

  
  

  
  // yield takeLatest(FETCH_MESSAGES, messagesSaga)
  // yield [
  //   takeLatest(LOGIN_REQUEST, loginSaga),
  //   // takeLatest(LOGIN_BY_USERID, loginSaga),
  //   // takeLatest(FETCH_CHATS, chatsSaga)

  //   //takeLatest(FETCH_COMPANIES_REQUEST, fetchCompaniesSaga)
  // ];
}

export default sagaWatcher;
