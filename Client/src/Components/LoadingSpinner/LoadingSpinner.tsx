import { Box, CircularProgress, Typography, Fade } from '@mui/material';

function LoadingSpinner() {
  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
          gap: 2
        }}
      >
        <CircularProgress 
          size={60}
          thickness={4}
          sx={{
            color: 'primary.main',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }}
        />
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          Loading...
        </Typography>
      </Box>
    </Fade>
  );
}

export default LoadingSpinner;
