import React, { Component } from "react";

import ChatsList from "../../components/ChatsList/ChatsList";
import { fetch as fetchChats } from "../../redux/actions/chats";
import { getChats,getCurrentChat ,getChatApp} from "../../redux/selectors/index";
import { connect } from "react-redux";

const mapStateToProps = store => {
  return {
    chatApp: getChatApp(store),
    chats: getChats(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChats: userId => dispatch(fetchChats(userId))
  };
};

class ChatsContainer extends Component {
  render() {
    const { chats, chatApp } = this.props;
    return (
      <div className="panel panel-primary chats-panel">
        <div className="panel-heading chat-panel-heading">
          <h3 className="panel-title">
            Чаты
            <button
              className="btn btn-primary refresh-btn"
              onClick={this.props.updateDataFn}
            >
              <span className="glyphicon glyphicon-refresh" />{" "}
            </button>
          </h3>
        </div>
        <div className="panel-body chat-list">
          {/* Поиск по чатам */}
          <div className="input-group search-input">
            <input
              type="text"
              className="form-control"
              placeholder="Поиск чата"
              onChange={this.handleSearch}
              //value={this.state.searchQuery}
            />

            {/*<span className="input-group-btn">
              <button className="btn btn-default"  type="button" onClick={this.clearSearchQuery} data-toggle="tooltip" data-placement="right" title="Очистить строку поиска" >
                <span className="glyphicon glyphicon-search"></span>
                </button>
            </span>*/}
          </div>

          <ChatsList chats={chats} currentChat={chatApp.currentChat} />
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsContainer);
