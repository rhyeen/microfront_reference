export const COMP_REACT_UPDATE_LABEL = 'COMP_REACT_UPDATE_LABEL';
export const COMP_REACT_LOCK = 'COMP_REACT_LOCK';
export const COMP_REACT_UNLOCK = 'COMP_REACT_UNLOCK';

export const compReact_updateLabel = (id, title) => {
  return {
    type: COMP_REACT_UPDATE_LABEL,
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

export function updateLabel(id, title) {
  return (dispatch) => {
    dispatch(compReact_updateLabel(id, title))
  }
}

export function updateAnyLabel(actionFunction, id, title) {
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