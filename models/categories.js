import { DataTypes } from 'sequelize';
import sequelize from '../configs/dbConnect.js';

const Categories = sequelize.define('Categories', {
  categoriesID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name_categories: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'Categories',
});

export default Categories;
