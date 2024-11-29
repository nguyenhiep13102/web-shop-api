import getProductsByCategories  from '../services/putProduct.services.js'; // Import service
import responseData from '../commons/responseData.js'; 

export const getProductsByCategoriesController = async (req, res) => {
  try {
    const data = await getProductsByCategories.getProductsByCategories();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching products:", error);

    
    responseData.in9999Response(res);
  }
};

export const getproductbyid = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getProductsByCategories.getproductbyid(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching products:", error);

    
    responseData.in9999Response(res);
  }
};


export default {   
    getProductsByCategoriesController,
    getproductbyid
  };