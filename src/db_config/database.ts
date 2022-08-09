import mongoose from "mongoose";

const connectDB = async (url: string) => {
  try {
    const toConnect = await mongoose.connect(url);
    console.log(`🔌 Database connected to ${toConnect.connection.host}`);
  } catch (error) {
    console.log(`could not connect to mongodb ---- ${error}`);
  }
};

export default connectDB;
