const INITIAL_STATE = {
  containers: {
    '1': {
      label: 'test Vanilla'
    }
  }
};

export const compVanilla = (state = INITIAL_STATE, action) => {
  let newState
  switch (action.type) {
    case 'COMP_VANILLA_UPDATE_LABEL':
      newState = {...state};
      newState.containers[action.id].label = action.label;
      return newState;
    default:
      return state;
  }
};
