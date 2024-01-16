// Org.js
import React from 'react';
import { Link } from 'react-router-dom';

const Org = () => {
  return (
    <div>
      <p>Org Page</p>
      <ul>
        <li><Link to="/org/tool1">Tool 1</Link></li>
        <li><Link to="/org/tool2">Tool 2</Link></li>
      </ul>
    </div>
  );
};

export default Org;
