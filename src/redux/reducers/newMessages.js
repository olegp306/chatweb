import { Map } from "immutable";
import { CHANGE_NEW_MESSAGE, CLEAN_NEW_MESSAGE } from "../actions/newMessages";
//import {getCurrentChat} from "../selectors"

const initialState = new Map({
  items: new Map({})
});

export default function newMessagesReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NEW_MESSAGE:{
      //const curChat=getCurrentChat(store);
      return state.mergeIn(["items", action.payload.chatId], action.payload);
    }

    case CLEAN_NEW_MESSAGE:
      return state.mergeIn(["items", action.payload.chatId],  {messageText:"", type:"", chatId:"", blob:null} );

    default:
      return state;
  }
}
