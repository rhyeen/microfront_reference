export const COMP_VANILLA_UPDATE_LABEL = 'COMP_VANILLA_UPDATE_LABEL';

export const compVanilla_updateLabel = (id, label) => {
  return {
    type: COMP_VANILLA_UPDATE_LABEL,
    id, 
    label
  };
};
