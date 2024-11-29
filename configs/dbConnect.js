// dbConnect.js

import  Sequelize  from "sequelize";
import dotenv from "dotenv";

// Tải các biến môi trường từ file .env
dotenv.config();

// Cấu hình kết nối với Sequelize
const sequelize = new Sequelize(
    "ShopWeb", 
    'sa', 
    'yourStrong(!)Password',
    {
        host: 'localhost',
        port: '8809' || 1433, 
        dialect: "mssql",
        dialectOptions: {
            encrypt: true,
            trustServerCertificate: true,
        },
    }
);

// Kiểm tra kết nối
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to SQL Server");
  })
  .catch((err) => {
    console.error("Database Connection Failed! Error:", err);
    process.exit(1); 
  });

export default sequelize;  // Xuất dưới dạng default export
