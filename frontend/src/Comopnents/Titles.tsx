import React from 'react'
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

type TitleProps = {
  title: string
}

const Titles = (props: TitleProps) => {
  return (
    <Title level={2}>{props.title}</Title>
  )
}

export default Titles