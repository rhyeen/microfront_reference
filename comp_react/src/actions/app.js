export const COMP_REACT_UPDATE_LABEL = 'COMP_REACT_UPDATE_LABEL';

export const compReact_updateLabel = (id, label) => {
  return {
    type: COMP_REACT_UPDATE_LABEL,
    id, 
    label
  };
};

export function updateLabel(id, label) {
  return (dispatch) => {
    dispatch(compReact_updateLabel(id, label))
  }
}

export function updateAnyLabel(actionFunction, id, label) {
  return (dispatch) => {
    dispatch({ type: actionFunction, id: id, label: label })
  }
}
