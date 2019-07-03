import { Map } from "immutable";

import {
  FETCH_UNREAD_MESSAGES,
  IS_FETCHING_UNREAD_MESSAGES,
  FETCH_UNREAD_MESSAGES_SUCCESS,
  FETCH_UNREAD_MESSAGES_FAIL,
  RESET_UNREAD_MESSAGES
} from "../unReadMessages/actions";

const initialState = Map({
  items: [],
  isFetching: false,
  fetched: false,
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
