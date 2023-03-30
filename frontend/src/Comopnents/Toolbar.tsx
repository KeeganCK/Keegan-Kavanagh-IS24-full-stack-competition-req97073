import React from "react";
import styled from "styled-components";
import Titles from './Titles';

const ToolbarDiv = styled.div`
  height: 50px;
  width: 100%;
  margin: 0 0 40px 0;
	padding: 0;
  box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	align-items: flex-end;
`;

const Toolbar = () => {
  return (
    <ToolbarDiv>
      <Titles title="IMB Products Currently Being Developed or Maintained" />
    </ToolbarDiv>
  );
};

export default Toolbar;
