import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';

// Simple theme
const theme = {
  palette: {
    primary: {
      main: '#2E7D32',
    },
  },
};

// Simple Home component
const Home = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#2E7D32' }}>
        🌸 Mubwiza Garden 🌸
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Fresh flowers, vegetables, fruits, tea spices & quality seedlings from Rwanda
      </Typography>
    </Box>

    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
      <Box sx={{ textAlign: 'center', p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <img src="/images/flower 1.jpg" alt="Flowers" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
        <Typography variant="h6" sx={{ mt: 2 }}>🌺 Beautiful Flowers</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <img src="/images/vegatebles in the garden.jpeg" alt="Vegetables" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
        <Typography variant="h6" sx={{ mt: 2 }}>🥬 Fresh Vegetables</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <img src="/images/strowberries.jpeg" alt="Fruits" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
        <Typography variant="h6" sx={{ mt: 2 }}>🍓 Sweet Fruits</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <img src="/images/mint tea.jpeg" alt="Tea" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
        <Typography variant="h6" sx={{ mt: 2 }}>🍃 Aromatic Tea</Typography>
      </Box>
    </Box>

    <Box sx={{ textAlign: 'center', mt: 6, p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>📞 Contact Us</Typography>
      <Typography>📍 Muhabura Integrated Polytechnic College (MIPC), Musanze District, Rwanda</Typography>
      <Typography>📱 Instagram: @mubwiza_garden</Typography>
      <Typography>☎️ Phone: 0788759351</Typography>
    </Box>
  </Container>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#2E7D32' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🌱 Mubwiza Garden
          </Typography>
        </Toolbar>
      </AppBar>
      <Home />
    </ThemeProvider>
  );
}

export default App;
