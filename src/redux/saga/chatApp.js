import { put, select } from "redux-saga/effects";

import { fetchSuccess, fetchFail, setCurrentChat } from "../actions/chatApp";

import { getChats } from "../selectors";

import loginSaga from "../saga/Session";

import chatsSaga from "../saga/chats";

import usersSaga from "../saga/users";
import chatUsersSaga from "../saga/chatUsers";
import messagesSaga from "../saga/messages";

import unReadmessagesSaga from "../saga/unReadMessages";


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
    //yield put(setCurrentChat(chat));

    yield* messagesSaga();
    yield* chatUsersSaga();
  } catch (error) {
    yield put(fetchFail(error));
  }
}

// sortChats = (chatItems) => {
//   //сортировка чатов по last message or chat creation datetime
//   const sortChats = chatItems.sort((a, b) => {
//     const aDateTime = new Date(
//       a.lastMessage ? a.lastMessage.creationDate : a.creationDate
//     );
//     const bDateTime = new Date(
//       b.lastMessage ? b.lastMessage.creationDate : b.creationDate
//     );   
//     return bDateTime.getTime() - aDateTime.getTime();
//   });

//   return sortChats;
// };

export { fetchChatAppDataSaga, setCurrentChatSaga };
