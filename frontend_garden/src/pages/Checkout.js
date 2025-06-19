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
  Divider,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import { formatPriceSimple } from '../utils/currency';
import { toast } from 'react-toastify';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    customer_name: user ? `${user.first_name} ${user.last_name}` : '',
    customer_email: user ? user.email : '',
    customer_phone: user ? user.phone || '' : '',
    delivery_address: user ? user.address || '' : '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validate required fields
    if (!formData.customer_name || !formData.customer_email || !formData.delivery_address) {
      setError('Please fill in all required fields');
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone || '',
        delivery_address: formData.delivery_address,
        notes: formData.notes || '',
        total_amount: total,
      };

      console.log('Sending order data:', orderData);
      const response = await ordersAPI.createOrder(orderData);
      console.log('Order response:', response);

      if (response.data.success) {
        clearCart();
        toast.success('Order placed successfully!');
        navigate('/order-confirmation', {
          state: { order: response.data.data.order }
        });
      }
    } catch (error) {
      console.error('Order error:', error);
      const message = error.response?.data?.message || 'Failed to place order';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Add some products to your cart before checking out
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
            sx={{ px: 4 }}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Order Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Delivery Information
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="customer_email"
                      type="email"
                      value={formData.customer_email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="customer_phone"
                      value={formData.customer_phone}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Delivery Address"
                      name="delivery_address"
                      multiline
                      rows={3}
                      value={formData.delivery_address}
                      onChange={handleChange}
                      required
                      helperText="Please provide a complete address for delivery"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Order Notes (Optional)"
                      name="notes"
                      multiline
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      helperText="Any special instructions for your order"
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 100 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            <Box sx={{ mb: 2 }}>
              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">
                    {item.name} × {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    {formatPriceSimple(item.price * item.quantity)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                {formatPriceSimple(total)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={loading}
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Place Order'}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/cart')}
              disabled={loading}
            >
              Back to Cart
            </Button>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                💡 Payment will be arranged separately after order confirmation
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
