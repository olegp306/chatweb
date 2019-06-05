import { combineReducers } from "redux";
import session from "./Session";
import chats from "./chats";
import chat from "./chat";
import currentChat from "./currentChat";
import messages from "./messages";
import message from "./message";
import users from "./users";
import chatApp from "./chatApp";
import newMessages from "./newMessages";
import chatsFilter from "./chatsFilter";



const root = combineReducers({
  session,
  chats,
  chat,
  users,
  currentChat,
  messages,
  message,
  chatApp,
  newMessages,
  chatsFilter
});

export default root;

