import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCurrentUserId,
  getCurrentChat,
  getNewMessages
} from "../../redux/selectors";
import {
  changeNewMessage,
  cleanNewMessage
} from "../../redux/actions/newMessages";
import { add as addMessageAction } from "../../redux/entities/message/actions";

import Images from "../../theme/images";

class NewMessageContainer extends Component {
  sendImageMessage = (file, blob) => {
    const { currentChat, currentUserId } = this.props;
    const currentChatId = currentChat.id ? currentChat.id : "";

    let fileMessage = {
      type: 2768909676000, //картинка
      file: file,
      blob: blob,
      fileUrl: file.uri,
      text: "добавлено изображение",
      userId: currentUserId,
      chatId: currentChatId,
      tempFrontId: file.uri + new Date(),
      creationDate: new Date()
    };

    this.props.postFileMessage(fileMessage);

    //добавить сообщение в список с крутилкой
    //как сообщение дойдет до сервера убрать крутилку
  };

  onChangeInputFile = event => {
    const filesAr = event.target.files;
    let filesNames = "";

    for (let index = 0; index < filesAr.length; index++) {
      const file = filesAr[index];
      filesNames =
        filesNames + file.name + (index != filesAr.length - 1 ? ", " : " .");
    }

    const { currentChat, changeNewMessage } = this.props;
    changeNewMessage({
      type: 2768909676000,
      messageText: "Файлы:" + filesNames,
      chatId: currentChat.id,
      files: filesAr,
      filesNames: filesNames
    });

    console.log(`Выбраны файлы${event.target.files}`);
  };

  onClickChooseFile = () => {
    console.log(`onClickChooseFile`);
    this.refs.fileUploader.click();
  };

  onKeyPressHandler = event => {
    //отправляем как скайпе по Enter + CTRL
    // if (event.charCode == 13 && event.ctrlKey == true) {
    if (event.charCode == 13) {
      const { addMessage } = this.props;

      addMessage();
      event.preventDefault();
    }
  };

  onChangeNewMessage = event => {
    const { currentChat, changeNewMessage } = this.props;
    const messageText = event.target.value;

    changeNewMessage({
      type: 2768777882000,
      messageText: messageText,
      chatId: currentChat.id
    });
  };

  render() {
    const { currentChat, newMessages, addMessage } = this.props;
    if (!currentChat) {
      return (
        // {currentChat.isOpen ? "": "current-chat-closed"}
        <div
          className={
            currentChat && currentChat.isOpen
              ? "send-new-message-box row-fluid "
              : "send-new-message-box row-fluid current-chat-closed"
          }
        >
          <div className="navbar-inner">
            <div style={{ position: "relative" }}>
              <img
                className="add-file-icon"
                src={Images.loading64gbgray}
                alt="идет отправка сообщения"
              />
              <textarea
                disabled
                placeholder="Введите сообщение здесь.... (отправить Ctrl + Enter) "
                rows={4}
                className="form-control custom-control resize-none new-message-textarea"
                rows="3"
                onKeyPress={this.onKeyPressHandler}
                onChange={this.onChangeNewMessage}
              />
            </div>
          </div>
        </div>
      );
    }

    const messageText =
      currentChat != null && newMessages.items[currentChat.id]
        ? newMessages.items[currentChat.id].messageText
        : "";

    return (
      <div className="send-new-message-box row-fluid">
        <div className="navbar-inner">
          <div style={{ position: "relative" }}>
            {messageText == "" ? (
              <div>
                <input
                  type="file"
                  ref="fileUploader"
                  id="input-file-for-chat"
                  name="image"
                  // accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={this.onChangeInputFile}
                />
                <img
                  className="add-file-icon"
                  src={Images.addFile}
                  alt="добавить файлы"
                  onClick={this.onClickChooseFile}
                />
              </div>
            ) : newMessages.isAdding == true ? (
              <img
                className="add-file-icon"
                src={Images.loading64gbgray}
                alt="идет отправка сообщения"
              />
            ) : (
              <img
                className="add-file-icon"
                src={Images.sendMessage}
                alt="отправить сообщение"
                onClick={addMessage}
              />
            )}

            <textarea
              placeholder={
                currentChat && currentChat.isOpen
                  ? " Чат закрыт, его может открыть только сотрудники Оллвин"
                  : "Введите сообщение здесь.... (отправить Ctrl + Enter) "
              }
              disabled={currentChat && currentChat.isOpen}
              rows={4}
              className="form-control custom-control resize-none new-message-textarea"
              rows="3"
              value={messageText}
              onKeyPress={this.onKeyPressHandler}
              onChange={this.onChangeNewMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return {
    currentUserId: getCurrentUserId(store),
    currentChat: getCurrentChat(store),
    newMessages: getNewMessages(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeNewMessage: message => dispatch(changeNewMessage(message)),
    cleanNewMessage: chatId => dispatch(cleanNewMessage(chatId)),
    addMessage: () => dispatch(addMessageAction())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageContainer);
