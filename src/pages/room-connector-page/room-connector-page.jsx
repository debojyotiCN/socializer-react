import React, { Component } from "react";
import "./room-connector-page.scss";
import CreateRoom from "../../components/create-room/create-room";
import JoinRoom from "../../components/join-room/join-room";

class RoomConnectorPage extends Component {
  state = {
    activeMode: "joinRoom",
  };

  _setActiveMode = (mode) => {
    this.setState({ activeMode: mode });
  };

  _renderActiveMode = () => {
    const { activeMode } = this.state;
    switch (activeMode) {
      case "joinRoom": {
        return <JoinRoom />;
      }
      case "createRoom": {
        return <CreateRoom />;
      }
    }
  };

  render() {
    const { activeMode } = this.state;
    return (
      <>
        <div className="roomConnectorPageWrapper">
          <div className="gradientLayer"></div>
          <div className="roomConnetor">
            <h3>Socializer</h3>
            <div className="tabButtons">
              <button
                className={`tabBtn ${activeMode === "joinRoom" && "active"}`}
                onClick={(e) => this._setActiveMode("joinRoom")}
              >
                Join a room
              </button>
              <button
                className={`tabBtn ${activeMode === "createRoom" && "active"}`}
                onClick={(e) => this._setActiveMode("createRoom")}
              >
                Create a room
              </button>
            </div>
            {this._renderActiveMode()}
          </div>
        </div>
      </>
    );
  }
}

export default RoomConnectorPage;
