import React, { Component } from "react";
import "./remote-user-video-window.scss";
import TwilioVideoAudioView from "../twilio-video-audio-view/twilio-video-audio-view";
import EventEmitter from "../../utils/event-emitter";

class RemoteUserVideoWindow extends Component {
  state = {
    tracks: [],
    userAnswer: {
      isVisible: false,
      value: ""
    }
  };

  componentDidMount() {
    const existingPublications = Array.from(
      this.props.participant.tracks.values()
    );
    const existingTracks = existingPublications.map(
      (publication) => publication.track
    );
    const nonNullTracks = existingTracks.filter((track) => track !== null);
    this.state = {
      tracks: nonNullTracks,
    };
    this.props.participant.on("trackSubscribed", (track) =>
      this.addTrack(track)
    );
    this._initiateSocketEventListners();
  }

  _initiateSocketEventListners = () => {
    EventEmitter.listen("user-answer", payload => {
      const { participant } = this.props;
      if (participant.identity === payload.userName) {
        // Show user answer
        this.setState({ userAnswer: {
          isVisible: true,
          value: payload.selectedAnswer.answerValue
        } });
      }
    });
    EventEmitter.listen("new-question", payload => {
      // hide user answer
      this.setState({ userAnswer: {
        isVisible: false,
        value: ""
      } });
    });
  }

  addTrack = (track) => {
    this.setState({
      tracks: [...this.state.tracks, track],
    });
  };

  render() {
    const { tracks, userAnswer } = this.state;

    return (
      <>
        <div className="video">
          <div className="videoWindow" id={this.props.participant.identity}>
            <div className="videoPlaceholder">
              {tracks.map((track) => (
                <TwilioVideoAudioView
                  key={track}
                  filter={this.state.filter}
                  track={track}
                />
              ))}
              <div className="videoMask"></div>
              <div className="videoOptions">
                <div className="name">
                  {" "}
                  <i className="fas fa-user"></i> &nbsp;{" "}
                  {this.props.participant.identity}
                </div>
              </div>
              {
                userAnswer.isVisible? (<div className="answer">{this.props.participant.identity} answered: <strong>{userAnswer.value}</strong></div>): <></>
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default RemoteUserVideoWindow;
