import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCurrentChat,
  getContractorId,
  getSession
} from "../../redux/selectors";
import { germesContractorId, chatTypes } from "../../const/const";
import { add as addMessage } from "../../redux/entities/message/actions";
import { changeNewMessage as changeDraftMessage } from "../../redux/actions/newMessages";
import { update as updateChat } from "../../redux/entities/chat/actions";
import { updateCurrentChat } from "../../redux/actions/chatApp";
import { setCurrentChat } from "../../redux/actions/chatApp";

const mapStateToProps = store => {
  return {
    currentChat: getCurrentChat(store),
    contractorId: getContractorId(store),
    session: getSession(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // addMessage: () => dispatch(addMessage()),
    // changeDraftMessage: messageText =>
    //   dispatch(changeDraftMessage(messageText)),
    // updateChat: changedData => dispatch(updateChat(changedData)),
    updateCurrentChat:changedData=>dispatch(updateCurrentChat(changedData)),
    // setCurrentChat: chat => dispatch(setCurrentChat(chat))
  };
};

class CloseChatButtonContainer extends Component {
  toggleIsOpenChatHandler = () => {
    const { changeDraftMessage, updateChat, currentChat,updateCurrentChat, session } = this.props;
    console.log("closeChatHandler");

    // changeDraftMessage({
    //   type: 2768777882000, //текст
    //   messageText: `Замечание ${(currentChat.isOpen
    //     ? "открыто  "
    //     : " закрыто  ") + session.userName}`,
    //   chatId: currentChat.id
    // });

    let changedData = currentChat;
    changedData.isOpen = !currentChat.isOpen;

    updateCurrentChat(changedData);
  };

  render() {
    const { currentChat, contractorId } = this.props;
    return (
      <div>
        {contractorId == germesContractorId &&
        currentChat.chatTypeId == chatTypes["2768909697000"].id ? (
          <div className="btn-group pull-right close-chat-button">
            <button
              type="button"
              className="btn btn-default btn-sm"
              onClick={this.toggleIsOpenChatHandler}
            >
              <span
                className="title-close-chat-button "
                title={
                  !currentChat.isOpen
                    ? " закрыть замечание"
                    : "открыть замечание"
                }
              >
                {!currentChat.isOpen
                  ? " закрыть замечание"
                  : "открыть замечание"}
              </span>
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CloseChatButtonContainer);
