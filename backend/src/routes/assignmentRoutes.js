const express = require('express');
const router = express.Router();
const {
  createAssignment,
  getAllAssignments,
  getAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentsByAuditor
} = require('../controllers/assignmentController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, authorize('superadmin'), createAssignment)
  .get(protect, getAllAssignments);

router.route('/:id')
  .get(protect, getAssignment)
  .put(protect, updateAssignment)
  .delete(protect, authorize('superadmin'), deleteAssignment);

router.get('/auditor/:auditorId', protect, getAssignmentsByAuditor);

module.exports = router;
