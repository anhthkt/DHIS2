// GetInfoOrgById.js
import React, { useState } from 'react';
import { Select, Button, Input } from 'antd';
import SYSTEM_CONST from '../../CONST.js';
import axios from 'axios';

const authentication = {
  username: `anhth`,
  password: `Csdl2018@)!*`
}

const { Option } = Select;
const GetInfoOrgById = () => {
  const [systemUrl, setSystemUrl] = useState('');
  const [orgId, setOrgId] = useState('');
  const [info, setInfo] = useState('');

  const handleSelectSystemChange = (value) => {
    setSystemUrl(value);
  };

  const handleInputOrgIDChange = (e) => {
    setOrgId(e.target.value);
  };

  const handleGetInfo = async () => {
    const baseUrl = SYSTEM_CONST[systemUrl] || '';

    try {
      // Gọi API để lấy thông tin của Org
      const url = `${baseUrl}/api/organisationUnits.json?fields=:owner&filter=id:eq:${orgId}&paging=false`;
      const response = await axios.get(url, { auth: authentication });
      // const data = response.data;
      // Hiển thị kết quả API xuống bên dưới
      setInfo(`Các lựa chọn: Hệ thống: ${baseUrl} | OrgID: ${orgId}<br />`);

      if (response.data.organisationUnits && response.data.organisationUnits.length > 0) {
        const orgInfo = response.data.organisationUnits[0];
        console.log(orgInfo);
        setInfo((prevInfo) => `${prevInfo}Tên Đơn vị: ${orgInfo.name}, Code: ${orgInfo.code}, Path: ${orgInfo.path}`);
      } else {
        setInfo((prevInfo) => `${prevInfo}Không tìm thấy thông tin cho OrgID: ${orgId}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setInfo('Có lỗi xảy ra khi lấy thông tin từ API.');
    }
  };

  return (
    <div>
      <div>
      <label>Chọn hệ thống:</label>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Chọn hoặc nhập domain tên hệ thống"
          optionFilterProp="children"
          onChange={handleSelectSystemChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="baocao">baocao.tkyt.vn</Option>
          <Option value="kln">kln.tkyt.vn</Option>
          <Option value="nhanluc">nhanluc.tkyt.vn</Option>
          <Option value="nhanlucdev">dev.tkyt.vn/nhanluc</Option>
        </Select>
      </div>
      <div>
      <label>ID Org:</label>
        <Input style={{ width: 150 }} placeholder="Nhập ID Org" onChange={handleInputOrgIDChange}/>
      </div>
      <div>
        <Button onClick={handleGetInfo}>Lấy thông tin</Button>
      </div>
      <div>
        <strong>Thông tin: </strong> {info}
      </div>
    </div>
  );
};

export default GetInfoOrgById;
