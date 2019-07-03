import React, { Component } from "react";
import * as api from "../../api";
import SmallChat from "../ChatInfo/SmallChatInfo/SmallChatInfo";

export default class ChatsList extends Component {
  sortChats = chatItems => {
    //сортировка чатов по last message or chat creation datetime
    const sortChats = chatItems.sort((a, b) => {
      const aDateTime = new Date(
        a.lastMessage ? a.lastMessage.creationDate : a.creationDate
      );
      const bDateTime = new Date(
        b.lastMessage ? b.lastMessage.creationDate : b.creationDate
      );
      // console.log(`
      // чат А ${a.name} время &${aDateTime} getTime  ${aDateTime.getTime()}
      // чат B ${b.name} время &${bDateTime} getTime  ${bDateTime.getTime()}`)
      return bDateTime.getTime() - aDateTime.getTime();
    });

    return sortChats;
  };

  renderSortedChatsList = chatItems => {
    const { currentChat, onClickChat,countOfUnreadMessages } = this.props;
   
    return chatItems.map((item,index) => {
      return (
        <SmallChat
          chat={item}
          key={index}
          isCurrentChat={item.id == currentChat.id}
          unreadMessagesCount={countOfUnreadMessages.hasOwnProperty([item.id]) ? countOfUnreadMessages[item.id].length: 0}
          onClickChat={onClickChat}
        />
      );
    });
  };

  render() {
    const { chats, currentChat, filteredChatsItems,unreadMessages } = this.props;

    if (chats.isFetching || currentChat == null || unreadMessages.fetched==false) {
      return <p>ChatsList Loading....</p>;
    }

    const sorteredChats = this.sortChats(filteredChatsItems);
    
    return (
      <div className="sidebar">
        <ul className="nav nav-sidebar chat-list">
          {this.renderSortedChatsList(sorteredChats)}
        </ul>
      </div>
    );
  }
}
