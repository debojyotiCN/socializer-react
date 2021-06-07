import React, { Component } from "react";

class CreateRoom extends Component {
  state = {};
  render() {
    return (
      <div className="tabContent">
        <div className="inputWrapper">
          <div className="label">UserName</div>
          <input type="text" />
        </div>
        <div className="inputWrapper">
          <div className="label">User Count</div>
          <select name="userCount" id="userCount">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <button className="submitBtn">Create</button>
        {/* <div className="progressViewer">Please wait</div> */}
        <p className="errorText">Something wrong happended</p>
      </div>
    );
  }
}

export default CreateRoom;
