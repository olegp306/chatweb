import { put, select, call } from "redux-saga/effects";

import { fetchSuccess, fetchFail, setCurrentChat } from "../actions/chatApp";

import {
  newMessageRecieved,
  newChatRecieved,
  newMessageStatusRecieved
} from "../actions/chatApp";

import { getChats, getCurrentUserId } from "../selectors";

import loginSaga from "../saga/Session";

import chatsSaga from "../entities/chats/saga";

import usersSaga from "../entities/users/saga";
import chatUsersSaga from "../saga/chatUsers";
import messagesSaga from "../entities/messages/saga";

import { fetchUnReadMessagesSaga as unReadmessagesSaga } from "../entities/unReadMessages/saga";
import { changeNewMessage as changeDraftMessage } from "../../redux/actions/newMessages";
import { add as addNewMessage } from "../entities/message/actions";

import { updateCurrentChat } from "../actions/chatApp";
import { getCurrentChat, getSession } from "../selectors";

import _ from "lodash";

function* fetchChatAppDataSaga(action) {
  try {
    yield* loginSaga(action);
    yield* chatsSaga();
    yield* usersSaga();
    yield* setInitialCurrentChatSaga();
    yield* messagesSaga();
    yield* unReadmessagesSaga();
    yield* chatUsersSaga();

    yield put(fetchSuccess());
  } catch (error) {
    yield put(fetchFail(error));
  }
}

function* setInitialCurrentChatSaga() {
  try {
    const store = yield select();
    const chats = getChats(store);

    const chatsArr = chats.items.sort((a, b) => {
      const aDateTime = new Date(
        a.lastMessage ? a.lastMessage.creationDate : a.creationDate
      );
      const bDateTime = new Date(
        b.lastMessage ? b.lastMessage.creationDate : b.creationDate
      );
      return bDateTime.getTime() - aDateTime.getTime();
    });

    yield put(setCurrentChat(chatsArr[0]));
  } catch (error) {
    yield put(fetchFail(error));
  }
}

function* setCurrentChatSaga(chat) {
  try {
    yield* messagesSaga();
    yield* chatUsersSaga();
  } catch (error) {
    yield put(fetchFail(error));
  }
}

function* updateCurrentChatSaga(action) {
  try {
    console.log("updateCurrentChatSaga");
    //сообщение о смене статуса
    const store = yield select();
    const currentChat = getCurrentChat(store);
    const session = getSession(store);

    //console.log("updateCurrentChatSaga");

    const draftMessage = {
      type: 2768777882000, //текст
      messageText: `Замечание ${(currentChat.isOpen
        ? "открыто  "
        : " закрыто  ") + session.userName}`,
      chatId: currentChat.id
    };
    yield put(changeDraftMessage(draftMessage));
    yield put(addNewMessage());
    const changedData = action.payload;
    yield updateCurrentChat(changedData);
  } catch (error) {
    yield put(fetchFail(error));
  }
}

export { fetchChatAppDataSaga, setCurrentChatSaga, updateCurrentChatSaga };
