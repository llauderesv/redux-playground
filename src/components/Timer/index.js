import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as TimerActionCreators from '../../modules/timer/actionCreators';

const Timer = ({value, start, stop, pause}) => {
  return (
    <div>
      <p>{value}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
};

export default connect(
  ({timer}) => ({
    value: timer,
  }),
  _ => bindActionCreators(TimerActionCreators, _)
)(Timer);
