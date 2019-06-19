import React, { Component } from "react";
import { connect } from "react-redux";
import MessageList from "../../components/MessagesList/MessageList";
import { fetch as fetchMessages } from "../../redux/entities/messages/actions";
import {
  getUsers,
  getMessages,
  getCurrentUserId,
  getCurrentChat,
  getChatApp
} from "../../redux/selectors/index";

const mapStateToProps = store => {
  return {
    users: getUsers(store),
    messages: getMessages(store),
    currentUserId: getCurrentUserId(store),
    // currentChat: getCurrentChat(store),
    chatApp: getChatApp(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: chatId => dispatch(fetchMessages(chatId))
  };
};

class MessagesContainer extends Component {
  componentDidMount() {
    // const { currentChat, fetchMessages } = this.props;
    // fetchMessages(currentChat.id);
  }
  render() {
    const { users, messages, unreadMessages, currentUserId } = this.props;
    return (
      <div>
        <MessageList
          users={users}
          messages={messages}
          unreadMessages={unreadMessages}
          currentUserId={currentUserId}
        />
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);
