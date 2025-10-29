const Audit = require('../models/Audit');
const User = require('../models/User');
const { Op } = require('sequelize');

// @desc    Create new audit
// @route   POST /api/audits
// @access  Private
exports.createAudit = async (req, res) => {
  try {
    const auditData = {
      ...req.body,
      auditorId: req.user.id,
      auditorName: req.user.name
    };

    const audit = await Audit.create(auditData);

    res.status(201).json({
      success: true,
      data: audit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all audits
// @route   GET /api/audits
// @access  Private
exports.getAllAudits = async (req, res) => {
  try {
    const { auditType, plantLocation, status } = req.query;
    
    let where = {};
    
    // Filter by role
    if (req.user.role === 'auditor') {
      where.auditorId = req.user.id;
    }
    
    if (auditType) where.auditType = auditType;
    if (plantLocation) where.plantLocation = plantLocation;
    if (status) where.overallStatus = status;

    const audits = await Audit.findAll({
      where,
      include: [{
        model: User,
        as: 'auditor',
        attributes: ['id', 'name', 'email', 'role', 'team']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: audits.length,
      data: audits
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single audit
// @route   GET /api/audits/:id
// @access  Private
exports.getAudit = async (req, res) => {
  try {
    const audit = await Audit.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'auditor',
        attributes: ['id', 'name', 'email', 'role', 'team']
      }]
    });

    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    // Check if user has permission to view
    if (req.user.role === 'auditor' && audit.auditorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this audit' });
    }

    res.status(200).json({
      success: true,
      data: audit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update audit
// @route   PUT /api/audits/:id
// @access  Private
exports.updateAudit = async (req, res) => {
  try {
    const audit = await Audit.findByPk(req.params.id);

    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    // Check if user has permission to update
    if (req.user.role === 'auditor' && audit.auditorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this audit' });
    }

    await audit.update(req.body);

    res.status(200).json({
      success: true,
      data: audit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete audit
// @route   DELETE /api/audits/:id
// @access  Private/Admin/SuperAdmin
exports.deleteAudit = async (req, res) => {
  try {
    const audit = await Audit.findByPk(req.params.id);

    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    await audit.destroy();

    res.status(200).json({
      success: true,
      message: 'Audit deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Submit audit
// @route   POST /api/audits/:id/submit
// @access  Private
exports.submitAudit = async (req, res) => {
  try {
    const audit = await Audit.findByPk(req.params.id);

    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    // Check if user has permission
    if (req.user.role === 'auditor' && audit.auditorId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to submit this audit' });
    }

    await audit.update({
      overallStatus: 'submitted',
      submittedAt: new Date()
    });

    res.status(200).json({
      success: true,
      data: audit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get audit statistics
// @route   GET /api/audits/stats
// @access  Private
exports.getAuditStats = async (req, res) => {
  try {
    const { sequelize } = require('../config/database');
    
    const statusStats = await Audit.findAll({
      attributes: [
        'overallStatus',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['overallStatus']
    });

    const typeStats = await Audit.findAll({
      attributes: [
        'auditType',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['auditType']
    });

    res.status(200).json({
      success: true,
      data: {
        byStatus: statusStats,
        byType: typeStats
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// @desc    Create new audit
// @route   POST /api/audits
// @access  Private
exports.createAudit = async (req, res) => {
  try {
    const auditData = {
      ...req.body,
      auditor: req.user.id,
      auditorName: req.user.name
    };

    const audit = await Audit.create(auditData);

    res.status(201).json({
      success: true,
      data: audit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all audits
// @route   GET /api/audits
// @access  Private
exports.getAllAudits = async (req, res) => {
  try {
    const { auditType, plantLocation, status } = req.query;
    
    let query = {};
    
    // Filter by role
    if (req.user.role === 'auditor') {
      query.auditor = req.user.id;
    }
    
    if (auditType) query.auditType = auditType;
    if (plantLocation) query.plantLocation = plantLocation;
    if (status) query.overallStatus = status;

    const audits = await Audit.find(query)
      .populate('auditor', 'name email role team')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: audits.length,
      data: audits
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single audit
// @route   GET /api/audits/:id
// @access  Private
exports.getAudit = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id)
      .populate('auditor', 'name email role team');

    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    // Check if user has permission to view
    if (req.user.role === 'auditor' && audit.auditor._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this audit' });
    }

    res.status(200).json({
      success: true,
      data: audit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update audit
// @route   PUT /api/audits/:id
// @access  Private
exports.updateAudit = async (req, res) => {
  try {
    let audit = await Audit.findById(req.params.id);

    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    // Check if user has permission to update
    if (req.user.role === 'auditor' && audit.auditor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this audit' });
    }

    audit = await Audit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: audit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete audit
// @route   DELETE /api/audits/:id
// @access  Private/Admin/SuperAdmin
exports.deleteAudit = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id);

    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    await audit.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Audit deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Submit audit
// @route   POST /api/audits/:id/submit
// @access  Private
exports.submitAudit = async (req, res) => {
  try {
    let audit = await Audit.findById(req.params.id);

    if (!audit) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    // Check if user has permission
    if (req.user.role === 'auditor' && audit.auditor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to submit this audit' });
    }

    audit.overallStatus = 'submitted';
    audit.submittedAt = Date.now();
    await audit.save();

    res.status(200).json({
      success: true,
      data: audit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get audit statistics
// @route   GET /api/audits/stats
// @access  Private
exports.getAuditStats = async (req, res) => {
  try {
    const stats = await Audit.aggregate([
      {
        $group: {
          _id: '$overallStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    const typeStats = await Audit.aggregate([
      {
        $group: {
          _id: '$auditType',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        byStatus: stats,
        byType: typeStats
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
