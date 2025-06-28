import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  Fade,
  Slide,
  Zoom,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  LocalFlorist,
  Nature,
  Agriculture,
  Coffee,
  Spa,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/staticData';

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

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [categoriesRef, categoriesVisible] = useScrollAnimation();
  const [gardenTitleRef, gardenTitleVisible] = useScrollAnimation();
  const [mainImageRef, mainImageVisible] = useScrollAnimation();
  const [sideImagesRef, sideImagesVisible] = useScrollAnimation();
  const [bottomRowRef, bottomRowVisible] = useScrollAnimation();



  const categoryIcons = {
    'Flowers': <LocalFlorist />,
    'Vegetables': <Nature />,
    'Fruits': <Agriculture />,
    'Tea & Spices': <Coffee />,
    'Seedlings': <Spa />,
  };

  const categoryImages = {
    'Flowers': '/images/flowers categories.jpg',
    'Vegetables': '/images/vegetables categories.jpg',
    'Fruits': '/images/fruits categories.jpg',
    'Tea & Spices': '/images/tea spices categories.jpg',
    'Seedlings': '/images/seedling categories.jpg',
  };

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 }, overflow: 'hidden' }}>
      {/* Hero Section */}
      <Fade in timeout={1500}>
        <Box
          sx={{
            position: 'relative',
            borderRadius: { xs: 2, md: 3 },
            color: 'white',
            p: { xs: 2, sm: 4, md: 6, lg: 8 },
            mb: { xs: 4, md: 6 },
            mx: { xs: 0, sm: 0 },
            textAlign: 'center',
            backgroundImage: 'url(/images/tomatoes.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: { xs: '50vh', md: '60vh' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
            boxSizing: 'border-box',
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' },
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.7) 0%, rgba(76, 175, 80, 0.7) 100%)',
              borderRadius: 3,
              zIndex: 1,
              transition: 'all 0.3s ease',
            },
            '&:hover::before': {
              background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.8) 0%, rgba(76, 175, 80, 0.8) 100%)',
            },
            '& > *': {
              position: 'relative',
              zIndex: 2,
            },
          }}
      >
        {/* Decorative elements */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 400,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontStyle: 'italic',
              mb: 1
            }}
          >
            🌱 Welcome To 🌱
          </Typography>
        </Box>

        <Slide direction="down" in timeout={2000}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              color: '#FFFFFF',
              textShadow: '3px 3px 6px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.6)',
              letterSpacing: '1px',
              lineHeight: 1.2,
              mb: 2,
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontStyle: 'italic',
              animation: 'glow 3s ease-in-out infinite alternate',
              '@keyframes glow': {
                '0%': { textShadow: '3px 3px 6px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.6)' },
                '100%': { textShadow: '3px 3px 6px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.6), 0 0 20px rgba(255,255,255,0.5)' },
              }
            }}
          >
            MUBWIZA GARDEN
          </Typography>
        </Slide>

        {/* Decorative divider */}
        <Zoom in timeout={2500}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <Box sx={{
              width: 50,
              height: 1,
              background: 'white',
              opacity: 0.8,
              animation: 'expand 2s ease-in-out infinite alternate',
              '@keyframes expand': {
                '0%': { width: 50 },
                '100%': { width: 70 },
              }
            }} />
            <Typography sx={{
              mx: 2,
              fontSize: '1.2rem',
              animation: 'bounce 2s ease-in-out infinite',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.2)' },
              }
            }}>🌸</Typography>
            <Box sx={{
              width: 50,
              height: 1,
              background: 'white',
              opacity: 0.8,
              animation: 'expand 2s ease-in-out infinite alternate',
              '@keyframes expand': {
                '0%': { width: 50 },
                '100%': { width: 70 },
              }
            }} />
          </Box>
        </Zoom>

        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontWeight: 400,
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            color: '#FFFFFF',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            lineHeight: 1.5,
            maxWidth: '700px',
            mx: 'auto',
            fontFamily: '"Open Sans", "Helvetica", sans-serif',
            fontStyle: 'italic',
            opacity: 0.95
          }}
        >
          {t('home.subtitle')}
        </Typography>
        <Box sx={{
          display: 'flex',
          gap: { xs: 1, sm: 2 },
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '100%',
          px: { xs: 1, sm: 0 }
        }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/gallery')}
            sx={{
              px: { xs: 2, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              minWidth: { xs: 'auto', sm: 'auto' },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: '0 10px 25px rgba(76, 175, 80, 0.4)',
              }
            }}
          >
            🌸 View Gallery
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/about')}
            sx={{
              px: { xs: 2, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              borderColor: 'white',
              color: 'white',
              minWidth: { xs: 'auto', sm: 'auto' },
              '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            {t('home.learnMore')}
          </Button>
        </Box>
        </Box>
      </Fade>

      {/* Categories Section */}
      <Box ref={categoriesRef} sx={{ mb: { xs: 4, md: 6 }, width: '100%', overflow: 'hidden' }}>
        <Fade in={categoriesVisible} timeout={1500}>
          <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{
            mb: { xs: 3, md: 4 },
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            px: { xs: 1, sm: 0 }
          }}>
            {t('home.categories')}
          </Typography>
        </Fade>
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ width: '100%', m: 0 }}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={category.id} sx={{ pl: { xs: 2, sm: 3 } }}>
              <Slide
                direction="up"
                in={categoriesVisible}
                timeout={1200 + index * 300}
                style={{ transitionDelay: categoriesVisible ? `${index * 200}ms` : '0ms' }}
              >
                <Box
                  onClick={() => navigate('/gallery')}
                  sx={{
                    position: 'relative',
                    height: 250,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 2,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.03)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={categoryImages[category.name] || '/images/mubwiza background image.png'}
                    alt={category.name}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                      color: 'white',
                      p: 1.5,
                    }}
                  >
                    <Typography variant="h6" sx={{
                      fontWeight: 900,
                      mb: 0.5,
                      color: '#FFFFFF',
                      textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)',
                      fontSize: '1.2rem',
                      letterSpacing: '0.8px'
                    }}>
                      {categoryIcons[category.name] && (
                        <Box component="span" sx={{
                          mr: 1,
                          fontSize: '1.3rem',
                          filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))'
                        }}>
                          {categoryIcons[category.name]}
                        </Box>
                      )}
                      {category.name}
                    </Typography>
                    <Typography variant="body2">
                      {category.description}
                    </Typography>
                  </Box>
                </Box>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Garden Gallery Section */}
      <Box sx={{ mb: 6 }}>
        <Box ref={gardenTitleRef}>
          <Fade in={gardenTitleVisible} timeout={1500}>
            <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ mb: 4 }}>
              {t('home.ourGarden')}
            </Typography>
          </Fade>
        </Box>
        <Grid container spacing={3}>
          {/* Main featured image */}
          <Grid item xs={12} md={8}>
            <Box ref={mainImageRef}>
              <Slide
                direction="up"
                in={mainImageVisible}
                timeout={1200}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: 400,
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: 3,
                  }}
                >
              <Box
                component="img"
                src="/images/vegatebles in the garden.jpeg"
                alt="Fresh Vegetables in Our Garden"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: 'white',
                  p: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  🥬 Fresh Organic Vegetables
                </Typography>
                <Typography variant="body2">
                  Grown with love in our sustainable garden
                </Typography>
              </Box>
                </Box>
              </Slide>
            </Box>
          </Grid>

          {/* Side images */}
          <Grid item xs={12} md={4}>
            <Box ref={sideImagesRef}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={12}>
                  <Slide
                    direction="up"
                    in={sideImagesVisible}
                    timeout={1400}
                    style={{ transitionDelay: sideImagesVisible ? '200ms' : '0ms' }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        height: 190,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 2,
                      }}
                    >
                  <Box
                    component="img"
                    src="/images/strowberries.jpeg"
                    alt="Fresh Strawberries"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                      color: 'white',
                      p: 1.5,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      🍓 Sweet Strawberries
                    </Typography>
                  </Box>
                    </Box>
                  </Slide>
                </Grid>
                <Grid item xs={6} md={12}>
                  <Slide
                    direction="up"
                    in={sideImagesVisible}
                    timeout={1400}
                    style={{ transitionDelay: sideImagesVisible ? '400ms' : '0ms' }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        height: 190,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 2,
                      }}
                    >
                  <Box
                    component="img"
                    src="/images/flowers in garden in vase.jpeg"
                    alt="Beautiful Flowers"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                      color: 'white',
                      p: 1.5,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      🌸 Beautiful Flowers
                    </Typography>
                  </Box>
                    </Box>
                  </Slide>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Bottom row */}
          <Grid item xs={12} md={4}>
            <Box ref={bottomRowRef}>
              <Slide
                direction="up"
                in={bottomRowVisible}
                timeout={1600}
                style={{ transitionDelay: bottomRowVisible ? '600ms' : '0ms' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: 250,
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 2,
                  }}
                >
              <Box
                component="img"
                src="/images/seedlings in the garden.jpeg"
                alt="Growing Seedlings"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                  color: 'white',
                  p: 1.5,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  🌱 Healthy Seedlings
                </Typography>
                <Typography variant="body2">
                  Ready for your garden
                </Typography>
              </Box>
                </Box>
              </Slide>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Slide
              direction="up"
              in={bottomRowVisible}
              timeout={1600}
              style={{ transitionDelay: bottomRowVisible ? '800ms' : '0ms' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: 250,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 2,
                }}
              >
              <Box
                component="img"
                src="/images/mint tea.jpeg"
                alt="Fresh Mint Tea"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                  color: 'white',
                  p: 1.5,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  🌿 Fresh Mint Tea
                </Typography>
                <Typography variant="body2">
                  Aromatic and refreshing
                </Typography>
              </Box>
              </Box>
            </Slide>
          </Grid>

          <Grid item xs={12} md={4}>
            <Slide
              direction="up"
              in={bottomRowVisible}
              timeout={1600}
              style={{ transitionDelay: bottomRowVisible ? '1000ms' : '0ms' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: 250,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 2,
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
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                  color: 'white',
                  p: 1.5,
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  🌹 Red Roses
                </Typography>
                <Typography variant="body2">
                  Perfect for special occasions
                </Typography>
              </Box>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Box>

      {/* View All Products Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          🌺 Explore Our Beautiful Gallery 🌺
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
          Discover the beauty of nature through our stunning collection of fresh flowers, organic vegetables, sweet fruits, aromatic teas, and healthy seedlings.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/gallery')}
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.1rem',
            borderRadius: 3,
            boxShadow: 3,
            background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-3px) scale(1.05)',
              background: 'linear-gradient(45deg, #1B5E20, #2E7D32)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          {t('home.viewAllProducts')}
        </Button>
      </Box>

      {/* About Section */}
      <Paper
        elevation={1}
        sx={{
          p: 4,
          mb: 6,
          background: 'linear-gradient(135deg, #F1F8E9 0%, #E8F5E8 100%)',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom color="primary.main">
              {t('home.aboutTitle')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
              {t('home.aboutText1')}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              {t('home.aboutText2')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: 300,
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src="/images/mubwiza background image.png"
                alt="Mubwiza Garden"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: 'white',
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6">
                  🌱 Growing Fresh & Natural 🌱
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;
