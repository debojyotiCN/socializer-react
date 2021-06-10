import React, { Component, useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


let intervalRef = null;
let timer = 0;

const QuestionLoader = (props) => {
  const [remainingSeconds, setRemainingSeconds] = useState(-1);
  const { activate, seconds } = props;
  useEffect(() => {
    if (activate) {
      _startTimer();
    } else {
      clearInterval(intervalRef);
      intervalRef=null;
    }
  }, [activate]);

  const _startTimer = () => {
    timer = seconds;
    setRemainingSeconds(seconds);
  }

  useEffect(() => {
    if (remainingSeconds === seconds && !intervalRef) {
      console.log('remainingSeconds :>> ', remainingSeconds);
      console.log('seconds :>> ', seconds);
      intervalRef = setInterval(() => { 
        timer--;
        setRemainingSeconds(timer);
      }, 1000)
    }
  }, [remainingSeconds])

  const percentage = (remainingSeconds*100)/seconds;
  if (activate) {
    return (
      <>
        <div className="nextQuestionAlert">
          <div className="progressbar">
            <CircularProgressbar value={percentage} strokeWidth={30} />
          </div>
          <div className="label">Next question in {remainingSeconds} s</div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
  
};

export default QuestionLoader;
