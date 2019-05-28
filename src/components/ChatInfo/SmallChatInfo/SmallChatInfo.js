import React, { Component } from "react";

export default class SmallChat extends Component {
  // constructor(props) {
  //   super(props);

  //     this.state={chatInfo:this.props.chatInfo,
  //       isCurrentChat: this.props.isCurrentChat,
  //       changeCurrentChatFn:this.props.changeCurrentChatFn,
  //       unreadMessagesCount:this.props.unreadMessagesCount
  //      } ;
  // }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    // this.setState({chatInfo:nextProps.chatInfo,
    //   isCurrentChat: nextProps.isCurrentChat,
    //   changeCurrentChatFn:nextProps.changeCurrentChatFn,
    //   unreadMessagesCount:nextProps.unreadMessagesCount });
  }

  handOnChatClick = e => {
    if (e.target.id) {
      this.state.changeCurrentChatFn(e.target.id);
    }
  };

  render() {
    const {
      key,
      chatInfo,
      isCurrentChat,
      unreadMessagesCount,
      onClickChat
    } = this.props;
    if (!chatInfo) {
      return <div>Chats are downloading</div>;
    } else {
      return (
        <li
          className={isCurrentChat == true ? "active" : ""}
          id={chatInfo.id}
        >
          <a
            id={chatInfo.id}
            href="#"
            onClick={()=>onClickChat(chatInfo)}
          >
            {chatInfo.name}
            <span
              className={
                unreadMessagesCount == 0
                  ? "hidden"
                  : "unread-message-count"
              }
            >
              {" "}
              {unreadMessagesCount}
            </span>
          </a>
        </li>
      );
    }
  }
}
