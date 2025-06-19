import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Fade,
  Slide,
} from '@mui/material';
import {
  LocalFlorist,
  LocationOn,
  Phone,
  Email,
  Nature,
  Agriculture,
  Coffee,
  Spa,
  Group,
  Star,
  Recycling,
} from '@mui/icons-material';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

const About = () => {
  const [valuesRef, valuesVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [storyRef, storyVisible] = useScrollAnimation();

  const features = [
    {
      icon: <LocalFlorist />,
      title: 'Fresh Flowers',
      description: 'Beautiful, fresh flowers for all occasions - from decorations to gifts.',
    },
    {
      icon: <Nature />,
      title: 'Organic Vegetables',
      description: 'Locally grown, organic vegetables harvested at peak freshness.',
    },
    {
      icon: <Agriculture />,
      title: 'Seasonal Fruits',
      description: 'Fresh, seasonal fruits grown with care in our gardens.',
    },
    {
      icon: <Coffee />,
      title: 'Tea & Spices',
      description: 'Aromatic tea and spices to enhance your culinary experience.',
    },
    {
      icon: <Spa />,
      title: 'Quality Seedlings',
      description: 'Healthy seedlings to help you start your own garden.',
    },
  ];

  const values = [
    {
      icon: <Recycling />,
      title: 'Sustainability',
      description: 'We practice sustainable farming methods that protect our environment for future generations.',
      color: '#4CAF50'
    },
    {
      icon: <Group />,
      title: 'Community',
      description: "We're committed to supporting our local community and contributing to Rwanda's agricultural development.",
      color: '#2196F3'
    },
    {
      icon: <Star />,
      title: 'Quality',
      description: 'We ensure the highest quality in all our products, from seed to harvest to your table.',
      color: '#FF9800'
    }
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
          borderRadius: 3,
          color: 'white',
          p: 6,
          mb: 6,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          About Mubwiza Garden
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9 }}>
          Growing fresh, natural products in the heart of Rwanda
        </Typography>
      </Box>

      {/* Story Section */}
      <Box ref={storyRef} sx={{ mb: 6 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Fade in={storyVisible} timeout={1000}>
              <Box>
                <Typography variant="h4" component="h2" gutterBottom color="primary.main">
                  Our Story
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                  Mubwiza Garden is located in the beautiful Northern Province of Rwanda,
                  specifically in Musanze District at the Muhabura Integrated Polytechnic
                  College (MIPC). Our garden represents a commitment to sustainable
                  agriculture and providing fresh, quality products to our community.
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                  We specialize in growing a diverse range of products including beautiful
                  flowers for decoration and gifts, fresh organic vegetables and fruits,
                  aromatic tea and spices, and quality seedlings for those who want to
                  start their own gardens.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                  Our mission is to provide the freshest, highest quality garden products
                  while supporting sustainable farming practices and contributing to the
                  local community's well-being.
                </Typography>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Slide direction="left" in={storyVisible} timeout={1200}>
              <Box
                sx={{
                  height: 400,
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src="/images/red roses.jpeg"
                  alt="Beautiful Red Roses"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 2,
                  }}
                />
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Box>

      {/* Features Section */}
      <Box ref={featuresRef} sx={{ mb: 6 }}>
        <Fade in={featuresVisible} timeout={1000}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
            What We Offer
          </Typography>
        </Fade>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Slide
                direction="up"
                in={featuresVisible}
                timeout={800 + index * 200}
                style={{ transitionDelay: featuresVisible ? `${index * 150}ms` : '0ms' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: 'primary.main', mb: 2, fontSize: '3rem' }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Location & Contact Section */}
      <Paper
        elevation={1}
        sx={{
          p: 4,
          mb: 6,
          background: 'linear-gradient(135deg, #F1F8E9 0%, #E8F5E8 100%)',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom textAlign="center" color="primary.main">
          Visit Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LocationOn sx={{ color: 'primary.main', mr: 2, fontSize: 30 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Location
                </Typography>
                <Typography variant="body1">
                  Muhabura Integrated Polytechnic College (MIPC)<br />
                  Musanze District<br />
                  Northern Province, Rwanda
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Phone sx={{ color: 'primary.main', mr: 2, fontSize: 30 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Phone
                </Typography>
                <Typography variant="body1">
                  +250 788 759 351
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email sx={{ color: 'primary.main', mr: 2, fontSize: 30 }} />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography variant="body1">
                  info@mubwizagarden.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Why Choose Mubwiza Garden?
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Fresh, locally grown products
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Sustainable farming practices
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Supporting local community
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Quality guaranteed
              </Typography>
              <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                Convenient online ordering
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Values Section */}
      <Box ref={valuesRef} sx={{ mb: 6 }}>
        <Fade in={valuesVisible} timeout={1200}>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" color="primary.main" sx={{ mb: 5 }}>
            Our Values
          </Typography>
        </Fade>
        <Grid container spacing={4}>
          {values.map((value, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Slide
                direction="up"
                in={valuesVisible}
                timeout={1000 + index * 300}
                style={{ transitionDelay: valuesVisible ? `${index * 200}ms` : '0ms' }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${value.color}15 0%, ${value.color}08 100%)`,
                    border: `2px solid ${value.color}20`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 24px ${value.color}30`,
                      border: `2px solid ${value.color}40`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${value.color} 0%, ${value.color}CC 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      color: 'white',
                      fontSize: '2.5rem',
                      boxShadow: `0 8px 16px ${value.color}40`,
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: value.color,
                      mb: 2
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.6,
                      color: 'text.secondary'
                    }}
                  >
                    {value.description}
                  </Typography>
                </Paper>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
