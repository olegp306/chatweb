import React, { Component } from "react";
import _ from "lodash";
import Message from "../Message/Message";
import Images from "../../theme/images";

export default class MessagesList extends Component {
  //при инициализации 1 раз
  componentDidMount() {
    this.scrollTolastMessage();
  }

  componentWillReceiveProps(nextProps) {
    if (this.readNewMessagesTimerId) {
      clearTimeout(this.readNewMessagesTimerId);
    }

    const { unreadMessagesByChatId, currentChat, unreadMessages } = nextProps;

    if (
      currentChat != null &&
      unreadMessages.isFetching != true &&
      unreadMessages.fetched != false &&
      unreadMessages.isUpdating != true &&
      unreadMessagesByChatId.hasOwnProperty([currentChat.id]) &&
      unreadMessagesByChatId[currentChat.id].length > 0
    ) {
      this.readNewMessagesTimerId = setTimeout(() => {
        this.messagesWasRead();
      }, 5000);
    }
  }

  //каждый раз после изменения props после render
  componentDidUpdate(prevProps, prevState) {
    this.scrollTolastMessage();
  }

  scrollTolastMessage = () => {
    var objDiv = document.getElementById("messagesList");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  };

  messagesWasRead = readedMessages => {
    const { unreadMessagesByChatId, currentChat } = this.props;

    if (
      unreadMessagesByChatId.hasOwnProperty([currentChat.id]) &&
      unreadMessagesByChatId[currentChat.id].length > 0
    ) {
      const { updateMessagesStatus } = this.props;
      updateMessagesStatus();
      // console.log("отправляем инфо о прочитанных");
    }
    console.log(readedMessages);
  };

  render() {
    const {
      users,
      currentChat,
      messages,
      unreadMessages,
      currentUserId
    } = this.props;
    const unreadMessagesObj = _.keyBy(unreadMessages.items, "id");

    if (
      (users.isFetching || messages.isFetching || currentChat == null,
      unreadMessages.fetched != true)
    ) {
      return (
        <div id="messagesList" className="panel-body">
          <img
            className="loading-messages-indicator"
            src={Images.loading64}
            alt="идет загрузка сообщении"
          />
        </div>
      );
    } else {
      if (messages.length == 0) {
        return (
          <div id="messagesList" className="panel-body">
            <ul className="chat">
              <p>Нет ни одного сообщения. Напишите первым !</p>
            </ul>
          </div>
        );
      }

      let messagesListView = new Array();
      let usersObjArr = {};
      for (let i = 0; i < users.items.length; i++) {
        const user = users.items[i];
        usersObjArr[user.id] = user;
      }

      let isNewMessagesTitleShow = false;
      for (let i = 0; i < messages.items.length; i++) {
        const message = messages.items[i];
        let isMyMessage = message.userId == currentUserId ? true : false;
        let showDateTime = true;
        let isNewMessage = unreadMessagesObj.hasOwnProperty([message.id]);

        if (i == 0 || i == messages.items.length - 1) {
          showDateTime = true;
        } else {
          let prevMessageDateTime = new Date(
            messages.items[i - 1].creationDate
          );
          let currentMessageDateTime = new Date(message.creationDate);
          showDateTime =
            currentMessageDateTime - prevMessageDateTime < 300000 //мин
              ? false
              : true;
        }

        if (!isNewMessagesTitleShow && isNewMessage) {
          messagesListView.push(
            <span className="unread-message-title">
              Непрочитанные сообщения
            </span>
          );
          isNewMessagesTitleShow = true;
        }

        messagesListView.push(
          <Message
            key={message.id}
            message={message}
            author={usersObjArr[message.userId]}
            isMyMessage={isMyMessage}
            showDateTime={showDateTime}
            isNewMessage={isNewMessage}
          />
        );
      }

      return (
        <div id="messagesList" className="panel-body">
          <ul className="chat">{messagesListView}</ul>
        </div>
      );
    }
  }
}
