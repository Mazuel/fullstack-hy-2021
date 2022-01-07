let currentTimeout;

export const showMessage = (text, duration) => {
  return async (dispatch) => {
    clearTimeout(currentTimeout);
    dispatch({
      type: 'display',
      data: text,
    });
    currentTimeout = setTimeout(() => {
      dispatch({
        type: 'clear',
      });
    }, duration * 1000);
  };
};

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'display':
      return action.data;

    case 'clear':
      return '';

    default:
      return state;
  }
};

export default notificationReducer;
