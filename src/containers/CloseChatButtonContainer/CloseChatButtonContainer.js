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
    updateCurrentChat: changedData => dispatch(updateCurrentChat(changedData))
  };
};

class CloseChatButtonContainer extends Component {
  toggleIsOpenChatHandler = () => {
    const { currentChat, updateCurrentChat } = this.props;

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
