import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  //
  backendUrl: process.env.BACKEND_URL,

  /**
   * Database url
   */
  databaseURL: process.env.DATABASE_CLOUD_URL,

  /**
   * Your secret sauce
   */
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,

  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};
