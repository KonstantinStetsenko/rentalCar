import { Flex, Spin } from 'antd';
import React from 'react';

const Spinner = () => (
  <Flex align="center" gap="middle">
    {/* <Spin size="small" />
    <Spin /> */}
    <Spin size="large" />
  </Flex>
);
export default Spinner;
