const express = require('express');
const router = express.Router();
const {
  createAudit,
  getAllAudits,
  getAudit,
  updateAudit,
  deleteAudit,
  submitAudit,
  getAuditStats
} = require('../controllers/auditController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, createAudit)
  .get(protect, getAllAudits);

router.get('/stats', protect, getAuditStats);

router.route('/:id')
  .get(protect, getAudit)
  .put(protect, updateAudit)
  .delete(protect, authorize('admin', 'superadmin'), deleteAudit);

router.post('/:id/submit', protect, submitAudit);

module.exports = router;
