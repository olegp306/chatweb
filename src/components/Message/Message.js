import React, { Component } from "react";
import Images from "../../theme/images";

//import AvatarHelper from "../../utils/avatarHelper";
import LetterAvatar from "../../utils/avatarHelper2";

export default class Message extends Component {
  getUserPhoto = username => {
    // let avatar = new AvatarHelper();
    // return avatar.getUserPhoto(username);
    return LetterAvatar(username,60)

  };

  render() {
    const { author, message, isMyMessage, isNewMessage } = this.props;
    const messageDateTime = new Date(message.creationDate).toLocaleTimeString();

    const fileUrl =
      message.fileUrl != null ? message.fileUrl : Images.noPicture;
    const smallFilePreviewUrl =
      message.smallFilePreviewUrl != null
        ? message.smallFilePreviewUrl
        : message.fileUrl != null
        ? message.fileUrl
        : Images.noPicture;

    const authorImgUrl =
      author && author.avatarUrl
        ? author.avatarUrl
        : ((author && author.name) ? this.getUserPhoto(author.name):this.getUserPhoto('неизвестный'));

    const extension = fileUrl.substring(fileUrl.lastIndexOf("."));
    return (
      <div className={isNewMessage == true ? "message new-message" : "message"}>
        <div
          className={
            isMyMessage == true ? "chat-img pull-right" : "chat-img pull-left"
          }
        >
          <img src={authorImgUrl} alt="User Avatar" className="img-circle avatar-in-message" />
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
            <a class="fancybox" data-fancybox rel="group" href={fileUrl}>
              <div
                className={
                  isMyMessage == true
                    ? "right-side-message"
                    : "left-side-message"
                }
              >
                <img className="message-picture" src={smallFilePreviewUrl} />
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
