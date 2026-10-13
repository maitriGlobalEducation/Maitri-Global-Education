import "server-only";

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your environment variables.");
}

const cached = globalThis as typeof globalThis & {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const mongooseCache = (cached.mongoose ??= {
  conn: null,
  promise: null,
});

export async function connectDB() {
  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }

  if (!mongooseCache.promise) {
    mongooseCache.promise = mongoose.connect(MONGODB_URI!).catch((error) => {
      mongooseCache.promise = null;
      throw error;
    });
  }

  mongooseCache.conn = await mongooseCache.promise;

  return mongooseCache.conn;
}
