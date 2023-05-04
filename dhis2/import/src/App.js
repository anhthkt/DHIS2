import React, { useState } from 'react';
import Header from './App/Header';
import Main from './App/Main';

function App() {
  const [menu, setMenu] = useState('menu1');

  const handleMenuClick = (menu) => {
    setMenu(menu);
  };

  return (
    <div className="app" key="app">
      <Header activeMenu={menu} onMenuClick={handleMenuClick} />
      <Main activeMenu={menu} />
    </div>
  );
}

export default App;
