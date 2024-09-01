import mongoose from 'mongoose';

let isConnected = false; 

// connecting to MongoDB 
export const connectToDB = async () => {

    mongoose.set('strictQuery', true);

    // check if already connected to the database
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {

        // attempt to connect to database using URI
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_quote', 
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });

        isConnected = true; 

        console.log('MongoDB connected'); 

    } catch (error) {
        console.log(error);
    }
};