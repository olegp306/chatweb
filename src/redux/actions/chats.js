// https://medium.freecodecamp.org/the-best-way-to-architect-your-redux-app-ad9bd16c8e2d

import api from "../../api";
import { getSession } from "../selectors";

export const FETCH_CHATS = "FETCH_CHATS_DATA";
export const FETCH_CHATS_SUCCESS = "FETCH_CHATS_SUCCESS";
export const FETCH_CHATS_FAIL = "FETCH_CHATS_FAIL";
export const RESET_CHATS = "RESET_CHATS";


export function fetch() {
  return async dispatch => {
    // Initiate loading state
    return({
      type: FETCH_CHATS
    });

    // try {
    //   const currentUserId = getSession().userId;
    //   const result = await api.getUserChats(currentUserId);

    //   dispatch(fetchChatsSuccess(result));
    // } catch (err) {
    //   dispatch(fetchChatsFail(err));
    // }
  };
}

export function fetchSuccess(payload) {  
  return({
    type: FETCH_CHATS_SUCCESS,
    payload: payload
    //currentPage: args.pageCount
  });
}

export function fetchFail(error) {
  return {
    type: FETCH_CHATS_FAIL,
    payload: error
    //currentPage: args.pageCount
  };
}
