const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public (or Admin/SuperAdmin only for production)
exports.register = async (req, res) => {
  try {
    const { username, password, name, email, role, team } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ 
      where: { 
        [require('sequelize').Op.or]: [{ username }, { email }] 
      } 
    });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      username,
      password,
      name,
      email,
      role: role || 'auditor',
      team
    });

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        team: user.team
      },
      token: generateToken(user.id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('Login attempt:', { username, password: '***' });

    // Validate input
    if (!username || !password) {
      console.log('Missing credentials');
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    // Check user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    console.log('User found:', user.username);

    // Check if user is active
    if (!user.isActive) {
      console.log('User inactive');
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    // Verify password
    const isPasswordMatch = await user.comparePassword(password);
    console.log('Password match:', isPasswordMatch);
    
    if (!isPasswordMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful for:', user.username);
    
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        team: user.team
      },
      token: generateToken(user.id)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin/SuperAdmin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/auth/users/:id
// @access  Private/Admin/SuperAdmin
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update(req.body);
    
    const updatedUser = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/auth/users/:id
// @access  Private/SuperAdmin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
