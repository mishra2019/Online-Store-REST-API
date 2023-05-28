import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true]
    },
    userName:{
        type:String,
        required: [true],
        unique:true
    },
    password:{
        type:String,
        require:[true],
    }
})

const user = mongoose.model('user',userSchema)

export default user;