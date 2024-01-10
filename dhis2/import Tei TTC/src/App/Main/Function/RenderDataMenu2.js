import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';

const RenderDataMenu2 = (data) => {
  const [currentData, setCurrentData] = useState(data);
  
  const columns = [
    {
      title: 'STT (*)',
      dataIndex: 'key'
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

  // const filteredData = data?.map((item) => {
  //   const newItem = {};
  //   columns?.forEach((column) => {
  //     newItem[column.dataIndex] = item[column.dataIndex];
  //   });
  //   return newItem;
  // });

  // if (filteredData.length > 0) {
  //   for (let i = 0; i < filteredData.length; i++) {
  //     filteredData[i].key = i;
  //   }
  // }
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const deleteRow = () => {
    console.log('Deleting row', data, selectedRowKeys);
    const newData = data.filter(item => !selectedRowKeys.includes(item.key));
    setCurrentData(newData);
    // RenderDataMenu2(data);
    console.log(newData);
    setSelectedRowKeys([]);
    setLoading(false);
  };

  useEffect(()=>{
    deleteRow();
  },[data])
  
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Bỏ chọn
        </Button>
        <span style={{ marginLeft: 8, }}>
          {hasSelected ? `Đã chọn ${selectedRowKeys.length} dòng` : ''}
        </span>
        <span style={{ marginLeft: 8, }}>
          {hasSelected ? (<Button danger onClick={deleteRow} disabled={!hasSelected} loading={loading}>
            Xóa
          </Button>) : null}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={currentData} onChange={onChange} pagination={{ pageSize: 10 }} />
    </div>
  );

  // return (
  //   <Table
  //     dataSource={filteredData}
  //     columns={columns}
  //     onChange={onChange}
  //     pagination={{ pageSize: 10 }} // phân trang với mỗi trang có 10 dòng
  //   />
  // );
}

export default RenderDataMenu2;
