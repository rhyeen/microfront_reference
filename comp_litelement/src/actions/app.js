export const COMP_LIT_ELEMENT_UPDATE_LABEL = 'COMP_LIT_ELEMENT_UPDATE_LABEL';

export const compLitElement_updateLabel = (id, label) => (dispatch) => {
  dispatch(_updateLabel(id, label));
};

const _updateLabel = (id, label) => {
  return {
    type: COMP_LIT_ELEMENT_UPDATE_LABEL,
    id, 
    label
  };
};
