import mongoose from "mongoose";

const connectdb  = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://pulkitpal0001:puvSnPtimsGdjgli@cluster0.fwnaw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("connect mongodb");
        
    } catch (error) {
        console.log(error.message);
    }
}

export default connectdb;



