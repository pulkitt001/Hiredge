
import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    // define the schema here
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        require:true,
        trim:true
    },
    position:{
        type:String,
        required:true,
        trim:true,        
    },
    password:{
        type:String,
        required:true,
    },
    // storing the reference of the blogs as a array
    blogs:[
        {
            type:Schema.Types.ObjectId,
            ref:"Blog"
        }
    ]

},{timestamps:true})

export const User =  mongoose.model("User",userSchema);
