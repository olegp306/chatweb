import React, { Component } from "react";

import ChatsContainer from "../ChatsContainer/ChatsContainer";
import CurrentChatContainer from "../CurrentChatContainer/CurrentChatContainer";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import NewMessageContainer from "../NewMessageContainer/NewMessageContainer";

import SignalRContainer from "../SignalRContainer/SignalRContainer";

import { connect } from "react-redux";

import { login, loginByUserId } from "../../redux/actions/Session";
import { fetch as fetchChats } from "../../redux/entities/chats/actions";
import { fetch as fetchChatAppData } from "../../redux/actions/chatApp";
import {
  getCurrentUserId,
  getChats,
  getCurrentChat
} from "../../redux/selectors";

import {} from "../../signalr/signalr";

import api from "../../api";
require("./styles.css");

class ChatApp extends Component {
  componentDidMount() {
    this.props.fetchChatAppData(this.props.chatparams.userId);
  }
  invokeSignalR = () => {
    const { chats, currentUserId } = this.props;
    if (chats.fetched == false || currentUserId == null) {return null;}
  else {    
    return <SignalRContainer />};
  };

  render() {
    return (
      <div className="bootstrap">
        {this.invokeSignalR()}
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
    currentChat: getCurrentChat(store),
    currentUserId: getCurrentUserId(store),
    chats: getChats(store)
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
