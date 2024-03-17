// GetIdDataSet.js
import React, { useState } from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
import ExcelJS from 'exceljs';
import cheerio from 'cheerio';

// const baseUrl = `http://dev.tkyt.vn/nhanluc`;
const baseUrl = `http://nhanluc.tkyt.vn`;
const authentication = {
  username: `anhth`,
  password: `Csdl2018@)!*`
}

const GetIdDataSet = () => {
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

      // Load HTML vào cheerio để phân tích
      const $ = cheerio.load(response.data.dataSets[0].dataEntryForm.htmlCode);

      // Trích xuất dữ liệu từ bảng HTML và đưa vào bảng Excel
      $('table.organization-table').each((index, element) => {
        $(element).find('tr').each((rowIndex, row) => {
            const rowData = [];
            $(row).find('td, th').each((colIndex, col) => {
                const rowspan = parseInt($(col).attr('rowspan')) || 1;
                const colspan = parseInt($(col).attr('colspan')) || 1;
    
                // Merge cell if rowspan or colspan exists
                for (let i = 0; i < colspan; i++) {
                    for (let j = 0; j < rowspan; j++) {
                        if (i > 0 || j > 0) continue; // Skip first cell
                        // Kiểm tra nếu có thẻ input trong thẻ td
                        const input = $(col).find('input');
                        if (input.length > 0) {
                            // Nếu có input, lấy giá trị của thuộc tính id
                            rowData.push(input.attr('id').trim());
                        } else {
                            // Nếu không có input, lấy văn bản của thẻ td
                            rowData.push($(col).text().trim());
                        }
                    }
                }
            });
            worksheet.addRow(rowData);
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

export default GetIdDataSet;
