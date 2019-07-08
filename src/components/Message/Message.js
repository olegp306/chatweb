import React, { Component } from "react";
import Images from "../../theme/images";

//import AvatarHelper from "../../utils/avatarHelper";
import LetterAvatar from "../../utils/avatarHelper2";

export default class Message extends Component {
  getFilename = url => {
    return url.substring(url.lastIndexOf("/") + 1);
  };

  getExtension = filename => {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  };

  isFileCanBePreview = filename => {
    var ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case "pdf":
        return true;
    }
    return false;
  };
  getUserPhoto = username => {
    // let avatar = new AvatarHelper();
    // return avatar.getUserPhoto(username);
    return LetterAvatar(username, 60);
  };

  addDefaultSrc(ev, name) {
    ev.target.src = LetterAvatar(name, 60);
  }

  messageImageType = (message, fileUrl, smallFilePreviewUrl, isMyMessage) => {
    return (
      <a className="fancybox" data-fancybox rel="group" href={fileUrl}>
        <div
          className={
            isMyMessage == true ? "right-side-message" : "left-side-message"
          }
        >
          <img className="message-picture" src={smallFilePreviewUrl} />
        </div>
      </a>
    );
  };

  messageFileType = (message, fileUrl, smallFilePreviewUrl, isMyMessage) => {
    if (this.isFileCanBePreview(this.getFilename(fileUrl))) {
      return (
        <a className="fancybox" data-fancybox rel="group" href={fileUrl}>
          <div
            className={
              isMyMessage == true
                ? "my-message-text-block"
                : "message-text-block"
            }
          >
            {message.text}
            (скачать/посмотреть)
          </div>
        </a>
      );
    } else {
      return (
        <a rel="group" href={fileUrl}>
          <div
            className={
              isMyMessage == true
                ? "my-message-text-block"
                : "message-text-block"
            }
          >
            {message.text}( скачать )
          </div>
        </a>
      );
    }
  };

  messageTextType = (message, isMyMessage) => {
    return (
      <div
        className={
          isMyMessage == true ? "my-message-text-block" : "message-text-block"
        }
      >
        {message.text}
      </div>
    );
  };

  renderMessage = (message, fileUrl, smallFilePreviewUrl, isMyMessage) => {
    switch (message.type == null ? null : message.type.toString()) {
      case "2768842251000": //файл
        return this.messageFileType(
          message,
          fileUrl,
          smallFilePreviewUrl,
          isMyMessage
        );
      case "2768777882000": //текст
        return this.messageTextType(message, isMyMessage);

      case "2768909676000": //картинка
        return this.messageImageType(
          message,
          fileUrl,
          smallFilePreviewUrl,
          isMyMessage
        );
      default:
        return this.messageTextType(message, isMyMessage);
    }
  };

  render() {
    const { author, message, isMyMessage, isNewMessage,showDateTime } = this.props;
    const options = {
      weekday: "long",
      year: "numeric",
      month:"long",
      day:"numeric"}
 
    const messageDateTime = new Date(message.creationDate).toLocaleTimeString('ru-ru',options);

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
        : author && author.name
        ? this.getUserPhoto(author.name)
        : this.getUserPhoto("неизвестный");

    //const extension = fileUrl.substring(fileUrl.lastIndexOf("."));

    return (
      <div className={isNewMessage == true ? "message new-message" : "message"}>
        <div
          className={
            isMyMessage == true ? "chat-img pull-right" : "chat-img pull-left"
          }
        >
          {isMyMessage != true ? (
            <img
              src={authorImgUrl}
              alt="User Avatar"
              className="img-circle avatar-in-message"
              onError={ev => this.addDefaultSrc(ev, author.name)}
            />
          ) : null}
        </div>
        <div className="chat-body clearfix ">
          <div
            className={
              isMyMessage == true ? "my-message-author" : "message-author"
            }
          >
            {(isMyMessage !=true ? (author ? author.name : "неизвестный"): "") + " "}  {showDateTime==true ? messageDateTime : ""}
          </div>
          {this.renderMessage(
            message,
            fileUrl,
            smallFilePreviewUrl,
            isMyMessage,
          )}
        </div>
      </div>
    );
  }
}
