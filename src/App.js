import React, { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./store/configureStore";
import ChatApp from "./containers/ChatApp/"

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        {/* <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">ToDo Redux app</h1>
          </header>
          
        </div> */}
        <ChatApp />
      </ReduxProvider>
    );
  }
}

export default App;