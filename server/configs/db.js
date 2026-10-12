import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database connected'));
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined');
        }
        const dbUri = uri.includes('/GreenCart') ? uri : `${uri.replace(/\/$/, '')}/GreenCart`;
        await mongoose.connect(dbUri, { serverSelectionTimeoutMS: 5000 });
    } catch (err) {
        console.warn('MongoDB Atlas connection error:', err.message);
        if (process.env.NODE_ENV !== 'production') {
            try {
                console.log('Attempting fallback to local MongoDB (mongodb://127.0.0.1:27017/GreenCart)...');
                await mongoose.connect('mongodb://127.0.0.1:27017/GreenCart', { serverSelectionTimeoutMS: 3000 });
                console.log('Connected to local MongoDB!');
            } catch (localErr) {
                console.error('Local MongoDB fallback also failed:', localErr.message);
            }
        }
    }
};

export default connectDB;