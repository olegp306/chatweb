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
import ImageTools from "../../utils/ImageTools";

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

  resizeImgFile = file => {
    ImageTools.resize(
      file,
      {
        width: 320, // maximum width
        height: 240 // maximum height
      },
      (blob, didItResize) => {
        // didItResize will be true if it managed to resize it, otherwise false (and will return the original file as 'blob')
        //document.getElementById('preview').src = window.URL.createObjectURL(blob);
        // you can also now upload this blob using an XHR.

        console.log(`Resize with dataUrl=${window.URL.createObjectURL(blob)}`);
        console.log(`file dataUrl=${window.URL.createObjectURL(file)}`);
      }
    );
  };

  onChangeInputFile = event => {
    const filesAr = event.target.files;

    for (let index = 0; index < filesAr.length; index++) {
      const file = filesAr[index];
      this.resizeImgFile(file);
    }

    console.log(`Выбраны файлы${event.target.files}`);
  };

  onClickChooseFile = () => {
    console.log(`onClickChooseFile`);
    this.refs.fileUploader.click();
  };

  onKeyPressHandler = event => {
    //отправляем как скайпе по Enter + CTRL
    if (event.charCode == 13 && event.ctrlKey == true) {
      const { addTextMessage } = this.props;

      addTextMessage();
      event.preventDefault();
    }
  };

  onChangeNewMessage = event => {
    const { currentChat, changeNewMessage } = this.props;
    const messageText = event.target.value;    
    changeNewMessage({ type: 2768777882000, messageText: messageText , chatId:currentChat.id});
  };

  render() {
    const { currentChat, newMessages, addTextMessage } = this.props;
    if (!currentChat) return <div>загрузка начальных данных</div>;

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
                  accept="image/*"
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
            ) : (
              <img
                className="add-file-icon"
                src={Images.sendMessage}
                alt="отправить сообщение"
                onClick={addTextMessage}
              />
            )}

            <textarea
              placeholder="Введите сообщение здесь.... (отправить Ctrl + Enter) "
              rows={4}
              className="form-control custom-control resize-none"
              rows="4"
              value={messageText}
              onKeyPress={this.onKeyPressHandler}
              onChange={this.onChangeNewMessage}
            />
            {/* <span
              className="input-group-addon btn btn-warning btn-send-messsage "
              onClick={addTextMessage}
            >
              Отправить{" "}
            </span> */}
            {/*  </div>
            </div>*/}
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
    addTextMessage: () => dispatch(addMessageAction()),
    //postFileMessage: message => dispatch(postFileMessage(message))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageContainer);
