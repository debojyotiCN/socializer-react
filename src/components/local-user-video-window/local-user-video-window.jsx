import React, { Component } from "react";
import "./local-user-video-window.scss";
import TwilioVideoAudioView from "../twilio-video-audio-view/twilio-video-audio-view";

class LocalUserVideoWindow extends Component {
  state = {
    tracks: []
  };

  constructor(props) {
    super(props);
  
    const existingPublications = Array.from(this.props.participant.tracks.values());
    const existingTracks = existingPublications.map(publication => publication.track);
    const nonNullTracks = existingTracks.filter(track => track !== null)
  
    this.state = {
      tracks: nonNullTracks
    }
  }
  
  render() {
    const { tracks } = this.state;
    
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
                  <i className="fas fa-microphone"></i> &nbsp;{" "}
                  <i className="fas fa-video"></i> &nbsp;{" "}
                  {this.props.participant.identity}
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
