import React from 'react';

let style = {
  backgroundColor: '#2E80AA',
  color: '#FFFFFF',
  width: 100,
  height: 30,
  border: 'none',
  margin: 40,
  fontWeight: 'bold'
}

function Button(props) {
  return <button onClick={props.onSkipped} style={style}>Skip</button>
}
Button.propTypes = {
  onSkipped: React.PropTypes.func.isRequired
};
export default Button;