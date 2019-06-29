import React, { Component } from "react";

//import AvatarHelper from "../../../utils/avatarHelper";
import createAvatarHelper from "../../../utils/avatarHelper2";

class UserSmall extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getUserPhoto(username) {
    // let avatar = new AvatarHelper();
    // return avatar.getUserPhoto(username, 30);
    return createAvatarHelper(username,30)
  }

  render() {
    const { user } = this.props;
    const authorImgUrl =
    user && user.avatarUrl
        ? user.avatarUrl
        : user && user.name
        ? this.getUserPhoto(user.name)
        : this.getUserPhoto("неизвестный");
    if (!user) {
      return <div>User is downloading</div>;
    } else {
      return (
        <div className="small-user">
          <span className="chat-img chat-img pull-left">
            <img
              src={authorImgUrl}
              alt="User Avatar"
              className="img-circle avatar-in-users-list"
            />
          </span>
          <a className="user-name-to-add" id={this.props.user.id} href="#">
            {this.props.user.name.substr(0, 29)}{" "}
          </a>
        </div>
      );
    }
  }
}

export default UserSmall;
