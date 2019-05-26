import { put, select } from "redux-saga/effects";

import { fetchSuccess, fetchFail } from "../actions/chatApp";

import loginSaga from "../saga/Session";

import chatsSaga from "../saga/chats";

import usersSaga from "../saga/users";


function* fetchChatAppDataSaga(action) {
  try {    
    yield* loginSaga(action);
    
    yield* chatsSaga();

    yield* usersSaga();
    

    yield put(fetchSuccess());
  } catch (error) {
    yield put(fetchFail(error));
  }
}

export default fetchChatAppDataSaga;
