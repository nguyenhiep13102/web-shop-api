import { DataTypes } from 'sequelize';
import sequelize from '../configs/dbConnect.js';

const Image = sequelize.define('Image', {
    imageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        
       
    },
}, {
    timestamps: true,
    tableName: 'images',
});

export default Image;
