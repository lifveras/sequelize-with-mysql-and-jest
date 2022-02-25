require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'mysql',
    username: 'root',
    password: 'abcd1234.',
    database: 'testdb',
    host: 'localhost',
  },
  test: {
    // url: process.env.TEST_DATABASE_URL,
    username: 'root',
    password: 'abcd1234.',
    database: 'testdb',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    //url: process.env.DATABASE_URL,
    dialect: 'mysql',
    username: 'root',
    password: 'abcd1234.',
    database: 'testdb',
    host: 'localhost',
  },
};