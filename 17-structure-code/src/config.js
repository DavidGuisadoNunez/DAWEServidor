const config = {
  port: process.env.PORT,
  level: process.env.NODE_ENV === 'production' ? 'error' : 'info'
};

export default config;
