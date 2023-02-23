// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      validate : {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
      allowNull: true,
      
    }

  },
  {
    /* TESTING HOOKS
    hooks: {
      beforeCreate: async (product) => {
        try {
          console.log("HOOK Before CREATE");
          console.log(product);
        }
        catch {

        }
      }
    },
    */
    sequelize,
    timestamps: false, //no timestamps
    freezeTableName: true, //no plurals in table name
    underscored: true, //snake_case
    modelName: 'product',
  }
);

module.exports = Product;
