const HomePosts = ({ post }) => {
  return (
    <div className="w-full h-auto mb-10 flex md:flex-row flex-col mt-8 space-x-4">
      {/* left */}
      <div className="md:w-[35%] w-full md:h-[200px] flex justify-center items-center">
        <img src={post.photo} alt="" className="h-full w-full object-cover" />
      </div>
      {/* right */}
      <div className="flex flex-col md:w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl text-yellow-400">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-yellow-400 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg text-yellow-400 text-justify">
          {post.desc.slice(0, 200) + " ...Read more"}
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
