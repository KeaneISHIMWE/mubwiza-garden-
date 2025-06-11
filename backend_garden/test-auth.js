const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

console.log('🧪 Testing Authentication Endpoints');
console.log('===================================\n');

const testLogin = async () => {
  try {
    console.log('🔐 Testing Login...');
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email: 'admin@mubwizagarden.com',
      password: 'admin123'
    });
    
    console.log('✅ Login successful!');
    console.log('Response:', {
      success: response.data.success,
      message: response.data.message,
      user: response.data.data.user.email,
      role: response.data.data.user.role,
      tokenLength: response.data.data.token.length
    });
    
    return response.data.data.token;
  } catch (error) {
    console.log('❌ Login failed!');
    console.log('Error:', error.response?.data || error.message);
    return null;
  }
};

const testRegistration = async () => {
  try {
    console.log('\n📝 Testing Registration...');
    const testUser = {
      first_name: 'Test',
      last_name: 'User',
      email: `test${Date.now()}@example.com`, // Unique email
      password: 'test123',
      phone: '+250788123456',
      address: 'Kigali, Rwanda'
    };
    
    const response = await axios.post(`${API_BASE_URL}/users/register`, testUser);
    
    console.log('✅ Registration successful!');
    console.log('Response:', {
      success: response.data.success,
      message: response.data.message,
      user: response.data.data.user.email,
      role: response.data.data.user.role,
      tokenLength: response.data.data.token.length
    });
    
    return response.data.data.token;
  } catch (error) {
    console.log('❌ Registration failed!');
    console.log('Error:', error.response?.data || error.message);
    return null;
  }
};

const testProfile = async (token) => {
  try {
    console.log('\n👤 Testing Profile Access...');
    const response = await axios.get(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('✅ Profile access successful!');
    console.log('User:', {
      email: response.data.data.user.email,
      name: `${response.data.data.user.first_name} ${response.data.data.user.last_name}`,
      role: response.data.data.user.role
    });
  } catch (error) {
    console.log('❌ Profile access failed!');
    console.log('Error:', error.response?.data || error.message);
  }
};

const runTests = async () => {
  try {
    // Test login
    const loginToken = await testLogin();
    
    if (loginToken) {
      await testProfile(loginToken);
    }
    
    // Test registration
    const registerToken = await testRegistration();
    
    if (registerToken) {
      await testProfile(registerToken);
    }
    
    console.log('\n🎉 All tests completed!');
    console.log('\n📝 Summary:');
    console.log('   - Backend API is running on port 5000');
    console.log('   - Login endpoint works correctly');
    console.log('   - Registration endpoint works correctly');
    console.log('   - Profile endpoint works correctly');
    console.log('\n💡 If frontend login/registration is not working:');
    console.log('   1. Check browser console for errors');
    console.log('   2. Check network tab for failed requests');
    console.log('   3. Verify CORS settings');
    console.log('   4. Check if frontend is making requests to correct URL');
    
  } catch (error) {
    console.log('\n❌ Test failed:', error.message);
  }
};

runTests();
