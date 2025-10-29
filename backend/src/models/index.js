const User = require('./User');
const Audit = require('./Audit');
const Assignment = require('./Assignment');

// Define associations
Audit.belongsTo(User, { foreignKey: 'auditorId', as: 'auditor' });
User.hasMany(Audit, { foreignKey: 'auditorId' });

Assignment.belongsTo(User, { foreignKey: 'auditorId', as: 'auditor' });
Assignment.belongsTo(User, { foreignKey: 'assignedById', as: 'assignedBy' });
User.hasMany(Assignment, { foreignKey: 'auditorId' });

module.exports = { User, Audit, Assignment };
