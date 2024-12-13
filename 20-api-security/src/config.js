const config = {
    app: {
        PORT: process.env.PORT || 3000,
    },
    security: {
        SECRET_MESSAGE_HASH: process.env.SECRET_MESSAGE_HASH,
        JWT_SECRET: process.env.JWT_SECRET, 
    }
};

export default config;