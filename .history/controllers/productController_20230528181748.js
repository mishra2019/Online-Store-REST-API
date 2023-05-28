import dotenv from "dotenv"

import Product from "../model/product.js";

dotenv.config()

export const getProduct = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        let skip = (page-1)*limit;

        if(!req.query.name && !req.query.description && !req.query.category){
            let products = await Product.find({}).skip(skip).limit(limit);
            return res.status(200).json({products});
        }

        if(req.query.name){
            //{name: { $regex: '.*' + name + '.*' } }
            let products = await Product.find({name:{$regex: '.*' + req.query.name  + '.*',$options: 'i'}}).skip(skip).limit(limit);
            return res.status(200).json({products});
        }

        if(req.query.description){
            let products = await Product.find({name:{$description: '.*' + req.query.description  + '.*',$options: 'i'}}).skip(skip).limit(limit);
            return res.status(200).json({products});
        }

        if(req.query.category){
            let products = await Product.find({category:{$regex: '.*' + req.query.category  + '.*',$options: 'i'}}).skip(skip).limit(limit);
            return res.status(200).json({products});
        }

        return res.status(200);

    } catch (error) {
        return res.status(500).json({error:error});
    }
};

export const createProduct = async (req, res) => {
    try {        
        const reqBody = req.body;
        if(!reqBody.name){
            return res.status(404).json({error:"Provide product name"});                                                                                                        
        }
        if(!reqBody.description){
            return res.status(404).json({error:"Provide product description"});
        }
        if(!reqBody.category){
            return res.status(404).json({error:"Provide product category"});
        }
        if(!reqBody.price){
            return res.status(404).json({error:"Provide product price"});
        }
        if(!reqBody.quantity){
            return res.status(404).json({error:"Provide product quantity"});
        }
        

        const product = {name:reqBody.name,description:reqBody.description,category:reqBody.category,price:reqBody.price,quantity:reqBody.quantity};
        const newProduct = new Product(product);
        await newProduct.save();

        return res.status(200).json(newProduct);

    } catch (error) {
        return res.status(500).json({error:error});
    }
};

export const updateProduct = async (req, res) => {
    try {
        
        const product = await Product.findOne({name:req.params.name})
        if(!product){
            return res.status(404).json({error:"Product not found"});
        }

        const updatedProd = await Product.findByIdAndUpdate(product._id,{$set:req.body});
        return res.status(200).json({msg:"Updated successfully"});

    } catch (error) {
        return res.status(500).json({error:error});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        
        const product = await Product.findOne({name:req.params.name})
        if(!product){
            return res.status(404).json({error:"Product not found"});
        }

        const updatedProd = await Product.findByIdAndDelete(product._id);
        return res.status(200).json({msg:"Deleted successfully"});

    } catch (error) {
        return res.status(500).json({error:error});
    }
}