const INITIAL_STATE = {
  containers: {
    '5': {
      title: 'test Vanilla'
    }
  },
  locked: false
};

export const compVanilla = (state = INITIAL_STATE, action) => {
  let newState
  switch (action.type) {
    case 'COMP_VANILLA_UPDATE_TITLE':
      newState = {...state};
      newState.containers[action.id].title = action.title;
      return newState;
    case 'COMP_VANILLA_LOCK':
      return {
        ...state,
        locked: true
      }
    case 'COMP_VANILLA_UNLOCK':
      return {
        ...state,
        locked: false
      }
    default:
      return state;
  }
};
