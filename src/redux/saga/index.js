import { takeLatest } from "redux-saga/effects";

import { LOGIN_REQUEST, LOGIN_BY_USERID } from "../actions/Session";
import { FETCH_CHATS } from "../actions/chats";

import { FETCH_USERS } from "../actions/messages";
import { FETCH_MESSAGES } from "../actions/messages";

import loginSaga from "./Session.js";
import chatsSaga from "./chat";



function* sagaWatcher() {  
  yield takeLatest(LOGIN_REQUEST, loginSaga)
  yield takeLatest(FETCH_CHATS, chatsSaga)
  //ield takeLatest(FETCH_CHATS, chatsSaga)
  // yield [
  //   takeLatest(LOGIN_REQUEST, loginSaga),
  //   // takeLatest(LOGIN_BY_USERID, loginSaga),
  //   // takeLatest(FETCH_CHATS, chatsSaga)

  //   //takeLatest(FETCH_COMPANIES_REQUEST, fetchCompaniesSaga)
  // ];
}


export default sagaWatcher;