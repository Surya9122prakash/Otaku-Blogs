import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import transition from "../components/Transition";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);

  const [pic, setPic] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      // Handle case when token doesn't exist in localStorage (user not logged in)
      return;
    }

    if (!user || !title || !desc) {
      // Validate if the user is logged in and required fields are present
      return;
    }

    // toast.success("Image Upload Successfully");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "mystore");
      data.append("cloud_name", "dthytjb3h");
      const ress = await fetch(
        "https://api.cloudinary.com/v1_1/dthytjb3h/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await ress.json();
      const post = {
        title,
        desc,
        photo: cloudData.url,
        username: user.username,
        userId: user._id,
        categories: cats,
      };
      console.log(post);
      const res = await axios.post(
        URL + "/api/posts/create",
        post,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          withCredentials: true,
        }
      );
      navigate("/posts/post/" + res.data._id);

      setPic(res.data.photo.url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 pb-10 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl text-yellow-400">
          Create a post
        </h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 border-2 border-yellow-400 outline-0 bg-black text-yellow-400 placeholder:text-yellow-400"
          />
          <input
            onChange={async (e) => {
              setFile(e.target.files[0]);
            }}
            type="file"
            className="px-4"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 border-2 border-yellow-400 outline-0 bg-black text-yellow-400 placeholder:text-yellow-400"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-yellow-400 text-black px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-yellow-400 px-2 py-1 rounded-md"
                >
                  <p className="text-black">{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-yellow-400 bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={15}
            cols={30}
            className="px-4 py-2 border-2 border-yellow-400 outline-0 bg-black text-yellow-400 placeholder:text-yellow-400"
            placeholder="Enter post description"
          />
          <button
            onClick={handleCreate}
            className="bg-yellow-400 w-full md:w-[20%] mx-auto text-black font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Create
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default transition(CreatePost);
