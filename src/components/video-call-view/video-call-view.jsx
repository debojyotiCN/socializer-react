import React, { Component } from "react";
import "./video-call-view.scss";
import LocalUserVideoWindow from "../local-user-video-window/local-user-video-window";
import RemoteUserVideoWindow from "../remote-user-video-window/remote-user-video-window";
import { connect as TwilioConnect } from "twilio-video";
import { getVideoCallToken } from "../../http-calls";

class VideoCallView extends Component {
  state = {
    identity: "111",
    room: null,
    remoteParticipants: [],
  };

  componentDidMount() {
    this.joinRoom();
  }

  registerEventListners = () => {
    const { room } = this.state;
    
    // Add event listeners for future remote participants coming or going
    room.on("participantConnected", (participant) =>
      this.addParticipant(participant)
    );
    room.on("participantDisconnected", (participant) =>
      this.removeParticipant(participant)
    );

    window.addEventListener("beforeunload", this.leaveRoom);
  };

  joinRoom = async () => {
    const { identity } = this.state;
    
    try {
      const token = await getVideoCallToken(identity, "roomName");
      const room = await TwilioConnect(token, {
        name: "roomName",
        audio: true,
        video: true,
      });
      this.setState(
        {
          room: room,
          remoteParticipants: Array.from(room.participants.values()),
        },
        () => {
          this.registerEventListners();
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  returnToLobby = () => {
    this.setState({ room: null });
  };

  addParticipant = (participant) => {
    console.log(`${participant.identity} has joined the room.`);

    this.setState({
      remoteParticipants: [...this.state.remoteParticipants, participant],
    });
  };

  removeParticipant = (participant) => {
    console.log(`${participant.identity} has left the room`);

    this.setState({
      remoteParticipants: this.state.remoteParticipants.filter(
        (p) => p.identity !== participant.identity
      ),
    });
  };

  leaveRoom = () => {
    const { room } = this.state;
    room.disconnect();
    this.returnToLobby();
  };

  render() {
    const { room, remoteParticipants } = this.state;

    return (
      <>
        <div className="videoWindowWrapper">
          {room ? (
            <div className="videoWrapper">
              <LocalUserVideoWindow
                room={room}
                participant={room.localParticipant}
              />
              {remoteParticipants.map((participant) => (
                <RemoteUserVideoWindow
                  key={participant.identity}
                  participant={participant}
                  room={room}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default VideoCallView;
