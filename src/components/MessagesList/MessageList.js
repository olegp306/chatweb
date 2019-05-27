import React, { Component } from "react";

import SendNewMessage from "../SendNewMessage";
import Message from "../Message";

export default class MessagesList extends Component {
  //при инициализации 1 раз
  componentDidMount() {
    this.scrollTolastMessage();
  }

  componentWillReceiveProps(nextProps) {
    // if(!this.readNewMessagesTimerId){
    //   clearTimeout (this.timerId);
    // }
    // this.setState({
    //   users:nextProps.users,
    //   messages:nextProps.messages,
    //   currentUserId:nextProps.currentUserId,
    //   unreadMessages:nextProps.unreadMessages,
    //   messagesWasReadFn:nextProps.messagesWasReadFn
    // });
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

    if (users.isFetching || messages.isFetching  ) {
      return <p>MessagesList Loading....</p>;
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
      //console.log(this.props.data);

      let messagesListView = new Array();

      for (let i = 0; i < messages.items.length; i++) {
        const message = messages.items[i];

        //let isNewMessage = unreadMessages[message.id] ? true : false;

        let isMyMessage = message.userId == currentUserId ? true : false;

        messagesListView.push(
          <Message
            key={message.id}
            messageInfo={message}
            userInfo={users.items.find(obj => {
              return obj.id == message.userId;
            })}
            isMyMessage={isMyMessage}
            //isNewMessage={isNewMessage}
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
