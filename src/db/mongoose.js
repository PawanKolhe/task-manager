const mongoose = require("mongoose");

const connectionURL = process.env.MONGODB_CONNECTION_STRING;
const databaseName = "task-manager-api";

// Connecting with database
mongoose.connect(`${connectionURL}/${databaseName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
