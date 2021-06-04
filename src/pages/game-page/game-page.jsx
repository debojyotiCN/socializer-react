import React, { Component } from "react";
import "./game-page.scss";
import VideoCallView from "../../components/video-call-view/video-call-view";
import QuestionView from "../../components/question-view/question-view";

class GamePage extends Component {
  state = {};
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

export default GamePage;
