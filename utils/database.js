import mongoose from "mongoose";

let isConnected = false; // this is to track the connection

export const connectToDB = async () =>{ 
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log("MongoDB is connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: 'Share_Prompt',
            useNewURLParser: 'true',
            useUnifiedTopology: 'true',
        })
        
        isConnected = true;
        console.log('MongoDB connected');
    } catch(error){
        console.log(error);
    }
}