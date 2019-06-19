import { Map } from "immutable";
import { CHANGE_NEW_MESSAGE, CLEAN_NEW_MESSAGE } from "../actions/newMessages";

const initialState =new Map({
  items:new Map({})         
});

export default function newMessagesReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NEW_MESSAGE:
        return state.mergeIn(['items',action.payload.chatId],{"message": action.payload.message } )       

    case CLEAN_NEW_MESSAGE:
      return state.mergeIn(["items", action.payload.chatId], {"message": "" });

    default:
      return state;
  }
}
