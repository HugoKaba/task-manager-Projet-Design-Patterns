import React, { useState } from "react";
import { Notification } from "../types/Notification";

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => setIsOpen(!isOpen);

  return (
    <div className="collapsible-list">
      <button onClick={toggleList} className="toggle-btn">
        {isOpen ? "Hide Notifications" : "Show Notifications"}
      </button>
      <ul className={`notification-list ${isOpen ? "open" : "closed"}`}>
        {notifications.map((notif) => (
          <li key={notif.id}>{notif.message} - {new Date(notif.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
