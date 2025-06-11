# 🚀 Quick Start Guide - Mubwiza Garden

![Mubwiza Garden Quick Start](images/mubwiza%20background%20image.png)

*Get your digital garden marketplace running in just 5 minutes!*

![Quick Growth](images/seedlings%20in%20the%20garden.jpeg) ![Fast Results](images/tomato%20seedling.jpeg)

*From seedlings to success - let's get you started quickly!*

## 🎯 **GET RUNNING IN 5 MINUTES**

### **Step 1: Setup Database (Choose One)**

#### **Option A: XAMPP (Easiest)**
1. **Download XAMPP**: https://www.apachefriends.org/
2. **Install and open XAMPP Control Panel**
3. **Click "Start" for MySQL** (should show green "Running")
4. **Done!** ✅

#### **Option B: MySQL Community Server**
1. **Download MySQL**: https://dev.mysql.com/downloads/mysql/
2. **Install with default settings** (no root password)
3. **Start MySQL service** in Windows Services
4. **Done!** ✅

---

### **Step 2: Test Database Connection**
```bash
cd backend_garden
node test-db-connection.js
```

**Expected Output:**
```
✅ Basic MySQL connection successful!
✅ Database 'mubwiza_garden' ready!
✅ Database connection successful!
✅ Query successful!
🎉 All tests passed! Database is ready.
```

**If you see errors**, follow the solutions shown in the output.

---

### **Step 3: Start Backend**
```bash
cd backend_garden
npm run dev
```

**Expected Output:**
```
🌱 Starting Mubwiza Garden API...
✅ Database 'mubwiza_garden' created or already exists
✅ Database connected successfully
✅ All tables initialized successfully
🚀 Server running on port 5000
```

---

### **Step 4: Start Frontend**
```bash
cd frontend_garden
npm start
```

**Expected Output:**
```
Starting the development server...
Compiled successfully!
Local: http://localhost:3000
```

---

### **Step 5: Test Everything**

#### **🌐 Open Website:**
- **Visit**: http://localhost:3000
- **Should see**: Mubwiza Garden homepage with language switcher

#### **🔐 Test Admin Login:**
- **Click "Login"** in header
- **Email**: admin@mubwizagarden.com
- **Password**: admin123
- **Should see**: Admin panel access

#### **🌍 Test Language Switching:**
- **Click globe icon** in header
- **Try switching** between English, French, Kinyarwanda
- **Should see**: Instant translation

#### **💬 Test Chat Widget:**
- **Click floating chat button** (bottom right)
- **Try sending a message**
- **Should see**: Success message

---

## 🔧 **TROUBLESHOOTING**

### **❌ Backend Won't Start**

#### **"ECONNREFUSED" Error:**
```
❌ Database connection failed: connect ECONNREFUSED
```
**Solution**: MySQL is not running
- **XAMPP**: Start MySQL in control panel
- **Service**: Start MySQL80 service in Windows Services

#### **"Access denied" Error:**
```
❌ Database connection failed: Access denied for user 'root'
```
**Solution**: Wrong password
- **Edit `backend_garden/.env`**
- **Set correct password**: `DB_PASSWORD=your_password`

#### **Port 3306 in use:**
```
❌ Error: listen EADDRINUSE :::3306
```
**Solution**: Another MySQL is running
- **Stop other MySQL instances**
- **Or change port** in `.env`: `DB_PORT=3307`

---

### **❌ Frontend Issues**

#### **"Failed to fetch" Errors:**
**Solution**: Backend not running
- **Make sure backend is running** on port 5000
- **Check**: http://localhost:5000/api/health

#### **Language switching not working:**
**Solution**: Clear browser cache
- **Press Ctrl+F5** to hard refresh
- **Or clear browser cache**

---

## 🎉 **SUCCESS CHECKLIST**

### **✅ Backend Running:**
- [ ] MySQL service started
- [ ] Backend shows "Server running on port 5000"
- [ ] No connection errors in console
- [ ] http://localhost:5000/api/health returns OK

### **✅ Frontend Running:**
- [ ] Frontend shows "Compiled successfully"
- [ ] Website loads at http://localhost:3000
- [ ] Products and categories display
- [ ] Language switcher works

### **✅ Admin Features:**
- [ ] Can login with admin@mubwizagarden.com / admin123
- [ ] Admin panel accessible
- [ ] Can add/edit products
- [ ] Notifications working

### **✅ Communication Features:**
- [ ] Chat widget appears (floating button)
- [ ] Contact page loads with all info
- [ ] WhatsApp/phone links work
- [ ] Language switching works on all pages

---

## 🌟 **YOU'RE READY!**

![Success Garden](images/vegatebles%20in%20the%20garden.jpeg) ![Beautiful Results](images/flowers%20in%20garden%20in%20vase.jpeg) ![Fresh Products](images/strowberries.jpeg)

**Once all checkboxes are ✅, your Mubwiza Garden website is fully operational with:**

- 🌍 **Multi-language support** (English, French, Kinyarwanda)
- 🛒 **Complete e-commerce** functionality
- 👨‍💼 **Full admin panel** for management
- 💬 **Customer communication** system
- 📱 **Mobile-responsive** design
- 🔐 **Secure authentication** system

![Tea Products](images/mint%20tea.jpeg) ![Spices](images/tea%20spices.jpeg) ![Tomatoes](images/tomatoes.jpeg)

**Your garden business is now online and ready to serve customers! 🌱🚀**

---

## 📞 **NEED HELP?**

**If you encounter any issues:**

1. **Check the error message** - it usually tells you what's wrong
2. **Run the database test**: `node test-db-connection.js`
3. **Verify MySQL is running** - green status in XAMPP or Services
4. **Check the logs** - both backend and frontend show helpful errors
5. **Restart everything** - sometimes a fresh start helps

**Most issues are solved by ensuring MySQL is properly running! 💪**

---

## 🌹 **Congratulations!**

![Red Roses](images/red%20roses.jpeg) ![Growing Success](images/seedlings%20in%20the%20garden.jpeg)

*Your Mubwiza Garden is now blooming online! From seedlings to a full marketplace - you've done it!*

**Welcome to the digital gardening world! 🌱🌍**
