import React, { Component } from "react";
import UserSmall from "../User/UserSmall/UserSmall";
import UserForAdd from "../User/UserForAdd/UserForAdd";

export default class UsersListWithSelect extends Component {
  //при инициализации 1 раз
  componentDidMount() {
    window.$(document).on("click", ".add-user-in-chat-panel", function(e) {
      e.stopPropagation();
    });
  }

  componentWillUnmount() {
    window.$(document).off("click", ".add-user-in-chat-panel", function(e) {
      e.stopPropagation();
    });
  }

  renderUsersList = usersItems => {
    const { onClickUser, selectedUsers } = this.props;

    return usersItems.map((item, index) => {
      return (
        <UserForAdd
          user={item}
          isSelected={
            selectedUsers.get(item.id) && selectedUsers.get(item.id) == true
              ? true
              : false
          }
          onClick={() => onClickUser(item.id)}
        />
      );
    });
  };

  render() {
    const { users, selectedUsers, addUsers, addUserstoChat } = this.props;

    return (
      <div className="panel panel-primary chats-panel">
        <div className="panel-heading add-users-panel-heading">
          <h3 className="panel-title">
            Добавьте участников
            {/* <button className="btn btn-primary refresh-btn" onClick={this.props.updateDataFn}><span className="glyphicon glyphicon-refresh"></span> </button>*/}
            <button
              type="button"
              className="btn btn-primary user-list-submit-selection" 
              onClick={addUserstoChat}
            >
              готово
            </button>
          </h3>
          <div className="input-group search-users-input">
            <input
              type="text"
              className="form-control"
              placeholder="поиск"
              onChange={this.handleSearch}
              //value={this.state.searchQuery}
            />
            {/*<span className="input-group-btn">
                <button className="btn btn-default"  type="button" onClick={this.clearSearchQuery} data-toggle="tooltip" data-placement="right" title="Очистить строку поиска" ><span className="glyphicon glyphicon-search"></span></button>
              </span>*/}
          </div>
        </div>
        <div className="panel-body chat-list add-user-in-chat-panel">
          <div className="sidebar">
            {/* <span className="label label-default">Доступные контакты</span> */}
            <ul className="nav nav-sidebar chat-list-grid">
              {this.renderUsersList(users.items)}
            </ul>
          </div>
        </div>
        {/* <div className="add-users-panel-bottom">
        <button
          type="button"
          className="btn btn-primary"
          onClick={addUserstoChat}
        >
          Добавить
        </button>
        </div> */}
      </div>
    );
  }
}
