import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  LocalFlorist,
  Menu as MenuIcon,
  Close,
  Home,
  PhotoLibrary,
  Info,
  ContactMail,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleMobileNavigation = (path) => {
    navigate(path);
    handleMobileMenuClose();
  };

  const navigationItems = [
    { path: '/', label: t('nav.home'), icon: <Home /> },
    { path: '/gallery', label: t('nav.gallery'), icon: <PhotoLibrary /> },
    { path: '/about', label: t('nav.about'), icon: <Info /> },
    { path: '/contact', label: t('nav.contact'), icon: <ContactMail /> },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#2E7D32', // Force green color
        '&.MuiAppBar-root': {
          backgroundColor: '#2E7D32 !important', // Override any theme changes
        },
        '&:hover': {
          backgroundColor: '#2E7D32 !important',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
        <Toolbar sx={{ px: { xs: 0, sm: 2 } }}>
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1,
            }}
          >
            <LocalFlorist sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Mubwiza Garden
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, mr: 2 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Language Switcher */}
          <LanguageSwitcher />



          {/* Mobile Menu Icon */}
          <IconButton
            onClick={handleMobileMenuToggle}
            sx={{
              display: { xs: 'flex', md: 'none' },
              ml: 1,
              color: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                color: '#388E3C'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundColor: 'primary.main',
            color: 'white',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Mubwiza Garden
          </Typography>
          <IconButton color="inherit" onClick={handleMobileMenuClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        <List>
          {navigationItems.map((item) => (
            <ListItem
              key={item.path}
              button
              onClick={() => handleMobileNavigation(item.path)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </Box>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
