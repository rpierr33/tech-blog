// import important parts of sequelize library
const { Model, DataTypes, DECIMAL } = require('sequelize');
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
      type: DataTypes.DECIMAL,
      allowNull: false,
      unique: true,
      validate: {
        isDecimal: true
      }
    },
    stock: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: 10,
      validate: {
        model: 'category',
        key:'id'
      }
    },
    // {
    //   product_name: "Basketball",
    //   price: 200.00,
    //   stock: 3,
    //   tagIds: [1, 2, 3, 4]
    // }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
