// https://medium.freecodecamp.org/the-best-way-to-architect-your-redux-app-ad9bd16c8e2d
// This reducer pattern defines the changes possible in its search state when the search API is called.
import { Map } from "immutable";

import {
  FETCH_CHATS,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_FAIL,
  RESET_CHATS
} from "../actions/chats";

const initialState = Map({
  payload: [],
  isFetching: false,
  // fetched: false,
  error: null
});

export default function chatsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHATS:
      return state.merge({ isFetching: true, error: null });
    //   return { ...state, isFetching: true };

    case FETCH_CHATS_SUCCESS:
      return state.merge({
        isFetching: false,
        payload: [...action.payload]
      });
    //   return { ...state, payload: action.payload, isFetching: false };

    case FETCH_CHATS_FAIL:
      return state.merge({ isFetching: false, error: action.payload });
    //   return { ...state, error: action.error, isFetching: false };

    case RESET_CHATS:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
