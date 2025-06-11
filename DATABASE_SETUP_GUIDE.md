# 🗄️ Database Setup Guide - Mubwiza Garden

![Mubwiza Garden Database](images/mubwiza%20background%20image.png)

*Setting up the foundation for your digital garden*

![Growing Foundation](images/seedlings%20in%20the%20garden.jpeg) ![Strong Roots](images/tomato%20seedling.jpeg)

*Just like these seedlings need good soil, your website needs a solid database foundation!*

## 🎯 **QUICK SETUP OPTIONS**

### **Option 1: XAMPP (Easiest - Recommended)**

#### **📥 Download & Install:**
1. **Download XAMPP**: https://www.apachefriends.org/
2. **Install XAMPP** with default settings
3. **Open XAMPP Control Panel**

#### **🚀 Start Services:**
1. **Click "Start"** next to **Apache**
2. **Click "Start"** next to **MySQL**
3. **Both should show green "Running" status**

#### **✅ Verify Setup:**
1. **Open browser** and go to `http://localhost/phpmyadmin`
2. **You should see phpMyAdmin interface**
3. **MySQL is now running!**

---

### **Option 2: MySQL Community Server**

#### **📥 Download & Install:**
1. **Download MySQL**: https://dev.mysql.com/downloads/mysql/
2. **Choose "MySQL Community Server"**
3. **Install with these settings:**
   - **Root Password**: Leave empty (or set one and update `.env`)
   - **Port**: 3306 (default)
   - **Start as Windows Service**: Yes

#### **🚀 Start Service:**
1. **Open Services**: Windows + R, type `services.msc`
2. **Find "MySQL80" service**
3. **Right-click → Start**

---

### **Option 3: Docker (Advanced)**

```bash
# Run MySQL in Docker
docker run --name mubwiza-mysql \
  -e MYSQL_ROOT_PASSWORD= \
  -e MYSQL_ALLOW_EMPTY_PASSWORD=yes \
  -e MYSQL_DATABASE=mubwiza_garden \
  -p 3306:3306 \
  -d mysql:8.0
```

---

## 🔧 **CONFIGURATION**

### **Current Database Settings:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=mubwiza_garden
```

### **If You Have Different Settings:**

#### **🔐 If you set a MySQL password:**
1. **Edit `backend_garden/.env`**
2. **Update line**: `DB_PASSWORD=your_password_here`

#### **🔌 If using different port:**
1. **Edit `backend_garden/.env`**
2. **Update line**: `DB_PORT=your_port_here`

#### **👤 If using different user:**
1. **Edit `backend_garden/.env`**
2. **Update line**: `DB_USER=your_username_here`

---

## 🚀 **START THE BACKEND**

### **1. Make Sure MySQL is Running**
- **XAMPP**: Green "Running" status for MySQL
- **MySQL Service**: Started in Windows Services
- **Docker**: Container is running

### **2. Navigate to Backend Directory**
```bash
cd backend_garden
```

### **3. Start the Server**
```bash
npm run dev
```

### **4. Expected Output:**
```
🌱 Starting Mubwiza Garden API...
✅ Database 'mubwiza_garden' created or already exists
✅ Database connected successfully
✅ All tables initialized successfully
🚀 Server running on port 5000
```

---

## 🔍 **TROUBLESHOOTING**

### **❌ "ECONNREFUSED" Error**
**Problem**: MySQL is not running
**Solution**:
- **XAMPP**: Start MySQL in control panel
- **Service**: Start MySQL80 service
- **Check port**: Ensure MySQL is on port 3306

### **❌ "Access denied" Error**
**Problem**: Wrong username/password
**Solution**:
- **Check `.env` file** credentials
- **Reset MySQL password** if needed
- **Use correct username** (usually 'root')

### **❌ "Unknown database" Error**
**Problem**: Database doesn't exist
**Solution**:
- **Backend will create it automatically**
- **Or manually create** in phpMyAdmin

### **❌ Port 3306 in use**
**Problem**: Another service using port 3306
**Solution**:
- **Stop other MySQL instances**
- **Change port** in MySQL config and `.env`
- **Use different port** like 3307

---

## 📊 **VERIFY DATABASE SETUP**

### **Option 1: phpMyAdmin (XAMPP)**
1. **Open**: `http://localhost/phpmyadmin`
2. **Look for**: `mubwiza_garden` database
3. **Should see tables**: users, products, categories, orders, messages

### **Option 2: MySQL Workbench**
1. **Download**: https://dev.mysql.com/downloads/workbench/
2. **Connect to**: localhost:3306
3. **Check database**: mubwiza_garden

### **Option 3: Command Line**
```bash
mysql -u root -p
SHOW DATABASES;
USE mubwiza_garden;
SHOW TABLES;
```

---

## 🎯 **WHAT HAPPENS WHEN BACKEND STARTS**

### **Automatic Setup:**
1. **✅ Creates Database** - `mubwiza_garden` if not exists
2. **✅ Creates Tables** - All required tables automatically
3. **✅ Seeds Admin User** - admin@mubwizagarden.com / admin123
4. **✅ Sample Data** - Categories and products if empty

### **Tables Created:**
- **👥 users** - User accounts and admin
- **📦 products** - Garden products
- **🏷️ categories** - Product categories
- **🛒 orders** - Customer orders
- **📝 order_items** - Order details
- **💬 messages** - Customer messages
- **🔔 notifications** - Admin notifications

---

## 🔐 **DEFAULT ADMIN ACCOUNT**

**After successful setup, you can login with:**
- **Email**: admin@mubwizagarden.com
- **Password**: admin123
- **Role**: Admin (full access)

---

## 📱 **TESTING THE SETUP**

### **1. Backend Health Check:**
```
GET http://localhost:5000/api/health
```
**Should return**: `{"status": "OK", "message": "Mubwiza Garden API is running"}`

### **2. Test Database Connection:**
```
GET http://localhost:5000/api/categories
```
**Should return**: List of categories

### **3. Test Admin Login:**
```
POST http://localhost:5000/api/users/login
{
  "email": "admin@mubwizagarden.com",
  "password": "admin123"
}
```
**Should return**: JWT token and user info

---

## 🎉 **SUCCESS INDICATORS**

![Successful Garden](images/vegatebles%20in%20the%20garden.jpeg) ![Flourishing Plants](images/tomatoes.jpeg)

### **✅ Backend Running Successfully:**
- **No connection errors** in console
- **All tables created** message
- **Server running on port 5000** message
- **Health endpoint** responds

### **✅ Frontend Connected:**
- **Products load** on website
- **Categories display** correctly
- **Admin login works**
- **No API errors** in browser console

---

## 🆘 **NEED HELP?**

### **Common Issues:**
1. **MySQL not installed** → Use XAMPP (easiest)
2. **Wrong password** → Check `.env` file
3. **Port conflicts** → Change port in config
4. **Service not running** → Start MySQL service

### **Quick Fix Commands:**
```bash
# Restart backend
npm run dev

# Check if MySQL is running (Windows)
netstat -an | findstr :3306

# Test database connection
mysql -u root -p -e "SHOW DATABASES;"
```

**Once MySQL is running, the backend will start successfully and create all necessary tables automatically!** 🚀

---

## 🌹 **Congratulations!**

![Beautiful Results](images/flowers%20in%20garden%20in%20vase.jpeg) ![Success](images/red%20roses.jpeg)

*Your database is now ready to bloom with data! Just like these beautiful flowers, your website will flourish with a solid foundation.*

**Happy Database Gardening! 🌱📊**
