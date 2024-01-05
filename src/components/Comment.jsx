import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c, post,onCommentDelete }) => {
  const { user } = useContext(UserContext);
  const deleteComment = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Handle case when token doesn't exist in localStorage (user not logged in)
      return;
    }
    try {
      await axios.delete(
        URL + "/api/comments/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          withCredentials: true,
        }
      );
      onCommentDelete(id);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(post.userId)
  // console.log(user._id)
  // console.log(post)
  // console.log(user)
  return (
    <div className="px-2 py-2 bg-black rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-yellow-400">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-yellow-400">
            {new Date(c.updatedAt).toString().slice(0, 15)}
          </p>
          <p className="text-yellow-400">
            {new Date(c.updatedAt).toString().slice(16, 24)}
          </p>
          {user?._id === c?.userId ? (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
                onClick={() => deleteComment(c._id)}
              >
                <MdDelete color="white" />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-4 mt-2 text-yellow-400">{c.comment}</p>
    </div>
  );
};

export default Comment;
