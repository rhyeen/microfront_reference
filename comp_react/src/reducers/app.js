import {
  COMP_REACT_UPDATE_TITLE,
  COMP_REACT_LOCK,
  COMP_REACT_UNLOCK
} from '../actions/app.js';

const INITIAL_STATE = {
  containers: {
    'r1': {
      title: 'test r1'
    }
  },
  locked: false
};

export const compReact = (state = INITIAL_STATE, action) => {
  let newState
  switch (action.type) {
    case COMP_REACT_UPDATE_TITLE:
      newState = {...state};
      newState.containers[action.id].title = action.title;
      return newState;
    case COMP_REACT_LOCK:
      return {
        ...state,
        locked: true
      }
    case COMP_REACT_UNLOCK:
      return {
        ...state,
        locked: false
      }
    default:
      return state;
  }
};
