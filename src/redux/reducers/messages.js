// This reducer pattern defines the changes possible in its search state when the search API is called.
import { Map } from "immutable";

import {
  FETCH_MESSAGES,
  IS_FETCHING_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
  RESET_MESSAGES
  
} from "../actions/messages";


const initialState = Map({
  items: [],
  isFetching: false,  
  fetched: false,
  error: null
});

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return state.merge({ isFetching: false, error: null });

    case IS_FETCHING_MESSAGES:
      return state.merge({ isFetching: true });

    case FETCH_MESSAGES_SUCCESS:
        // return state.merge({ isFetching: false });
      return state.merge({
        isFetching: false,
        fetched: true,
        items: [...action.payload]
      });

    case FETCH_MESSAGES_FAIL:
      return state.merge({ isFetching: false, error: action.payload });

    case RESET_MESSAGES:
      return { ...state, ...initialState };

    default:
      return state;
  }
}
