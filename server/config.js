const config = {
  mongoURL: process.env.MONGODB_URI || 'mongodb://localhost/segmentsdb',
  port: process.env.PORT || 8000,
};

module.exports =  config;