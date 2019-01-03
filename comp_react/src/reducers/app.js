import {
  COMP_REACT_UPDATE_LABEL
} from '../actions/app.js';

const INITIAL_STATE = {
  containers: {
    'r1': {
      label: 'initial react label value'
    }
  }
};

export const compReact = (state = INITIAL_STATE, action) => {
  let newState
  switch (action.type) {
    case COMP_REACT_UPDATE_LABEL:
      newState = {...state};
      newState.containers[action.id].label = action.label;
      return newState;
    default:
      return state;
  }
};
