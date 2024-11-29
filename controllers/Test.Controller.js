import getProductsService from '../services/Test.services.js'; 
import responseData from '../commons/responseData.js'; 

let getProducts = async (req, res) => {
  try {
    
    const response = await getProductsService.getProducts();

    
    responseData.checkCode(response.code, res, response.data);
  } catch (error) {
    console.error("Error fetching products:", error);

    
    responseData.in9999Response(res);
  }
};

let getimages = async (req, res) => {
  try {
    // Gọi hàm service để lấy danh sách sản phẩm
    const response = await getProductsService.getimage();

    // Xử lý phản hồi dựa trên mã trả về từ service
    responseData.checkCode(response.code, res, response.data);
  } catch (error) {
    console.error("Error fetching products:", error);

    // Phản hồi lỗi với mã lỗi chuẩn
    responseData.in9999Response(res);
  }
};
let getcategories = async (req, res) => {
  try {
    // Gọi hàm service để lấy danh sách sản phẩm
    const response = await getProductsService.getcategories();

    // Xử lý phản hồi dựa trên mã trả về từ service
    responseData.checkCode(response.code, res, response.data);
  } catch (error) {
    console.error("Error fetching products:", error);

    // Phản hồi lỗi với mã lỗi chuẩn
    responseData.in9999Response(res);
  }
};
let getbrand = async (req, res) => {
  try {
    // Gọi hàm service để lấy danh sách sản phẩm
    const response = await getProductsService.getbrand();

    // Xử lý phản hồi dựa trên mã trả về từ service
    responseData.checkCode(response.code, res, response.data);
  } catch (error) {
    console.error("Error fetching products:", error);

    // Phản hồi lỗi với mã lỗi chuẩn
    responseData.in9999Response(res);
  }
};
let getmanufacturers = async (req, res) => {
  try {
    // Gọi hàm service để lấy danh sách sản phẩm
    const response = await getProductsService.getmanufacturers();

    // Xử lý phản hồi dựa trên mã trả về từ service
    responseData.checkCode(response.code, res, response.data);
  } catch (error) {
    console.error("Error fetching products:", error);

    // Phản hồi lỗi với mã lỗi chuẩn
    responseData.in9999Response(res);
  }
};

 let saveImageController = async (req, res) => {
  try {
    const { productId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await getProductsService.saveImageService(file.path, file.filename, productId);

    if (result.success) {
      return res.status(200).json({ message: 'Lưu ảnh thành công.', data: result.data });
    } else {
      return res.status(500).json({ message: result.error });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export default {
  getProducts,
  getimages,
  getcategories,
  getbrand,
  getmanufacturers,
  saveImageController,
};
     