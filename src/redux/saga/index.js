import { takeLatest } from "redux-saga/effects";

import { LOGIN_REQUEST } from "../actions/Session";
import { FETCH_CHATS } from "../actions/chats";

import { FETCH_USERS } from "../actions/messages";
import { FETCH_MESSAGES } from "../actions/messages";

import loginSaga from "./Session.js";
import chatsSaga from "./chat";

//import ticketsSaga from './Tickets'
//import addTicketSaga from './Ticket'
//import fetchCompaniesSaga from './Companies'
//import fetchEmployeesSaga from './Employees'

function* sagaWatcher() {
  yield [
    takeLatest(LOGIN_REQUEST, loginSaga),
    takeLatest(FETCH_CHATS, chatsSaga)
    
    //takeLatest(FETCH_COMPANIES_REQUEST, fetchCompaniesSaga)
  ];
}

export default sagaWatcher;
