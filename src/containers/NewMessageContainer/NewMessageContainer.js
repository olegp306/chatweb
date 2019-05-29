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
import { add as addTextMessage } from "../../redux/actions/message";

class NewMessageContainer extends Component {
  onChangeNewMessage = event => {
    const {
      currentUserId,
      currentChat,
      changeNewMessage,
      addTextMessage
    } = this.props;

    if (event.keyCode == 13 && event.ctrlKey == true) {
      const messageText = event.target.value;
      const chatId = currentChat.id;
      const userId = currentUserId;
      addTextMessage({ userId, chatId, messageText });
      //отправляем как скайпе по Enter + CTRL
      //console.log('handIsEnterKey ',event.target.value);
    } else {
      const message = event.target.value;
      changeNewMessage(currentChat.id, message);
    }    
  };

  render() {
    const { currentChat, newMessages, changeNewMessage } = this.props;
    if (!currentChat) return <div>загрузка начальных данных</div>;

    const messageText =
      currentChat != null && newMessages.items[currentChat.id]
        ? newMessages.items[currentChat.id].message
        : "";

    return (
      <div className="send-new-message-box row-fluid">
        <div className="navbar-inner">
          <div>
            {/*
          <div className="panel-footer">
            <div className="input-group">
            */}
            <textarea
              placeholder="Введите сообщение здесь..."
              rows={4}
              className="form-control custom-control resize-none"
              rows="3"
              value={messageText}
              onChange={this.onChangeNewMessage}
              //onKeyUp={this.onChangeNewMessage}
            />
            <span className="input-group-addon btn btn-warning btn-send-messsage " onClick={this.handMessageAdd}>Отправить </span>
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
    changeNewMessage: (chatId, message) =>
      dispatch(changeNewMessage(chatId, message)),
    cleanNewMessage: chatId => dispatch(cleanNewMessage(chatId)),
    addTextMessage: message => dispatch(addTextMessage(message))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageContainer);
