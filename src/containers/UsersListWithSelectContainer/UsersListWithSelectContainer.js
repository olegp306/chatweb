import React, { Component } from "react";
import { connect } from "react-redux";
import UsersListWithSelect from "../../components/UsersListWithSelect/UsersListWithSelect";
import {
  selectUser,
  unSelectUser
} from "../../redux/actions/usersListWithSelect";
import {
  add as addUserstoChat,
  setUsersListFilter
} from "../../redux/actions/usersListWithSelect";
import _ from "lodash";

import {
  getUsers,
  getChatUsers,
  getCurrentUserId,
  getCurrentChat,
  getChatApp,
  getSelectedUsers,
  getUsersListFilter
} from "../../redux/selectors/index";

const mapStateToProps = store => {
  return {
    users: getUsers(store),
    chatUsers: getChatUsers(store),
    currentUserId: getCurrentUserId(store),
    currentChat: getCurrentChat(store),
    chatApp: getChatApp(store),
    selectedUsers: getSelectedUsers(store),
    usersListFilter: getUsersListFilter(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectUser: userId => dispatch(selectUser(userId)),
    unSelectUser: userId => dispatch(unSelectUser(userId)),
    addUserstoChat: () => dispatch(addUserstoChat()),
    setUsersListFilter: filter => dispatch(setUsersListFilter(filter))
  };
};

class UsersListWithSelectContainer extends Component {
  onChangeFilterHandler = event => {
    console.log("onChangeFilterHandler");
    const { setUsersListFilter } = this.props;
    const filter = event.target.value;

    setUsersListFilter(filter);
  };

  onClickHandler = userId => {
    const { selectUser, unSelectUser, selectedUsers } = this.props;
    //console.log("select user with user id=" + userId);
    if (selectedUsers && selectedUsers.get(userId)) {
      unSelectUser(userId);
    } else {
      selectUser(userId);
    }
  };

  render() {
    const {
      selectedUsers,
      usersListFilter,
      users,
      chatUsers,
      addUserstoChat
    } = this.props;
    const chatUsersObj = _.keyBy(chatUsers.items, "id");

    if (
      users.isFetching == true ||
      chatUsers.isFetching == true ||
      chatUsers.fetched == false
    ) {
      return <div>users list is loading</div>;
    }

    let usersItemsForAdd = users;
    const filterString =
      usersListFilter != null ? usersListFilter.toLowerCase() : "";

    usersItemsForAdd.items = users.items.filter(
      item =>
        !chatUsersObj[item.id] &&
        item.name.toLowerCase().indexOf(filterString) !== -1
    );

    return (
      <UsersListWithSelect
        users={usersItemsForAdd}
        selectedUsers={selectedUsers}
        onClickUser={this.onClickHandler}
        addUserstoChat={addUserstoChat}
        onChangeFilter={this.onChangeFilterHandler}
      />
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersListWithSelectContainer);
