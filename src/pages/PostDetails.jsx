import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import transition from "../components/Transition";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [pic, setPic] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      // console.log(res.data)
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentDelete = (commentId) => {
    setComments(comments.filter((comment) => comment._id !== commentId));
  };

  const handleDeletePost = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Handle case when token doesn't exist in localStorage (user not logged in)
      return;
    }
    try {
      const res = await axios.delete(
        URL + "/api/posts/" + postId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle case when token doesn't exist in localStorage (user not logged in)
        return;
      }
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true }
      );

      const newComment = res.data;
      // fetchPostComments()
      // setComment("")
      setComments([...comments, newComment]);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-yellow-400 md:text-3xl">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p className="text-yellow-400 font-semibold">@{post.username}</p>
            <div className="flex space-x-2">
              <p className="text-yellow-400 font-semibold">
                {new Date(post.updatedAt).toString().slice(16, 24)}
              </p>
              <p className="text-yellow-400 font-semibold">
                {new Date(post.updatedAt).toString().slice(0, 15)}
              </p>
            </div>
          </div>
          <img src={post.photo} className="w-full  mx-auto mt-8" alt="" />
          <p className="mx-auto mt-8 text-yellow-400">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p className="text-yellow-400">Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <>
                  <div
                    key={i}
                    className="bg-black rounded-lg px-3 py-1 text-yellow-400"
                  >
                    {c}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 md:mb-4 font-semibold text-yellow-400">
              Comments:
            </h3>
            {comments?.map((c) => (
              <Comment
                key={c._id}
                c={c}
                post={post}
                onCommentDelete={handleCommentDelete}
              />
            ))}
          </div>
          {/* write a comment */}
          <div className="w-full flex flex-col md:mt-4 md:mb-10 mb-5 md:flex-row">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 bg-black border-2 border-yellow-400 outline-0 text-yellow-400 placeholder:text-yellow-400"
            />
            <button
              onClick={postComment}
              className="bg-yellow-400 text-sm text-black font-semibold px-2 py-2 md:w-[20%] mt-4 md:mt-0 md:mb-0 mb-4"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default transition(PostDetails);
