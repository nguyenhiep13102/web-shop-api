import SanPham from '../models/SanPham.js';
import Image from '../models/images.js';
import Categories from '../models/categories.js';

const getProductsByCategories = async () => {
  try {
    // Lấy danh sách loại sản phẩm
    const categoriesList = await Categories.findAll(
        {
            attributes: ['categoriesID', 'name_categories'], 
            raw: true,
          }
    ); 

    // Lấy danh sách sản phẩm
    const productsList = await SanPham.findAll(
        {
            attributes: ['id', 'name', 'description', 'price', 'category_id'], // Chỉ lấy trường cần
            raw: true,
          }
    );
    // Lấy danh sách ảnh
    const imagesList = await Image.findAll();

    // Kết hợp dữ liệu
    const result = categoriesList.map((category) => {
      const categoryProducts = productsList
        .filter((product) => product.category_id === category.categoriesID)
        .map((product) => ({
          ...product,
          images: imagesList
           .filter((img) => img.productId === product.id)
            .map((img) => img.filePath),
        }));

      return {
        category: category.name_categories,
        products: categoryProducts,
      };
    });

    return {
      code: '0000', 
      data: result,
    };
  } catch (error) {
    console.error('Error in getProductsByCategories service:', error);
    return {
      code: '9999', 
      data: null,
    };
  }
};

 let getproductbyid1 = async (product_id) => {

  try {
    const productId = product_id;

    const product = await SanPham.findOne({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ code: "404", message: "Sản phẩm không tồn tại." });
    }

    const images = await Image.findAll({
      where: { product_id: productId },
      attributes: ["image_path"],
    });


    const productData = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category_id,
      images: images.map((img) => img.image_path),
    };

    res.json({ code: "0000", data: productData });



    
  } catch (error) {
    console.error('Error in getProductsByCategories service:', error);
    return {
      code: '9999', 
      data: null,
    };
  }

 }

  const getproductbyid = async (productId) => {
  try {
    const product = await SanPham.findOne({
      where: { id: productId },
    });

    if (!product) {
      return null; // Không tìm thấy sản phẩm
    }

    return product; // Trả về sản phẩm
  } catch (error) {
    console.error("Lỗi trong service khi lấy sản phẩm:", error);
    throw error; // Ném lỗi để controller xử lý
  }
};
export default {
  getProductsByCategories,
  getproductbyid1,
  getproductbyid

};
