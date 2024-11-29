// Import các thư viện
import express from 'express';
import onCors from './configs/cors.js';
import dotenv from 'dotenv';
import connection from './configs/dbConnect.js';
import configViewEngine from  './configs/viewEngine.js';
import swagger from './configs/swagger.js';
import router from './router/route.js';
import Categories from './models/categories.js';

// Khởi tạo app Express
const app = express();

// Sử dụng dotenv để load các biến môi trường
dotenv.config();

// Middleware
onCors(app);


app.use(express.json());


connection.sync({ force: false })  // Set 'force: true' nếu muốn xóa bảng cũ và tạo lại
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error syncing the database:", err);
  });

configViewEngine(app);

swagger(app);

app.use(router);







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
