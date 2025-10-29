# MongoDB Installation Guide for Windows

## Method 1: Install MongoDB Community Server (Recommended)

### Step 1: Download MongoDB
1. Visit: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or higher)
   - Platform: Windows
   - Package: MSI
3. Click "Download"

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose "Complete" installation
3. **Important:** Check "Install MongoDB as a Service"
4. **Important:** Check "Install MongoDB Compass" (GUI tool)
5. Click "Install" and wait for completion

### Step 3: Verify Installation
Open PowerShell or Command Prompt:
```bash
mongod --version
```

You should see MongoDB version information.

### Step 4: Start MongoDB Service
MongoDB should start automatically. If not:
```bash
net start MongoDB
```

### Step 5: Test Connection
```bash
mongosh
```

You should see:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017
```

Type `exit` to quit mongosh.

---

## Method 2: Use MongoDB Atlas (Cloud - No Installation)

### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a free M0 cluster (512MB)

### Step 2: Configure Access
1. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Set username: `admin`
   - Set password: `admin123`
   - User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Whitelist IP Address:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

### Step 3: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password

### Step 4: Update Backend Configuration
Edit `backend/.env` file:
```env
MONGODB_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/gautam-solar-audit?retryWrites=true&w=majority
```

---

## Troubleshooting

### "mongod is not recognized"
**Solution:** Add MongoDB to PATH
1. Find MongoDB installation folder (usually `C:\Program Files\MongoDB\Server\7.0\bin`)
2. Add to System Environment Variables:
   - Right-click "This PC" → Properties
   - Click "Advanced system settings"
   - Click "Environment Variables"
   - Under "System variables", find "Path"
   - Click "Edit" → "New"
   - Add: `C:\Program Files\MongoDB\Server\7.0\bin`
   - Click OK on all dialogs
3. Restart PowerShell/Command Prompt

### "MongoDB service not starting"
**Solution 1:** Start manually
```bash
net start MongoDB
```

**Solution 2:** Create data directory
```bash
mkdir C:\data\db
mongod --dbpath C:\data\db
```

### "Connection timeout" or "ECONNREFUSED"
**Solutions:**
1. Check if MongoDB service is running:
   ```bash
   net start MongoDB
   ```
2. Check if port 27017 is available:
   ```bash
   netstat -an | findstr 27017
   ```
3. Try connecting to localhost explicitly:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/gautam-solar-audit
   ```

---

## Verify Backend Connection

After installing MongoDB:

1. **Navigate to backend:**
   ```bash
   cd "D:\Gautam solar software\internal audit\backend"
   ```

2. **Seed the database:**
   ```bash
   npm run seed
   ```

   You should see:
   ```
   MongoDB Connected
   Existing users cleared
   ✅ Users seeded successfully
   Created 10 users
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

   You should see:
   ```
   MongoDB Connected: 127.0.0.1
   🚀 Server running in development mode on port 5000
   ```

4. **Test API:**
   Open browser: http://localhost:5000/api/health

   You should see:
   ```json
   {
     "success": true,
     "message": "Gautam Solar Audit API is running",
     "timestamp": "..."
   }
   ```

---

## MongoDB Compass (GUI Tool)

If you installed MongoDB Compass:

1. Open "MongoDB Compass"
2. Connection string: `mongodb://localhost:27017`
3. Click "Connect"
4. You should see your `gautam-solar-audit` database
5. Browse collections: `users`, `audits`, `assignments`

---

## Quick Commands Reference

```bash
# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB

# Check if MongoDB is running
netstat -an | findstr 27017

# Connect to MongoDB shell
mongosh

# Seed database
npm run seed

# Start backend server
npm start

# Start backend in dev mode (auto-restart)
npm run dev
```

---

## Default Configuration

Your backend is configured with:
- **Port:** 5000
- **MongoDB URI:** mongodb://localhost:27017/gautam-solar-audit
- **Database Name:** gautam-solar-audit
- **JWT Secret:** gautam_solar_secret_key_2024_secure
- **JWT Expiry:** 7 days

All these can be changed in `backend/.env` file.

---

## Next Steps

Once MongoDB is installed and running:

1. ✅ Seed the database: `npm run seed`
2. ✅ Start backend: `npm start`
3. ✅ Test API: Visit http://localhost:5000/api/health
4. ✅ Start frontend: `cd ../my-react-app && npm start`
5. ✅ Login with credentials from QUICKSTART.md

---

## Need Help?

- **MongoDB Documentation:** https://docs.mongodb.com/manual/
- **MongoDB University:** https://university.mongodb.com/ (Free courses)
- **Community Forums:** https://www.mongodb.com/community/forums

---

**Recommendation:** For development, use local MongoDB installation. For production, use MongoDB Atlas (cloud).
