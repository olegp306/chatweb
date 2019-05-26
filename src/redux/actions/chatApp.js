// https://medium.freecodecamp.org/the-best-way-to-architect-your-redux-app-ad9bd16c8e2d

import api from "../../api";
import { getSession } from "../selectors";

export const FETCH_APPCHAT_DATA = "FETCH_APPCHAT_DATA";
export const FETCH_APPCHAT_DATA_SUCCESS = "FETCH_APPCHAT_DATA_SUCCESS";
export const FETCH_APPCHAT_DATA_FAIL = "FETCH_APPCHAT_DATA_FAIL";

export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";
// export const RESET_APPCHAT_DATA = "RESET_APPCHAT_DATA";

export function fetch(userId) {
  return {
    type: FETCH_APPCHAT_DATA,
    payload:{userId:userId}
  };
}

export function fetchSuccess(payload) {
  return {
    type: FETCH_APPCHAT_DATA_SUCCESS,
    payload: payload
    //currentPage: args.pageCount
  };
}

export function fetchFail(error) {
  return {
    type: FETCH_APPCHAT_DATA_FAIL,
    payload: error
    //currentPage: args.pageCount
  };  
}

export function setCurrentChat(chat) {
  return {
    type: SET_CURRENT_CHAT,
    payload: chat
    //currentPage: args.pageCount
  };
}


// export function reset() {
//   return {
//     type: RESET_APPCHAT_DATA    
//   };  
// }
