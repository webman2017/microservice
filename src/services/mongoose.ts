import mongoose, { Connection } from 'mongoose';
import dbUrl from '../config/database';

const connectMongodb = async () => {
    try {
        await mongoose.connect(dbUrl.configMongodb);
        console.log('Database Mongodb is connected. 😊😊😊');
    } catch (error: any) {
        console.log(error.message);
        setTimeout(connectMongodb, 5000);
    }
};

export default { connectMongodb };
