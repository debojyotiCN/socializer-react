import React, { Component } from "react";
import "./local-user-video-window.scss";
import TwilioVideoAudioView from "../twilio-video-audio-view/twilio-video-audio-view";

class LocalUserVideoWindow extends Component {
  state = {
    tracks: [],
    isAudioEnabled: false
  };

  constructor(props) {
    super(props);
  
    const existingPublications = Array.from(this.props.participant.tracks.values());
    const existingTracks = existingPublications.map(publication => publication.track);
    const nonNullTracks = existingTracks.filter(track => track !== null)
    console.log('nonNullTracks :>> ', nonNullTracks);
    this.state = {
      tracks: nonNullTracks,
      isAudioEnabled: true,
      isVideoEnabled: true,
    }
  }

  toggleAudio = () => {
    const { isAudioEnabled } = this.state;
    this.setState({ isAudioEnabled: !isAudioEnabled }, () => {
      const { tracks, } = this.state;
      const audioTrack = tracks.find(t => t.kind === "audio");
      if (!isAudioEnabled) {
        audioTrack.enable();
      } else {
        audioTrack.disable();
      }
    });
  };

  toggleVideo = () => {
    const { isVideoEnabled } = this.state;
    this.setState({ isVideoEnabled: !isVideoEnabled }, () => {
      const { tracks, } = this.state;
      const videoTrack = tracks.find(t => t.kind === "video");
      if (!isVideoEnabled) {
        videoTrack.enable();
      } else {
        videoTrack.disable();
      }
    });
  };
  
  render() {
    const { tracks, isAudioEnabled, isVideoEnabled } = this.state;
    
    return (
      <>
        <div className="video localUserVideoWindow">
          <div className="videoWindow localUserVideoWindow" id={this.props.participant.identity}>
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
                  <button className={isAudioEnabled? "toggleButton active": "toggleButton"} onClick={this.toggleAudio}>
                  <i className="fas fa-microphone"></i> &nbsp;{" "}
                  </button>
                  <button className={isVideoEnabled? "toggleButton active": "toggleButton"} onClick={this.toggleVideo}>
                  <i className="fas fa-video"></i> &nbsp;{" "}
                  </button>
                  {this.props.participant.identity} (You)
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LocalUserVideoWindow;
