import React, { Component } from "react";
import _ from "lodash";
import Message from "../Message/Message";
import Images from "../../theme/images";

export default class MessagesList extends Component {
  //при инициализации 1 раз
  componentDidMount() {
    this.scrollTolastMessage();
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

  render() {
    const { users, messages, unreadMessages, currentUserId } = this.props;

    if (users.isFetching || messages.isFetching) {
      return (
        <div id="messagesList" className="panel-body">
          <img
            className="loading-messages-indicator"
            src={Images.loading64}
            alt="идет отправка сообщения"
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

      for (let i = 0; i < messages.items.length; i++) {
        const message = messages.items[i];
        let isMyMessage = message.userId == currentUserId ? true : false;
        let showDateTime = true;

        //let isInGroupOfMessagesByTime=messages.items[i];
        if (i == 0 || i == messages.items.length - 1) {
          showDateTime = false;
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

        messagesListView.push(
          <Message
            key={message.id}
            message={message}
            author={usersObjArr[message.userId]}
            isMyMessage={isMyMessage}
            showDateTime={showDateTime}
          />
        );
      }

      // this.readNewMessagesTimerId = setTimeout(() => {
      //   this.state.messagesWasReadFn(unreadMessages);
      // }, 5000);

      return (
        <div id="messagesList" className="panel-body">
          <ul className="chat">{messagesListView}</ul>
        </div>
      );
    }
  }
}
