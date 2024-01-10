import React, { useState } from 'react';
import Header from './App/Header';
import Main from './App/Main_';

function App() {
  const [menu, setMenu] = useState('');

  const handleMenuClick = (menu) => {
    setMenu(menu);
  };

  return (
    <div className="app" key="app">
      <Header key="header" activeMenu={menu} onMenuClick={handleMenuClick} />
      <Main key="main" activeMenu={menu} />
    </div>
  );
}

export default App;
