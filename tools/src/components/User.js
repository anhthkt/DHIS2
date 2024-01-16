// User.js
import React from 'react';
import { Link } from 'react-router-dom';

const User = () => {
  return (
    <div>
      <p>User Page</p>
      <ul>
        <li><Link to="/user/tool3">Tool 3</Link></li>
        <li><Link to="/user/tool4">Tool 4</Link></li>
      </ul>
    </div>
  );
};

export default User;
