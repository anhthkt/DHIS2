// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/don-vi">Đơn vị</Link></li>
          <li><Link to="/user">User</Link></li>
          <li><Link to="/khac">Khác</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
