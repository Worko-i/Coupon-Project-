import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container } from '@mui/material';
import Routing from '../../Routing/Routing';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';

// יצירת תמה מותאמת עם צבעים יפים
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
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
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.default',
                paddingBottom: '80px' // Add space for fixed footer
            }}>
                <Header />
                
                <Box sx={{ 
                    display: 'flex', 
                    flex: 1,
                    gap: 2,
                    p: 2
                }}>
                    <Menu />
                    
                    <Box component="main" sx={{ 
                        flex: 1,
                        backgroundColor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 1,
                        overflow: 'hidden'
                    }}>
                        <Container maxWidth="lg" sx={{ py: 3 }}>
                            <Routing />
                        </Container>
                    </Box>
                </Box>
                
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default Layout

