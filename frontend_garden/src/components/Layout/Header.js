import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  LocalFlorist,
  Menu as MenuIcon,
  Close,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import NotificationBell from '../Notifications/NotificationBell';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleOrders = () => {
    navigate('/orders');
    handleMenuClose();
  };

  const handleAdmin = () => {
    navigate('/admin');
    handleMenuClose();
  };

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
            <Button color="inherit" component={Link} to="/">
              {t('nav.home')}
            </Button>
            <Button color="inherit" component={Link} to="/products">
              {t('nav.products')}
            </Button>
            <Button color="inherit" component={Link} to="/about">
              {t('nav.about')}
            </Button>
            <Button color="inherit" component={Link} to="/contact">
              {t('nav.contact')}
            </Button>
          </Box>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Notifications (Admin only) */}
          <NotificationBell />

          {/* Cart Icon */}
          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* User Menu */}
          {isAuthenticated ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ ml: 1 }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfile}>{t('nav.profile')}</MenuItem>
                <MenuItem onClick={handleOrders}>{t('nav.orders')}</MenuItem>
                {user?.role === 'admin' && (
                  <MenuItem onClick={handleAdmin}>{t('nav.admin')}</MenuItem>
                )}
                <MenuItem onClick={handleLogout}>{t('nav.logout')}</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{ borderColor: 'white', '&:hover': { borderColor: 'white' } }}
              >
                {t('nav.login')}
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => navigate('/register')}
              >
                {t('nav.register')}
              </Button>
            </Box>
          )}

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
          <ListItem button onClick={() => handleMobileNavigation('/')}>
            <ListItemText primary={t('nav.home')} />
          </ListItem>
          <ListItem button onClick={() => handleMobileNavigation('/products')}>
            <ListItemText primary={t('nav.products')} />
          </ListItem>
          <ListItem button onClick={() => handleMobileNavigation('/about')}>
            <ListItemText primary={t('nav.about')} />
          </ListItem>
          <ListItem button onClick={() => handleMobileNavigation('/contact')}>
            <ListItemText primary={t('nav.contact')} />
          </ListItem>
          <ListItem button onClick={() => handleMobileNavigation('/cart')}>
            <ListItemText primary={`🛒 ${t('nav.cart')} (${itemCount})`} />
          </ListItem>
        </List>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        {isAuthenticated ? (
          <List>
            <ListItem button onClick={() => handleMobileNavigation('/profile')}>
              <ListItemText primary={t('nav.profile')} />
            </ListItem>
            <ListItem button onClick={() => handleMobileNavigation('/orders')}>
              <ListItemText primary={t('nav.orders')} />
            </ListItem>
            {user?.role === 'admin' && (
              <ListItem button onClick={() => handleMobileNavigation('/admin')}>
                <ListItemText primary={t('nav.admin')} />
              </ListItem>
            )}
            <ListItem button onClick={() => { handleLogout(); handleMobileMenuClose(); }}>
              <ListItemText primary={t('nav.logout')} />
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem button onClick={() => handleMobileNavigation('/login')}>
              <ListItemText primary={t('nav.login')} />
            </ListItem>
            <ListItem button onClick={() => handleMobileNavigation('/register')}>
              <ListItemText primary={t('nav.register')} />
            </ListItem>
          </List>
        )}
      </Drawer>
    </AppBar>
  );
};

export default Header;
