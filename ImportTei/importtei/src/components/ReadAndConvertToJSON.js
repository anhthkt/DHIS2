import axios from 'axios';
import React, { useState } from 'react';
import XLSX from 'xlsx';


const ExcelReader = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [header, setHeader] = useState([]);
  const [keyArr, setKeyArr] = useState([]);
  const [data, setData] = useState([]);
  // const [initCompleted, setInitCompleted] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Hàm để đọc file Excel
  const readExcelFile = (file) => {
    // const e = file;
    if (file !== excelFile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = (e) => {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 2 }); // Đọc file excel từ dòng thứ 2

          setExcelFile(file);
          resolve(data);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    }
  };

  // Hàm để lấy header và data. Check row
  const getHeaderAndData = async (data) => {
    const header = data[0]; // Dòng đầu tiên là header hiển thị ra table
    header.push("Ghi chu");
    const keyArr = ["stt", "code", "code2", "code3", "name", "sex", "birth", "bhyt", "cmt", "add", "job", "phone", "date2", "add2", "note"]; // Lấy dòng thứ 2 làm key
    // keyArr.push(`${keyArr.length + 1}`)
    const rows = data.slice(2); // Data lấy từ dòng thứ 3
    let result = [];
    rows.forEach((row) => {
      const obj = {};
      keyArr.forEach((col, index) => {
        obj[col] = row[index];
      });
      obj.note = checkDataRow(obj);
      result.push(obj);
    });
    const columnCodeOrg = result.map((row) => row.code); // Lấy cột mã Đơn vị
    const idOrgArr = await FetchIdOrg(columnCodeOrg);
    result.forEach((row1) => {
      let found = false;
      idOrgArr.forEach((row2) => {
        if (row1.code === row2.code) {
          row1.idorg = row2.id;
          found = true;
        }
      })
      if (!found) {
        row1.id = '';
        row1.note += 'Kiểm tra lại mã đơn vị. \n';
      }
    })

    setHeader(header);
    setKeyArr(keyArr);
    setData(result);
    setShowButton(true);
  };

  // Hàm để hiển thị dữ liệu lên UI
  const renderData = () => {
    return (
      <table>
        <thead>
          <tr>
            {header.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {keyArr.map((col, index) => (
                <td key={index}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Hàm import data
  const handleImport = async () => {
    data.forEach(async (row) => {
      const idTeiByBHYT = await FetchIdTeiByBHYT(row.bhyt);
      row.teiId = idTeiByBHYT;
    })
    console.log(data);
  };

  return (
    <div>
      <input type="file" onChange={async (e) => {
        const file = e.target.files[0];
        const data = await readExcelFile(file);
        await getHeaderAndData(data);
        // setInitCompleted(true)
      }} />
      {showButton && <button onClick={async () => { await handleImport(data) }}>IMPORT DATA</button>}
      {renderData()/* {initCompleted && renderData()} */}
    </div>
  );
};


// Hàm để check row
const checkDataRow = (row) => {
  let errorMessage = '';
  // Check Mã đơn vị
  if (row.code === '') {
    errorMessage += "Chua nhap Mã đơn vị. \n";
  } else {
    errorMessage += '';
  }
  // Check Họ và tên
  if (row.name === undefined) {
    errorMessage += "Chưa nhập Họ và tên. \n";
  }
  // Check Giới tính
  if (!(row.sex === '01' || row.sex === '02')) {
    errorMessage += "Kiểm tra lại Mã Giới tính. \n";
  }
  // Check Ngày tháng năm sinh
  if (!validateDate(row.birth)) {
    errorMessage += "Kiểm tra lại Ngày sinh. \n";
  }
  // Check Mã BHYT đã tồn tại
  if (row.bhyt === '' || row.bhyt === undefined) {
    errorMessage += "Kiểm tra lại Mã BHYT. \n";
  }
  // Check CMT đã tồn tại

  // Check Ngày phát hiện
  if (!validateDate(row.date2)) {
    errorMessage += "Kiểm tra lại Ngày phát hiện. \n";
  }
  // Check nơi phát hiện
  if (!(row.add2 === '1' || row.add2 === '2' || row.add2 === '3' || row.add2 === '4' || row.add2 === '5' || row.add2 === '6')) {
    errorMessage += "Kiểm tra lại Mã Nơi phát hiện. \n";
  }

  if (errorMessage !== '') {
    return errorMessage;
  }
  return '';
}

// Hàm check Ngày tháng năm
const validateDate = (date) => {
  if (date !== "") {
    let mDate2 = date.toString().split("/");
    let mYear2 = parseInt(mDate2[2], 10);
    let mMonth2 = parseInt(mDate2[1], 10);
    let mDay2 = parseInt(mDate2[0], 10);
    let newDate2 = new Date(mYear2, mMonth2 - 1, mDay2);
    let currentDate = new Date();
    if (newDate2.getFullYear() !== mYear2 || newDate2.getMonth() + 1 !== mMonth2 || newDate2.getDate() !== mDay2 || mYear2 < 1900 || newDate2.getTime() > currentDate.getTime()) {
      return false;
      // console.log("Kiem tra lai ngay thang nam sinh")
    } else {
      return true;
    }
    // Logger.log(mYear2+"-"+mMonth2+"-"+mDay2);
  }
  return false;
}

// Hàm get ID Org qua api
const FetchIdOrg = async (codeOrg) => {
  const url = `https://kln.tkyt.vn/api/organisationUnits.json?fields=code,id&filter=code:in:[${codeOrg}]&paging=false`;

  const response = await axios.get(url, {
    auth: {
      username: 'anhth',
      password: `Csdl2018@)!*`
    }
  });
  return (response.data.organisationUnits);
};

const FetchIdTeiByBHYT = async (bhyt) => {
  if(bhyt !== '' && bhyt !== undefined) {
    const url = `https://kln.tkyt.vn/api/trackedEntityInstances.json?fields=trackedEntityInstance&ouMode=ACCESSIBLE&attribute=JHb1hzseNMg:eq:${bhyt}&paging=false`;

    const response = await axios.get(url, {
      auth: {
        username: 'anhth',
        password: `Csdl2018@)!*`
      }
    });
    if(response.data.trackedEntityInstances.length > 0) {
      return (response.data.trackedEntityInstances[0].trackedEntityInstance);
    }
    return ("Tạo mới tei");
  } else {
    return ("Tạo mới Tei");
  }

};
// Hàm check Tei đã có Mã Bảo Hiểm hoặc CMT

// Hàm tạo mới hoặc update thông tin + đăng ký chương trình

export default ExcelReader;
