import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Fade,
  Slide,
  Zoom,
  Dialog,
  DialogContent,
  IconButton,
  Chip,
} from '@mui/material';
import { Close, LocalFlorist, Nature, Agriculture, Coffee, Spa } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { categories, products } from '../data/staticData';

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

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryRef, galleryVisible] = useScrollAnimation();
  const [categoriesRef, categoriesVisible] = useScrollAnimation();

  const categoryIcons = {
    'Flowers': <LocalFlorist />,
    'Vegetables': <Nature />,
    'Fruits': <Agriculture />,
    'Tea & Spices': <Coffee />,
    'Seedlings': <Spa />,
  };

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category_id === parseInt(selectedCategory))
    : products;

  const handleImageClick = (product) => {
    setSelectedImage(product);
  };

  const handleCloseDialog = () => {
    setSelectedImage(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Fade in timeout={1000}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            🌸 Our Garden Gallery 🌸
          </Typography>
        </Fade>
        <Fade in timeout={1500}>
          <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto',
              fontStyle: 'italic',
              fontSize: { xs: '1.1rem', md: '1.3rem' }
            }}
          >
            Discover the beauty of nature through our collection of fresh flowers, 
            organic vegetables, sweet fruits, aromatic spices, and healthy seedlings
          </Typography>
        </Fade>
      </Box>

      {/* Category Filter */}
      <Box ref={categoriesRef} sx={{ mb: 4 }}>
        <Slide direction="up" in={categoriesVisible} timeout={1000}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            <Chip
              label="All Categories"
              onClick={() => setSelectedCategory('')}
              color={selectedCategory === '' ? 'primary' : 'default'}
              variant={selectedCategory === '' ? 'filled' : 'outlined'}
              sx={{ 
                fontSize: '1rem', 
                py: 2, 
                px: 3,
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            />
            {categories.map((category) => (
              <Chip
                key={category.id}
                icon={categoryIcons[category.name]}
                label={category.name}
                onClick={() => setSelectedCategory(category.id.toString())}
                color={selectedCategory === category.id.toString() ? 'primary' : 'default'}
                variant={selectedCategory === category.id.toString() ? 'filled' : 'outlined'}
                sx={{ 
                  fontSize: '1rem', 
                  py: 2, 
                  px: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              />
            ))}
          </Box>
        </Slide>
      </Box>

      {/* Gallery Grid */}
      <Box ref={galleryRef}>
        <Grid container spacing={3}>
          {filteredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Zoom 
                in={galleryVisible} 
                timeout={1000 + index * 100}
                style={{ transitionDelay: galleryVisible ? `${index * 100}ms` : '0ms' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    },
                  }}
                  onClick={() => handleImageClick(product)}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={product.image_url}
                      alt={product.name}
                      sx={{
                        transition: 'transform 0.4s ease',
                        '&:hover': { transform: 'scale(1.1)' }
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                        color: 'white',
                        p: 2,
                        transform: 'translateY(100%)',
                        transition: 'transform 0.3s ease',
                        '.MuiCard-root:hover &': {
                          transform: 'translateY(0)',
                        },
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {product.category_name}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Image Dialog */}
      <Dialog
        open={!!selectedImage}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1,
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
            }}
          >
            <Close />
          </IconButton>
          {selectedImage && (
            <Box sx={{ position: 'relative' }}>
              <img
                src={selectedImage.image_url}
                alt={selectedImage.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: 'white',
                  p: 3,
                  borderRadius: '0 0 8px 8px',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  {selectedImage.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, opacity: 0.9 }}>
                  {selectedImage.description}
                </Typography>
                <Chip
                  icon={categoryIcons[selectedImage.category_name]}
                  label={selectedImage.category_name}
                  color="primary"
                  variant="filled"
                />
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Gallery;
