import React, { Component } from 'react';
import  api from  '../../../api';
import UserSmall from "../../User/UserSmall";

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state={
      chatUsers:this.props.chatUsers,
      currentUserId:this.props.currentChatId,
    };
  }

  //при инициализации 1 раз
  componentDidMount() {
     //this.setState({chats:this.props.chats, currentChatId:this.props.currentChatId});
   }

  componentWillReceiveProps(nextProps) {
      this.setState({
      chatUsers:nextProps.chatUsers,
      currentUserId:nextProps.currentUserId}
      );
  }

  render() {
    if(!this.state.chatUsers){
      return <p>Users List  is Loading....</p>
    }
    else {

      let users=this.state.chatUsers;
      var usersListView= new Array;

      for (let prop in users){
        let user=users[prop];
        usersListView.push (<li  key={user.id} className="xs-user-li"><UserSmall key={user.id}  user={user} /></li>);
      }
    }

    return (
      <div className="panel panel-primary chats-panel">
        <div className="panel-heading chats-panel-heading">
          <h3 className="panel-title">Участники чата</h3>
        </div>
        <div className="panel-body chat-list">
          <div className="sidebar">
            <ul className="nav nav-sidebar chat-list">
              {usersListView}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


