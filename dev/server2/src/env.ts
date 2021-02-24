import dotenv from 'dotenv';
dotenv.config();

export const env = {
  MONGO_URI: process.env.MONGO_URI!,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
};
