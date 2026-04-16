import productModel from "../models/product.model.js";

async function getAllProducts(req,res) {
  try {
   const products= await productModel.find()
    return res.status(200).json({
      products,
      message:"These are all products"
    })
  } catch (error) {
    return res.status(500).json({
      message:"there is an error in getAllProducts"
    })
  }
}

async function createProduct(req,res) {
  try {
    const {name,description,price,images,sizes,colors,stock,category}=req.body;
    await productModel.create({name,description,price,images,sizes,colors,stock,category})
    return res.status(201).json({
      message:"wuhuuuu product successfully created"
    })
  } catch (error) {
    return res.status(500).json({
      message:"there is an error in creating product"
    })
  }
}

export {getAllProducts,createProduct}