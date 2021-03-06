import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Result(props) {

  return (
    <ReactCSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        <h3>Correct : <strong>{props.quizResult}</strong> &nbsp; Incorrect : <strong>{props.quizResult2}</strong></h3>
      </div>
    </ReactCSSTransitionGroup>
  );

}

Result.propTypes = {
  quizResult: React.PropTypes.string.isRequired,
  quizResult2: React.PropTypes.string.isRequired,
};

export default Result;
