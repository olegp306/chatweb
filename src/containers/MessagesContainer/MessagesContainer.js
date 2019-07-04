import React, { Component } from "react";
import { connect } from "react-redux";
import MessageList from "../../components/MessagesList/MessageList";
import { fetch as fetchMessages } from "../../redux/entities/messages/actions";
import {update as updateMessagesStatus} from "../../redux/entities/unReadMessages/actions"
import _ from "lodash"
import {
  getUsers,
  getMessages,
  getCurrentUserId,
  getCurrentChat,
  getChatApp,
  getUnreadMessages
} from "../../redux/selectors/index";

const mapStateToProps = store => {
  return {
    users: getUsers(store),
    messages: getMessages(store),
    currentUserId: getCurrentUserId(store),
    unreadMessages: getUnreadMessages(store),
    currentChat:getCurrentChat(store),
    chatApp: getChatApp(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: chatId => dispatch(fetchMessages(chatId)),
    updateMessagesStatus:()=>dispatch(updateMessagesStatus())
  };
};

class MessagesContainer extends Component {
  componentDidMount() {
    // const { currentChat, fetchMessages } = this.props;
    // fetchMessages(currentChat.id);
  }
  render() {
    const { users, messages, unreadMessages, currentUserId ,currentChat, updateMessagesStatus} = this.props;
    const unreadMessagesByChatId = _.groupBy(unreadMessages.items, "chatId");

    return (
      <div>
        <MessageList
          users={users}
          messages={messages}
          unreadMessages={unreadMessages}
          unreadMessagesByChatId={unreadMessagesByChatId}
          currentUserId={currentUserId}
          currentChat={currentChat}
          updateMessagesStatus={updateMessagesStatus}
        />
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);
