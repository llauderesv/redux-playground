import {useEffect} from 'react';
import {useDispatch, useStore} from 'react-redux';

const useLogOnMount = action => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch();

    // Unmounted component log actions
    return () => {};
  }, []); // eslint-disable-line
};
