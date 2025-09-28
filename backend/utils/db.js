const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL + '/' + process.env.DB_NAME);
    console.log('Database connected');
  } catch (e) {
    console.log(e);
  }
};

module.exports = dbConnection;
