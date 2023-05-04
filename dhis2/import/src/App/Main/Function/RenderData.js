import React from 'react';
import { Table } from 'antd';

const RenderData = (data) => {
  const columns = [
    {
      title: 'STT (*)',
      dataIndex: 'stt'
    },
    {
      title: 'Mã Xã/Phường/Thị trấn (*)',
      dataIndex: 'code'
    },
    {
      title: 'Mã Huyện/ Thị xã/ Thành phố',
      dataIndex: 'code2'
    },
    {
      title: 'Mã Tỉnh/ Thành phố',
      dataIndex: 'code3'
    },
    {
      title: 'Họ và Tên (*)',
      dataIndex: 'name'
    },
    {
      title: 'Giới tính (*)',
      dataIndex: 'sex'
    },
    {
      title: 'Năm sinh (*)',
      dataIndex: 'birth'
    },
    {
      title: 'Mã BHYT (*)',
      dataIndex: 'bhyt'
    },
    {
      title: 'Số CMT/CCCD',
      dataIndex: 'cmt'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'add'
    },
    {
      title: 'Nghề nghiệp',
      dataIndex: 'job'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone'
    },
    {
      title: 'Ngày phát hiện',
      dataIndex: 'date2'
    },
    {
      title: 'Nơi phát hiện',
      dataIndex: 'add2'
    },
    {
      title: 'Ghi Chú',
      dataIndex: 'note',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.note.localeCompare(b.note)
    },
  ];

  const filteredData = data?.map((item) => {
    const newItem = {};
    columns?.forEach((column) => {
      newItem[column.dataIndex] = item[column.dataIndex];
    });
    return newItem;
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <Table
      dataSource={filteredData}
      columns={columns}
      onChange={onChange}
      pagination={{ pageSize: 10 }} // phân trang với mỗi trang có 10 dòng
    />
  );
}

export default RenderData;
