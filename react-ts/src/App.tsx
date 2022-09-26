import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255, 1);
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  `;

const BiggerBox = styled.div`
  width: 400px;
  height: 400px;
  background-color: rgba(255,255,255, 0.2);
  border-radius: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  `;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  `;

const boxVariants = {
  hover: {scale:1, rotateZ:90},
  tab: {scale:1, borderRadius:"100px"},
  drag: {backgroundColor:"#fff"}
}

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
      <Wrapper>
        <BiggerBox ref={biggerBoxRef}>
          <Box 
            drag
            dragSnapToOrigin
            dragElastic={0.3}
            dragConstraints={biggerBoxRef}
            variants={boxVariants}
            whileHover="hover"
            whileTap="tab"
            whileDrag="drag"
            />
        </BiggerBox>
      </Wrapper>
  );
}

export default App;
