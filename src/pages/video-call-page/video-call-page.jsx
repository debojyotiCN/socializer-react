import React, { Component } from "react";
import "./video-call-page.scss";

class VideoCallPage extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="gameWRapper">
          <div className="videoWindowWrapper">
            <div className="videoWrapper">
              <div className="video">
                <div className="videoWindow">
                  <div className="videoPlaceholder">
                    <img
                      src="https://itcsystems.com/wp-content/uploads/video_kall_image.jpg"
                      alt=""
                    />
                    <div className="videoMask"></div>
                    <div className="videoOptions">
                      <div className="name">
                        {" "}
                        <i className="fas fa-microphone"></i> &nbsp;{" "}
                        <i className="fas fa-video"></i> &nbsp; John Doe
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="video">
                <div className="videoWindow">
                  <div className="videoPlaceholder">
                    <img
                      src="https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.bizneworleans.com/content/uploads/2020/09/GettyImages-1186603893.jpg"
                      alt=""
                    />
                    <div className="videoMask"></div>
                    <div className="videoOptions">
                      <div className="name">
                        {" "}
                        <i className="fas fa-microphone"></i> &nbsp;{" "}
                        <i className="fas fa-video"></i> &nbsp; Anny Doe
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="video">
                <div className="videoWindow">
                  <div className="videoPlaceholder">
                    <img
                      src="https://imengine.prod.srp.navigacloud.com/?uuid=C11DB0F8-DD28-4C6E-9DAD-88A2FFF42818&type=primary&q=72&width=1024"
                      alt=""
                    />
                    <div className="videoMask"></div>
                    <div className="videoOptions">
                      <div className="name">
                        {" "}
                        <i className="fas fa-microphone"></i> &nbsp;{" "}
                        <i className="fas fa-video"></i> &nbsp; Jenny Doe
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="video">
                <div className="videoWindow">
                  <div className="videoPlaceholder">
                    <img
                      src="https://ak.picdn.net/shutterstock/videos/16923391/thumb/3.jpg"
                      alt=""
                    />
                    <div className="videoMask"></div>
                    <div className="videoOptions">
                      <div className="name">
                        {" "}
                        <i className="fas fa-microphone"></i> &nbsp;{" "}
                        <i className="fas fa-video"></i> &nbsp; Jonathan Doe
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="questionSectionWrapper">
            <div className="questionWrapper">
              <h3>Some sample question will go?</h3>
              <div className="answers">
                <div className="answer">Option 1</div>
                <div className="answer">Option 2</div>
                <div className="answer">Option 3</div>
                <div className="answer">Option 4</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default VideoCallPage;
