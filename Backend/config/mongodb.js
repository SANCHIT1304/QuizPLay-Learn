import mongoose from 'mongoose';

const connectDB= async () => {
    // moongose.connection.on('connected', () => console.log('MongoDB connection successful'))

    // await mongoose.connect(`${process.env.MONGODB_URI}/healthcare+`)
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(0); // Exit the process if connection fails
    }
}
export default connectDB;