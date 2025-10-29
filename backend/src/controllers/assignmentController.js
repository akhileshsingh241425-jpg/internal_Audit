const Assignment = require('../models/Assignment');
const User = require('../models/User');

// @desc    Create new assignment
// @route   POST /api/assignments
// @access  Private/SuperAdmin
exports.createAssignment = async (req, res) => {
  try {
    const { auditorId, section, auditType, plantLocation } = req.body;

    // Get auditor details
    const auditor = await User.findByPk(auditorId);
    if (!auditor) {
      return res.status(404).json({ message: 'Auditor not found' });
    }

    const assignment = await Assignment.create({
      auditorId,
      auditorName: auditor.name,
      auditorTeam: auditor.team,
      section,
      auditType,
      plantLocation,
      assignedById: req.user.id
    });

    res.status(201).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all assignments
// @route   GET /api/assignments
// @access  Private
exports.getAllAssignments = async (req, res) => {
  try {
    let where = {};
    
    // Auditors can only see their own assignments
    if (req.user.role === 'auditor') {
      where.auditorId = req.user.id;
    }

    const assignments = await Assignment.findAll({
      where,
      include: [
        {
          model: User,
          as: 'auditor',
          attributes: ['id', 'name', 'email', 'role', 'team']
        },
        {
          model: User,
          as: 'assignedBy',
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['assignedAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get assignment by ID
// @route   GET /api/assignments/:id
// @access  Private
exports.getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'auditor',
          attributes: ['id', 'name', 'email', 'role', 'team']
        },
        {
          model: User,
          as: 'assignedBy',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check if user has permission
    if (req.user.role === 'auditor' && assignment.auditorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this assignment' });
    }

    res.status(200).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update assignment status
// @route   PUT /api/assignments/:id
// @access  Private
exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Auditors can update their own assignments
    if (req.user.role === 'auditor' && assignment.auditorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this assignment' });
    }

    // If status is being changed to completed, set completedAt
    if (req.body.status === 'completed' && assignment.status !== 'completed') {
      req.body.completedAt = new Date();
    }

    await assignment.update(req.body);

    const updatedAssignment = await Assignment.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'auditor',
        attributes: ['id', 'name', 'email', 'role', 'team']
      }]
    });

    res.status(200).json({
      success: true,
      data: updatedAssignment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
// @access  Private/SuperAdmin
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByPk(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    await assignment.destroy();

    res.status(200).json({
      success: true,
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get assignments by auditor
// @route   GET /api/assignments/auditor/:auditorId
// @access  Private
exports.getAssignmentsByAuditor = async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      where: { auditorId: req.params.auditorId },
      include: [{
        model: User,
        as: 'assignedBy',
        attributes: ['id', 'name', 'email']
      }],
      order: [['assignedAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// @desc    Create new assignment
// @route   POST /api/assignments
// @access  Private/SuperAdmin
exports.createAssignment = async (req, res) => {
  try {
    const { auditorId, section, auditType, plantLocation } = req.body;

    // Get auditor details
    const auditor = await User.findById(auditorId);
    if (!auditor) {
      return res.status(404).json({ message: 'Auditor not found' });
    }

    const assignment = await Assignment.create({
      auditor: auditorId,
      auditorName: auditor.name,
      auditorTeam: auditor.team,
      section,
      auditType,
      plantLocation,
      assignedBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all assignments
// @route   GET /api/assignments
// @access  Private
exports.getAllAssignments = async (req, res) => {
  try {
    let query = {};
    
    // Auditors can only see their own assignments
    if (req.user.role === 'auditor') {
      query.auditor = req.user.id;
    }

    const assignments = await Assignment.find(query)
      .populate('auditor', 'name email role team')
      .populate('assignedBy', 'name email')
      .sort('-assignedAt');

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get assignment by ID
// @route   GET /api/assignments/:id
// @access  Private
exports.getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('auditor', 'name email role team')
      .populate('assignedBy', 'name email');

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check if user has permission
    if (req.user.role === 'auditor' && assignment.auditor._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this assignment' });
    }

    res.status(200).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update assignment status
// @route   PUT /api/assignments/:id
// @access  Private
exports.updateAssignment = async (req, res) => {
  try {
    let assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Auditors can update their own assignments
    if (req.user.role === 'auditor' && assignment.auditor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this assignment' });
    }

    // If status is being changed to completed, set completedAt
    if (req.body.status === 'completed' && assignment.status !== 'completed') {
      req.body.completedAt = Date.now();
    }

    assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('auditor', 'name email role team');

    res.status(200).json({
      success: true,
      data: assignment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
// @access  Private/SuperAdmin
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    await assignment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Assignment deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get assignments by auditor
// @route   GET /api/assignments/auditor/:auditorId
// @access  Private
exports.getAssignmentsByAuditor = async (req, res) => {
  try {
    const assignments = await Assignment.find({ auditor: req.params.auditorId })
      .populate('assignedBy', 'name email')
      .sort('-assignedAt');

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
