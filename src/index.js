const express = require("express");
require("./db/mongoose");

const taskRouter = require("./routers/task");
const userRouter = require("./routers/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/tasks", taskRouter);
app.use("/users", userRouter);

app.listen(port, () => `Server is up on port ${port}`);
