export const COMP_REACT_UPDATE_TITLE = 'COMP_REACT_UPDATE_TITLE';
export const COMP_REACT_LOCK = 'COMP_REACT_LOCK';
export const COMP_REACT_UNLOCK = 'COMP_REACT_UNLOCK';

export const compReact_updateTitle = (id, title) => {
  return {
    type: COMP_REACT_UPDATE_TITLE,
    id, 
    title
  };
};

export const compReact_lock = () => {
  return {
    type: COMP_REACT_LOCK
  };
}

export const compReact_unlock = () => {
  return {
    type: COMP_REACT_UNLOCK
  };
}

export function updateTitle(id, title) {
  return (dispatch) => {
    dispatch(compReact_updateTitle(id, title))
  }
}

export function updateAnyTitle(actionFunction, id, title) {
  return (dispatch) => {
    dispatch({ type: actionFunction, id: id, title: title })
  }
}

export function lock() {
  return (dispatch) => {
    dispatch(compReact_lock())
  }
}

export function unlock() {
  return (dispatch) => {
    dispatch(compReact_unlock())
  }
}