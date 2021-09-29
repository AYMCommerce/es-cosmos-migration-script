const { MONGO_DATABASE_T1, MONGO_URI_T1 } = process.env;

const mongoose = require("mongoose");

// connection status callback
const connectionSuccess = (_) => {
  console.log("%s T1 MongoDB connected successfully", MONGO_DATABASE_T1);
};

// connection error callback
const connectionError = (err) => {
  if (err)
    console.log(
      "%s T1 MongoDB connection error. Please make sure MongoDB is running."
    );
};

// Connect to MongoDB.
const connect = () => {
  return mongoose
    .createConnection(
      MONGO_URI_T1,
      {
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      connectionSuccess,
      connectionError
    )
    .useDb(MONGO_DATABASE_T1);
};

module.exports = connect();
