import { hubConnection } from "signalr-no-jquery";
import {
  PRODUCTION_SIGNALR_URL,
  DEVELOPMENT_SIGNALR_URL
} from "../const/const";

const signalrUrl =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_SIGNALR_URL
    : DEVELOPMENT_SIGNALR_URL;

const HUB = "ChatsHub";

export function initializeSignalR(
  userId,
  chats,
  onNewMessage,
  onNewChat,
  onNewMessageReadStatus
) {
  const connection = hubConnection(signalrUrl);
  connection.logging = true;

  const hubProxy = connection.createHubProxy(HUB);

  hubProxy.on("sendNewMessage", function(message) {
    if (onNewMessage) onNewMessage(message);
  });

  hubProxy.on("sendNewChatUsers", function(chat) {
    if (onNewChat) onNewChat(chat);
  });

  hubProxy.on("sendNewMessageReadStatus", function(messageReadStatus) {
    if (onNewMessageReadStatus) onNewMessageReadStatus(messageReadStatus);
  });

  let chatsIdArray = chats.map((item, index) => {
    return { id: item.id };
  });
  connection
    .start({ transport: ["webSockets", "longPolling"] })
    .done(() => {
      console.log(
        "Now connected, user ID=" + userId + " connection ID=" + connection.id
      );
      console.log("Connected, transport = " + connection.transport.name);
      hubProxy.invoke("connect", { id: userId }, chatsIdArray);
    })
    .fail(() => console.log("Could not connect user ID=" + userId));
}

export function addNewChatConnetion(userId, chat, onNewMessage, onNewChat, onNewMessageReadStatus) {
  const chats=[chat];  
  initializeSignalR(userId, chats, onNewMessage, onNewChat, onNewMessageReadStatus) 
}
