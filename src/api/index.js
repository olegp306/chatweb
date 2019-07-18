import axios from "axios";
import {
  PRODUCTION_API_URL,
  DEVELOPMENT_API_URL,
  CLIENT_ID
} from "../const/const";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_API_URL
    : DEVELOPMENT_API_URL;

axios.defaults.baseURL = apiUrl;

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status == 401) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const authenticateByUserId = userId => {
  return axios.post("/authbyappkey/token", {
    userid: userId,
    appkey: CLIENT_ID
  });
};

const login = (user, password) => {
  const body = `grant_type=password&username=${user}&password=${password}`;
  const conf = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };
  return axios.post("auth/token", body, conf).then(checkStatus);
};

const setAuthHeader = token =>
  (axios.defaults.headers.authorization = `Bearer ${token}`);

const getChatByChatId = chatId => {
  return axios.get("/chats/chat/" + chatId).then(checkStatus);
};

const fetchUserChats = userId => {
  return axios.get("/chats/user/" + userId).then(checkStatus);
};

const addUsersToChat = users => {
  return axios.post("/userschats", users).then(checkStatus);
};

const fetchChatUsers = chatId => {
  return axios.get("/users/chatId/" + chatId).then(checkStatus);
};

const fetchUsers = chatId => {
  return axios.get("/users/availabletoadd/" + chatId).then(checkStatus);
};

const fetchMessages = chatId => {
  return axios.get("/messages/chatid/" + chatId).then(checkStatus);
};
const addMessage = message => {
  return axios.post("/messages/", message).then(checkStatus);
};

const fetchUnreadMessage = userId => {
  return axios.get("/messsagesreadstatuses/userId/" + userId).then(checkStatus);
};

const updateMessagesReadStatus = readMessages => {
  return axios.put("/messsagesreadstatuses", readMessages).then(checkStatus);
};

const postFile = file => {
  var bodyFormData = new FormData();

  bodyFormData.append("name", file.name);
  bodyFormData.append("file", file);

  return axios.post("/files", bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export default {
  authenticateByUserId,
  login,
  setAuthHeader,
  getChatByChatId,
  fetchUserChats,
  fetchUsers,
  fetchChatUsers,
  addUsersToChat,
  fetchMessages,
  addMessage,
  fetchUnreadMessage,
  updateMessagesReadStatus,
  postFile
};
