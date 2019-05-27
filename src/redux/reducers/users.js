// https://medium.freecodecamp.org/the-best-way-to-architect-your-redux-app-ad9bd16c8e2d
// This reducer pattern defines the changes possible in its search state when the search API is called.
import { Map } from "immutable";

import {
  FETCH_USERS,
  IS_FETCHING_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,

  RESET_USERS
} from "../actions/users";

const initialState = Map({
  items: [],
  isFetching: false,  
  error: null
});

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return state.merge({ isFetching: false, error: null });

    case IS_FETCHING_USERS:
      return state.merge({ isFetching: true });

    case FETCH_USERS_SUCCESS:
      return state.merge({
        isFetching: false,
        fetched: true,
        items: [...action.payload]
      });

    case FETCH_USERS_FAIL:
      return state.merge({ isFetching: false, error: action.payload });    

    case RESET_USERS:
      return { ...state, ...initialState };
      
    default:
      return state;
  }
}
