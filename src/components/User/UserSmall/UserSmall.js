import React, { Component } from 'react';
import AvatarHelper from '../../../utils/avatarHelper';

class UserSmall extends Component {
  constructor(props) {
    super(props);

    this.state={};
  }
  getUserPhoto(username){
    let avatar=new AvatarHelper();
    return avatar.getUserPhoto(username,30);
  }


  render() {
    if(!this.props.user){
      return(<div>User is downloading</div>);
    }
    else{
        return (
          <div className="small-user">
            <span className="chat-img chat-img pull-left">
              <img src={this.getUserPhoto(this.props.user.name)} alt="User Avatar" className="img-circle" />
            </span>
            <a  className="user-name-to-add" id={this.props.user.id} href="#">{this.props.user.name.substr(0,29)} </a>
          </div>
        );
    }
  }
}

export default UserSmall;
