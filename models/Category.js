const { Model, DataTypes } = require('sequelize');
//connect to mysql
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  
  {    
    sequelize,
    timestamps: false, //no timestamp included in table
    freezeTableName: true, //no plurals for table name
    underscored: true, //use snake case
    modelName: 'category',
  }
);

module.exports = Category;
