import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import ChatWidget from '../Chat/ChatWidget';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        {children}
      </Box>
      <Footer />
      <ChatWidget />
    </Box>
  );
};

export default Layout;
