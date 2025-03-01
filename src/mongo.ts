import mongoose from "mongoose";

export const initMongo = async (connectionString: string) => {
    await mongoose.connect(connectionString, { dbName: "atscompanion" });
};