import {
  COMP_1_UPDATE_TITLE,
  COMP_1_LOCK,
  COMP_1_UNLOCK
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

export const comp1 = (state = INITIAL_STATE, action) => {
  let newState
  switch (action.type) {
    case COMP_1_UPDATE_TITLE:
      newState = {...state};
      newState.containers[action.id].title = action.title;
      return newState;
    case COMP_1_LOCK:
      return {
        ...state,
        locked: true
      }
    case COMP_1_UNLOCK:
      return {
        ...state,
        locked: false
      }
    default:
      return state;
  }
};
