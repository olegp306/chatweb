import { call, put, select } from "redux-saga/effects";

import { fetch, fetchSuccess, fetchFail } from "../actions/chats";
import api from "../../api";
import { getSession } from "../selectors";

function* fetchChatssSaga() {
  yield put(fetch());
  const store = yield select();
  const session = getSession(store);

  try {
    const response = yield call(api.fetchUserChats, session.userId);
    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}

export default fetchChatssSaga;
