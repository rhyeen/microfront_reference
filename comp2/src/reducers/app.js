import {
  COMP_2_UPDATE_TITLE,
  COMP_2_LOCK,
  COMP_2_UNLOCK
} from '../actions/app.js';

const INITIAL_STATE = {
  containers: {
    '1': {
      title: 'test 1'
    },
    '2': {
      title: 'test 2'
    }
  },
  locked: false
};

export const comp2 = (state = INITIAL_STATE, action) => {
  let newState
  switch (action.type) {
    case COMP_2_UPDATE_TITLE:
      newState = {...state};
      newState.containers[action.id].title = action.title;
      return newState;
    case COMP_2_LOCK:
      return {
        ...state,
        locked: true
      }
    case COMP_2_UNLOCK:
      return {
        ...state,
        locked: false
      }
    default:
      return state;
  }
};
