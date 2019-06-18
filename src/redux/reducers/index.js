import { combineReducers } from "redux";
import session from "./Session";
import chats from "./chats";
import currentChat from "./currentChat";
import messages from "./messages";
import unReadMessages from "./unReadMessages";

import message from "./message";
import users from "./users";
import chatUsers from "./chatUsers";
import usersListWithSelect from "./usersListWithSelect";
import chatApp from "./chatApp";
import newMessages from "./newMessages";
import chatsFilter from "./chatsFilter";



const root = combineReducers({
  session,
  chats,
  //chat,
  users,
  chatUsers,
  usersListWithSelect,
  currentChat,
  messages,
  unReadMessages,
  message,
  chatApp,
  newMessages,
  chatsFilter
});

export default root;

