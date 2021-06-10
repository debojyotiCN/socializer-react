import { io } from "socket.io-client";
import EventEmitter from "../utils/event-emitter";

class SocketHelper {
  static socketRef = null;
  static roomId = null;
  static userName = null;
  
  static connect(roomId, userName) {
    // SocketHelper.socketRef = io("http://localhost:5555");
    SocketHelper.socketRef = io("https://socializer.letsconnect.solutions");
    SocketHelper.socketRef.emit("join", {roomId: roomId, userName: userName});
    SocketHelper.roomId = roomId;
    SocketHelper.userName = userName;
    SocketHelper.socketRef.on("new-question", question => {
      EventEmitter.trigger("new-question", question);
    });
    SocketHelper.socketRef.on("user-answer", answer => {
      EventEmitter.trigger("user-answer", answer);
    });
    SocketHelper.socketRef.on("session-started", payload => {
      EventEmitter.trigger("session-started", {});
    });
    SocketHelper.socketRef.on("session-complete", payload => {
      EventEmitter.trigger("session-complete", {});
    });
  }

  static postAnswer(answerPayload) {
    SocketHelper.socketRef.emit("post-answer", {
      userName: SocketHelper.userName,
      roomId: SocketHelper.roomId,
      ...answerPayload
    });
  }

}
 
export default SocketHelper;