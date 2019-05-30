import { takeLatest } from "redux-saga/effects";

import { LOGIN_REQUEST, LOGIN_BY_USERID } from "../actions/Session";
import { FETCH_CHATS } from "../actions/chats";
import { FETCH_USERS } from "../actions/users";
import { FETCH_MESSAGES } from "../actions/messages";
import { ADD_MESSAGE } from "../actions/message";

import { FETCH_APPCHAT_DATA, SET_CURRENT_CHAT } from "../actions/chatApp";

import loginSaga from "./Session.js";
import chatsSaga from "./chats";

import usersSaga from "./users";
import messagesSaga from "./messages";
import messageSaga from "./message";

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
  

  

  // yield takeLatest(FETCH_MESSAGES, messagesSaga)
  // yield [
  //   takeLatest(LOGIN_REQUEST, loginSaga),
  //   // takeLatest(LOGIN_BY_USERID, loginSaga),
  //   // takeLatest(FETCH_CHATS, chatsSaga)

  //   //takeLatest(FETCH_COMPANIES_REQUEST, fetchCompaniesSaga)
  // ];
}

export default sagaWatcher;
