const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || 'mongodb://heroku_5x9x24fs:4vfi7vvs6d70r7vnu066b1vqvf@ds261521.mlab.com:61521/heroku_5x9x24fs';
const secret = process.env.SESSION_SECRET || 'YghT5s617/1{%sDt';

module.exports = { port, env, dbURI, secret };
