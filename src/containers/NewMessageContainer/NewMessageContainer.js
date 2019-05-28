import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentChat, getNewMessages } from "../../redux/selectors";
import {
  changeNewMessage,
  cleanNewMessage
} from "../../redux/actions/newMessages";

class NewMessageContainer extends Component {
  
  onChangeNewMessage = event => {
    const { currentChat ,changeNewMessage} = this.props;
    const message = event.target.value;
    changeNewMessage(currentChat.id, message);
  };
  
  render() {
    const { currentChat, newMessages, changeNewMessage } = this.props;
    if(!currentChat)
      return(
        <div>загрузка начальных данных</div>
      )
    
    const messageText = (currentChat!=null  &&  newMessages.items[currentChat.id]) ? newMessages.items[currentChat.id].message : "";

    return (
      <div className="navbar-fixed-bottom row-fluid">
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
            {/*<span className="input-group-addon btn btn-warning btn-send-messsage " onClick={this.handMessageAdd}>Отправить </span>*/}
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
    currentChat: getCurrentChat(store),
    newMessages: getNewMessages(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeNewMessage: (chatId, message) =>
      dispatch(changeNewMessage(chatId, message)),
    cleanNewMessage: chatId => dispatch(cleanNewMessage(chatId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageContainer);
