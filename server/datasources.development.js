'use strict';

module.exports = {

  mongoDb: {
    connector: 'mongodb',
    hostname: process.env.GAME_DB_MONGODB_HOST || '127.0.0.1',
    port: process.env.GAME_DB_MONGODB_PORT || 27017,
    user: process.env.GAME_DB_MONGODB_USERNAME,
    password: process.env.GAME_DB_MONGODB_PASSWORD,
    database: process.env.GAME_DB_MONGODB_NAME,
    url: process.env.GAME_DB_MONGODB_URL
  }

};
