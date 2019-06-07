// https://medium.freecodecamp.org/the-best-way-to-architect-your-redux-app-ad9bd16c8e2d
// This reducer pattern defines the changes possible in its search state when the search API is called.
import { Map } from "immutable";

import {
  FETCH_UNREAD_MESSAGES,
  IS_FETCHING_UNREAD_MESSAGES,
  FETCH_UNREAD_MESSAGES_SUCCESS,
  FETCH_UNREAD_MESSAGES_FAIL,

  RESET_UNREAD_MESSAGES
} from "../actions/unReadMessages";

const initialState = Map({
  items: [],
  isFetching: false,  
  error: null
});

export default function unReadMessagesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_UNREAD_MESSAGES:
      return state.merge({ isFetching: false, error: null });

    case IS_FETCHING_UNREAD_MESSAGES:
      return state.merge({ isFetching: true });

    case FETCH_UNREAD_MESSAGES_SUCCESS:
      return state.merge({
        isFetching: false,
        fetched: true,
        items: [...action.payload]
      });

    case FETCH_UNREAD_MESSAGES_FAIL:
      return state.merge({ isFetching: false, error: action.payload });    

    case RESET_UNREAD_MESSAGES:
      return { ...state, ...initialState };
      
    default:
      return state;
  }
}
