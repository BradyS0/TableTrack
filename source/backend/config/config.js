// this file was created using chatGPT
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, NODE_ENV, API_PORT } = process.env;

const config = {
    port: API_PORT || 3000,
    dbUrl: DB_USER && DB_PASSWORD && DB_HOST && DB_PORT && DB_NAME
        ? `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
        : '',
    env: NODE_ENV || 'development',
};

export default config; 
