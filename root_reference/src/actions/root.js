export const TEST = 'TEST';

export const testThrough = (something) => (dispatch) => {
  dispatch(_testThrough(something));
};

const _testThrough = (something) => {
  return {
    type: TEST,
    something
  };
};
