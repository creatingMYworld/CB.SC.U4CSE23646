const axios = require("axios");


const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjYi5zYy51NGNzZTIzNjE4QGNiLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjIyMTAsImlhdCI6MTc3ODA2MTMxMCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImE0YmIwYmQ3LWQ0YjctNGM4ZC1iNDlhLTU3OGQxOGMwNThiOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhbmdhIGFydW4ga3VtYXIiLCJzdWIiOiJmNTU0NDdiOS03YzE5LTQ3MjktODE3Yy1jMzkwMDRhMjc2MWMifSwiZW1haWwiOiJjYi5zYy51NGNzZTIzNjE4QGNiLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJuYW1lIjoicmFuZ2EgYXJ1biBrdW1hciIsInJvbGxObyI6ImNiLnNjLnU0Y3NlMjMxOCIsImFjY2Vzc0NvZGUiOiJQVEJNbVEiLCJjbGllbnRJRCI6ImY1NTQ0N2I5LTdjMTktNDcyOS04MTdjLWMzOTAwNGEyNzYxYyIsImNsaWVudFNlY3JldCI6IldkdEpldXJ1UkJFeG5kTWsifQ.IbuJEcK_Isc8408rGy45ngb4ceknKXHMZyZf5SVhE5g";

// Priority weights for notification types
const TYPE_WEIGHT = {
  Placement: 30,
  Result: 20,
  Event: 10,
};

// Function to calculate priority score
function calculatePriority(notification) {
  const currentTime = new Date();

  const notificationTime = new Date(
    notification.Timestamp
  );

  // Difference in hours
  const diffHours =
    (currentTime - notificationTime) /
    (1000 * 60 * 60);

  // Recency score
  const recencyScore = Math.max(
    0,
    24 - diffHours
  );

  // Final score
  return (
    TYPE_WEIGHT[notification.Type] +
    recencyScore
  );
}

// Main function
async function getTopNotifications() {
  try {
    // API request with authorization token
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const notifications =
      response.data.notifications;

    // Add priority score
    const rankedNotifications =
      notifications.map((notification) => ({
        ...notification,
        priorityScore:
          calculatePriority(notification),
      }));

    // Sort descending
    rankedNotifications.sort(
      (a, b) =>
        b.priorityScore - a.priorityScore
    );

    // Get top 10
    const top10 =
      rankedNotifications.slice(0, 10);

    console.log(
      "\n========== TOP 10 PRIORITY NOTIFICATIONS ==========\n"
    );

    top10.forEach(
      (notification, index) => {
        console.log(
          `${index + 1}. ${
            notification.Type
          }`
        );

        console.log(
          `Message : ${notification.Message}`
        );

        console.log(
          `Priority Score : ${notification.priorityScore.toFixed(
            2
          )}`
        );

        console.log(
          `Timestamp : ${notification.Timestamp}`
        );

        console.log(
          "--------------------------------------------------"
        );
      }
    );
  } catch (error) {
    console.error(
      "\nError fetching notifications"
    );

    if (error.response) {
      console.error(
        "Status:",
        error.response.status
      );

      console.error(
        "Message:",
        error.response.data
      );
    } else {
      console.error(error.message);
    }
  }
}

// Execute
getTopNotifications();
