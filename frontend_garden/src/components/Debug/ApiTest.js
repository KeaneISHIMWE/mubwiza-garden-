import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Alert,
  TextField,
  Grid,
} from '@mui/material';
import { authAPI } from '../../services/api';

const ApiTest = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [testCredentials, setTestCredentials] = useState({
    email: 'admin@mubwizagarden.com',
    password: 'admin123'
  });

  const addResult = (test, success, data) => {
    setResults(prev => [...prev, {
      test,
      success,
      data,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const testLogin = async () => {
    setLoading(true);
    try {
      console.log('🧪 Testing login API...');
      const response = await authAPI.login(testCredentials);
      addResult('Login Test', true, response.data);
    } catch (error) {
      addResult('Login Test', false, error.response?.data || error.message);
    }
    setLoading(false);
  };

  const testRegistration = async () => {
    setLoading(true);
    try {
      console.log('🧪 Testing registration API...');
      const testUser = {
        first_name: 'Test',
        last_name: 'User',
        email: `test${Date.now()}@example.com`,
        password: 'test123',
        phone: '+250788123456',
        address: 'Kigali, Rwanda'
      };
      
      const response = await authAPI.register(testUser);
      addResult('Registration Test', true, response.data);
    } catch (error) {
      addResult('Registration Test', false, error.response?.data || error.message);
    }
    setLoading(false);
  };

  const testApiConnection = async () => {
    setLoading(true);
    try {
      console.log('🧪 Testing API connection...');
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      addResult('API Connection Test', response.ok, data);
    } catch (error) {
      addResult('API Connection Test', false, error.message);
    }
    setLoading(false);
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        🧪 API Debug Test Panel
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Test Credentials
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={testCredentials.email}
              onChange={(e) => setTestCredentials(prev => ({ ...prev, email: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={testCredentials.password}
              onChange={(e) => setTestCredentials(prev => ({ ...prev, password: e.target.value }))}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          API Tests
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={testApiConnection}
            disabled={loading}
          >
            Test API Connection
          </Button>
          <Button
            variant="contained"
            onClick={testLogin}
            disabled={loading}
          >
            Test Login
          </Button>
          <Button
            variant="contained"
            onClick={testRegistration}
            disabled={loading}
          >
            Test Registration
          </Button>
          <Button
            variant="outlined"
            onClick={clearResults}
            disabled={loading}
          >
            Clear Results
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Test Results
        </Typography>
        {results.length === 0 ? (
          <Typography color="text.secondary">
            No tests run yet. Click a test button above.
          </Typography>
        ) : (
          results.map((result, index) => (
            <Alert
              key={index}
              severity={result.success ? 'success' : 'error'}
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle2">
                {result.test} - {result.timestamp}
              </Typography>
              <Typography variant="body2" component="pre" sx={{ mt: 1, fontSize: '0.8rem' }}>
                {JSON.stringify(result.data, null, 2)}
              </Typography>
            </Alert>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default ApiTest;
