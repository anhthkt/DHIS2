// Tool2.js
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
import ExcelJS from 'exceljs';


const baseUrl = `http://dev.tkyt.vn/nhanluc`;
const authentication = {
  username: `anhth`,
  password: `Csdl2018@)!*`
}

const Tool2 = () => {
  const [dataSetId, setDataSetId] = useState('');

  const handleDataSetIdChange = (e) => {
    setDataSetId(e.target.value);
  };

  const handleExportExcel = async () => {
    try {
      // Gọi API để lấy dữ liệu từ dataSetId
      const url = `${baseUrl}/api/dataSets.json?filter=id:eq:${dataSetId}&fields=dataEntryForm[*]&paging=false`;
      const response = await axios.get(url, { auth: authentication });

      // Tạo workbook và worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('DataSet');

      // Xử lý dữ liệu từ API response và thêm vào worksheet
      worksheet.columns = [
        { header: 'Column 1', key: 'column1', width: 10 },
        { header: 'Column 2', key: 'column2', width: 20 },
        // Thêm các cột khác tương ứng với dữ liệu bạn muốn xuất ra Excel
      ];

      // Ghi dữ liệu vào từ response
      response.data.forEach((item, index) => {
        worksheet.addRow({
          column1: item.column1,
          column2: item.column2,
          // Thêm các trường dữ liệu khác tương ứng với dữ liệu bạn muốn xuất ra Excel
        });
      });

      // Xuất file Excel
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const urlExcel = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlExcel;
      a.download = 'dataSet.xlsx';
      a.click();
      window.URL.revokeObjectURL(urlExcel);
    } catch (error) {
      console.error('Error exporting Excel:', error);
    }
  };

  return (
    <div>
      <div>
        <label>Nhập ID của DataSet:</label>
        <Input style={{ width: 200 }} placeholder="Nhập ID DataSet" onChange={handleDataSetIdChange} />
      </div>
      <div>
        <Button type="primary" onClick={handleExportExcel}>Xuất Excel</Button>
      </div>
    </div>
  );
};

export default Tool2;
