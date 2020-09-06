const mongoose = require("mongoose");

const connectionURL = process.env.MONGODB_CONNECTION_STRING;

// Connecting with database
mongoose.connect(`${connectionURL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
