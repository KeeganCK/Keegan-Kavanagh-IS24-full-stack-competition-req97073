import React from 'react';
import Tables from './Comopnents/Tables';
import styled from 'styled-components';
import Titles from './Comopnents/Titles';

const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  return (
    <ContainerDiv >
      <Titles title="IMB Products Currently Being Developed or Maintained" />
      <Tables />
    </ContainerDiv>
  );
}

export default App;
