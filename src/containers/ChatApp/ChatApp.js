import React, { Component } from "react";

import ChatsContainer from "../ChatsContainer/ChatsContainer";
import CurrentChatContainer from "../CurrentChatContainer/CurrentChatContainer";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import NewMessageContainer from "../NewMessageContainer/NewMessageContainer";

import { connect } from "react-redux";

import { login, loginByUserId } from "../../redux/actions/Session";
import { fetch as fetchChats } from "../../redux/entities/chats/actions";
import { fetch as fetchChatAppData } from "../../redux/actions/chatApp";

import api from "../../api";
require("./styles.css");

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
          </div>
          <div className="col-xs-9 xs-padding-left">
            <div className="panel panel-primary messages-panel">
              <div className="panel-heading messages-panel-heading">
                <CurrentChatContainer />
              </div>
              <MessagesContainer />
            </div>         
            <NewMessageContainer />         
          </div>             
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
