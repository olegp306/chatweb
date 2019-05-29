import React, { Component } from "react";

import ChatsList from "../../components/ChatsList/ChatsList";
import { fetch as fetchChats } from "../../redux/actions/chats";
import { setCurrentChat } from "../../redux/actions/chatApp";
import {
  getChats,
  getCurrentChat,
  getChatApp
} from "../../redux/selectors/index";
import { connect } from "react-redux";

const mapStateToProps = store => {
  return {
    chatApp: getChatApp(store),
    chats: getChats(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChats: userId => dispatch(fetchChats(userId)),
    onClickChat: chat => dispatch(setCurrentChat(chat))
  };
};

class ChatsContainer extends Component {
  render() {
    const { chats, chatApp, onClickChat } = this.props;
    return (
      <div className="panel panel-primary chats-panel">
        <div className="panel-heading chat-panel-heading">
          <div className="chat-list-title"> Чаты / Замечания</div>

          {/* <button
              className="btn btn-primary refresh-btn"
              onClick={this.props.updateDataFn}
            >
              <span className="glyphicon glyphicon-refresh" />{" "}
            </button> */}
        </div>
        <div className="panel-body chat-list">
          {/* Поиск по чатам */}
          <div className="input-group search-input">
            <input
              type="text"
              className="form-control"
              placeholder="Поиск ..."
              onChange={this.handleSearch}
              //value={this.state.searchQuery}
            />

            {/*<span className="input-group-btn">
              <button className="btn btn-default"  type="button" onClick={this.clearSearchQuery} data-toggle="tooltip" data-placement="right" title="Очистить строку поиска" >
                <span className="glyphicon glyphicon-search"></span>
                </button>
            </span>*/}
          </div>

          <ChatsList
            chats={chats}
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
