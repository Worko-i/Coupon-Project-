import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    Fade
} from '@mui/material';
import { Add, Business } from '@mui/icons-material';
import CompanyModel from '../../Models/CompanyModel';
import companyService from '../../Services/CompanyService';
import CompanyCard from './CompanyCard/CompanyCard';
import ReactPaginate from 'react-paginate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ErrorHandler from '../HandleError/ErrorHandler';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Companies(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [page, setPage] = useState<number>(0);
  const companiesPerPage = 12; // Changed to 12 for better grid layout
  const numberOfRecordsVisited = page * companiesPerPage;
  const totalPages = Math.ceil(companies.length / companiesPerPage);
  const [loading, setLoading] = useState<boolean>(true);

  const changePage = ({ selected }: any) => {
    setPage(selected);
  };

  useEffect(() => {
    companyService
      .getCompanies()
      .then((response) => {
        setCompanies(response);
        console.log(response);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler.handleErrorResponse(error);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header Section */}
      <Fade in timeout={800}>
        <Paper 
          elevation={3}
          sx={{ 
            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
            color: 'white',
            p: 4,
            mb: 4,
            borderRadius: 3,
            textAlign: 'center'
          }}
        >
          <Business sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
            Companies Management
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
            Manage and view all registered companies in the system
          </Typography>
          
          <Button
            component={NavLink}
            to="/companies/company"
            variant="contained"
            startIcon={<Add />}
            size="large"
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Add New Company
          </Button>
        </Paper>
      </Fade>

      {/* Companies Grid */}
      {companies.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No companies found
          </Typography>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {companies
              .slice(numberOfRecordsVisited, numberOfRecordsVisited + companiesPerPage)
              .map((company, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={company.id}>
                  <Fade in timeout={800 + index * 100}>
                    <div>
                      <CompanyCard {...company} />
                    </div>
                  </Fade>
                </Grid>
              ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              '& .pagination': {
                display: 'flex',
                listStyle: 'none',
                gap: 1,
                p: 0,
                '& .item': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 40,
                  height: 40,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                  color: 'text.primary',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    color: 'white',
                    transform: 'translateY(-1px)',
                  },
                  '&.active': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderColor: 'primary.main',
                  },
                  '&.disabled-page': {
                    opacity: 0.5,
                    cursor: 'not-allowed',
                    '&:hover': {
                      backgroundColor: 'background.paper',
                      color: 'text.primary',
                      transform: 'none',
                    },
                  },
                },
              }
            }}>
              <ReactPaginate
                previousLabel={<ArrowBackIosIcon style={{ fontSize: 18 }} />}
                nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18 }} />}
                pageCount={totalPages}
                onPageChange={changePage}
                containerClassName={'pagination'}
                previousLinkClassName={'item previous'}
                nextLinkClassName={'item next'}
                disabledClassName={'disabled-page'}
                activeClassName={'item active'}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default Companies;
