import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/Product.model.js';
// function for add product
const addProduct = async (req,res)=>{
   try {
    const {name,description,price,category,subCategory,bestseller,sizes} = req.body;
    const image1 = req.files?.image1?.[0]
    const image2 =req.files?.image2?.[0]
    const image3 =req.files?.image3?.[0]
    const image4 =req.files?.image4?.[0]

    const images = [image1,image2,image3,image4].filter((item)=> item!==undefined)

    let imageUrl = await Promise.all(
        images.map(async(item)=>{
            const result = await cloudinary.uploader.upload(item.path,{
                resource_type:"image",
                
            });
            return result.secure_url;
        })
    )
    const productData = {
        name,
        description,
        category,
        price:Number(price),
        subCategory,
        bestseller:bestseller === "true"?true:false,
        sizes:JSON.parse(sizes),
        image:imageUrl,
        date:Date.now()

    }
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({success:true,message:"Product added successfully"})

    // console.log(name,description,price,category,subCategory,bestseller);
    // console.log(imageUrl);
    // res.json({})
    
   } catch (error) {
    res.status(500).json({success:false,message:error.message})
    console.log(error);
    
   }
}

// function for list products
const listProduct = async (req,res)=>{
    try {
        const products = await
    } catch (error) {
        
    }
}

// remove product
const removeProduct = async (req,res)=>{

}

//function for single product info
const singleProduct = async (req,res)=>{

}

export {addProduct,listProduct,removeProduct,singleProduct}