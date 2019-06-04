import React, { Component } from "react";
import _ from "lodash";
import Message from "../Message/Message";

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

    if (users.isFetching || messages.isFetching) {
      return (
        <div id="messagesList" className="panel-body">
          <p>MessagesList Loading....</p>;
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
      //console.log(this.props.data);

      let messagesListView = new Array();
      let usersObjArr = {};
      for (let i = 0; i < users.items.length; i++) {
        const user = users.items[i];
        usersObjArr[user.id] = user;
      }

      //const usersObjArr=_.map(users.items, 'id');

      for (let i = 0; i < messages.items.length; i++) {
        const message = messages.items[i];

        //let isNewMessage = unreadMessages[message.id] ? true : false;

        let isMyMessage = message.userId == currentUserId ? true : false;

        messagesListView.push(
          <Message
            key={message.id}
            message={message}
            author={usersObjArr[message.userId]}
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
