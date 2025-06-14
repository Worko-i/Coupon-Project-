import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f8fafc',
    },
  },
});

// The main App component now simply redirects to the actual application
// The real application structure is in Layout component which is rendered in index.tsx
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <CircularProgress 
          sx={{ 
            color: 'white', 
            mb: 3,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }} 
          size={60}
          thickness={4}
        />
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontWeight: 300,
            letterSpacing: '0.5px',
            fontFamily: 'Roboto, Inter, Segoe UI, Helvetica Neue, sans-serif',
          }}
        >
          Loading Coupon System...
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
