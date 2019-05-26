import { call, put, select } from "redux-saga/effects";

import { isFetching, fetchSuccess, fetchFail } from "../actions/users";
import api from "../../api";
import { getSession } from "../selectors";

function* fetchUsersSaga(action) {
  yield put(isFetching());  
  
  const store = yield select()
  const session = getSession(store);
  
  try {
    const response = yield call(api.fetchUsers ,session.userId);

    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}

export default fetchUsersSaga;
