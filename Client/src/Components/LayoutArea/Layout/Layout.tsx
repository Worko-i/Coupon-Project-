import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container } from '@mui/material';
import Routing from '../../Routing/Routing';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';

// Enhanced theme with comprehensive design system
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Inter", "Segoe UI", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.875rem',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.12)',
    '0px 6px 12px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.12)',
    '0px 10px 20px rgba(0, 0, 0, 0.15), 0px 6px 12px rgba(0, 0, 0, 0.12)',
    '0px 15px 30px rgba(0, 0, 0, 0.15), 0px 10px 20px rgba(0, 0, 0, 0.12)',
    '0px 20px 40px rgba(0, 0, 0, 0.15), 0px 15px 30px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
    '0px 25px 50px rgba(0, 0, 0, 0.15), 0px 20px 40px rgba(0, 0, 0, 0.12)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: '16px',
          fontFamily: '"Roboto", "Inter", "Segoe UI", "Helvetica Neue", sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 24px',
          fontSize: '0.875rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: '#fafafa',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
          '@media (min-width: 1200px)': {
            maxWidth: '1200px',
          },
        },
      },
    },
  },
});

function Layout(): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ 
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.default',
                overflow: 'hidden',
            }}>
                {/* Header */}
                <Header />
                
                {/* Main Content Area */}
                <Box sx={{ 
                    display: 'flex', 
                    flex: 1,
                    height: 'calc(100vh - 140px)', // Account for header and footer
                    overflow: 'hidden',
                }}>
                    {/* Sidebar Navigation */}
                    <Box sx={{ 
                        width: '280px',
                        flexShrink: 0,
                        borderRight: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.04)',
                    }}>
                        <Menu />
                    </Box>
                    
                    {/* Main Content */}
                    <Box component="main" sx={{ 
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'background.default',
                        overflow: 'hidden',
                    }}>
                        <Container 
                            maxWidth={false} 
                            sx={{ 
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                py: 3,
                                px: 4,
                                overflow: 'auto',
                                width: '100%',
                                maxWidth: 'none',
                                '&.MuiContainer-root': {
                                    paddingLeft: '32px',
                                    paddingRight: '32px',
                                },
                                // Custom scrollbar for main content
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'transparent',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: 'rgba(0, 0, 0, 0.1)',
                                    borderRadius: '4px',
                                    '&:hover': {
                                        background: 'rgba(0, 0, 0, 0.2)',
                                    },
                                },
                            }}
                        >
                            <Routing />
                        </Container>
                    </Box>
                </Box>
                
                {/* Footer */}
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default Layout

