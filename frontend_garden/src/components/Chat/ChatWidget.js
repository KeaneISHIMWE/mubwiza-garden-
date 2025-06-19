import React, { useState } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Chat,
  Close,
  Send,
  Phone,
  WhatsApp,
  Email,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { messagesAPI } from '../../services/api';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendMessage = async () => {
    if (!name || !email || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await messagesAPI.createMessage({
        name,
        email,
        message,
        subject: 'Chat message from website'
      });

      toast.success('Message sent! We will contact you soon.');
      setMessage('');
      setName('');
      setEmail('');
      handleClose();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    }
  };

  const quickActions = [
    {
      icon: <WhatsApp />,
      label: 'WhatsApp',
      color: '#25D366',
      action: () => window.open('https://wa.me/250788759351?text=Hello, I need help with Mubwiza Garden products', '_blank'),
    },
    {
      icon: <Phone />,
      label: 'Call Now',
      color: '#2196F3',
      action: () => window.open('tel:+250788759351', '_blank'),
    },
    {
      icon: <Email />,
      label: 'Email',
      color: '#FF9800',
      action: () => window.open('mailto:info@mubwizagarden.com?subject=Inquiry about Mubwiza Garden', '_blank'),
    },
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <Fab
        color="primary"
        aria-label="chat"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
              boxShadow: '0 0 0 0 rgba(46, 125, 50, 0.7)',
            },
            '70%': {
              transform: 'scale(1.05)',
              boxShadow: '0 0 0 10px rgba(46, 125, 50, 0)',
            },
            '100%': {
              transform: 'scale(1)',
              boxShadow: '0 0 0 0 rgba(46, 125, 50, 0)',
            },
          },
        }}
      >
        <Chat />
      </Fab>

      {/* Chat Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            position: 'fixed',
            bottom: 100,
            right: 20,
            m: 0,
            maxWidth: 400,
            maxHeight: 600,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chat color="primary" />
            <Typography variant="h6">
              Chat with Mubwiza Garden
            </Typography>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Welcome Message */}
          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
              backgroundColor: 'primary.light',
              color: 'white',
            }}
          >
            <Typography variant="body2">
              👋 Hello! Welcome to Mubwiza Garden. How can we help you today?
            </Typography>
          </Paper>

          {/* Quick Contact Options */}
          <Typography variant="subtitle2" gutterBottom>
            Quick Contact Options:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            {quickActions.map((action, index) => (
              <Chip
                key={index}
                icon={action.icon}
                label={action.label}
                clickable
                onClick={action.action}
                sx={{
                  backgroundColor: action.color,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: action.color,
                    opacity: 0.8,
                  },
                }}
              />
            ))}
          </Box>

          {/* Contact Form */}
          <Typography variant="subtitle2" gutterBottom>
            Or send us a message:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              size="small"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              size="small"
              label="Your Message"
              multiline
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you?"
              required
            />
          </Box>

          {/* Payment Info */}
          <Paper
            elevation={1}
            sx={{
              p: 2,
              mt: 3,
              backgroundColor: 'warning.light',
              color: 'warning.contrastText',
            }}
          >
            <Typography variant="body2" fontWeight="medium" gutterBottom>
              💳 Payment Information:
            </Typography>
            <Typography variant="body2">
              Mobile Money: <strong>+250 788 123 456</strong><br />
              Payment arrangements made after order confirmation
            </Typography>
          </Paper>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSendMessage}
            variant="contained"
            startIcon={<Send />}
            disabled={!name || !email || !message}
          >
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatWidget;
