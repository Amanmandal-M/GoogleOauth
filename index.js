const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const { googleOauth } = require("./routes/authRoute");
const { dbConnection } = require("./configs/authDb");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/", googleOauth);

app.listen(PORT, async () => {
  try {
    console.log(colors.bgBlue.white(`Server is listening at PORT ${PORT}`));
    await dbConnection;
    console.log(
      colors.bgBlue.white(
        `Connected to Database on HOST is : ${mongoose.connection.host}`
      )
    );
  } catch (error) {
    console.log(colors.bgRed.black(`Error in Listening : ${error.message}`));
  }
});
