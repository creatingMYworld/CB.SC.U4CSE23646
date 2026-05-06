import { useEffect, useState } from "react";
import { fetchNotifications } from "../services/notificationService";
import { 
  Card, CardContent, Typography, Chip, TextField, Box, CircularProgress, Stack 
} from '@mui/material';

const TYPE_WEIGHT = {
  Placement: 30,
  Result: 20,
  Event: 10,
};

function PriorityInbox() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [limitN, setLimitN] = useState(5);

  const [readIds, setReadIds] = useState(() => {
    const saved = localStorage.getItem("read_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    loadPriorityNotifications();
  }, [limitN]);

  async function loadPriorityNotifications() {
    setLoading(true);
    try {
      const { data } = await fetchNotifications(); // Fetch all initially to calculate priority

      const ranked = data
        .map((notification) => {
          const typeWeight = TYPE_WEIGHT[notification.Type] ?? 0;
          let recencyScore = 0;
          if (notification.Timestamp) {
            const notifDate = new Date(notification.Timestamp);
            const now = new Date();
            const hoursOld = (now - notifDate) / (1000 * 60 * 60);
            recencyScore = Math.max(0, 10 - (isNaN(hoursOld) ? 0 : hoursOld));
          }
          
          return {
            ...notification,
            score: Number((typeWeight + recencyScore).toFixed(1)),
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limitN);

      setNotifications(ranked);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch priority notifications");
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
          Priority Inbox
        </Typography>
        
        <TextField
          label="Top N Limit"
          type="number"
          size="small"
          value={limitN}
          onChange={(e) => setLimitN(Math.max(1, parseInt(e.target.value) || 1))}
          sx={{ width: 120, bgcolor: 'white', borderRadius: 1 }}
          InputProps={{ inputProps: { min: 1, max: 20 } }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={10}><CircularProgress color="primary" /></Box>
      ) : error ? (
        <Typography color="error" textAlign="center">{error}</Typography>
      ) : notifications.length === 0 ? (
        <Box textAlign="center" py={10} bgcolor="white" borderRadius={3} border="1px dashed #cbd5e1">
          <Typography color="text.secondary">No priority notifications to display.</Typography>
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
                  borderLeft: isRead ? '4px solid transparent' : '4px solid #f97316',
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
                      <Chip 
                        label={`★ Priority: ${item.score}`} 
                        size="small" 
                        sx={{ fontWeight: 600, color: '#ea580c', bgcolor: '#ffedd5' }}
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
    </Box>
  );
}

export default PriorityInbox;