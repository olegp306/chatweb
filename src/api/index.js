import axios from "axios";
import { hubConnection } from "signalr-no-jquery";

const CLIENT_ID = "kdwcc83defm8o7bkdwcc83defm8o7b";
console.log("api loaded");

const PRODUCTION_SIGNALR_URL = "http://localhost:5000";
const DEVELOPMENT_SIGNALR_URL = "http://localhost:89/";

// https://apitest.allwingroup.ru/germes/v1
// https://service.allwingroup.ru:3652/germes/v1
// http://192.168.1.67/ApiService/germes/v1

const PRODUCTION_API_URL = "https://apitest.allwingroup.ru/germes/v1";
const DEVELOPMENT_API_URL = "http://192.168.1.67/ApiService/germes/v1";

const signalrUrl =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_SIGNALR_URL
    : DEVELOPMENT_SIGNALR_URL;

const apiUrl =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_API_URL
    : DEVELOPMENT_API_URL;

axios.defaults.baseURL = apiUrl;

// Add a response interceptor
// axios.interceptors.response.use(
//   function(response) {
//     // Do something with response data
//     return response;
//   },
//   function(error) {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

export function initializeSignalR(
  userId,
  chats,
  onNewMessage,
  onNewChat,
  onNewMessageReadStatus
) {
  const connection = hubConnection(signalrUrl);
  connection.logging = true;

  const hubProxy = connection.createHubProxy("ChatHub");

  hubProxy.on("sendNewMessage", function(message) {
    if (onNewMessage) onNewMessage(message);
  });

  hubProxy.on("sendNewChat", function(chat) {
    if (onNewChat) onNewChat(chat);
  });

  hubProxy.on("sendNewMessageReadStatus", function(readMessages) {
    if (onNewMessageReadStatus) onNewMessageReadStatus(readMessages);
  });

  let chatsIdArray = chats.map((item, index) => {
    return { id: item.id };
  });

  connection
    .start({ transport: "longPolling" })
    .done(() => {
      console.log(
        "Now connected, user ID=" + userId + " connection ID=" + connection.id
      );
      hubProxy.invoke("connect", { id: userId }, chatsIdArray);
    })
    .fail(() => console.log("Could not connect user ID=" + userId));
}

const toAssociativeArray = (data, idFieldName) => {
  if (!idFieldName) {
    var idFieldName = "id";
  }
  let map = {};
  //console.log('toAssociativeArr', data);
  for (var i = 0, l = data.length; i < l; i++) {
    let item = data[i];
    map[item[idFieldName]] = item;
  }
  //console.log(map);
  return map;
};

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
  
  bodyFormData.append('name', file.name)
  bodyFormData.append('file', file)

  // bodyFormData.append("file", {
  //   uri: URL.createObjectURL(file),
  //   type: "image/jpeg", // or photo.type
  //   name: "file.name"
  // });

 // bodyFormData.append("file", {
  //   name: file.name,
  //   file: file,
  //   // type: "image/jpeg", // or photo.type
  //   // name: "fromWebApp.jpeg"
  // });

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
  toAssociativeArray,
  postFile
};
