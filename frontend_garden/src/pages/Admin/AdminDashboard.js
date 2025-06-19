import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Paper,
  Chip,
} from '@mui/material';
import {
  Dashboard,
  Inventory,
  Category,
  ShoppingCart,
  TrendingUp,
  People,
  Add,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { productsAPI, categoriesAPI, ordersAPI } from '../../services/api';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import OrderManagement from './OrderManagement';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, categoriesRes, ordersRes] = await Promise.all([
        productsAPI.getProducts({ limit: 1 }),
        categoriesAPI.getCategories(),
        ordersAPI.getAllOrders({ limit: 1 }),
      ]);

      setStats({
        totalProducts: productsRes.data.data.pagination?.total || 0,
        totalCategories: categoriesRes.data.data.categories?.length || 0,
        totalOrders: ordersRes.data.data.pagination?.total || 0,
        pendingOrders: 0, // We'll calculate this from orders
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <Inventory />,
      color: 'primary.main',
      action: () => setTabValue(1),
    },
    {
      title: 'Categories',
      value: stats.totalCategories,
      icon: <Category />,
      color: 'secondary.main',
      action: () => setTabValue(2),
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <ShoppingCart />,
      color: 'success.main',
      action: () => setTabValue(3),
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: <TrendingUp />,
      color: 'warning.main',
      action: () => setTabValue(3),
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your Mubwiza Garden products, categories, and orders
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={stat.action}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: stat.color,
                      color: 'white',
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" component="div">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" color={stat.color}>
                  {loading ? '...' : stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/admin/products/new')}
          >
            Add New Product
          </Button>
          <Button
            variant="outlined"
            startIcon={<Category />}
            onClick={() => setTabValue(2)}
          >
            Manage Categories
          </Button>
          <Button
            variant="outlined"
            startIcon={<ShoppingCart />}
            onClick={() => setTabValue(3)}
          >
            View Orders
          </Button>
        </Box>
      </Paper>

      {/* Management Tabs */}
      <Paper elevation={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="admin dashboard tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              icon={<Dashboard />}
              label="Overview"
              id="admin-tab-0"
              aria-controls="admin-tabpanel-0"
            />
            <Tab
              icon={<Inventory />}
              label="Products"
              id="admin-tab-1"
              aria-controls="admin-tabpanel-1"
            />
            <Tab
              icon={<Category />}
              label="Categories"
              id="admin-tab-2"
              aria-controls="admin-tabpanel-2"
            />
            <Tab
              icon={<ShoppingCart />}
              label="Orders"
              id="admin-tab-3"
              aria-controls="admin-tabpanel-3"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Welcome to Mubwiza Garden Admin Panel
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Use the tabs above to manage your products, categories, and orders.
              All changes will be immediately visible on your website.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Chip label="Real-time Updates" color="success" />
              <Chip label="Secure Management" color="primary" />
              <Chip label="Easy to Use" color="secondary" />
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <ProductManagement onStatsUpdate={fetchStats} />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <CategoryManagement onStatsUpdate={fetchStats} />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <OrderManagement onStatsUpdate={fetchStats} />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
