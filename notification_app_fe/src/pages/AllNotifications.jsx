import {
  Card,
  CardContent,
  Typography,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";

import { useEffect, useState } from "react";

import api from "../services/api";

function AllNotifications() {
  const [notifications, setNotifications] =
    useState([]);

  const [filter, setFilter] =
    useState("");

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  async function fetchNotifications() {
    try {
      let url = "/notifications";

      if (filter) {
        url += `?notification_type=${filter}`;
      }

      const response = await api.get(url);

      setNotifications(
        response.data.notifications
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        All Notifications
      </Typography>

      <Select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
        displayEmpty
      >
        <MenuItem value="">
          All
        </MenuItem>

        <MenuItem value="Placement">
          Placement
        </MenuItem>

        <MenuItem value="Result">
          Result
        </MenuItem>

        <MenuItem value="Event">
          Event
        </MenuItem>
      </Select>

      <Grid container spacing={2} mt={2}>
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

                <Typography variant="body2">
                  {notification.Timestamp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AllNotifications;