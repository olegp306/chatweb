import React, { Component } from "react";

import ChatsList from "../../components/ChatsList/ChatsList";
import {
  setChatsFilter,
  resetChatsFilter
} from "../../redux/actions/chatsFilter";
import { fetch as fetchChats } from "../../redux/entities/chats/actions";
import { setCurrentChat } from "../../redux/actions/chatApp";
import { fetch as fetchChatAppData } from "../../redux/actions/chatApp";
import {
  getChats,
  //getCurrentChat,
  getChatApp,
  getChatsFilter,
  getCurrentUserId
} from "../../redux/selectors/index";
import { connect } from "react-redux";

const mapStateToProps = store => {
  return {
    chatApp: getChatApp(store),
    chats: getChats(store),
    chatsFilter: getChatsFilter(store),
    currentUserId:getCurrentUserId(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChats: userId => dispatch(fetchChats(userId)),
    onClickChat: chat => dispatch(setCurrentChat(chat)),
    setChatsFilter: filter => dispatch(setChatsFilter(filter)),
    resetChatsFilter: () => dispatch(resetChatsFilter()),
    fetchChatAppData: userId => dispatch(fetchChatAppData(userId))
  };
};

class ChatsContainer extends Component {
  onChangeFilter = event => {
    const { setChatsFilter } = this.props;
    const filter = event.target.value;

    setChatsFilter(filter);
  };

  refreshDataHandler=()=>{
    const {currentUserId, fetchChatAppData }= this.props
    fetchChatAppData(currentUserId);
  }

  render() {
    const { chats, chatApp, onClickChat, chatsFilter } = this.props;
    const filterString=(chatsFilter!=null ? chatsFilter.toLowerCase():"");
    let filteredChatsItems = chats.items.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(filterString) !== -1
        //item.name.toLowerCase().indexOf((chatsFilter!=null ? chatsFilter.toLowerCase():'')) !== -1
      );
    });
    

    return (
      <div className="panel panel-primary chats-panel">
        <div className="panel-heading chats-panel-heading">

        <div className="title-chat-name">
          <button className="btn title-btn" type="button">
            <h3
              className="panel-title title-chat-list-text"
              onClick={this.refreshDataHandler}
            >
              {" Чаты / Замечания"}
            </h3>
          </button>
        </div>
        <div className="input-group search-input">
            <input
              type="text"
              className="form-control search-chats-text"
              placeholder="Поиск ..."
              onChange={this.onChangeFilter}
              value={chatsFilter}            
            />
          </div>

        </div>
<div className="chats-list-title">Недавние чаты:</div>
        <div className="chat-list-panel-body">
          <ChatsList
            chats={chats}
            filteredChatsItems={filteredChatsItems}
            currentChat={chatApp.currentChat}
            onClickChat={onClickChat}
          />
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsContainer);
