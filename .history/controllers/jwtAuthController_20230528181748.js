import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export const authenticateToken = (request,response,next) => {
    const token = request.headers['authorization']
    if(token == null){
        return response.status(401).json({msg:"token is mission"})
    }
    jwt.verify(token,process.env.ACCESS_SECRET_KEY,(error,user) => {
        if(error){
            return response.status(403).json({msg:"Invalid Token"})
        }
        request.user = user
    next()
    })
}

// export const authToUpdate = (request,response,next) => {
//     const token = request.headers['authorization']
//     if(token == null){
//         return response.status(401).json({msg:"token is mission"})
//     }
//     jwt.verify(token,process.env.SECRETE_ACCESS_KEY,(error,user) => {
//         if(error){
//             return response.status(403).json({msg:"Invalid Token"})
//         }
//         if(user.isProd || request.body.environment !== 'prod'){
//             request.user = user
//         }else{
//             return response.status(403).json({msg:"You are not a prod user"})
//         }
//         next()
//     })
// }