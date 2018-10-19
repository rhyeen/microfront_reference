export const COMP_2_UPDATE_TITLE = 'COMP_2_UPDATE_TITLE';
export const COMP_2_LOCK = 'COMP_2_LOCK';
export const COMP_2_UNLOCK = 'COMP_2_UNLOCK';

export const comp2_updateTitle = (id, title) => (dispatch) => {
  dispatch(_updateTitle(id, title));
};

const _updateTitle = (id, title) => {
  return {
    type: COMP_2_UPDATE_TITLE,
    id, 
    title
  };
};

export const comp2_lock = () => {
  return {
    type: COMP_2_LOCK
  };
}

export const comp2_unlock = () => {
  return {
    type: COMP_2_UNLOCK
  };
}