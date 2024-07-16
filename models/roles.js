const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create a new Sequelize model for books
class Roles extends Model {}

Roles.init(
  // Define fields/columns on model
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
  {
    id: {
      type: DataTypes.NUMBER
    },
    name: {
      type: DataTypes.STRING
    },
    salary: {
      type: DataTypes.NUMBER
    },
    department_id: {
      type: DataTypes.NUMBER
    },
  },
  {
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    underscored: true,
    modelName: 'Roles'
  }
);

module.exports = Roles;
