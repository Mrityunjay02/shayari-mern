import React from 'react';
import './Notification.css';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const notificationClass = `notification ${type || 'info'}`;

  return (
    <div className={notificationClass}>
      {message}
    </div>
  );
};

export default Notification;
