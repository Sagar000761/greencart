import {v2 as cloudinary} from 'cloudinary'
import product from '../models/product.js'
// AddProduct : /api/product/add
export const addProduct= async(req,res)=>{
    try{
        let productData =JSON.parse(req.body.productData)
        const images= req.files
        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )
        await product.create({...productData, image: imagesUrl})
        res.json({success: true,message : 'Product Added'})
    } catch(err){
        console.log(err.message)
        res.json({success: false, message: err.message})
    }
}

// getProduct : /api/product/list
export const productList= async(req,res)=>{
    try {
        const products= await product.find({})
        res.json({success: true,products})
    } catch (err) {
        console.log(err.message)
        res.json({success: false,message: err.message})
    }
}

// get singleProduct : /api/product/id
export const productById= async(req,res)=>{
    try {
        const {id}=req.body
        const product= await product.findById(id)
        res.json({success: true,product})
    } catch (err) {
        console.log(err.message)
        res.json({success: false,message: err.message})
    }
}

// change product inStock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        const updatedProduct = await product.findByIdAndUpdate(id,{ inStock },{ new: true });
        return res.json({success: true, message: 'Stock updated', product: updatedProduct });
    } catch (err) {
        console.log(err.message);
        return res.json({success: false, message: err.message});
    }
};