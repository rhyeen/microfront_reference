export const COMP_1_UPDATE_TITLE = 'COMP_1_UPDATE_TITLE';
export const COMP_1_LOCK = 'COMP_1_LOCK';
export const COMP_1_UNLOCK = 'COMP_1_UNLOCK';

export const comp1_updateTitle = (id, title) => (dispatch) => {
  dispatch(_updateTitle(id, title));
};

const _updateTitle = (id, title) => {
  return {
    type: COMP_1_UPDATE_TITLE,
    id, 
    title
  };
};

export const comp1_lock = () => {
  return {
    type: COMP_1_LOCK
  };
}

export const comp1_unlock = () => {
  return {
    type: COMP_1_UNLOCK
  };
}