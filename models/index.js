// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  foreignKey: {  
    allowNull: true 
  },  
  //onDelete: 'SET NULL',
  hooks: true,
  //individualHooks: true
 /* onDelete: 'CASCADE',
  hooks: true,*/
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  hooks: true,
  /*onDelete: 'CASCADE',
  hooks: true,*/
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'tags'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'products'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
