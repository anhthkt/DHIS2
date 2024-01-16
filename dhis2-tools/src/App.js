// src/App.js
import React, { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content } = Layout;

const App = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);

  const units = ['Đơn vị 1', 'Đơn vị 2', 'Đơn vị 3'];

  const handleUnitChange = ({ key }) => {
    setSelectedUnit(key);
  };

  const unitMenu = (
    <Menu onClick={handleUnitChange}>
      {units.map((unit) => (
        <Menu.Item key={unit}>{unit}</Menu.Item>
      ))}
    </Menu>
  );

  const renderContent = () => {
    if (selectedUnit) {
      return <div>Nội dung cho {selectedUnit}</div>;
    }

    return <div>Vui lòng chọn đơn vị</div>;
  };

  return (
    <Layout>
      <Header>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Dropdown overlay={unitMenu}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              {selectedUnit || 'Chọn Đơn vị'}
            </a>
          </Dropdown>
        </div>
      </Header>
      <Content style={{ padding: '20px' }}>{renderContent()}</Content>
    </Layout>
  );
};

export default App;
