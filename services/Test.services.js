import SanPham from '../models/SanPham.js';
import image from '../models/images.js'
import categories from '../models/categories.js'
import brands from '../models/brandes.js'
import manufacturers from '../models/manufacturers.js'

let getProducts = async () => {
try { 
    const products = await SanPham.findAll();
    return {
      code: '0000', 
      data: products,
    };
  } catch (error) {
    console.error("Error in getProductsService:", error);
return {
      code: '9999', 
      data: null,
    };
  }
};

let getimage = async () => {
  try { 
      const images = await image.findAll();
      return {
        code: '0000', 
        data: images,
      };
    } catch (error) {
      console.error("Error in getProductsService:", error);
  return {
        code: '9999', 
        data: null,
      };
    }
  };
  let getcategories = async ()=>{
    try { 
      const categories1 = await categories.findAll();
      return {
        code: '0000', 
        data: categories1,
      };
    } catch (error) {
      console.error("Error in getProductsService:", error);
  return {
        code: '9999', 
        data: null,
      };
    }
  };
  let getbrand = async ()=>{
    try { 
      const brandes1 = await brands.findAll();
      return {
        code: '0000', 
        data: brandes1,
      };
    } catch (error) {
      console.error("Error in getProductsService:", error);
  return {
        code: '9999', 
        data: null,
      };
    }
  };
  let getmanufacturers = async ()=>{
    try { 
      const manufacturers1 = await manufacturers.findAll();
      return {
        code: '0000', 
        data: manufacturers1,
      };
    } catch (error) {
      console.error("Error in getProductsService:", error);
  return {
        code: '9999', 
        data: null,
      };
    }
  };
  const saveImageService = async (filePath, fileName, productId) => {
    try {
      const newImage = await image.create({
        filePath: `uploads/images/${fileName}`,
        fileName, 
        productId: productId || null,
      });
      return {
        success: true,
        data: newImage,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'Failed to save image.',
      };
    }
  };
  




export default {
  getProducts,
  getimage,
  getcategories,
  getbrand,
  getmanufacturers,
  saveImageService,
};
