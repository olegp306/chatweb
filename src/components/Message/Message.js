import React, { Component } from "react";

import AvatarHelper from "../../utils/avatarHelper";

export default class Message extends Component {
  componentWillReceiveProps(nextProps) {
    //   this.setState({
    //     messageInfo:nextProps.messageInfo,
    //     isMyMessage:nextProps.isMyMessage,
    //     isNewMessage:nextProps.isNewMessage,
    //     userInfo:nextProps.userInfo });
  }

  getUserPhoto(username) {
    let avatar=new AvatarHelper();
    return avatar.getUserPhoto(username);
  }

  render() {
    const { author, message, isMyMessage, isNewMessage } = this.props;
    return (
      <div className={isNewMessage == true ? "message new-message" : "message"}>
        <li
          className={isMyMessage == true ? "right clearfix" : "left clearfix"}
        >
          <span
            className={
              isMyMessage == true ? "chat-img pull-right" : "chat-img pull-left"
            }
          >
            <img
              src={author ?this.getUserPhoto(author.name) :  this.getUserPhoto("???")}
              alt="User Avatar"
              className="img-circle"
            />
          </span>
          <div className="chat-body clearfix">
            <div className="header">
              <strong
                className={
                  isMyMessage == true
                    ? "primary-font pull-right"
                    : "primary-font"
                }
              >
                {author ? author.name : "неизвестный"}
              </strong>
              <small
                className={
                  isMyMessage == true ? "text-muted" : "pull-right text-muted"
                }
              >
                <span className="glyphicon glyphicon-time " />
                {message.creationDate}
              </small>
            </div>
            <p>{message.text}</p>
          </div>
        </li>
      </div>
    );
  }
}
