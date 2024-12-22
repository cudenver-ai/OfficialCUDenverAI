const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const EventRegistration = sequelize.define('EventRegistration', {
  registration_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define relationships
EventRegistration.associate = (models) => {
  EventRegistration.belongsTo(models.User, { foreignKey: 'user_id' });
  EventRegistration.belongsTo(models.Event, { foreignKey: 'event_id' });
};

module.exports = EventRegistration;