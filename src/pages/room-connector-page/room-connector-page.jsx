import React, { Component } from "react";
import "./room-connector-page.scss";

class RoomConnectorPage extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="roomConnectorPageWrapper">
          <div className="gradientLayer"></div>
          <div className="roomConnetor">
            <h3>Socializer</h3>
            <div className="tabButtons">
              <button className="tabBtn active">Join a room</button>
              <button className="tabBtn">Create a room</button>
            </div>
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
          </div>
        </div>
      </>
    );
  }
}

export default RoomConnectorPage;
