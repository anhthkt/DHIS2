import React from 'react';

function Header({ activeMenu, onMenuClick }) {
  return (
    <div className="header">
      <nav>
        <ul>
          <li className={activeMenu === 'menu1' ? 'active' : ''}>
            <a onClick={() => onMenuClick('menu1')}>Menu item 1</a>
          </li>
          <li className={activeMenu === 'menu2' ? 'active' : ''}>
            <a onClick={() => onMenuClick('menu2')}>Menu item 2</a>
          </li>
          <li className={activeMenu === 'menu3' ? 'active' : ''}>
            <a onClick={() => onMenuClick('menu3')}>Menu item 3</a>
          </li>
          <li className={activeMenu === 'menu4' ? 'active' : ''}>
            <a onClick={() => onMenuClick('menu4')}>Menu item 4</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
