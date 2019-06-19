import React, { Component } from 'react';
require("./Test.css");

export default class Test extends Component {
  render() {
    return (
      <div>
        <div className="modal-user-list" role="dialog" aria-labelledby="Modal_Title" aria-describedby="Modal_Description" aria-hidden="true" style={{ display: 'none'}} >
          <div className="modal-content">
            <h2 id="Modal_Title">Delete Confirmation</h2>
            <p id="Modal_Description" className="visually-hidden">Some visually hidden text describing how to use the modal.</p>
            <input type="text" value="first focusable element" />
            <button className="close-modal">Close Modal</button>
          </div>
        </div>
      </div>
    );
  }
}
