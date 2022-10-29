import styled from "styled-components";
import { motion, useMotionValue, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";


const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  flex-direction: column;
  `;

const Box = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.06);
  display: flex;
  position: absolute;
  top: 100px;
  justify-content: center;
  align-items: center;
  font-size: 28px;
`;

const box = {
  entry: (back:boolean) => ({
        x: back ? -100 : 100,
        opacity: 0,
        scale: 0.5,
  }),
  center: {
    x: 0,
    opacity:1,
    scale:1,
    transition: {
      duration:0.3,
    }
  },
  exit: (back:boolean) => ({
    x: back ? 100 : -100,
    opacity:0,
    scale: 0.5,
    transition: {
      duration:0.3,
    }
  }),
}

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(false);
    setVisible(prev => prev === 10 ? 10 : prev +1)
  };
  const prevPlease = () => {
    setBack(true);
    setVisible(prev => prev === 1 ? 1 : prev -1)
  };
  return (
      <Wrapper>
        <AnimatePresence mode="wait" custom={back}>
          <Box 
          custom={back}
            variants={box} 
            initial="entry" 
            animate="center" 
            exit="exit" key={visible}>
              {visible}
            </Box>
        </AnimatePresence>
        <button onClick={nextPlease}>Next</button>
        <button onClick={prevPlease}>Prev</button>
      </Wrapper>
  );
}

export default App;
