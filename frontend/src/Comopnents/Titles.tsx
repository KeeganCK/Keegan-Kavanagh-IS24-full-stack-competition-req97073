import React from 'react'
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

const CustomTitle = styled(Title)`
  margin: 0;
  padding: 0;
`

type TitleProps = {
  title: string
}

const Titles = (props: TitleProps) => {
  return (
    <CustomTitle level={4}>{props.title}</CustomTitle>
  )
}

export default Titles