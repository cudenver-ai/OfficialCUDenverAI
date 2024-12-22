const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Resource = sequelize.define('Resource', {
  resource_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  resource_type: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
  upload_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
});

// Define relationships
Resource.associate = (models) => {
  Resource.belongsTo(models.User, { foreignKey: 'author_id' });
};

module.exports = Resource;