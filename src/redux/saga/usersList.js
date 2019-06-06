import { call, put, select } from "redux-saga/effects";

import { add, isAdding, addSuccess, addFail } from "../actions/selectedUsers";

import { add as addMessages } from "../actions/message";


import api from "../../api";
import {
  getCurrentUserId,
  getCurrentChat,
  getSelectedUsers
} from "../selectors";

function* addSelectesUsersToChatSaga() {

  yield put(isAdding());
  const userId = getCurrentUserId(store);

  try {
    const currentChatId = getCurrentChat(store);
    const selectedUsers = getSelectedUsers(store);
    const selectedUsersItems = selectedUsers.items;

    const requestAr = selectedUsersItems.map((item, index) => {
      return { chatId: currentChatId, userId: item.id };
    });
   

    const response = yield call(api.addUsersToChat, requestAr);

    yield put(addSuccess(response.data));

    const message = {
      chatId: chat.id,
      text: "Тетстовое сообщение тот-то добавил тех-то",
      type: 2768777882000, //текст
      tempFrontId: new Date() + chat.id + messageText,
      userId: userId,
      creationDate: new Date()
    };   

    yield put(addMessages(message));
    //убрать выдеденеие с selectedUsers
   
  } catch (error) {
    yield put(addFail(error));
  }
}

export default addMessageSaga;
