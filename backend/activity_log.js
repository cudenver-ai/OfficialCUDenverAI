const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ActivityLog = sequelize.define('ActivityLog', {
  log_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW,
  },
  activity: {
    type: DataTypes.TEXT,
  },
  meta_data: {
    type: DataTypes.JSONB,  // Use JSONB for PostgreSQL
  },
});

// Define relationships
ActivityLog.associate = (models) => {
  ActivityLog.belongsTo(models.User, { foreignKey: 'user_id' });
};

module.exports = ActivityLog;