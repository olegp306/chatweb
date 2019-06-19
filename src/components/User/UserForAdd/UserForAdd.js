import React, { Component } from "react";
import UserSmall from "../UserSmall/UserSmall";
import Images from "../../../theme/images";

class UserForAdd extends Component {
  componentWillReceiveProps(nextProps) {
    // this.setState({user:nextProps.user, isCurrentUser:nextProps.isCurrentUser })
  }

  checkUser = userId => {
    console.log("checed user with id" + userId);
  };

  render() {
    const { user ,onClick, isSelected} = this.props;
    if (!user) {
      return <div>User are downloading</div>;
    } else {
      return (
        <li
          className={user.isCurrentUser == true ? "active" : ""}
          key={user.id}
          onClick={onClick}
        >
          
          <div style={{float:"left"}}>
            <UserSmall user={this.props.user} />
          </div>
          <div style={{float:"right"}}>
          <img
            className="checker-img-users-list"
            //{url ? { uri: url } : Images.noPicture}
            src={isSelected ? Images.checked : Images.upChecked}
            alt="нажмите для увеличения"
          />
          </div>
          {/* </div> */}
        </li>
      );
    }
  }
}

export default UserForAdd;
