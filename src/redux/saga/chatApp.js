import { put, select } from "redux-saga/effects";

import { fetchSuccess, fetchFail, setCurrentChat } from "../actions/chatApp";

import { getChats } from "../selectors";

import loginSaga from "../saga/Session";

import chatsSaga from "../saga/chats";

import usersSaga from "../saga/users";

import _ from "lodash";

function* fetchChatAppDataSaga(action) {
  try {
    yield* loginSaga(action);

    yield* chatsSaga();

    yield* usersSaga();

    yield* setCurrentChatSaga();

    yield put(fetchSuccess());
  } catch (error) {
    yield put(fetchFail(error));
  }
}

function* setCurrentChatSaga() {
  try {
    const store = yield select();
    const chats = getChats(store);

    const chatsArr=chats.items.sort((a, b) => {
      return  new Date(a.date)-new Date(b.date) ;
    });

      yield put(setCurrentChat(chatsArr[0]));
  } catch (error) {
    yield put(fetchFail(error));
  }
}

export default fetchChatAppDataSaga;