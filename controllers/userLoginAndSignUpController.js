import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

import User from "../model/user.js";
import validateTheParams from "../utility/utility.js";

dotenv.config()
// registrating the user
export const signUp = async (req,res) => {
    try {

        const reqBody = req.body;
        if(validateTheParams(reqBody.userName,8,15)){
            return res.status(404).json({error:"Provide valid username of length more than 7 and less than 15"});                                                                                                        
        }
        if(validateTheParams(reqBody.password,8,20)){ 
            return res.status(404).json({error:"Provide valid password of length more than 7 and less than 30"});
        }
        if(validateTheParams(reqBody.name,1,20)){
            return res.status(404).json({error:"Provide name"});
        }

        let isUser = await User.findOne({userName: req.body.userName})
        if(isUser){
            return res.status(404).json({error:"Username already present"});
        }

        const hashPassword = await bcrypt.hash(reqBody.password,10);
        const user = {userName:reqBody.userName,password:hashPassword,name:reqBody.name}
        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json(newUser);

    } catch (error) {
        return res.status(500).json({error:error});
    }
}
// siging the user and and returning the generated token for a particuler user
export const login = async (req,res) => {

    let user = await User.findOne({userName: req.body.userName})
    if(!user){
        return res.status(400).json({error:"User not found"})
    }

    try {

        let match = await bcrypt.compare(req.body.password,user.password);
        if(!match){
            return res.status(401).json({error:"Password doesn't match"});
        }

        const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY)
        return res.status(200).json({userName:req.body.userName,access_token:accessToken})
        
    } catch (error) {
        return res.status(500).json({error:error})
    }

}