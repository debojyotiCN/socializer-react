import React, { Component } from "react";

class JoinRoom extends Component {
  state = {};
  render() {
    return (
      <div className="tabContent">
        <div className="inputWrapper">
          <div className="label">Room Id</div>
          <input type="text" />
        </div>
        <div className="inputWrapper">
          <div className="label">User Name</div>
          <input type="text" />
        </div>
        <button className="submitBtn">Join</button>
        {/* <div className="progressViewer">Please wait</div> */}
        <p className="errorText">Something wrong happended</p>
      </div>
    );
  }
}

export default JoinRoom;
