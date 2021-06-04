import React, { Component } from "react";
import Modal from "react-awesome-modal";
import Loader from "react-loader-spinner";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Modal
          visible={true}
          width="780"
          height="500"
          effect="fadeInUp"
          onClickAway={() => {}}
        >
          <div className="sessionInitiatorModalWrapper">
            {true ? (
              <div className="joiningScreen">
                <div className="leftPart">Starting session</div>
                <div className="rightPart">
                  <Loader type="Rings" color="white" />
                </div>
              </div>
            ) : (
              <>
                <div className="joinerScreen">
                  <div className="callJoinWrapper">
                    <div className="joiningHeader">
                      <img
                        src={require("../assets/images/phone-icon.jpg")}
                        alt=""
                        className="joinerLogo"
                      />
                      <h4>Invite via voice call</h4>
                    </div>
                    <div className="joiningText">
                      <p>
                        Ask the users to make a call to the following number
                      </p>
                      <p className="highlightedText">+1 (111) 12554445</p>
                      <p>And enter the room number once prompted</p>
                      <p className="highlightedText">5454</p>
                    </div>
                  </div>
                  <div className="webJoinWrapper">
                    <div className="joiningHeader">
                      <img
                        // src={require("../assets/images/video-call-icon.jpeg")}
                        src={
                          "https://thiswic.nutrition.tufts.edu/wp-content/uploads/2021/02/pngwing.com_.png"
                        }
                        alt=""
                        className="joinerLogo"
                      />
                      <h4>Invite via video call</h4>
                    </div>
                    <div className="joiningText">
                      <p>Share the following link to let users join</p>
                      <p className="highlightedText">+1 (111) 12554445</p>
                      <p>And enter the room number once prompted</p>
                      <p className="highlightedText shareLinkText">
                        http://localhost:3000/video-call?room=1614703304064&authencode=CF9ECB0C-0F5D-4F67-B8B8-4B9EC61F7C39
                      </p>
                    </div>
                  </div>
                </div>
                <div className="sessionHelper">
                  <div className="leftPart">
                    <p className="timeCounter">
                      Session will start in 9 mins 51 seconds
                    </p>
                    <p className="patientsJoined">Patients joined: 1</p>
                  </div>
                  <div className="rightPart">
                    <button className="sessionStartBtn">
                      Start
                      <br />
                      Session
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default HomePage;
