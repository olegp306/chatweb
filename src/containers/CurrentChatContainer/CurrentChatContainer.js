import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCurrentChat,
  getChatUsers,
  getContractorId
} from "../../redux/selectors";
import UsersListWithSelectContainer from "../UsersListWithSelectContainer/UsersListWithSelectContainer";
import UsersListContainer from "../UsersListContainer/UsersListContainer";
import CloseChatButtonContainer from "../CloseChatButtonContainer/CloseChatButtonContainer";

class CurrentChatContainer extends Component {
  openRequestFomRnChat = () => {
    const { currentChat } = this.props;

    if (window.Altsoft) {
      window.Altsoft.Desktop.CreateWindow({
        Url:
          "5564/frmUpdRequest5564.aspx?ClassName=tblZajavki_Germes39098805000&OId=" +
          currentChat.requestGermesId +
          "&FormLogic=UpdaterEdit&UpdSettingOId=1279172381000",
        Parent: this
      });
    } else {
      console.log(currentChat.requestGermesId);
    }
  };

  render() {
    const { currentChat, chatUsers } = this.props;

    if (currentChat == null) {
      return <div>Загрузка иформации о чате</div>;
    }
    return (
      <div>
        <div
          className={
            currentChat.isClose
              ? "title-chat-name current-chat-closed"
              : "title-chat-name"
          }
        >
          <button className="btn title-btn" type="button">
            <h3
              className="panel-title title-chat-name-text"
              onClick={this.openRequestFomRnChat}
            >
              {currentChat.description}{" "}
            </h3>
          </button>
        </div>
        {currentChat.isClose ? (
          <div className="btn-group pull-right">
            <span className="close-text-in-sm-chat">{"закрыто"}</span>
          </div>
        ) : (
          <div className="btn-group pull-right">
            <button
              type="button"
              className="btn btn-default btn-sm dropdown-toggle"
              data-toggle="dropdown"
            >
              <span
                className="glyphicon glyphicon-plus title-user-list-button"
                title="Добавить новых участников в чат"
              >
                Добавить
              </span>
            </button>
            <div className="dropdown-menu slidedown user-dropdown-menu">
              <UsersListWithSelectContainer />
            </div>
          </div>
        )}

        <CloseChatButtonContainer />

        <div className="btn-group  pull-left">
          <button
            type="button"
            className="btn btn-default btn-sm dropdown-toggle"
            data-toggle="dropdown"
          >
            <span className="glyphicon glyphicon-user title-user-list-button">
              {" "}
              {chatUsers.items.length} участников
            </span>
          </button>
          <div className="dropdown-menu slidedown user-dropdown-menu">
            <UsersListContainer />
          </div>
        </div>
      </div>
      // </div>
    );
  }
}
const mapStateToProps = store => {
  return {
    currentChat: getCurrentChat(store),
    chatUsers: getChatUsers(store),
    contractorId: getContractorId(store)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // login: (user, password) => dispatch(login(user, password)),
    // loginByUserId: userId => dispatch(loginByUserId(userId)),
    // fetchChats: userId => dispatch(fetchChats(userId)),
    // fetchChatAppData: userId => dispatch(fetchChatAppData(userId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentChatContainer);
