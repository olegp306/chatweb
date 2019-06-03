import React, { Component } from "react";
import * as api from "../../api";
import SmallChat from "../ChatInfo/SmallChatInfo/SmallChatInfo";

export default class ChatsList extends Component {
  //при инициализации 1 раз
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    //   this.setState({
    //   chats:nextProps.chats,
    //   currentChatId:nextProps.currentChatId,
    //   displayedChats:nextProps.chats,
    //   unreadMessages:nextProps.unreadMessages
    //  });
  }

  handleSearch = event => {
    let searchQuery = event.target.value.toLowerCase();
    let newDisplayedChats = this.filterChats(searchQuery);

    this.setState({
      searchQuery: event.target.value,
      displayedChats: newDisplayedChats
    });
  };

  filterChats = searchQuery => {
    let newDisplayedChats = {};
    if (searchQuery == "") {
      return this.state.chats;
    } else {
      for (let prop in this.state.chats) {
        let chat = this.state.chats[prop];
        if (chat.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) {
          newDisplayedChats[prop] = this.state.chats[prop];
        }
      }
      return newDisplayedChats;
    }
  };

  clearSearchQuery = () => {
    this.setState({ searchQuery: "", displayedChats: this.props.chats });
  };

  getUnreadMessagesCount = (messagesReadInfo, chatId) => {
    let unReadMessagesCount = 0;
    for (let prop in messagesReadInfo) {
      if (messagesReadInfo[prop].chatId == chatId) {
        unReadMessagesCount++;
      }
    }
    return unReadMessagesCount;
  };

  render() {
    const { chats, currentChat, onClickChat } = this.props;
    if (chats.isFetching || currentChat == null) {
      return <p>ChatsList Loading....</p>;
    }

    let unreadMessagesCount = null;

    //сортировка чатов по last message or chat creation datetime
    const sortChats = chats.items.sort((a, b) => {
      const aDateTime = new Date(
        a.lastMessage ? a.lastMessage.creationDate : a.creationDate
      );
      const bDateTime = new Date(
        b.lastMessage ? b.lastMessage.creationDate : b.creationDate
      );
      console.log(`
      чат А ${a.name} время &${aDateTime} getTime  ${aDateTime.getTime()}
      чат B ${b.name} время &${bDateTime} getTime  ${bDateTime.getTime()}`)
      return bDateTime.getTime()-aDateTime.getTime() ;
    });

    let chatsListView = [];

    for (let i = 0; i < sortChats.length; i++) {
      let chat = sortChats[i];
      chatsListView.push(
        <SmallChat
          chat={chat}
          key={chat.id}
          // chatInfo={chat}
          isCurrentChat={chat.id == currentChat.id}
          unreadMessagesCount={unreadMessagesCount}
          onClickChat={onClickChat}
          // updateDataFn={this.props.updateData}
        />
      );
    }

    return (
      <div className="sidebar">
        <ul className="nav nav-sidebar chat-list">{chatsListView}</ul>
      </div>
    );
  }
}
