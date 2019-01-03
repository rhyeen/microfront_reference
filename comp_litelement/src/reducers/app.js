import {
  COMP_LIT_ELEMENT_UPDATE_LABEL
} from '../actions/app.js';

const INITIAL_STATE = {
  containers: {
    '1': {
      label: 'some initial value'
    },
    '2': {
      label: 'another initial value'
    }
  }
};

export const compLitElement = (state = INITIAL_STATE, action) => {
  let newState
  switch (action.type) {
    case COMP_LIT_ELEMENT_UPDATE_LABEL:
      newState = {...state};
      newState.containers[action.id].label = action.label;
      return newState;
    default:
      return state;
  }
};
