const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

mongoose
  .connect(process.env.DATA_BASE_URL)
  .then(() => {
    console.log("DB Connected Successfuly");
  })
  .catch((err) => {
    console.log(`Faild to connect Database ${err}`);
  });

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/user", userRoute);
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
