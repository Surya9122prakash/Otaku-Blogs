import {motion} from "framer-motion";
import "./Trans.css";
const transition = (OgComponent) => {
  return () => (
    <>
      <OgComponent />
      <motion.div className="slide-in bg-gradient-to-tr from-black to-yellow-400" initial={{scaleY:0}} animate={{scaleY:0}} exit={{scaleY:1}} transition={{duration:2,ease:[0.22,1,0.36,1]}} />
      <motion.div className="slide-out bg-gradient-to-tr from-black to-yellow-400" initial={{scaleY:1}} animate={{scaleY:0}} exit={{scaleY:0}} transition={{duration:2,ease:[0.22,1,0.36,1]}} />
    </>
  )
}

export default transition;