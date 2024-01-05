import { useNavigate } from "react-router-dom";
import "./Load.css";
import { motion } from "framer-motion";
import transition from "./Transition";

const Assem = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex md:flex-row flex-col-reverse w-screen h-screen overflow-y-hidden content-between items-start p-10">
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 10, ease: "easeInOut" }}
          className="md:w-1/3 w-fit"
        >
          <h1 className="text-yellow-400 md:text-2xl text-lg font-bold md:pl-48 pl-20 md:pt-40 pt-96">
            Otaku Blogs
          </h1>
          <div className="text-orange-300 md:pl-24 text-justify md:text-lg text-md">
            It refers to a platform or space dedicated to blogs or articles
            focused on Otaku culture. Otaku is a term used to describe people
            with passionate interests, particularly in anime, manga, gaming, and
            related Japanese subcultures.
          </div>
          <div className="md:pl-44 pl-12 pt-5">
            <button
              className="md:w-[60%] w-[70%] px-4 p-2 border border-yellow-400 rounded-full flex animate-bounce"
              onClick={() => navigate("/index")}
            >
              <h1 className="text-2xl text-yellow-400 font-semibold pr-2">
                Welcome
              </h1>
              <div className="text-orange-300 pt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </button>
          </div>
        </motion.div>
        <div className="w-full md:w-2/3 pr-[30px] md:pb-0 pb-80">
          <div className="image-set w-full  flex items-center justify-center relative">
            <img
              src="https://i.pinimg.com/originals/2f/59/f1/2f59f17586bc76ec69071cd3672cdc4d.png"
              alt="naruto"
            />
            <img
              src="https://www.nicepng.com/png/full/348-3484718_susanoo-png.png"
              alt="sasuke"
            />
            <img
              src="https://i.pinimg.com/originals/ef/25/ec/ef25ecf53e4030e032bed84c2bcedc41.png"
              alt="kagami"
            />
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6f4a44c2-55c9-4f0b-b657-8b6ac84d44b6/d49bi15-83d08857-614f-47e1-94d2-82794163b9e1.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZmNGE0NGMyLTU1YzktNGYwYi1iNjU3LThiNmFjODRkNDRiNlwvZDQ5YmkxNS04M2QwODg1Ny02MTRmLTQ3ZTEtOTRkMi04Mjc5NDE2M2I5ZTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Lq72RUxaGOasfcaVqLyUWbfXBl1Ppri7UBz-xefDWoo"
              alt="itachi"
            />
            <img
              src="https://us.v-cdn.net/5021068/uploads/editor/o2/v0uu5sufn5nx.png"
              alt="saitama"
            />
            <img
              src="https://freepngimg.com/thumb/bleach/24605-5-ichigo-transparent.png"
              alt="bleach"
            />
            <img
              src="https://vignette3.wikia.nocookie.net/vsbattles/images/a/a8/Yagami-light-Render-SV.png/revision/latest/scale-to-width-down/400?cb=20170125132357"
              alt="light"
            />
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/51158316-fd7e-48ca-b5fe-8542e9dfe357/dd5bilr-ffaeb9af-93e9-497b-b048-9628122fd895.png/v1/fill/w_407,h_854,strp/monkey_d__luffy_by_bodskih_dd5bilr-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODU0IiwicGF0aCI6IlwvZlwvNTExNTgzMTYtZmQ3ZS00OGNhLWI1ZmUtODU0MmU5ZGZlMzU3XC9kZDViaWxyLWZmYWViOWFmLTkzZTktNDk3Yi1iMDQ4LTk2MjgxMjJmZDg5NS5wbmciLCJ3aWR0aCI6Ijw9NDA3In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.7H5AD19SYy5ITDkgbFcWL4P_RiPcO91Jqh-jZTTtF-U"
              alt="luffy"
            />
            <img
              src="https://i.pinimg.com/originals/71/c9/be/71c9be524b8e5694915791ef032662b0.png"
              alt="toge"
            />
            <img
              src="https://orig00.deviantart.net/5a40/f/2015/268/1/6/kuroko_tetsuya__render_by_miahatake13-d9auxyn.png"
              alt="kuroko"
            />
            <img
              src="https://img00.deviantart.net/abb1/i/2011/027/b/9/minato_namikaze_vector_by_seijitataki-d387g73.png"
              alt="minato"
            />
            <img
              src="https://th.bing.com/th/id/R.44a46b5f10c658d8f115d19c950cd932?rik=Gf3%2f%2b8chQc0iHw&riu=http%3a%2f%2fwww.freepngimg.com%2fdownload%2fdragon_ball%2f21438-6-vegeta-transparent-background.png&ehk=tKFxeu9LU2H34MUF5WZzsO6Gw3Xd9ZAEe4SflaG421Y%3d&risl=&pid=ImgRaw&r=0"
              alt="vegeta"
            />
            <img
              src="https://imagensemoldes.com.br/wp-content/uploads/2020/06/Son-Goku-PNG.png"
              alt="goku"
            />
            <img
              src="https://vignette.wikia.nocookie.net/shingekinokyojin/images/9/92/Levi.png/revision/latest?cb=20171021040204"
              alt="aot"
            />
            <img
              src="https://www.pngplay.com/wp-content/uploads/12/Ryuk-Shinigami-No-Background.png"
              alt="ryuk"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Assem;
