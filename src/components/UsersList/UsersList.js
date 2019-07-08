import React, { Component } from "react";
import UserSmall from "../User/UserSmall/UserSmall";

export default class UsersList extends Component {
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
    return usersItems.map((item, index) => {
      return (
        <UserSmall
          key={item.id}
          user={item}          
        />
      );
    });
  };

  render() {
    const { chatUsers } = this.props;

    return (
      <div className="panel panel-primary chats-panel">
        <div className="panel-heading add-users-panel-heading">
          <h3 className="panel-title">
            Участники чата :        
          </h3>
      
        </div>
        <div className="panel-body chat-list add-user-in-chat-panel">
          <div className="sidebar">            
            <ul className="nav nav-sidebar chat-list-grid">
              {this.renderUsersList(chatUsers.items)}
            </ul>
          </div>
        </div>      
      </div>
    );
  }
}
