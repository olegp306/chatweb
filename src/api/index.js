import axios from "axios";
import { hubConnection } from "signalr-no-jquery";

const CLIENT_ID = "kdwcc83defm8o7bkdwcc83defm8o7b";
console.log("api loaded");

const PRODUCTION_SIGNALR_URL = "http://localhost:5000";
const DEVELOPMENT_SIGNALR_URL = "http://localhost:89/";

const PRODUCTION_API_URL = "http://service.allwingroup.ru:3652/germes/v1";
const DEVELOPMENT_API_URL = "http://192.168.0.143/ApiService/germes/v1";

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


const toAssociativeArray=(data, idFieldName)=> {
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
}

const checkStatus=(response) =>{
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status == 401) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const authenticateByUserId=(userId) =>{
  return axios.post("/authbyappkey/token", {
    userid: userId,
    appkey: CLIENT_ID
  });
}

const login = (user, password) => {
  const body = `grant_type=password&username=${user}&password=${password}`;
  const conf = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };
  return axios.post("auth/token", body, conf);
};

const getChatByChatId=(chatId) =>{
  return axios.get("/chats/chat/" + chatId).then(checkStatus);
}

const fetchUserChats=(userId) =>{
  return axios.get("/chats/user/" + userId).then(checkStatus);
}

const addUsersToChat=(users) =>{
  return axios.post("/userschats", users).then(checkStatus);
}

const getUsersByChatId=(chatId)=> {
  return axios.get("/users/chatId/" + chatId).then(checkStatus);
}

const getUsersAvailableToAdd=(chatId) =>{
  return axios.get("/users/availabletoadd/" + chatId).then(checkStatus);
}

const getMessagesByChatId=(chatId)=> {
  return axios.get("/messages/chatid/" + chatId).then(checkStatus);
}
const addMessage=(message)=> {
  return axios.post("/messages/", message).then(checkStatus);
}

const getUnreadMessage=(userId) =>{
  return axios.get("/messsagesreadstatuses/userId/" + userId).then(checkStatus);
}

const  updateMessagesReadStatus=(readMessages)=> {
  return axios.put("/messsagesreadstatuses", readMessages).then(checkStatus);
}


export default { 
  authenticateByUserId, 
  login,
  getChatByChatId, 
  fetchUserChats, 
  addUsersToChat, 
  getUsersByChatId, 
  getUsersAvailableToAdd,
  getMessagesByChatId,
  addMessage,
  getUnreadMessage,
  updateMessagesReadStatus,
  toAssociativeArray
}

