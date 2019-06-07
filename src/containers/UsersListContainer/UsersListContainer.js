import React, { Component } from "react";
import { connect } from "react-redux";
import UsersList from "../../components/UsersList/UsersList";
import { selectUser, unSelectUser } from "../../redux/actions/usersList";
import { add as addUserstoChat } from "../../redux/actions/usersList";
import _ from "lodash";

import {
  getUsers,
  getChatUsers,
  getCurrentUserId,
  getCurrentChat,
  getChatApp,
  getSelectedUsers
} from "../../redux/selectors/index";

const mapStateToProps = store => {
  return {
    users: getUsers(store),
    chatUsers: getChatUsers(store),
    currentUserId: getCurrentUserId(store),
    currentChat: getCurrentChat(store),
    chatApp: getChatApp(store),
    selectedUsers: getSelectedUsers(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectUser: userId => dispatch(selectUser(userId)),
    unSelectUser: userId => dispatch(unSelectUser(userId)),
    addUserstoChat: () => dispatch(addUserstoChat())
  };
};

class UsersListContainer extends Component {
  onClickHandler = userId => {
    const { selectUser, unSelectUser, selectedUsers } = this.props;
    console.log("select user with user id=" + userId);
    if (selectedUsers && selectedUsers.get(userId)) {
      unSelectUser(userId);
    } else {
      selectUser(userId);
    }
  };

  render() {
    const { selectedUsers, users, chatUsers, addUserstoChat } = this.props;
    const chatUsersObj = _.keyBy(chatUsers.items, "id");

    if (
      users.isFetching == true ||
      chatUsers.isFetching == true ||
      chatUsers.fetched == false
    ) {
      return <div>users list is loading</div>;
    }

    let usersItemsForAdd = users;
    usersItemsForAdd.items = users.items.filter(item => !chatUsersObj[item.id]);

    return (
      <UsersList
        users={usersItemsForAdd}
        selectedUsers={selectedUsers}
        onClickUser={this.onClickHandler}
        addUserstoChat={addUserstoChat}
      />
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersListContainer);
