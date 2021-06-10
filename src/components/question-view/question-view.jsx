import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { showToast } from "../../helper-methods";
import SocketHelper from "../../socket-helper";
import EventEmitter from "../../utils/event-emitter";
import QuestionProgressTracker from "../question-progress-tracker/question-progress-tracker";
import "./question-view.scss";
import QuestionLoader from "../question-loader/question-loader";

class QuestionView extends Component {
  state = {
    question: null,
    isSessionStarted: false,
    isSessionComplete: false,
    selectedAnswerId: null,
    totalQuestionCount: 0,
    activeQuestionNumber: 0,
    activateNextQuestionLoader: false,
    loaderDelay: 0,
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
      const { activeQuestionNumber } = this.state;

      this.setState({
        question: question,
        isSessionStarted: true,
        isSessionComplete: false,
        selectedAnswerId: null,
        activeQuestionNumber: activeQuestionNumber + 1,
        activateNextQuestionLoader: false,
      });
    });
    EventEmitter.listen("session-complete", (payload) => {
      this.setState({
        question: null,
        isSessionStarted: true,
        isSessionComplete: true,
      });
    });
    EventEmitter.listen("questions-assigned", (questions) => {
      this.setState({
        totalQuestionCount: questions.length,
        activeQuestionNumber: 0,
        activateNextQuestionLoader: false,
      });
    });
    EventEmitter.listen("next-question-arriving", (payload) => {
      this.setState({
        activateNextQuestionLoader: true,
        loaderDelay: payload.delaySeconds,
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
      totalQuestionCount,
      activeQuestionNumber,
      activateNextQuestionLoader,
      loaderDelay,
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
                        <QuestionProgressTracker
                          totalQuestionCount={totalQuestionCount}
                          activeQuestionNumber={activeQuestionNumber}
                        />
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
                        <QuestionLoader
                          activate={activateNextQuestionLoader}
                          seconds={loaderDelay}
                        />
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
