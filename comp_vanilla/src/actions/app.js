export const COMP_VANILLA_UPDATE_TITLE = 'COMP_VANILLA_UPDATE_TITLE';
export const COMP_VANILLA_LOCK = 'COMP_VANILLA_LOCK';
export const COMP_VANILLA_UNLOCK = 'COMP_VANILLA_UNLOCK';

export const compVanilla_updateTitle = (id, title) => {
  return {
    type: COMP_VANILLA_UPDATE_TITLE,
    id, 
    title
  };
};

export const compVanilla_lock = () => {
  return {
    type: COMP_VANILLA_LOCK
  };
}

export const compVanilla_unlock = () => {
  return {
    type: COMP_VANILLA_UNLOCK
  };
}