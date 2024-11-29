import express from "express";
import sanpham from '../controllers/Test.Controller.js'
import upload from "../middlewares/upload.js";
import putproduct from '../controllers/PutProduct.Controller.js'
const router1 = express.Router();
router1.get('/1', sanpham.getProducts);
router1.get('/2',sanpham.getimages );
router1.get('/3',sanpham.getcategories );
router1.get('/4',sanpham.getbrand );
router1.get('/5',sanpham.getmanufacturers );
router1.post("/upload", upload.single("image"), sanpham.saveImageController);
router1.get('/6',putproduct.getProductsByCategoriesController );
router1.get('/7/:id',putproduct.getproductbyid);
export default router1 ;