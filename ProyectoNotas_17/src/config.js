import dotenv from 'dotenv';

dotenv.config();

const config = {
  app: {
      PORT: process.env.PORT || 3000,
  },
  security: {
      JWT_SECRET: process.env.JWT_SECRET, 
  }
};

export default config;
