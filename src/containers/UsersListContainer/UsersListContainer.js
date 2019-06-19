import React, { Component } from "react";
import { connect } from "react-redux";
import UsersList from "../../components/UsersList/UsersList";
import { selectUser, unSelectUser } from "../../redux/actions/usersListWithSelect";
import { add as addUserstoChat } from "../../redux/actions/usersListWithSelect";
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
  render() {
    const { users, chatUsers } = this.props;    

    if (
      users.isFetching == true ||
      chatUsers.isFetching == true ||
      chatUsers.fetched == false
    ) {
      return <div>users list is loading</div>;
    }

  

    return <UsersList chatUsers={chatUsers} />;
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersListContainer);
