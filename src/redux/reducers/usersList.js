import { Map, List, Set } from "immutable";

import {
  SELECT_USER,
  UNSELECT_USER,
  ADD_SELECTED_USERS_TO_CHAT,
  IS_ADDDING_SELECTED_USERS_TO_CHAT,
  ADDED_SELECTED_USERS_TO_CHAT,
  ADD_SELECTED_USERS_TO_CHAT_FAIL
} from "../actions/usersList";

const initialState = Map({
  selectedUsers: Map(),
  isAdding: false,
  added: false,
  error: null
});

export default function selectedUserReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_USER:
      //return state.updateIn(['selectedUsers'], action.payload);
      return state.update("selectedUsers", selectedUsers =>
        selectedUsers.set(action.payload, true)
      );

    case UNSELECT_USER:
      return state.update("selectedUsers", selectedUsers =>
        selectedUsers.set(action.payload, false)
      );

    case ADD_SELECTED_USERS_TO_CHAT:
      return state.merge({ isAdding: false, error: null });

    case IS_ADDDING_SELECTED_USERS_TO_CHAT:
      return state.merge({ isAdding: true });

    case ADDED_SELECTED_USERS_TO_CHAT:
      return state.merge({
        isAdding: false,
        added: true,
        item: action.payload
      });

    case ADD_SELECTED_USERS_TO_CHAT_FAIL:
      return state.merge({ isAdding: false, error: action.payload });

    // case RESET_CHATS:
    //   return { ...state, ...initialState };

    default:
      return state;
  }
}
