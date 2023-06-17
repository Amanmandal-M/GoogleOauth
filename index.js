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

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Default Response
app.get('/',(req,res)=>{
  res.send(`<h1 style="color:blue;text-align:center">Welcome to Google Oauth Backend</h1>`)
});

// Route middleware for Google OAuth
app.use("/", googleOauth);

// Start the server and connect to the database
app.listen(PORT, async () => {
  try {
    console.log(colors.bgBlue.white(`Server is listening at PORT ${PORT}`));

    // Connect to the database
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
