import { put, select } from "redux-saga/effects";

import { fetchSuccess, fetchFail, setCurrentChat } from "../actions/chatApp";

import {newMessageRecieved,newChatRecieved,newMessageStatusRecieved} from "../actions/chatApp"

import { getChats, getCurrentUserId } from "../selectors";

import loginSaga from "../saga/Session";

import chatsSaga from "../entities/chats/saga";

import usersSaga from "../entities/users/saga";
import chatUsersSaga from "../saga/chatUsers";
import messagesSaga from "../entities/messages/saga";

import {fetchUnReadMessagesSaga as unReadmessagesSaga} from "../entities/unReadMessages/saga";

import {initializeSignalR} from "../../signalr/signalr"
import _ from "lodash";

function* fetchChatAppDataSaga(action) {
  try {
    yield* loginSaga(action);
    yield* chatsSaga();
    yield* usersSaga();
    yield* setInitialCurrentChatSaga();

    yield* initSignalrSaga();
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

function* initSignalrSaga(){
  const store = yield select();

  const currentUserId = getCurrentUserId(store);
  const chats = getChats(store);

  if (
    currentUserId != null &&
    chats.fetched != false &&
    chats.fetching != true
  ) {
    initializeSignalR(
      currentUserId,
      chats.items,
      yield put(newMessageRecieved()), yield put(newChatRecieved()), yield put(newMessageStatusRecieved())
      //newMessageRecieved,  newChatRecieved,  newMessageStatusRecieved
    );
  }
}

function* setCurrentChatSaga(chat) {
  try {
    //yield put(setCurrentChat(chat));

    yield* messagesSaga();
    yield* chatUsersSaga();
  } catch (error) {
    yield put(fetchFail(error));
  }
}

export { fetchChatAppDataSaga, setCurrentChatSaga };
