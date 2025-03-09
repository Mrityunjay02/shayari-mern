import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

const Notification = ({ message, type, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!visible || !message) return null;

  const notificationClass = `notification ${type || 'info'}`;

  return (
    <div className={notificationClass}>
      <span>{message}</span>
      <button className="close-btn" onClick={() => setVisible(false)}>&times;</button>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default Notification;
