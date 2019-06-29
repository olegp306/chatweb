import React, { Component } from "react";

const chatOnWarningTypeId="2768909697000" //чат по замечание
const chatOnRequest="2768031944000" //чат по заявке


export default class SmallChat extends Component {
  
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
  }


  handOnChatClick = e => {
    if (e.target.id) {
      this.state.changeCurrentChatFn(e.target.id);
    }
  };

  render() {
    const {
      chat,      
      isCurrentChat,
      unreadMessagesCount,
      onClickChat
    } = this.props;
    const lastMessage= (chat.lastMessage &&  chat.lastMessage.text?  chat.lastMessage.text.slice(0, 30) + ( chat.lastMessage.text.length>40 ? " ...":"")  : "" );
    if (!chat) {
      return <div>Chats are downloading</div>;
    } else {
      return (
        <li
          className={isCurrentChat == true ? (chat.chatTypeId== chatOnWarningTypeId ? "active-warning":"active") : ""}
          //id={chat.id}
        >
          <a className= { chat.chatTypeId== chatOnWarningTypeId ? "small-chat-text-warning " : "small-chat-text"} 
            //id={chat.id}
            href="#"
            onClick={()=>onClickChat(chat)}
          >
            {chat.name}
            <span
              className={
                unreadMessagesCount == 0
                  ? "hidden"
                  : "unread-message-count"
              }
            >              
              {unreadMessagesCount}
            </span>
            <div></div>
            
            <span className="last-message-text-in-sm-chat">
              {lastMessage} 
            </span>
           
          </a>
        </li>
      );
    }
  }
}
