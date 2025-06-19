import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import {
  Language,
  Check,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const languages = [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      nativeName: 'English'
    },
    {
      code: 'fr',
      name: 'French',
      flag: '🇫🇷',
      nativeName: 'Français'
    },
    {
      code: 'rw',
      name: 'Kinyarwanda',
      flag: '🇷🇼',
      nativeName: 'Ikinyarwanda'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    handleClose();
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{ 
          mr: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}
        title="Change Language"
      >
        <Language />
        <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
          {currentLanguage.flag}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 200,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === i18n.language}
            sx={{
              py: 1.5,
              px: 2,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Box sx={{ fontSize: '1.5rem' }}>
                {language.flag}
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body2" fontWeight="medium">
                    {language.nativeName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {language.name}
                  </Typography>
                </Box>
              }
            />
            {language.code === i18n.language && (
              <Check sx={{ color: 'primary.main', ml: 1 }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
