import React, { Component } from "react";

import ChatsContainer from "../ChatsContainer/ChatsContainer";
import CurrentChatContainer from "../CurrentChatContainer/CurrentChatContainer";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import NewMessageContainer from "../NewMessageContainer/NewMessageContainer";

import { connect } from "react-redux";

import { login, loginByUserId } from "../../redux/actions/Session";
import { fetch as fetchChats } from "../../redux/actions/chats";
import { fetch as fetchChatAppData } from "../../redux/actions/chatApp";


import api from "../../api";
require('./styles.css');

class ChatApp extends Component {
  componentDidMount() {
    this.props.fetchChatAppData(this.props.chatparams.userId);
  }
  render() {
    return (
      <div className="bootstrap">
        <div className="row">
          <div className="col-xs-3 no-padding-right">
            <ChatsContainer />

            {/* <ChatsList
              chats={this.state.chats}
              currentChatId={this.state.currentChatId}
              changeCurrentChatFn={this.changeCurrentChat}
              updateDataFn={this.updateData}
              unreadMessages={this.state.unreadMessages}
            /> */}
          </div>
          <div className="col-xs-9 xs-padding-left">
            <div className="panel panel-primary messages-panel">
              <div className="panel-heading chat-panel-heading">
                <CurrentChatContainer />
              
                {/* <BigChatInfo
                  chatInfo={this.state.chats[this.state.currentChatId]}
                  addUsersFn={this.addUsers}
                  chatUsers={this.state.chatUsers}
                  availableToAddUsers={this.state.availableToAddUsers}
                  currentUserId={this.props.userId}
                /> */}
              </div>
              <MessagesContainer />
              
              {/* <MessagesList
                currentChatId={this.state.currentChatId}
                currentUserId={this.props.userId}
                messages={this.state.messages}
                unreadMessages={chatUnreadMessages}
                users={this.state.chatUsers}
                updateDataFn={this.updateData}
                messagesWasReadFn={this.messagesWasRead}
              /> */}
            </div>
          </div>
          
          <NewMessageContainer />
          {/* <SendNewMessage
            addMessageFn={this.addMessagge}
            newMessageText={this.state.newMessageText}
            updateDataFn={this.updateData}
          /> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return {
    currentChat: store.currentChat   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (user, password) => dispatch(login(user, password)),
    loginByUserId: userId => dispatch(loginByUserId(userId)),
    fetchChats: userId => dispatch(fetchChats(userId)),
    fetchChatAppData: userId => dispatch(fetchChatAppData(userId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatApp);
