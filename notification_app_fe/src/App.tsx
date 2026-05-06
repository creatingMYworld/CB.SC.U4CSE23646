import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notifications, setNotifications] = useState<any[]>([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjYi5zYy51NGNzZTIzNjE4QGNiLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjQzNTIsImlhdCI6MTc3ODA2MzQ1MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjhhZjJiZDU2LTNjMmItNGIwNy1iYWE2LWI3YjY3ZDZmYzE2ZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhbmdhIGFydW4ga3VtYXIiLCJzdWIiOiJmNTU0NDdiOS03YzE5LTQ3MjktODE3Yy1jMzkwMDRhMjc2MWMifSwiZW1haWwiOiJjYi5zYy51NGNzZTIzNjE4QGNiLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJuYW1lIjoicmFuZ2EgYXJ1biBrdW1hciIsInJvbGxObyI6ImNiLnNjLnU0Y3NlMjMxOCIsImFjY2Vzc0NvZGUiOiJQVEJNbVEiLCJjbGllbnRJRCI6ImY1NTQ0NDdiOS03YzE5LTQ3MjktODE3Yy1jMzkwMDRhMjc2MWMifQ.FW315ooT26vyX-RED0kbMNxYxoGD_4sy1qATyj0w_UU";

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://20.207.122.201/evaluation-service/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      // Directly set response
      setNotifications(response.data);
    } catch (error) {
      console.log(error);

      // Dummy fallback data
      setNotifications([
        {
          Type: "Placement",
          Message: "Microsoft Hiring Drive",
          Timestamp: "2026-05-06",
        },
        {
          Type: "Result",
          Message: "Mid Semester Results Published",
          Timestamp: "2026-05-06",
        },
        {
          Type: "Event",
          Message: "Hackathon Registration Open",
          Timestamp: "2026-05-06",
        },
      ]);
    }
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ marginTop: "40px" }}>
        Campus Notification System
      </h1>

      <h2>All Notifications</h2>

      {notifications.length === 0 ? (
        <h3>No Notifications Found</h3>
      ) : (
        notifications.map((notification: any, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "20px",
              margin: "20px",
              borderRadius: "10px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <h2>{notification.Type}</h2>

            <p
              style={{
                fontSize: "18px",
              }}
            >
              {notification.Message}
            </p>

            <p>
              <b>Timestamp:</b>{" "}
              {notification.Timestamp}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;