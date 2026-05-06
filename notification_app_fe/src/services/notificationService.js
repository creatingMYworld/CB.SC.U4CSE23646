import axios from "axios";

const TOKEN =
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjYi5zYy51NGNzZTIzNjE4QGNiLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJleHAiOjE3NzgwNjQzNTIsImlhdCI6MTc3ODA2MzQ1MiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjhhZjJiZDU2LTNjMmItNGIwNy1iYWE2LWI3YjY3ZDZmYzE2ZCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InJhbmdhIGFydW4ga3VtYXIiLCJzdWIiOiJmNTU0NDdiOS03YzE5LTQ3MjktODE3Yy1jMzkwMDRhMjc2MWMifSwiZW1haWwiOiJjYi5zYy51NGNzZTIzNjE4QGNiLnN0dWRlbnRzLmFtcml0YS5lZHUiLCJuYW1lIjoicmFuZ2EgYXJ1biBrdW1hciIsInJvbGxObyI6ImNiLnNjLnU0Y3NlMjMxOCIsImFjY2Vzc0NvZGUiOiJQVEJNbVEiLCJjbGllbnRJRCI6ImY1NTQ0N2I5LTdjMTktNDcyOS04MTdjLWMzOTAwNGEyNzYxYyIsImNsaWVudFNlY3JldCI6IldkdEpldXJ1UkJFeG5kTWsifQ.FW315ooT26vyX-RED0kbMNxYxoGD_4sy1qATyj0w_UU";

const BASE_URL =
  "http://20.207.122.201/evaluation-service";

export const fetchNotifications =
  async () => {
    try {
      const response =
        await axios.get(
          `${BASE_URL}/notifications`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );

      console.log(
        "API SUCCESS:",
        response.data
      );

      return response.data.notifications;
    } catch (error) {
      console.error(
        "API ERROR:"
      );

      if (error.response) {
        console.error(
          error.response.data
        );
      } else {
        console.error(error);
      }

      return [];
    }
  };