import React from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: '#f8f8f8', 
        borderTop: '1px solid #e0e0e0',
        textAlign: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" fontWeight="bold">
          Share our Community Pantry
        </Typography>
        
        <Box sx={{ mt: 1 }}>
          <IconButton 
            component="a" 
            href="https://instagram.com" 
            target="_blank" 
            sx={{ color: '#E1306C', '&:hover': { transform: 'scale(1.2)' }, transition: '0.2s' }}
          >
            <InstagramIcon fontSize="large" />
          </IconButton>
          <IconButton 
            component="a" 
            href="https://facebook.com" 
            target="_blank" 
            sx={{ color: '#4267B2', '&:hover': { transform: 'scale(1.2)' }, transition: '0.2s' }}
          >
            <FacebookIcon fontSize="large" />
          </IconButton>
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          © {new Date().getFullYear()} Pantry App - Feed the Community
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;