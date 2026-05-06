import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/notificationService";
import { 
  Card, CardContent, Typography, Chip, Select, MenuItem, InputLabel, 
  FormControl, Box, CircularProgress, Button, Stack, Pagination 
} from '@mui/material';

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 4;

  const [readIds, setReadIds] = useState(() => {
    const saved = localStorage.getItem("read_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    loadNotifications();
  }, [typeFilter, page]);

  async function loadNotifications() {
    setLoading(true);
    try {
      const params = { page, limit };
      if (typeFilter) params.notification_type = typeFilter;
      
      const { data } = await fetchNotifications(params);
      setNotifications(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch notifications");
      setLoading(false);
    }
  }

  const markAsRead = (id) => {
    if (!readIds.includes(id)) {
      const updated = [...readIds, id];
      setReadIds(updated);
      localStorage.setItem("read_notifications", JSON.stringify(updated));
    }
  };

  const markAllRead = () => {
    const allIds = notifications.map(n => n.ID);
    const updated = [...new Set([...readIds, ...allIds])];
    setReadIds(updated);
    localStorage.setItem("read_notifications", JSON.stringify(updated));
  };

  const getChipProps = (type) => {
    switch(type) {
      case 'Placement': return { color: '#059669', bg: '#d1fae5' };
      case 'Result': return { color: '#ea580c', bg: '#ffedd5' };
      case 'Event': return { color: '#3b82f6', bg: '#dbeafe' };
      default: return { color: '#64748b', bg: '#f1f5f9' };
    }
  };

  return (
    <Box sx={{ maxWidth: 850, mx: 'auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" component="h1" fontWeight="800" color="text.primary" sx={{ letterSpacing: '-0.5px' }}>
          Notifications
        </Typography>
        
        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={typeFilter}
              label="Filter by Type"
              onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
              sx={{ borderRadius: 1, bgcolor: 'white' }}
            >
              <MenuItem value=""><em>All Types</em></MenuItem>
              <MenuItem value="Placement">Placement</MenuItem>
              <MenuItem value="Result">Result</MenuItem>
              <MenuItem value="Event">Event</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={markAllRead} sx={{ fontWeight: 'bold' }}>
            MARK ALL READ
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={10}><CircularProgress color="primary" /></Box>
      ) : error ? (
        <Typography color="error" textAlign="center">{error}</Typography>
      ) : notifications.length === 0 ? (
        <Box textAlign="center" py={10} bgcolor="white" borderRadius={3} border="1px dashed #cbd5e1">
          <Typography color="text.secondary">No notifications found.</Typography>
        </Box>
      ) : (
        <Stack spacing={2} mb={4}>
          {notifications.map((item) => {
            const isRead = readIds.includes(item.ID);
            const chipProps = getChipProps(item.Type);
            
            return (
              <Card 
                key={item.ID}
                onClick={() => markAsRead(item.ID)}
                elevation={0}
                sx={{ 
                  borderRadius: 1,
                  cursor: 'pointer',
                  backgroundColor: isRead ? '#f8fafc' : '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderLeft: isRead ? '4px solid transparent' : '4px solid #3b82f6',
                  transition: '0.2s',
                  '&:hover': { backgroundColor: '#f1f5f9' }
                }}
              >
                <CardContent sx={{ p: '16px !important', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box flexGrow={1}>
                    <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                      <Chip 
                        label={item.Type} 
                        size="small" 
                        sx={{ 
                          fontWeight: 600, 
                          color: chipProps.color, 
                          bgcolor: chipProps.bg,
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" fontWeight="500">
                        {new Date(item.Timestamp).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color={isRead ? "text.secondary" : "text.primary"} sx={{ fontWeight: isRead ? 400 : 500 }}>
                      {item.Message}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      )}

      {!loading && notifications.length > 0 && (
        <Box display="flex" justifyContent="center">
          <Pagination 
            count={3} 
            page={page} 
            onChange={(e, v) => setPage(v)} 
            color="primary" 
            shape="circular"
          />
        </Box>
      )}
    </Box>
  );
}

export default AllNotifications;