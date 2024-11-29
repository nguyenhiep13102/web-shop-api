import { DataTypes } from 'sequelize';
import sequelize from '../configs/dbConnect.js';

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false, 
    },
    description: {
      type: DataTypes.TEXT, 
      allowNull: true, 
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false, 
    },
    stock_quantity: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0, 
    },
    category_id: {
      type: DataTypes.INTEGER, 
      allowNull: true, 
    },
    brand_id: {
      type: DataTypes.INTEGER, 
      allowNull: true, 
    },
    manufacturer_id: {
      type: DataTypes.INTEGER, 
      allowNull: true, 
    },
  },
  {
    timestamps: true, 
   
    tableName: 'products', 
  }
);

export default Product;

