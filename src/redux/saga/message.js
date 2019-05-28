import { call, put, select } from "redux-saga/effects";

import { add, addSuccess,isAdding, addFail } from "../actions/message";
import api from "../../api";
import { getSession } from "../selectors";

function* addMessageSaga(action) {
  yield put(isAdding());  
  //const store = yield select()
  //const session = getSession(store);
  
  try {
    const response = yield call(api.addMessage ,message);
    yield put(addSuccess(response.data));
  } catch (error) {
    yield put(addFail(error));
  }
}

export default addMessageSaga;
