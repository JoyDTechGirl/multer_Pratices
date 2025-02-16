const express = require("express");
require("dotenv").config();
require("./Config/database");

const PORT = process.env.PORT;
const userRouter = require("./Router/userRouter");

const app = express();

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`My Server Is Up And Running On Port ${PORT}`);
});
