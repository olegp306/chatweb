import { combineReducers } from "redux";
import session from "./Session";
import chats from "./chats";
import currentChat from "./currentChat";
import messages from "./messages";
import message from "./message";
import users from "./users";
import chatUsers from "./chatUsers";
import usersList from "./usersList";
import chatApp from "./chatApp";
import newMessages from "./newMessages";
import chatsFilter from "./chatsFilter";



const root = combineReducers({
  session,
  chats,
  //chat,
  users,
  chatUsers,
  usersList,
  currentChat,
  messages,
  message,
  chatApp,
  newMessages,
  chatsFilter
});

export default root;

