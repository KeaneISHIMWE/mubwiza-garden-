import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPriceSimple } from '../utils/currency';
import { toast } from 'react-toastify';
import { categories, products, getProductsByCategory, searchProducts } from '../data/staticData';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);

  const itemsPerPage = 12;

  useEffect(() => {
    filterProducts();
  }, [search, category, page]);

  const filterProducts = () => {
    let filtered = products;

    // Apply search filter
    if (search) {
      filtered = searchProducts(search);
    }

    // Apply category filter
    if (category) {
      filtered = filtered.filter(product => product.category_id === parseInt(category));
    }

    setFilteredProducts(filtered);

    // Update URL params
    const newParams = new URLSearchParams();
    if (search) newParams.set('search', search);
    if (category) newParams.set('category', category);
    if (page > 1) newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setPage(1);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom textAlign="center" sx={{ mb: 4 }}>
        Our Products
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search products"
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              onClick={clearFilters}
              fullWidth
            >
              Clear Filters
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} products found
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Active Filters */}
      {(search || category) && (
        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {search && (
            <Chip
              label={`Search: "${search}"`}
              onDelete={() => setSearch('')}
              color="primary"
              variant="outlined"
            />
          )}
          {category && (
            <Chip
              label={`Category: ${categories.find(c => c.id.toString() === category)?.name}`}
              onDelete={() => setCategory('')}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
      )}

      {/* Products Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : currentProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or browse all products
          </Typography>
          <Button
            variant="contained"
            onClick={clearFilters}
            sx={{ mt: 2 }}
          >
            View All Products
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {currentProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    borderRadius: 3,
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={product.image_url}
                      alt={product.name}
                      sx={{
                        objectFit: 'contain',
                        backgroundColor: '#f5f5f5',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                    />
                    {product.is_featured && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
                          color: 'white',
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          boxShadow: 2,
                        }}
                      >
                        ⭐ Featured
                      </Box>
                    )}
                  </Box>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                      {product.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip
                        label={product.category_name}
                        size="small"
                        sx={{
                          backgroundColor: 'primary.light',
                          color: 'primary.contrastText',
                          fontWeight: 500
                        }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        flexGrow: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.5
                      }}
                    >
                      {product.description}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
                        {formatPriceSimple(product.price)}
                      </Typography>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Stock
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {product.stock_quantity}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock_quantity === 0}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        background: product.stock_quantity === 0
                          ? 'grey.400'
                          : 'linear-gradient(45deg, #4CAF50, #66BB6A)',
                        '&:hover': {
                          background: product.stock_quantity === 0
                            ? 'grey.400'
                            : 'linear-gradient(45deg, #388E3C, #4CAF50)',
                        }
                      }}
                    >
                      {product.stock_quantity === 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Products;
