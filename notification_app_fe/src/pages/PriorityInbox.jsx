import {
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

import { useEffect, useState } from "react";

import api from "../services/api";

function PriorityInbox() {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  function getScore(notification) {
    const weights = {
      Placement: 30,
      Result: 20,
      Event: 10,
    };

    return weights[notification.Type];
  }

  async function fetchNotifications() {
    const response =
      await api.get("/notifications");

    const ranked =
      response.data.notifications.sort(
        (a, b) =>
          getScore(b) - getScore(a)
      );

    setNotifications(ranked.slice(0, 10));
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Priority Inbox
      </Typography>

      <Grid container spacing={2}>
        {notifications.map((notification) => (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {notification.Type}
                </Typography>

                <Typography>
                  {notification.Message}
                </Typography>

                <Typography>
                  Priority Score:
                  {" "}
                  {getScore(notification)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PriorityInbox;