/* eslint-disable react/prop-types */

const ProfilePosts = ({ p }) => {
  // console.log(p)
  return (
    <div className="w-full flex flex-col mt-8 mb-5 space-x-0">
      {/* left */}
      <div className="w-full h-fit justify-center items-center">
        <img src={p.photo} alt="" className="h-full w-full object-cover" />
      </div>
      {/* right */}
      <div className="flex flex-col w-full">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:mt-2 mt-1 md:text-2xl text-yellow-400">
          {p.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-yellow-400 items-center justify-between md:mb-4">
          <p>@{p.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg text-yellow-400 md:mb-10 mb-5 text-justify">
          {p.desc}
        </p>
      </div>
    </div>
  );
};

export default ProfilePosts;
