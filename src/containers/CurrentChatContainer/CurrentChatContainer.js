import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentChat, getChatUsers } from "../../redux/selectors";
import UsersListWithSelectContainer from "../UsersListWithSelectContainer/UsersListWithSelectContainer";
import UsersListContainer from "../UsersListContainer/UsersListContainer";

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
        <div className="btn-group pull-right">
          <button
            type="button"
            className="btn btn-default btn-xs dropdown-toggle"
            data-toggle="dropdown"
          >
            <span
              className="glyphicon glyphicon-plus"
              title="Добавить новых участников в чат"
            >
              Добавить
            </span>
          </button>
          <div className="dropdown-menu slidedown user-dropdown-menu">
            <UsersListWithSelectContainer />
          </div>
        </div>

        <div className="btn-group pull-center">
          <button className="btn btn-primary" type="submit">
            <h3
              className="panel-title text-center in-one-row"
              onClick={this.openRequestFomRnChat}
            >
              {currentChat.description}{" "}
            </h3>
          </button>
        </div>

        <div className="btn-group pull-left">
          <button
            type="button"
            className="btn btn-default btn-xs dropdown-toggle"
            data-toggle="dropdown"
          >
            <span className="glyphicon glyphicon-user">
              {" "}
              {chatUsers.items.length}
            </span>
          </button>
          <div className="dropdown-menu slidedown user-dropdown-menu">
            <UsersListContainer />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return {
    currentChat: getCurrentChat(store),
    chatUsers: getChatUsers(store)
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
