import { call, put, select } from "redux-saga/effects";
// export const CHATS_FETCH='CHATS_FETCH';
//  export const CHATS_FETCH_SUCCESS='CHATS_FETCH_SUCCESS';
//  export const CHATS_FETCH_FAIL='CHATS_FETCH_FAIL';

import { fetchChats, fetchChatsSuccess, fetchChatsFail } from "./actions";
import api from "../../api";
import { getCurrentUserId } from "../../store/selectors";

function* fetchChatsSaga() {
  //yield put(fetchChats());
  const store = yield select();
  const userId = getCurrentUserId(store);

  try {
    const response = yield call(api.getUserChats, userId);
    yield put(fetchChatsSuccess(response.data));
  } catch (error) {
    yield put(fetchChatsFail(error));
  }
}

export default fetchChatsSaga;
