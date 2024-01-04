const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");

dotenv.config();

//database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
// app.use(cors());
// app.use(cors())
app.use(cookieParser());
app.use("/api/auth", cors(), authRoute);
app.use("/api/users", cors(), userRoute);
app.use("/api/posts", cors(), postRoute);
app.use("/api/comments", cors(), commentRoute);

app.get("/", (req, res) => {
  res.send("SErver is working");
});

app.listen(process.env.PORT, () => {
  console.log("App is running on Port " + process.env.PORT);
});
