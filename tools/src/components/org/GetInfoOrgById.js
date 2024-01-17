// GetInfoOrgById.js
import React, { useState } from 'react';

const GetInfoOrgById = () => {
  const [orgId, setOrgId] = useState('');
  const [info, setInfo] = useState('');

  const handleInputChange = (e) => {
    setOrgId(e.target.value);
  };

  const handleGetInfo = () => {
    // Đây là nơi bạn có thể thực hiện logic để lấy thông tin từ ID Org
    // Ở đây, mình sẽ hiển thị nội dung trực tiếp, bạn có thể thay thế bằng logic thực tế.
    setInfo(`Thông tin cho Org có ID ${orgId}`);
  };

  return (
    <div>
      <div>
        <label>ID Org:</label>
        <input type="text" value={orgId} onChange={handleInputChange} />
      </div>
      <div>
        <button onClick={handleGetInfo}>Lấy thông tin</button>
      </div>
      <div>
        <strong>Thông tin:</strong> {info}
      </div>
    </div>
  );
};

export default GetInfoOrgById;
