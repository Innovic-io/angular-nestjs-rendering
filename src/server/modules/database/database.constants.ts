export const DATABASE_TOKEN = 'DbMongoToken';
export const DATABASE_NAME = process.env.DB_NAME;
export const DATABASE_URI = `mongodb://${process.env.DB_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}`;
