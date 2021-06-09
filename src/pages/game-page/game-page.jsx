import React, { Component } from "react";
import "./game-page.scss";
import VideoCallView from "../../components/video-call-view/video-call-view";
import QuestionView from "../../components/question-view/question-view";
import { connect } from "react-redux";
import { updateUserData } from "../../redux/actions/user-data";
import EventEmitter from "../../utils/event-emitter";
import SocketHelper from "../../socket-helper";

class GamePage extends Component {
  state = {};

  componentDidMount() {
    if (!SocketHelper.roomId) {
      this.props.history.replace("/");
    }
  }

  render() {
    return (
      <>
        <div className="gameWRapper">
          <VideoCallView />
          <QuestionView /> 
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
)(GamePage);
