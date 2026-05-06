import { useEffect, useState } from "react";

import {
  fetchNotifications,
} from "./services/notificationService";

function App() {
  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const data =
      await fetchNotifications();

    console.log(
      "Notifications:",
      data
    );

    setNotifications(data);

    setLoading(false);
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Campus Notification System
      </h1>

      <h2
        style={{
          textAlign: "center",
        }}
      >
        All Notifications
      </h2>

      {loading ? (
        <h3>Loading...</h3>
      ) : notifications.length === 0 ? (
        <h3>No Notifications Found</h3>
      ) : (
        notifications.map(
          (notification, index) => (
            <div
              key={index}
              style={{
                border:
                  "1px solid #ccc",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "10px",
                boxShadow:
                  "0px 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <h2>
                {notification.Type}
              </h2>

              <p>
                {
                  notification.Message
                }
              </p>

              <small>
                {
                  notification.Timestamp
                }
              </small>
            </div>
          )
        )
      )}
    </div>
  );
}

export default App;