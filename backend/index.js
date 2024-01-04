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
const corsOptions = {
  origin: ["https://otaku-blogs.vercel.app", "http://otaku-blogs.vercel.app", "*"],
  // origin:"http://localhost:5173",
  credentials: true, // Enable credentials (cookies, authorization headers)
};

app.use(cors({
  origin: 'https://otaku-blogs.vercel.app',
  credentials: true, // You might also need to enable credentials
}));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

app.get("/", (req, res) => {
  res.send("SErver is working");
});

app.listen(process.env.PORT, () => {
  console.log("App is running on Port " + process.env.PORT);
});
