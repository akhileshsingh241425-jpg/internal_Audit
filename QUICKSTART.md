# 🚀 Quick Start Guide - Gautam Solar Audit System

## Complete Setup Instructions

### Step 1: Install MongoDB (if not already installed)

**Windows:**
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will start automatically as a Windows service

**Or use MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string and update `.env` file

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies (already done)
npm install

# Configure MongoDB connection (if using Atlas)
# Edit .env file and update MONGODB_URI

# Seed database with users
npm run seed

# Start backend server
npm start
```

Backend will run on: `http://localhost:5000`

### Step 3: Setup Frontend

```bash
# Navigate to frontend folder
cd ../my-react-app

# Install axios for API calls
npm install axios

# Start React app
npm start
```

Frontend will run on: `http://localhost:3000`

## 🔑 Login Credentials

After seeding the database, use these credentials:

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

## ✅ Testing the Backend

### Test 1: Health Check
```bash
curl http://localhost:5000/api/health
```

### Test 2: Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"super\",\"password\":\"super123\"}"
```

### Test 3: Get All Users (needs token from login)
```bash
curl http://localhost:5000/api/auth/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📁 Project Structure

```
internal audit/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── config/            # Database & seed
│   │   ├── controllers/       # Business logic
│   │   ├── middleware/        # Auth middleware
│   │   ├── models/            # MongoDB schemas
│   │   └── routes/            # API endpoints
│   ├── uploads/               # Uploaded photos
│   ├── .env                   # Environment variables
│   └── server.js              # Main server file
│
└── my-react-app/              # React frontend
    ├── src/
    │   ├── components/        # React components
    │   ├── data/              # Audit data
    │   └── App.js             # Main app
    └── public/
```

## 🔧 Backend API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/users` - Get all users (Admin+)

### Audits
- `POST /api/audits` - Create audit
- `GET /api/audits` - Get all audits
- `GET /api/audits/:id` - Get single audit
- `PUT /api/audits/:id` - Update audit
- `POST /api/audits/:id/submit` - Submit audit
- `GET /api/audits/stats` - Get statistics

### Assignments
- `POST /api/assignments` - Create assignment (SuperAdmin)
- `GET /api/assignments` - Get all assignments
- `GET /api/assignments/:id` - Get single assignment
- `PUT /api/assignments/:id` - Update assignment

### Uploads
- `POST /api/upload/single` - Upload single photo
- `POST /api/upload/multiple` - Upload multiple photos

## 🎯 Next Steps: Connect Frontend to Backend

The backend is ready! Now you need to:

1. **Install axios in React app:**
   ```bash
   cd my-react-app
   npm install axios
   ```

2. **Create API service file** (`src/services/api.js`):
   ```javascript
   import axios from 'axios';
   
   const API = axios.create({
     baseURL: 'http://localhost:5000/api'
   });
   
   API.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   
   export default API;
   ```

3. **Update Login component** to use API instead of hardcoded users

4. **Update Audit components** to save/load from backend

5. **Update Assignment Manager** to use backend API

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB service is running
- Check if MONGODB_URI in `.env` is correct
- Try: `net start MongoDB` (Windows)

### Port Already in Use
- Backend: Change PORT in `.env` file
- Frontend: It will ask to use different port automatically

### CORS Error
- Backend is configured to accept requests from `http://localhost:3000`
- If React runs on different port, update CORS in `server.js`

## 📊 Database Collections

After seeding, MongoDB will have these collections:
- `users` - All user accounts
- `audits` - Audit records (created when audits are performed)
- `assignments` - Assignment records (created by SuperAdmin)

## 🔐 Security Notes

- JWT tokens expire after 7 days
- Passwords are hashed with bcrypt
- Role-based access control implemented
- File uploads limited to 10MB
- Only image files allowed for uploads

## 📞 API Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 💡 Tips

1. Use Postman or Thunder Client (VS Code extension) to test APIs
2. Keep backend and frontend running simultaneously
3. Check browser console and terminal for errors
4. MongoDB Compass is useful for viewing database data

## 🎉 You're All Set!

Your complete audit system is now ready with:
- ✅ Professional Node.js backend
- ✅ MongoDB database
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ File upload support
- ✅ Complete REST API
- ✅ React frontend (needs API integration)

Happy auditing! 🌟
