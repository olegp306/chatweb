import React, { Component } from "react";
import Images from "../../theme/images"

import AvatarHelper from "../../utils/avatarHelper";

export default class Message extends Component {
  getUserPhoto = username => {
    let avatar = new AvatarHelper();
    return avatar.getUserPhoto(username);
  };

  render() {
    const { author, message, isMyMessage, isNewMessage } = this.props;
    const messageDateTime = new Date(message.creationDate).toLocaleTimeString();
    return (
      <div className={isNewMessage == true ? "message new-message" : "message"}>
        <div
          className={
            isMyMessage == true ? "chat-img pull-right" : "chat-img pull-left"
          }
        >
          <img
            src={
              author ? this.getUserPhoto(author.name) : this.getUserPhoto("???")
            }
            alt="User Avatar"
            className="img-circle"
          />
        </div>
        <div className="chat-body clearfix ">
          <div
            className={
              isMyMessage == true ? "my-message-author" : "message-author"
            }
          >
            {author ? author.name : "неизвестный"} {messageDateTime}
          </div>

          {message.type == 2768654243000 ? ( //картинка
          <a class="fancybox" data-fancybox rel="group" href={message.fileUrl!=null ? message.fileUrl : Images.noPicture }>
            <div
              className={
                isMyMessage == true ? "right-side-message" : "left-side-message"
              }
            >
              
              <img
                className="message-picture"
                //{url ? { uri: url } : Images.noPicture}
                src={message.fileUrl!=null ? message.fileUrl : Images.noPicture }
                alt="нажмите для увеличения"
              />
            </div>
            </a>
          ) : (
            //  <Image source={{ uri: url }} style={{ width: 100, height: 100 }} />
            <div
              className={
                isMyMessage == true
                  ? "my-message-text-block"
                  : "message-text-block"
              }
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    );
  }
}
