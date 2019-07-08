import React from "react";
import { connect } from "react-redux";
import { getChats, getCurrentUserId } from "../../redux/selectors";
import { initializeSignalR } from "../../signalr/signalr";
import {
  newMessageRecieved,
  newChatRecieved,
  newMessageStatusRecieved
} from "../../redux/actions/chatApp";

class SignalRContainer extends React.PureComponent {
  componentDidMount() {
    const {
      currentUserId,
      chats,
      newMessageRecieved,
      newChatRecieved,
      newMessageStatusRecieved
    } = this.props;
    console.log('SignalRContainer')
    initializeSignalR(
      currentUserId,
      chats.items,
      newMessageRecieved,
      newChatRecieved,
      newMessageStatusRecieved
    );
  }

  render = () => null;
}
const mapDispatchToProps = dispatch => {
  return {
    newMessageRecieved: data => dispatch(newMessageRecieved(data)),
    newChatRecieved: data => dispatch(newChatRecieved(data)),
    newMessageStatusRecieved: data => dispatch(newMessageStatusRecieved(data))
  };
};
const mapStateToProps = store => {
  return {
    currentUserId: getCurrentUserId(store),
    chats: getChats(store)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignalRContainer);
