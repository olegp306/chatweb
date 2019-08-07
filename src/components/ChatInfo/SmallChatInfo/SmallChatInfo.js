import React, { Component } from "react";
import { chatTypes } from "../../../const/const";

export default class SmallChat extends Component {
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
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
    const lastMessage =
      chat.lastMessage && chat.lastMessage.text
        ? chat.lastMessage.text.slice(0, 30) +
          (chat.lastMessage.text.length > 40 ? " ..." : "")
        : "";
    if (!chat) {
      return <div>Chats are downloading</div>;
    } else {
      return (
        <li
          className={
            isCurrentChat == true
              ? chat.chatTypeId == chatTypes["2768909697000"].id
                ? "active-warning"
                : "active"
              : ""
          }
        >
          <a
            className={
              chat.chatTypeId == chatTypes["2768909697000"].id
                ? "small-chat-text-warning "
                : "small-chat-text"
            }
            href="#"
            onClick={() => onClickChat(chat)}
          >
            <div className={!chat.isOpen ? "" : "current-chat-closed"}>
              {chat.name}
              {"chat.isOpen " + chat.isOpen }
              <span
                className={
                  unreadMessagesCount == 0 ? "hidden" : "unread-message-count"
                }
              >
                {unreadMessagesCount}
              </span>
              <div />

              <span className="last-message-text-in-sm-chat">
                {lastMessage}
              </span>
              <div>
                <span
                  className={
                    "type-chat-text-in-sm-chat-" +
                    chatTypes[chat.chatTypeId].color
                  }
                >
                  {chatTypes[chat.chatTypeId].name}
                </span>
              </div>
            </div>
          </a>
        </li>
      );
    }
  }
}
