import { call, put, select } from "redux-saga/effects";

import { add, isAdding, addSuccess, addFail } from "../actions/message";
import api from "../../api";
import { getSession } from "../selectors";

function* addMessageSaga(payload) {
  yield put(isAdding());
  try {
    // public virtual string ChatId { get; set; }
    // public virtual string UserId { get; set; }
    // public virtual string Text { get; set; }

    // public virtual string Type { get; set; }

    // public virtual string FileId { get; set; }

    // public virtual string TempFrontId { get; set; }
    //type: 2768777882000, //текстовое
    const message = {
      chatId: payload.chatId,
      userId: payload.chatId,
      text: payload.message,
      type: 2768777882000,
      tempFrontId: new Date()+ payload.chatId + payload.chatId
    };

    const response = yield call(api.addMessage, message);
    yield put(addSuccess(response.data));
  } catch (error) {
    yield put(addFail(error));
  }
}

export default addMessageSaga;
