import { 
    Box, 
    CircularProgress, 
    Typography, 
    Fade,
    LinearProgress,
    keyframes
} from '@mui/material';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

function LoadingSpinner() {
  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          gap: 3,
          p: 4,
        }}
      >
        {/* Main Spinner */}
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          {/* Background Circle */}
          <CircularProgress
            variant="determinate"
            value={100}
            size={80}
            thickness={2}
            sx={{
              color: 'action.disabled',
              position: 'absolute',
            }}
          />
          {/* Animated Circle */}
          <CircularProgress 
            size={80}
            thickness={3}
            sx={{
              color: 'primary.main',
              animation: `${rotate} 1.5s linear infinite`,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
                strokeDasharray: '80px, 200px',
                strokeDashoffset: '0px',
              }
            }}
          />
          {/* Inner animated circle */}
          <CircularProgress 
            size={50}
            thickness={4}
            sx={{
              color: 'secondary.main',
              position: 'absolute',
              top: 15,
              left: 15,
              animation: `${rotate} 1s linear infinite reverse`,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              }
            }}
          />
        </Box>

        {/* Loading Text */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h6" 
            color="primary.main"
            sx={{ 
              fontWeight: 600,
              mb: 1,
              animation: `${pulse} 2s ease-in-out infinite`,
            }}
          >
            Loading
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              fontWeight: 400,
              fontSize: '0.875rem'
            }}
          >
            Please wait while we load your content...
          </Typography>
        </Box>

        {/* Linear Progress Bar */}
        <Box sx={{ width: '200px' }}>
          <LinearProgress 
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'action.hover',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              }
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
}

export default LoadingSpinner;
