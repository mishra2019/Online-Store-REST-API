import dotenv from "dotenv"

import Order from "../model/order.js";
import Product from "../model/product.js";

dotenv.config()

export const getOrders = async (req,res) => {
    try {

        const userName = req.user.userName;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        let skip = (page-1)*limit;
        let orders = await Order.find({userName:userName}).skip(skip).limit(limit)
        return res.status(200).json({orders});

    } catch (error) {
        return res.status(500).json({error:error});
    }
}

export const addToCard = async (req,res) => {
    try {
        const quantity = req.body.quantity || 1;

        if(!req.body.productName){
            return res.status(404).json({error:"Provide product name"});
        }

        let product = await Product.findOne({name:req.body.productName});

        if(!product){
            return res.status(404).json({error:"Product not found"});
        }

        if(product.quantity<=0){
            return res.status(404).json({error:"Out of stock"});
        }

        if(product.quantity<quantity){
            return res.status(404).json({error:"Too much quantity.. Unavailable"});
        }

        const orderDetails = {userName:req.user.userName,productName:req.body.productName,productQuantity:quantity,productPrice:product.price};

        const prevOrderDetails = await Order.findOne({userName:req.user.userName,productName:req.body.productName})
        let newOrder = null;
        if(prevOrderDetails){
            orderDetails.productQuantity = Number(orderDetails.productQuantity)+Number(prevOrderDetails.productQuantity);
            if(product.quantity<orderDetails.productQuantity){
                return res.status(404).json({error:"Too much quantity.. Unavailable"});
            }
            newOrder = new Order(orderDetails);
            console.log(newOrder)
            await Order.findByIdAndUpdate(prevOrderDetails._id,{$set:orderDetails});
        }else{
            newOrder = new Order(orderDetails);
            await newOrder.save()
        }
        return res.status(200).json(newOrder)


    } catch (error) {
        return res.status(500).json({error:error});
    }
}

export const updateOrder = async (req,res) => {
    try {
        
        const order = await Order.findOne({userName:req.user.userName,productName:req.params.productName})
        if(!order){
            return res.status(404).json({error:"Order not found"});
        }

        const quantity = order.productQuantity-req.body.quantity;
        if(quantity <= 0){
            await Order.findByIdAndDelete(order._id);
        }else{
            order.productQuantity = order.productQuantity-req.body.quantity;
            await Order.findByIdAndUpdate(order._id,{$set:order})
        }
        return res.status(200).json({msg:"Updated successfully"});

    } catch (error) {
        return res.status(500).json({error:error});
    }
}

export const deleteOrder = async (req,res) => {
    try {
        
        const order = await Order.findOne({userName:req.user.userName,productName:req.params.productName})
        if(!order){
            return res.status(404).json({error:"Order not found"});
        }

        await Order.findByIdAndDelete(order._id);
        return res.status(200).json({msg:"Deleted successfully"});

    } catch (error) {
        return res.status(500).json({error:error});
    }
}

export const checkOutOneByOne = async (req,res) => {
    try {

        const userName = req.user.userName;
        let order = await Order.findOne({userName:userName,productName:req.params.productName})
        if(!order){
            return res.status(404).json({error:"Nothing to place order"})
        }

        let product = await Product.findOne({name:req.params.name})
        if(!product){
            return res.status(404).json({error:"Product not found"});
        }

        if(order.productQuantity>product.quantity){
            return res.status(404).json({error:`${req.params.productName} is out of stock`});
        }

        const amount = order.productQuantity*order.productPrice;
        await Order.findByIdAndDelete(order._id);
        product.quantity = product.quantity-order.productQuantity;
        await Product.findByIdAndUpdate(product._id,{$set:product})
        return res.status(200).json({amount:amount});
    } catch (error) {
        
    }
}