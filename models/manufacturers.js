import { DataTypes } from 'sequelize';
import sequelize from '../configs/dbConnect.js'; // Kết nối cơ sở dữ liệu

const Manufacturer = sequelize.define(
  'Manufacturer',
  {
    id_Manufacturer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_Manufacturer: {
      type: DataTypes.STRING, 
      allowNull: false, 
    },
    address: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    contact_info: {
      type: DataTypes.STRING, 
      allowNull: true, 
    },
  },
  {
    timestamps: true, 
    tableName: 'manufacturers', 
  }
);

export default Manufacturer;
