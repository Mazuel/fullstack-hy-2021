import React from 'react';
import { connect } from 'react-redux';

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
  marginBottom: 10,
};

const Notification = (props) => {
  const notification = props.notification;
  return notification ? <div style={style}>{notification}</div> : null;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
