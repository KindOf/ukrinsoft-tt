module.exports = {
  server: {
    port: process.env.SERVER_PORT || 3000
  },
  db: {
    uri: process.env.MONGO_URI || 'mongodb://example.com/dev'
  }
};
