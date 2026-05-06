import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AllNotifications from "./pages/AllNotifications";
import PriorityInbox from "./pages/PriorityInbox";
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f97316',
    },
    background: {
      default: '#fafafa',
    }
  },
  typography: {
    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="static" color="inherit" elevation={1} sx={{ mb: 4 }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#ea580c' }}>
              Campus Notifications
            </Typography>
            <Button 
              color="inherit" 
              component={NavLink} 
              to="/" 
              sx={{ '&.active': { color: '#ea580c', borderBottom: '2px solid #ea580c' }, borderRadius: 0, mx: 1 }}
            >
              Feed
            </Button>
            <Button 
              color="inherit" 
              component={NavLink} 
              to="/priority" 
              sx={{ '&.active': { color: '#ea580c', borderBottom: '2px solid #ea580c' }, borderRadius: 0, mx: 1 }}
            >
              Priority Inbox
            </Button>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<AllNotifications />} />
            <Route path="/priority" element={<PriorityInbox />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;