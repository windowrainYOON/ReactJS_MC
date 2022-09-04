import styled from "styled-components";
import React, {useState} from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;
function App() {
  return (
      <Container>
        <H1>hihi</H1>
      </Container>
  );
}

export default App;
