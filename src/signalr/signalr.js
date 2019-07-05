import { hubConnection } from 'signalr-no-jquery';


// http://pushtest.allwingroup.ru:3652/  тест
// http://pushservice.allwingroup.ru:3652/" бой
//let PUSH_SERVICE_URL='';
const PRODUCTION_SIGNALR_URL = "http://pushtest.allwingroup.ru:3652/";
const DEVELOPMENT_SIGNALR_URL = "http://pushtest.allwingroup.ru:3652/";

const signalrUrl =
  process.env.NODE_ENV === "production"
    ? PRODUCTION_SIGNALR_URL
    : DEVELOPMENT_SIGNALR_URL;

// if (process.env.NODE_ENV === 'development') {
//   PUSH_SERVICE_URL = 'http://localhost:62666/';
// }

// if (process.env.NODE_ENV === 'production') {
//   PUSH_SERVICE_URL = 'http://pushservice.allwingroup.ru:3652/';
// }

const HUB = 'ChatsHub';

export function initializeSignalR(userId, chats, onNewMessage, onNewChat, onNewMessageReadStatus) {
  const connection = hubConnection(signalrUrl);
  connection.logging = true;

  const hubProxy = connection.createHubProxy(HUB);

  hubProxy.on('sendNewMessage', function(message) {
    if (onNewMessage) onNewMessage(message);
  });

  hubProxy.on('sendNewChat', function(chat) {
    if (onNewChat) onNewChat(chat);
  });

  hubProxy.on('sendNewMessageReadStatus', function(messageReadStatus) {
    if (onNewMessageReadStatus) onNewMessageReadStatus(messageReadStatus);
  });

  let chatsIdArray=chats.map((item,index)=>{return {id:item.id}});
  connection.start({ transport: ['webSockets', 'longPolling'] })
  //connection.start()
    .done(() => {
      console.log('Now connected, user ID=' + userId + ' connection ID=' + connection.id);
      console.log("Connected, transport = " +  connection.transport.name );
      hubProxy.invoke('connect', { id: userId },chatsIdArray);
    })
    .fail(() => console.log('Could not connect user ID=' + userId));
}

