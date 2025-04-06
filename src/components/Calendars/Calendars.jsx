import { ConfigProvider, DatePicker, Space } from 'antd';
import React from 'react';
import './Calendar.global.css';

const onChange = (date, dateString) => {
  // console.log(date, dateString);
};

const App = () => (
  <ConfigProvider
    theme={{
      token: {
        activeBorderColor: '#82b4f9',
        warningActiveShadow: '0 0 0 2px rgba(255,215,5,0.1)',
        activeShadow: 'none',
        colorPrimary: '#00b96b',
      },
    }}
  >
    <Space direction="vertical">
      <DatePicker
        onChange={onChange}
        className="custom-datepicker"
        style={{
          width: '100%',
          height: '48px',
          border: 'none',
          padding: '12px 20px',
          fontFamily: 'Manrope',
          fontSize: '16px',
          fontWeight: '500',
          color: '#8d929a',
          fontStyle: 'normal',
          lineHeight: '24px',
        }}
        placeholder="Booking date"
      />
    </Space>
  </ConfigProvider>
);

export default App;
