import React, { Component } from "react";
import "./room-connector-page.scss";
import CreateRoom from "../../components/create-room/create-room";
import JoinRoom from "../../components/join-room/join-room";
import { connect } from "react-redux";
import { updateUserData } from "../../redux/actions/user-data";

class RoomConnectorPage extends Component {
  state = {
    activeMode: "joinRoom",
  };

  _setActiveMode = (mode) => {
    this.setState({ activeMode: mode });
  };

  _loadGamePage = () => {
    this.props.history.push("/room")
  }

  _renderActiveMode = () => {
    const { activeMode } = this.state;
    switch (activeMode) {
      case "joinRoom": {
        return <JoinRoom loadGamePage={this._loadGamePage} />;
      }
      case "createRoom": {
        return <CreateRoom loadGamePage={this._loadGamePage} />;
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

const mapStateToProps = state => {
  return {
    userData: state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserData: userData => dispatch(updateUserData(userData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomConnectorPage);
