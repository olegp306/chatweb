import React, { Component } from "react";
import ChatsList from "../../components/ChatsList";
import BigChatInfo from "../../components/ChatInfo/BigChatInfo";
import MessagesList from "../../components/MessagesList";
import SendNewMessage from "../../components/SendNewMessage";
import { connect } from "react-redux";
import { fetch as fetchChats } from "../../redux/actions/chats";
import { login, loginByUserId } from "../../redux/actions/Session";

import api from "../../api";

class ChatApp extends Component {
  constructor(props) {
    //console.log('constructor');
    super(props);
    this.state = {
      userId: this.props.chatparams.userId,
      chatId: this.props.chatparams.chatId
    };
  }
  onLoginClick = () => {
    this.props.login("Заказчик", "AW7777");
  };
  componentDidMount() {
    //auth by user id
    // login action
    //this.props.login("Заказчик", "AW7777");
    // this.props.loginByUserId(this.props.chatparams.userId)

    console.log(this.props.chatparams.userId);
  }
  render() {
    // if (!this.state.chatUsers || !this.state.messages || !this.state.chats) {
    //   return <p>MessagesList Loading....</p>;
    // }

    // let chatUnreadMessages = {};
    // for (let prop in this.state.unreadMessages) {
    //   let item = this.state.unreadMessages[prop];
    //   if (item.chatId == this.state.currentChatId) {
    //     chatUnreadMessages[prop] = item;
    //   }
    // }
    return (
      <div className="bootstrap">
        <div className="row">
          <div className="col-xs-3 no-padding-right">
            <a ihref="#" onClick={this.onLoginClick}>
              <button type="button" class="btn btn-primary" />
            </a>
            ChatsList
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
                BigChatInfo
                {/* <BigChatInfo
                  chatInfo={this.state.chats[this.state.currentChatId]}
                  addUsersFn={this.addUsers}
                  chatUsers={this.state.chatUsers}
                  availableToAddUsers={this.state.availableToAddUsers}
                  currentUserId={this.props.userId}
                /> */}
              </div>
              MessagesList
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
          SendNewMessage
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

// const mapStateToProps = {
//   // updatePostComment: updateComment,
//   // deletePostComment: deleteComment
// }

// const mapDispatchToProps = (dispatch)= {
//   fetchChats: fetchChats,
//   loginByUserId: loginByUserId,
//   login: (user, password) => dispatch(login(user, password))
// }

export default connect(
  store => store,
  dispatch => ({ login: (user, password) => dispatch(login(user, password)) })
)(ChatApp);
