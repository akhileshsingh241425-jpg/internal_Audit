# 🚀 COMPLETE SETUP GUIDE - MySQL + Backend + Frontend

## ✅ MYSQL VERSION - NO MONGODB NEEDED!

---

## STEP 1: Install MySQL

### Option A: Install XAMPP (Easiest - Recommended)
1. Download XAMPP from: https://www.apachefriends.org/
2. Install XAMPP
3. Open XAMPP Control Panel
4. Click "Start" for **MySQL**
5. Click "Start" for **Apache** (optional, for phpMyAdmin)

### Option B: Install MySQL Standalone
1. Download MySQL from: https://dev.mysql.com/downloads/installer/
2. Install MySQL Server
3. During installation, set root password (or leave blank for default)
4. Make sure MySQL service is running

### Verify MySQL is Running:
Open Command Prompt/PowerShell:
```bash
mysql --version
```

You should see: `mysql  Ver 8.0.x`

---

## STEP 2: Create Database

### Method 1: Using phpMyAdmin (if using XAMPP)
1. Open browser: http://localhost/phpmyadmin
2. Click "New" on left sidebar
3. Database name: `gautam_solar_audit`
4. Click "Create"

### Method 2: Using MySQL Command Line
```bash
mysql -u root -p
# Press Enter (if no password set) or enter your password
```

Then run:
```sql
CREATE DATABASE gautam_solar_audit;
exit;
```

### Method 3: Let Sequelize Create It
Backend will auto-create database when it connects!

---

## STEP 3: Configure Backend

1. **Check .env file** (already configured):
```
D:\Gautam solar software\internal audit\backend\.env
```

Should contain:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=gautam_solar_audit
JWT_SECRET=gautam_solar_secret_key_2024_secure
JWT_EXPIRE=7d
NODE_ENV=development
```

**If your MySQL has a password**, update `DB_PASSWORD=your_password`

---

## STEP 4: Start Backend & Seed Database

Open **Terminal 1**:

```bash
# Navigate to backend
cd "D:\Gautam solar software\internal audit\backend"

# Create database tables and seed users
npm run seed

# Start backend server
npm start
```

You should see:
```
✅ MySQL Connected: localhost
✅ Database tables synced
✅ Users seeded successfully
Created 10 users
🚀 Server running in development mode on port 5000
```

Keep this terminal running!

---

## STEP 5: Start Frontend

Open **Terminal 2** (new terminal):

```bash
# Navigate to frontend
cd "D:\Gautam solar software\internal audit\my-react-app"

# Start React app
npm start
```

React will open automatically at: http://localhost:3000

---

## STEP 6: Login & Test!

Open browser: **http://localhost:3000**

### Login Credentials:

**Super Admin:**
- Username: `super`
- Password: `super123`

**Admin:**
- Username: `admin`
- Password: `admin123`

**Auditors (Team-A):**
- `nishant` / `nishant123`
- `nikhil` / `nikhil123`
- `himesh` / `himesh123`
- `dikhshant` / `dikhshant123`

**Auditors (Team-B):**
- `saumya` / `saumya123`
- `sahadat` / `sahadat123`
- `abhay` / `abhay123`
- `kanishk` / `kanishk123`

---

## 🎯 What's Connected:

✅ **Login System** → Uses backend API  
✅ **User Authentication** → JWT tokens  
✅ **MySQL Database** → All data stored in MySQL  
✅ **10 Users** → Ready to use  
✅ **Role-based Access** → SuperAdmin, Admin, Auditor  

---

## 📡 Test Backend APIs

### Test 1: Health Check
Open browser: http://localhost:5000/api/health

Should see:
```json
{
  "success": true,
  "message": "Gautam Solar Audit API is running"
}
```

### Test 2: Login API
Using curl or Postman:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"super\",\"password\":\"super123\"}"
```

Should return:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "super",
    "name": "Super Admin",
    "role": "superadmin"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 🔧 Troubleshooting

### Problem: "ECONNREFUSED" or "connect ECONNREFUSED"
**Solution:** MySQL is not running
- Open XAMPP → Start MySQL
- Or run: `net start MySQL80` (Windows)

### Problem: "Access denied for user 'root'@'localhost'"
**Solution:** Wrong MySQL password
- Edit `.env` file
- Update `DB_PASSWORD=your_actual_password`

### Problem: "ER_BAD_DB_ERROR: Unknown database"
**Solution:** Database not created
- Create database manually (see Step 2)
- Or let Sequelize create it (backend will auto-create)

### Problem: "Cannot GET /api/health" or CORS error
**Solution:** Backend not running
- Go to Terminal 1
- Run `npm start` in backend folder

### Problem: "Login failed. Please check backend server is running"
**Solution:** 
- Make sure backend is running on port 5000
- Check backend terminal for errors
- Verify MySQL is running

---

## 💾 Database Structure

After seeding, you'll have these tables:

1. **users** - 10 user accounts
2. **audits** - Audit records (empty initially)
3. **assignments** - Assignment records (empty initially)

### View Data in phpMyAdmin:
http://localhost/phpmyadmin → gautam_solar_audit

### Or use MySQL command:
```bash
mysql -u root -p
USE gautam_solar_audit;
SELECT * FROM users;
```

---

## 📂 Project Ports:

- **Backend API:** http://localhost:5000
- **Frontend App:** http://localhost:3000
- **MySQL:** localhost:3306
- **phpMyAdmin:** http://localhost/phpmyadmin (if using XAMPP)

---

## ✨ Quick Commands Reference:

### Backend:
```bash
cd backend
npm run seed      # Create users
npm start         # Start server
npm run dev       # Start with auto-reload (if installed nodemon)
```

### Frontend:
```bash
cd my-react-app
npm start         # Start React app
npm build         # Build for production
```

### MySQL:
```bash
# Start MySQL (Windows)
net start MySQL80

# Stop MySQL
net stop MySQL80

# Connect to MySQL
mysql -u root -p
```

---

## 🎉 You're All Set!

Your complete system is now running with:
- ✅ MySQL Database (no MongoDB!)
- ✅ Node.js + Express Backend
- ✅ React Frontend
- ✅ JWT Authentication
- ✅ 10 User Accounts
- ✅ Complete API Integration

**Both terminals must be running:**
- Terminal 1: Backend (port 5000)
- Terminal 2: Frontend (port 3000)

**Login at:** http://localhost:3000

Happy Auditing! 🌟

---

## 🔄 To Restart Later:

1. Make sure MySQL is running (XAMPP or MySQL service)
2. Open Terminal 1 → `cd backend` → `npm start`
3. Open Terminal 2 → `cd my-react-app` → `npm start`
4. Open browser → http://localhost:3000

That's it!
