const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

//CREATE
// router.post("/create",verifyToken,async (req,res)=>{
//     try{
//         const newPost=new Post(req.body)
//         // console.log(req.body)
//         const savedPost=await newPost.save()

//         res.status(200).json(savedPost)
//     }
//     catch(err){

//         res.status(500).json(err)
//     }

// })

router.post(
  "/create",
  verifyToken,
  upload.single("photo"),
  async (req, res) => {
    try {
      const { title, desc, userId, photo, username, categories } = req.body;

      // const result = await cloudinary.uploader.upload(req.file.path,async(err,resu)=>{
      //   if(err){
      //     console.log(err);
      //     return res.status(500).json({
      //       success:false,
      //       message:"Error"
      //     })
      //   }
      // });

      const newPost = new Post({
        title,
        desc,
        userId,
        username,
        categories,
        photo: photo,
        // Assign the image URL if it exists
      });

      const savedPost = await newPost.save();

      res.status(201).json(savedPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Error creating post" });
    }
  }
);

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("Post has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST DETAILS
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POSTS
router.get("/", async (req, res) => {
  const query = req.query;

  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const posts = await Post.find(query.search ? searchFilter : null);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER POSTS
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
