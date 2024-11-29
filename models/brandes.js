import { DataTypes } from 'sequelize';
import sequelize from '../configs/dbConnect.js'; // Kết nối cơ sở dữ liệu

const Brand = sequelize.define(
  'Brand',
  {
    id_Brand: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name_Brand: {
      type: DataTypes.STRING, // NVARCHAR(255) trong SQL
      allowNull: false, // NOT NULL
    },
    description_Brand: {
      type: DataTypes.TEXT, // NVARCHAR(MAX) trong SQL
      allowNull: true, // Có thể để trống
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    tableName: 'brands', // Đảm bảo tên bảng là `brands`
  }
);

export default Brand;
