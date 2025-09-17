import mongoose from 'mongoose';

const globalForMongoose = global as typeof globalThis & {
  mongoose: any;
};

let cached = globalForMongoose.mongoose;

if (!cached) {
  cached = globalForMongoose.mongoose = { conn: null, promise: null };
}

export const connectToDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGO_URI = process.env.MONGO;
    if (!MONGO_URI) {
      throw new Error('Definisikan variabel MONGO di dalam .env.local');
    }
    
    cached.promise = mongoose.connect(MONGO_URI, { 
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("Koneksi DB baru berhasil dibuat!");
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};