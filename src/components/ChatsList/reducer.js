import {
  CHATS_FETCH,
  CHATS_FETCH_SUCCESS,
  CHATS_FETCH_FAIL
} from "./actions.js.js";

import { Map } from "immutable";

const initialState = new Map({
  items: {},
  isFetching: false,
  fetched: false,
  error: null,

  refreshing: false
});

export default chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHATS_FETCH:
      return state.merge({ isFetching: true, fetched: false, error: null });

    case CHATS_FETCH_SUCCESS:
      return state.merge({
        isFetching: false,
        fetched: true,
        items: action.payload
      });

    case CHATS_FETCH_FAIL:
      return state.merge({ isFetching: false, error: action.payload });

    default:
      return state;
  }
};
