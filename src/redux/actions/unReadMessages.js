export const FETCH_UNREAD_MESSAGES = "FETCH_UNREAD_MESSAGES";
export const IS_FETCHING_UNREAD_MESSAGES = "IS_FETCHING_UNREAD_MESSAGES";
export const FETCH_UNREAD_MESSAGES_SUCCESS = "FETCH_UNREAD_MESSAGES_SUCCESS";
export const FETCH_UNREAD_MESSAGES_FAIL = "FETCH_UNREAD_MESSAGES_FAIL";



export const RESET_UNREAD_MESSAGES = "RESET_UNREAD_MESSAGES";

export function fetch() {
  return {
    type: FETCH_UNREAD_MESSAGES
  };
}

export function isFetching() {
  return {
    type: IS_FETCHING_UNREAD_MESSAGES
  };
}


export function fetchSuccess(payload) {
  return {
    type: FETCH_UNREAD_MESSAGES_SUCCESS,
    payload: payload
    //currentPage: args.pageCount
  };
}

export function fetchFail(error) {
  return {
    type: FETCH_UNREAD_MESSAGES_FAIL,
    payload: error
    //currentPage: args.pageCount
  };  
}


export function reset() {
  return {
    type: RESET_UNREAD_MESSAGES    
  };  
}

