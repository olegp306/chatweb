import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import ChatApp from "./containers/ChatApp/ChatApp.js";

//const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <ChatApp chatparams={this.props.chatparams} />
      </ReduxProvider>
    );
  }
}

export default App;
