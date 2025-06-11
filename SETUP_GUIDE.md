# Mubwiza Garden - Setup Guide

![Mubwiza Garden](images/mubwiza%20background%20image.png)

*Welcome to Mubwiza Garden - Your Digital Garden Marketplace*

## Quick Start

### Prerequisites
1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)

### Frontend Setup (Already Running)
The React frontend is already running at: http://localhost:3000

### Backend Setup

1. **Install MySQL** (if not already installed)
   - Download and install MySQL from the official website
   - During installation, set a root password (remember this!)
   - Start the MySQL service

2. **Configure Database**
   ```bash
   # Open MySQL command line or MySQL Workbench
   mysql -u root -p

   # Create the database
   CREATE DATABASE mubwiza_garden;

   # Exit MySQL
   exit;
   ```

3. **Update Environment Variables**
   Edit `backend_garden/.env` file with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password_here
   DB_NAME=mubwiza_garden
   ```

4. **Start the Backend**
   ```bash
   cd backend_garden
   npm run dev
   ```

   The backend will automatically:
   - Create all necessary tables
   - Insert default categories
   - Create a default admin user

### Default Admin Account
- **Email**: admin@mubwizagarden.com
- **Password**: admin123

### Testing the Application

1. **Frontend**: http://localhost:3000
2. **Backend API**: http://localhost:5000/api
3. **Health Check**: http://localhost:5000/api/health

### Features Available

![Garden Products](images/vegatebles%20in%20the%20garden.jpeg) ![Fresh Strawberries](images/strowberries.jpeg)

#### For Customers:
- Browse products by category
- Search and filter products
- Add items to cart
- Create user account
- Place orders
- View order history

![Tomatoes](images/tomatoes.jpeg) ![Mint Tea](images/mint%20tea.jpeg)

#### For Admin:
- Add/edit/delete products
- Manage categories
- View all orders
- Update order status
- Upload product images

![Tea Spices](images/tea%20spices.jpeg)

### Troubleshooting

#### Backend Won't Start
1. Check if MySQL is running
2. Verify database credentials in `.env`
3. Ensure port 5000 is not in use

#### Frontend Issues
1. Clear browser cache
2. Check if port 3000 is available
3. Restart the development server

#### Database Connection Issues
1. Verify MySQL service is running
2. Check username/password in `.env`
3. Ensure database `mubwiza_garden` exists

### Project Structure

![Seedlings Growing](images/seedlings%20in%20the%20garden.jpeg) ![Tomato Seedling](images/tomato%20seedling.jpeg)

*Just like these seedlings, your project will grow and flourish!*

```
mubwiza_garden/
├── backend_garden/          # Node.js/Express API
│   ├── config/             # Database & app configuration
│   ├── controllers/        # Business logic
│   ├── middleware/         # Authentication & validation
│   ├── routes/            # API endpoints
│   ├── uploads/           # Product images
│   └── server.js          # Main server file
├── frontend_garden/        # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # State management
│   │   ├── services/      # API calls
│   │   └── styles/        # Themes & styling
│   └── public/            # Static assets
└── README.md              # Project documentation
```

### Next Steps

1. **Set up MySQL** and configure the backend
2. **Test the admin features** by logging in with the default admin account
3. **Add some products** through the admin panel
4. **Test the customer flow** by browsing and ordering products
5. **Customize the design** and add your own branding

### Security Features Implemented

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- Rate limiting
- Secure file uploads

### Payment Integration Note

As requested, payment processing is handled separately. Orders are created and tracked in the system, but actual payment collection should be arranged through your preferred payment method outside the application.

### Support

For any issues or questions, refer to the main README.md file or check the code comments for detailed explanations of each feature.

---

## 🌹 Congratulations!

![Beautiful Flowers](images/flowers%20in%20garden%20in%20vase.jpeg) ![Red Roses](images/red%20roses.jpeg)

*Your Mubwiza Garden is now ready to bloom! Just like these beautiful flowers, your digital marketplace will bring joy and prosperity.*

**Happy Gardening! 🌱**
