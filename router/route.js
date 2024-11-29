import express from 'express';
import TestRouter from './TestTable.route.js';
const router = express.Router();

// Lấy danh sách sản phẩm
router.use('/api', TestRouter);

export default router;