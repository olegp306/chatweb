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
import { add as addTextMessageAction } from "../../redux/actions/message";

class NewMessageContainer extends Component {
  onKeyPressHandler = event => {
    //отправляем как скайпе по Enter + CTRL
    if (event.charCode == 13 && event.ctrlKey == true) {
       const {addTextMessage} = this.props;
       
      addTextMessage();
      event.preventDefault();
    }
  };

  onChangeNewMessage = event => {
    const { currentChat, changeNewMessage } = this.props;
    const message = event.target.value;
    changeNewMessage(currentChat.id, message);
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
            <textarea
              placeholder="Введите сообщение здесь.... (отправить Ctrl + Enter) "
              rows={4}
              className="form-control custom-control resize-none"
              rows="3"
              value={messageText}             
              onKeyPress={this.onKeyPressHandler}
              onChange={this.onChangeNewMessage}
            />
            <span
              className="input-group-addon btn btn-warning btn-send-messsage "
              onClick={this.handMessageAdd}
            >
              Отправить{" "}
            </span>
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
    addTextMessage: ()=> dispatch(addTextMessageAction())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageContainer);
