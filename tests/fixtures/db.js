const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Test User1",
  email: "test1@example.com",
  password: "!pawan4234",
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET_KEY)
  }]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Test User2",
  email: "test2@example.com",
  password: "1234567",
  tokens: [{
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET_KEY)
  }]
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "Example description one",
  completed: false,
  owner: userOneId
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Example description two",
  completed: true,
  owner: userOneId
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Example description three",
  completed: true,
  owner: userTwoId
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
}

module.exports = {
  setupDatabase,
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree
}
