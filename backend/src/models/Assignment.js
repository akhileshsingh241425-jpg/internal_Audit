const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Assignment = sequelize.define('Assignment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  auditorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  auditorName: {
    type: DataTypes.STRING(100)
  },
  auditorTeam: {
    type: DataTypes.STRING(50)
  },
  section: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  auditType: {
    type: DataTypes.ENUM('manufacturing', 'recordkeeping', 'excel'),
    allowNull: false
  },
  plantLocation: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  assignedById: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('assigned', 'in-progress', 'completed'),
    defaultValue: 'assigned'
  },
  assignedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'assignments',
  timestamps: true
});

module.exports = Assignment;
