import React, { Component } from "react";
import Images from "../../../theme/images";
import { getSession, getUsers } from "../../../redux/selectors/index";
import { connect } from "react-redux";
import createAvatarHelper from "../../../utils/avatarHelper2";
import _ from "lodash";

const mapStateToProps = store => {
  return {
    session: getSession(store),
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

class UserInfoMedium extends Component {
  getUserPhoto(username) {
    return createAvatarHelper(username, 30);
  }
  addDefaultSrc(ev, name) {
    ev.target.src = createAvatarHelper(name, 60);
  }

  render() {
    const { userId, userName, roles, isLogging, logged, avatarUrl } = this.props.session;   

    if (!logged || isLogging )
      return (
        <img
          className="loading-messages-indicator"
          src={Images.loading32}
          alt="идет загрузка"
        />
      );

    return (
      <div className>
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="img-circle avatar-in-message"
          onError={ev => this.addDefaultSrc(ev, userName)}
        />
        <span className="user-info-medium-container-autor-name">
          {userName}
        </span>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoMedium);
