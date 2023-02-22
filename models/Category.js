const { Model, DataTypes } = require('sequelize');

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
    /*
    hooks: {
      beforeDestroy: async (category) => {
        try {
          console.log("INSIDE BEFORE DESTROY");
          const updatedData = await Product.update(
            {
              category_id: null,
            },
            {
              where: {
                category_id: category.id,
              },
            }
            );
          return updatedData;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
      
    },
    */
    
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
