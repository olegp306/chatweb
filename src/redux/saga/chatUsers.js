import { call, put, select } from "redux-saga/effects";

import { isFetching, fetchSuccess, fetchFail } from "../actions/chatUsers";
import api from "../../api";
import { getSession ,getCurrentChat} from "../selectors";

function* fetchChatUsersSaga(action) {
  yield put(isFetching());  
  
  const store = yield select()
  const session = getSession(store);
  const currentChatId= getCurrentChat.id;
  
  try {
    const response = yield call(api.fetchChatUsers ,currentChatId);

    yield put(fetchSuccess(response.data));
  } catch (error) {
    yield put(fetchFail(error));
  }
}

export default fetchChatUsersSaga;
