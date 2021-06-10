import React, { Component } from "react";

const QuestionProgressTracker = (props) => {
  const { totalQuestionCount, activeQuestionNumber } = props;

  // Determine progress percentage
  const progressPercentage =
    ((activeQuestionNumber - 1) * 100) / (totalQuestionCount - 1);
  return (
    <>
      <div className="questionMeta">
        <h4>
          Questions: {activeQuestionNumber} of {totalQuestionCount}
        </h4>
        <div className="progress-container">
          <div
            className="progress"
            id="progress"
            style={{ width: `${progressPercentage}%` }}
          />
          {Array.from(Array(totalQuestionCount).keys()).map(
            (question, questionIndex) => {
              let isActive = questionIndex + 1 <= activeQuestionNumber;
              let circleClass = `circle ${isActive && "active"}`;
              return (
                <div className={circleClass} key={questionIndex}>
                  {questionIndex + 1}
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionProgressTracker;
