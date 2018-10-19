import {
  TEST
} from '../actions/root.js';

const INITIAL_STATE = {};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEST:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default app;
