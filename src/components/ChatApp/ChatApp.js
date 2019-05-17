import React, { Component } from "react";
import ChatsList from "../ChatsList";
import BigChatInfo from "../ChatInfo/BigChatInfo";
import MessagesList from "../MessagesList";
import SendNewMessage from "../SendNewMessage";

 

export default class ChatApp extends Component {
  componentDidMount() {

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
                {/* <BigChatInfo
                  chatInfo={this.state.chats[this.state.currentChatId]}
                  addUsersFn={this.addUsers}
                  chatUsers={this.state.chatUsers}
                  availableToAddUsers={this.state.availableToAddUsers}
                  currentUserId={this.props.userId}
                /> */}
              </div>

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
