const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/users', protect, authorize('admin', 'superadmin'), getAllUsers);
router.put('/users/:id', protect, authorize('admin', 'superadmin'), updateUser);
router.delete('/users/:id', protect, authorize('superadmin'), deleteUser);

module.exports = router;
