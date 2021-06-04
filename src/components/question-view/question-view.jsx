import React, { Component } from 'react';
import "./question-view.scss";

class QuestionView extends Component {
  state = {  }
  render() { 
    return (  
      <>
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
      </>
    );
  }
}
 
export default QuestionView;