import React, { Component } from "react";
import "./question-view.scss";
import EventEmitter from "../../utils/event-emitter";
import SocketHelper from "../../socket-helper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { showToast } from "../../helper-methods";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class QuestionView extends Component {
  state = {
    question: null,
    isSessionStarted: false,
    isSessionComplete: false,
    selectedAnswerId: null,
  };

  componentDidMount() {
    this._initiateSocketEventListners();
  }

  _initiateSocketEventListners = () => {
    EventEmitter.listen("session-started", (payload) => {
      this.setState({
        question: null,
        isSessionStarted: true,
        isSessionComplete: false,
        selectedAnswerId: null,
      });
    });
    EventEmitter.listen("new-question", (question) => {
      this.setState({
        question: question,
        isSessionStarted: true,
        isSessionComplete: false,
        selectedAnswerId: null,
      });
    });
    EventEmitter.listen("session-complete", (payload) => {
      this.setState({
        question: null,
        isSessionStarted: true,
        isSessionComplete: true,
      });
    });
  };

  _postAnswer = (answer) => {
    const { question, selectedAnswerId } = this.state;
    if (!selectedAnswerId) {
      console.log("sublit :>> ", selectedAnswerId);
      SocketHelper.postAnswer({
        selectedAnswer: answer,
        question,
      });
      this.setState({
        selectedAnswerId: answer.answerId,
      });
    }
  };

  _determineAnswerClassname = (answer) => {
    const { selectedAnswerId } = this.state;
    if (selectedAnswerId === answer.answerId) {
      return "answer selected";
    } else {
      return "answer";
    }
  };

  _onCopySuccess = (text) => {
    showToast(text, "success");
  };

  render() {
    const {
      question,
      selectedAnswerId,
      isSessionStarted,
      isSessionComplete,
    } = this.state;
    const percentage = 10;

    return (
      <>
        <div className="questionSectionWrapper">
          <div className="questionWrapper">
            {!isSessionStarted ? (
              <>
                <h3>Session will start soon</h3>
                <div className="roomJoinerWrapper">
                  <p>Ask your friends to join to the room</p>
                  <div className="joiningWrapper">
                    <div className="label">Room ID</div>
                    <div className="value">
                      {SocketHelper.roomId}
                      <button className="copy">
                        <CopyToClipboard
                          text={SocketHelper.roomId}
                          onCopy={() => this._onCopySuccess("Room id copied!")}
                        >
                          <i className="fas fa-copy"></i>
                        </CopyToClipboard>
                      </button>
                    </div>
                  </div>
                  <div className="joiningWrapper">
                    <div className="label">Direct joining link</div>
                    <div className="value">
                      {`${window.location.origin}?roomId=${SocketHelper.roomId}`}
                      <button className="copy">
                        <CopyToClipboard
                          text={`${window.location.origin}?roomId=${SocketHelper.roomId}`}
                          onCopy={() =>
                            this._onCopySuccess("Joining link copied!")
                          }
                        >
                          <i className="fas fa-copy"></i>
                        </CopyToClipboard>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {isSessionComplete ? (
                  <h3>Thanks for participating!</h3>
                ) : (
                  <>
                    {question ? (
                      <>
                        <div className="questionMeta">
                          <h4>Questions: 1 of 5</h4>
                          <div className="progress-container">
                            <div className="progress" id="progress" style={{width: "25%"}} />
                            <div className="circle active">1</div>
                            <div className="circle active">2</div>
                            <div className="circle">3</div>
                            <div className="circle">4</div>
                            <div className="circle">5</div>
                          </div>
                         
                        </div>
                        <h3>{question.questionText}</h3>
                        <div className="answers">
                          {question.answers.map((answer, answerIndex) => (
                            <div
                              className={this._determineAnswerClassname(answer)}
                              key={answerIndex}
                              onClick={(e) => this._postAnswer(answer)}
                            >
                              {answer.answerValue}
                            </div>
                          ))}
                        </div>
                        <div className="nextQuestionAlert">
                            <div className="progressbar">
                              <CircularProgressbar
                                value={percentage}
                                strokeWidth={30}
                              />
                            </div>
                              <div className="label">Next question in 10 s</div>
                          </div>
                      </>
                    ) : (
                      <h3>Starting the session</h3>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default QuestionView;
