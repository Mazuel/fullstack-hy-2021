const notificationReducer = (state = null, action) => {
  const { type, data } = action;
  switch (type) {
    case 'display':
      return data;
    case 'clear':
      return null;
    default:
      return state;
  }
};

export const setNotification = (message, duration) => {
  return {
    type: 'display',
    data: message,
  };
};

export const removeNotification = () => {
  return {
    type: 'clear',
  };
};

export default notificationReducer;
