# Mubwiza Garden - E-commerce Website

![Mubwiza Garden](images/mubwiza%20background%20image.png)

A full-stack e-commerce website for Mubwiza Garden, located in Rwanda's Northern Province at Muhabura Integrated Polytechnic College (MIPC). The website sells flowers, vegetables, fruits, tea spices, and seedlings.

![Garden Products](images/vegatebles%20in%20the%20garden.jpeg) ![Fresh Strawberries](images/strowberries.jpeg) ![Beautiful Flowers](images/flowers%20in%20garden%20in%20vase.jpeg)

## Features

### Frontend (React)
- Modern, responsive UI with garden-themed design
- Product catalog with search and filtering
- Shopping cart functionality
- User authentication and registration
- Admin dashboard for product management
- Mobile-friendly design

### Backend (Node.js + Express.js)
- RESTful API with JWT authentication
- Role-based access control (admin/customer)
- Product and category management
- Order processing
- Image upload handling
- Security features (rate limiting, input validation, etc.)

### Database (MySQL)
- Normalized database schema
- User management
- Product catalog
- Order tracking
- Category organization

## Tech Stack

- **Frontend**: React, Material-UI, React Router, Axios
- **Backend**: Node.js, Express.js, JWT, Bcrypt
- **Database**: MySQL
- **File Upload**: Multer
- **Security**: Helmet, CORS, Rate Limiting, Input Validation

## Project Structure

![Seedlings Growing](images/seedlings%20in%20the%20garden.jpeg) ![Tomato Seedling](images/tomato%20seedling.jpeg)

*Growing from seedlings to a full marketplace - just like our project structure!*

```
mubwiza_garden/
├── backend_garden/          # Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── uploads/           # Uploaded images
│   └── server.js          # Main server file
└── frontend_garden/        # React frontend
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── pages/         # Page components
    │   ├── context/       # React context
    │   ├── services/      # API services
    │   └── styles/        # Theme and styles
    └── public/            # Static assets
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend_garden
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env` file and update database credentials
   - Default database name: `mubwiza_garden`

4. Start MySQL server and create database:
   ```sql
   CREATE DATABASE mubwiza_garden;
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend_garden
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The website will be available at `http://localhost:3000`

## Default Admin Account

- **Email**: admin@mubwizagarden.com
- **Password**: admin123

## API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with pagination and filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get single order
- `PATCH /api/orders/:id/status` - Update order status (admin only)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- Rate limiting
- Secure headers with Helmet

## Payment Integration

The system is designed to handle payment arrangements separately, as requested. Orders are created and tracked, but payment processing is handled outside the system to avoid integrating multiple payment APIs.

## Database Schema

### Users Table
- User authentication and profile information
- Role-based access (customer/admin)

### Categories Table
- Product categorization
- Flowers, Vegetables, Fruits, Tea Spices, Seedlings

### Products Table
- Product information and inventory
- Image storage and pricing

### Orders Table
- Order tracking and customer information
- Order status management

### Order Items Table
- Individual items within orders
- Quantity and pricing details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please contact:
- Email: info@mubwizagarden.com
- Location: MIPC, Musanze District, Northern Province, Rwanda

---

## 🌹 Thank You for Visiting Mubwiza Garden!

![Red Roses](images/red%20roses.jpeg) ![Mint Tea](images/mint%20tea.jpeg) ![Tea Spices](images/tea%20spices.jpeg)

*From our garden to your table - fresh, organic, and full of love! 🌱*

**Happy Gardening! 🌿**
