import { call, put, select } from "redux-saga/effects";

import { isFetching, fetchSuccess, fetchFail } from "../actions/unReadMessages";
import api from "../../api";
import { getCurrentUserId } from "../selectors";

function* fetchUnReadMessagesSaga(action) {
  yield put(isFetching());  
  
  const store = yield select()
  const userId = getCurrentUserId(store);
  
  try {
    const response = yield call(api.fetchUnreadMessage ,userId);

    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}

export default fetchUnReadMessagesSaga;
