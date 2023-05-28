import express from "express";


import { getProduct,createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { signUp,login } from "../controllers/userLoginAndSignUpController.js";
import { authenticateToken } from "../controllers/jwtAuthController.js";
import { getOrders,addToCard,updateOrder,deleteOrder, checkOutOneByOne} from "../controllers/orderController.js";

const router = express.Router();

//Login and Signup routes
router.post("/login",login)
router.post("/signUp",signUp)

// Product Routes
router.get("/product",authenticateToken,getProduct)
router.post("/product",authenticateToken,createProduct)
router.put("/product/:name",authenticateToken,updateProduct)
router.delete("/product/:name",authenticateToken,deleteProduct)

// Order Routes
router.get("/order",authenticateToken,getOrders)
router.post("/order",authenticateToken,addToCard)
router.put("/order/:productName",authenticateToken,updateOrder)
router.delete("/order/:productName",authenticateToken,deleteOrder)

// Checkout Routes
router.post("/checkout/:productName",authenticateToken,checkOutOneByOne)

export default router;