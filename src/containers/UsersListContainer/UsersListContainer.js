import React, { Component } from "react";
import { connect } from "react-redux";
import UsersList from "../../components/UsersList/UsersList";
import { selectUser, unSelectUser } from "../../redux/actions/usersList";

import {
  getUsers,
  //getMessages,
  getCurrentUserId,
  getCurrentChat,
  getChatApp,
  getSelectedUsers
} from "../../redux/selectors/index";

const mapStateToProps = store => {
  return {
    users: getUsers(store),
    currentUserId: getCurrentUserId(store),
    currentChat: getCurrentChat(store),
    chatApp: getChatApp(store),
    selectedUsers: getSelectedUsers(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectUser: userId => dispatch(selectUser(userId)),
    unSelectUser: userId => dispatch(unSelectUser(userId))
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
    const { selectedUsers, users } = this.props;

    return (
      <UsersList
        users={users}
        selectedUsers={selectedUsers}
        onClickUser={this.onClickHandler}
      />
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersListContainer);
