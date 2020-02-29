import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as CounterActionCreators from '../../modules/counter/actionCreators';
import * as LoggerActionCreators from '../../modules/logger/actionCreators';

const Counter = ({inc, dec, value, logActivity}) => {
  const counterRef = useRef(null);

  useEffect(() => {
    logActivity('Mount Counter Component', {value: ''});
  }, [logActivity]);

  useEffect(() => {
    counterRef.current = value;
    logActivity('INCREMENT_COUNTER', {value: counterRef.current});
  }, [logActivity, value]);

  const incrementCounter = () => {
    inc();
  };

  return (
    <div>
      <p>{value}</p>
      <button name='inc' onClick={incrementCounter}>
        Increment +{' '}
      </button>
      <button name='dec' onClick={dec}>
        Decrement -{' '}
      </button>
    </div>
  );
};

export default connect(
  ({counter}) => ({value: counter}),
  dispatch =>
    bindActionCreators(
      {...CounterActionCreators, ...LoggerActionCreators},
      dispatch
    )
)(Counter);
