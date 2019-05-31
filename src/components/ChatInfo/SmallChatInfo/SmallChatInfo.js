import React, { Component } from "react";

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
    const lastMessage= (chat.lastMessage ?  chat.lastMessage.text.slice(0, 40) + ( chat.lastMessage.text.length>40 ? " ...":"")  : "" );
    if (!chat) {
      return <div>Chats are downloading</div>;
    } else {
      return (
        <li
          className={isCurrentChat == true ? "active" : ""}
          //id={chat.id}
        >
          <a className="small-chat-text"
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
            <div className="last-message-text-in-sm-chat">
              {lastMessage} 
            </div>
           
          </a>
        </li>
      );
    }
  }
}
