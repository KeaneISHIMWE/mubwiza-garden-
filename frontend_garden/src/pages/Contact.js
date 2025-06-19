import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Paper,
  Alert,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  Phone,
  Email,
  LocationOn,
  Instagram,
  Facebook,
  Twitter,
  WhatsApp,
  Send,
  Payment,
  Chat,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending message (in real app, this would send to backend)
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Phone />,
      title: 'Phone',
      value: '+250 788 759 351',
      description: 'Call us for immediate assistance',
      action: 'tel:+250788759351',
    },
    {
      icon: <WhatsApp />,
      title: 'WhatsApp',
      value: '+250 788 759 351',
      description: 'Chat with us on WhatsApp',
      action: 'https://wa.me/250788759351',
    },
    {
      icon: <Email />,
      title: 'Email',
      value: 'info@mubwizagarden.com',
      description: 'Send us an email',
      action: 'mailto:info@mubwizagarden.com',
    },
    {
      icon: <LocationOn />,
      title: 'Location',
      value: 'MIPC, Musanze District',
      description: 'Northern Province, Rwanda',
      action: null,
    },
  ];

  const socialMedia = [
    {
      icon: <Instagram />,
      name: 'Instagram',
      handle: '@mubwizagarden',
      url: 'https://instagram.com/mubwizagarden',
      color: '#E4405F',
    },
    {
      icon: <Facebook />,
      name: 'Facebook',
      handle: 'Mubwiza Garden',
      url: 'https://facebook.com/mubwizagarden',
      color: '#1877F2',
    },
    {
      icon: <Twitter />,
      name: 'Twitter',
      handle: '@mubwizagarden',
      url: 'https://twitter.com/mubwizagarden',
      color: '#1DA1F2',
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t('contact.title')}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {t('contact.subtitle')}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Get In Touch
          </Typography>

          {/* Contact Cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {contactInfo.map((contact, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: contact.action ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                    '&:hover': contact.action ? {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    } : {},
                  }}
                  onClick={() => contact.action && window.open(contact.action, '_blank')}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {contact.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {contact.title}
                    </Typography>
                    <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
                      {contact.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {contact.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Payment Information */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 4,
              background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
              border: 2,
              borderColor: 'warning.main',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Payment sx={{ color: 'warning.main', mr: 2 }} />
              <Typography variant="h6" color="warning.dark">
                Payment Information
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>💳 Payment Methods:</strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Mobile Money: <strong>+250 788 759 351</strong>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Bank Transfer: Contact us for details
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              • Cash on Delivery (within Musanze District)
            </Typography>
            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>Note:</strong> Payment arrangements will be made after order confirmation.
              Please contact us using the phone number above to arrange payment.
            </Alert>
          </Paper>

          {/* Social Media */}
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {socialMedia.map((social, index) => (
              <Card
                key={index}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                }}
                onClick={() => window.open(social.url, '_blank')}
              >
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <IconButton sx={{ color: social.color, mb: 1 }}>
                    {social.icon}
                  </IconButton>
                  <Typography variant="body2" fontWeight="medium">
                    {social.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {social.handle}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Chat sx={{ color: 'primary.main', mr: 2 }} />
              <Typography variant="h5">
                Send us a Message
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    helperText="Tell us how we can help you"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    startIcon={<Send />}
                    sx={{ py: 1.5 }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Quick Contact Options */}
            <Typography variant="h6" gutterBottom>
              Quick Contact
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={<WhatsApp />}
                label="WhatsApp Chat"
                clickable
                color="success"
                onClick={() => window.open('https://wa.me/250788759351', '_blank')}
              />
              <Chip
                icon={<Phone />}
                label="Call Now"
                clickable
                color="primary"
                onClick={() => window.open('tel:+250788759351', '_blank')}
              />
              <Chip
                icon={<Email />}
                label="Email Us"
                clickable
                color="secondary"
                onClick={() => window.open('mailto:info@mubwizagarden.com', '_blank')}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Business Hours */}
      <Paper elevation={1} sx={{ p: 4, mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Business Hours
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" fontWeight="medium">
              Monday - Friday
            </Typography>
            <Typography variant="body2" color="text.secondary">
              8:00 AM - 6:00 PM
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" fontWeight="medium">
              Saturday
            </Typography>
            <Typography variant="body2" color="text.secondary">
              8:00 AM - 4:00 PM
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" fontWeight="medium">
              Sunday
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Closed
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" fontWeight="medium">
              Response Time
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Within 24 hours
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Contact;
