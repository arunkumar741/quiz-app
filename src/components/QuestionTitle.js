import React from 'react';

function QuestionTitle(props) {

  return (
    <h3 className="questionCount">{props.title}</h3>
  );

}

QuestionTitle.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default QuestionTitle;

