// App.js
import React, { useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import GetInfoOrgById from './components/org/GetInfoOrgById';
import Tool2 from './components/org/Tool2';
import Tool3 from './components/user/Tool3';
import Tool4 from './components/user/Tool4';
import Tool5 from './components/khac/Tool5';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = {
    Org: ['GetInfoOrgById', 'Tool 2'],
    User: ['Tool 3', 'Tool 4'],
    Other: ['Tool 5'],
  };

  const handleToolClick = ({ key }) => {
    setSelectedTool(key);
  };

  const toolMenu = (category) => (
    <Menu onClick={handleToolClick}>
      {tools[category].map((tool) => (
        <Menu.Item key={tool}>{tool}</Menu.Item>
      ))}
    </Menu>
  );

  const renderContent = () => {
    switch (selectedTool) {
      case 'GetInfoOrgById':
        return <GetInfoOrgById />;
      case 'Tool 2':
        return <Tool2 />;
      case 'Tool 3':
        return <Tool3 />;
      case 'Tool 4':
        return <Tool4 />;
      case 'Tool 5':
        return <Tool5 />;
      default:
        return <div>Content for Home</div>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="Home" onClick={() => setSelectedTool(null)}>
            Home
          </Menu.Item>
          {Object.entries(tools).map(([category, items], index) => (
            <Dropdown key={category} overlay={() => toolMenu(category)}>
              <a
                href="/main"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ marginLeft: index === 0 ? '0' : '20px' }}
              >
                {category}
              </a>
            </Dropdown>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: '20px', flex: '1' }}>{renderContent()}</Content>
      <Footer style={{ textAlign: 'center' }}>Footer Content</Footer>
    </Layout>
  );
};

export default App;