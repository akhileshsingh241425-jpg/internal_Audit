# Gautam Solar Internal Audit - Backend API

Professional Node.js + Express + MongoDB backend for the Gautam Solar Internal Audit Application.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (SuperAdmin, Admin, Auditor)
  - Password hashing with bcrypt
  - Secure token management

- **Audit Management**
  - Three audit types: Manufacturing, Record Keeping, Excel-based
  - CRUD operations for all audit types
  - Photo upload support
  - NCR (Non-Conformance Report) tracking
  - Audit status management
  - Statistics and analytics

- **Assignment System**
  - SuperAdmin can assign auditors to sections
  - Track assignment status
  - Plant location management (Haridwar, Badlyali)
  - Team-based assignment tracking

- **File Upload**
  - Image upload for audit evidence
  - Support for single and multiple files
  - File size limit: 10MB per file
  - Automatic file naming and storage

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   └── seed.js            # Database seeding script
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── auditController.js     # Audit management
│   │   ├── assignmentController.js # Assignment management
│   │   └── uploadController.js    # File upload handling
│   ├── middleware/
│   │   └── auth.js            # JWT verification & role authorization
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Audit.js           # Audit schema
│   │   └── Assignment.js      # Assignment schema
│   └── routes/
│       ├── authRoutes.js      # Auth endpoints
│       ├── auditRoutes.js     # Audit endpoints
│       ├── assignmentRoutes.js # Assignment endpoints
│       └── uploadRoutes.js    # Upload endpoints
├── uploads/                   # Uploaded files storage
├── .env                       # Environment variables
├── .gitignore
├── package.json
└── server.js                  # Main application file
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Steps

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file with the following:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/gautam-solar-audit
   JWT_SECRET=gautam_solar_secret_key_2024_secure
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   ```bash
   # Windows (if MongoDB is installed as service)
   net start MongoDB
   
   # Or run manually
   mongod
   ```

5. **Seed the database with initial users:**
   ```bash
   npm run seed
   ```

6. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

Server will run on `http://localhost:5000`

## 👥 Default User Accounts

After running the seed script, these accounts will be available:

| Role | Username | Password | Team |
|------|----------|----------|------|
| Super Admin | super | super123 | - |
| Admin | admin | admin123 | - |
| Auditor | nishant | nishant123 | Team-A |
| Auditor | nikhil | nikhil123 | Team-A |
| Auditor | himesh | himesh123 | Team-A |
| Auditor | dikhshant | dikhshant123 | Team-A |
| Auditor | saumya | saumya123 | Team-B |
| Auditor | sahadat | sahadat123 | Team-B |
| Auditor | abhay | abhay123 | Team-B |
| Auditor | kanishk | kanishk123 | Team-B |

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user | Private |
| GET | `/users` | Get all users | Admin/SuperAdmin |
| PUT | `/users/:id` | Update user | Admin/SuperAdmin |
| DELETE | `/users/:id` | Delete user | SuperAdmin |

### Audit Routes (`/api/audits`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create new audit | Private |
| GET | `/` | Get all audits | Private |
| GET | `/stats` | Get audit statistics | Private |
| GET | `/:id` | Get single audit | Private |
| PUT | `/:id` | Update audit | Private |
| DELETE | `/:id` | Delete audit | Admin/SuperAdmin |
| POST | `/:id/submit` | Submit audit | Private |

### Assignment Routes (`/api/assignments`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create assignment | SuperAdmin |
| GET | `/` | Get all assignments | Private |
| GET | `/:id` | Get single assignment | Private |
| PUT | `/:id` | Update assignment | Private |
| DELETE | `/:id` | Delete assignment | SuperAdmin |
| GET | `/auditor/:auditorId` | Get auditor's assignments | Private |

### Upload Routes (`/api/upload`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/single` | Upload single image | Private |
| POST | `/multiple` | Upload multiple images | Private |

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Login Example

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "super",
  "password": "super123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "username": "super",
    "name": "Super Admin",
    "email": "superadmin@gautamsolar.com",
    "role": "superadmin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 📝 Usage Examples

### Create Audit

```http
POST /api/audits
Authorization: Bearer <token>
Content-Type: application/json

{
  "auditType": "manufacturing",
  "plantLocation": "Haridwar",
  "sections": [
    {
      "sectionId": "section1",
      "sectionName": "Production Line",
      "items": [
        {
          "id": "item1",
          "question": "Are machines properly maintained?",
          "status": "ok",
          "remark": "All equipment in good condition"
        }
      ]
    }
  ]
}
```

### Create Assignment

```http
POST /api/assignments
Authorization: Bearer <super_admin_token>
Content-Type: application/json

{
  "auditorId": "...",
  "section": "Solar Cell Manufacturing",
  "auditType": "manufacturing",
  "plantLocation": "Haridwar"
}
```

### Upload Photo

```http
POST /api/upload/single
Authorization: Bearer <token>
Content-Type: multipart/form-data

photo: <file>
```

## 🔧 Development

### Run in Development Mode
```bash
npm run dev
```

This uses nodemon for auto-restart on file changes.

### Database Seeding
```bash
npm run seed
```

This will:
- Clear all existing users
- Create 10 default users (1 SuperAdmin, 1 Admin, 8 Auditors)
- Display all credentials in the console

## 🌐 CORS Configuration

By default, the backend accepts requests from `http://localhost:3000`. To change this, update the CORS configuration in `server.js` or set the `CLIENT_URL` environment variable.

## 📊 Database Schema

### User Model
- username (unique)
- password (hashed)
- name
- email (unique)
- role (superadmin/admin/auditor)
- team (Team-A/Team-B/null)
- isActive
- createdAt

### Audit Model
- auditType (manufacturing/recordkeeping/excel)
- auditor (ref: User)
- plantLocation
- date
- sections (array of sections with items)
- overallStatus (pending/in-progress/completed/submitted)
- submittedAt
- createdAt/updatedAt

### Assignment Model
- auditor (ref: User)
- section
- auditType
- plantLocation
- assignedBy (ref: User)
- status (assigned/in-progress/completed)
- assignedAt/completedAt

## 🚨 Error Handling

The API uses standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- File type validation for uploads
- File size limits
- Protected routes with middleware

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **multer** - File upload handling

## 🤝 Integration with Frontend

Update your React frontend to use these API endpoints:

1. Install axios in frontend:
   ```bash
   cd ../my-react-app
   npm install axios
   ```

2. Create an API service file:
   ```javascript
   import axios from 'axios';
   
   const API = axios.create({
     baseURL: 'http://localhost:5000/api'
   });
   
   // Add token to requests
   API.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   
   export default API;
   ```

3. Replace localStorage calls with API calls

## 📄 License

ISC

## 👨‍💻 Support

For issues or questions, please contact the development team.
