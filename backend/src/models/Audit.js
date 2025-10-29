const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Audit = sequelize.define('Audit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  auditType: {
    type: DataTypes.ENUM('manufacturing', 'recordkeeping', 'excel'),
    allowNull: false
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
  plantLocation: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  sections: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  overallStatus: {
    type: DataTypes.ENUM('pending', 'in-progress', 'completed', 'submitted'),
    defaultValue: 'pending'
  },
  submittedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'audits',
  timestamps: true
});

module.exports = Audit;
