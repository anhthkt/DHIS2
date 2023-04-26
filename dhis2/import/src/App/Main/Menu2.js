import axios from 'axios';
import React, { useState } from 'react';
import XLSX from 'xlsx';
import RenderData from './RenderData';

const Menu2 = (props) => {
  const [excelFile, setExcelFile] = useState(null);
  const [header, setHeader] = useState([]);
  const [keyArr, setKeyArr] = useState([]);
  const [data, setData] = useState([]);

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
    const keyArr = ["stt", "code", "code2", "code3", "name", "sex", "birth", "bhyt", "cmt", "add", "job", "phone", "date2", "add2", "note"]; 
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
    const columnCodeOrg = deleteDuplicate(result.map((row) => row.code)); // Lấy cột mã Đơn vị
    const idOrgArr = await FetchIdOrg(columnCodeOrg);
    result.forEach((row1) => {
      var found = 0;
      idOrgArr.forEach((row2) => {
        if (parseInt(row1.code) === parseInt(row2.code)) {
          row1.idorg = row2.id;
          found = 1;
        }
      })
      if (found !== 1) {
        row1.id = '';
        row1.note += 'Kiểm tra lại mã đơn vị. \n';
      }
    })

    setHeader(header);
    setKeyArr(keyArr);
    setData(result);
    props.onGetHeader(header);
    props.onGetKeyArr(keyArr);
    props.onGetData(result);
  };

  // Hàm để hiển thị dữ liệu lên UI
  // const renderData = () => {
  //   return (
  //     <table border="1px solid">
  //       <thead>
  //         <tr>
  //           {header.map((col, index) => (
  //             <th key={index}>{col}</th>
  //           ))}
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {data.map((row, index) => (
  //           <tr key={index}>
  //             {keyArr.map((col, index) => (
  //               <td key={index}>{row[col]}</td>
  //             ))}
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   );
  // };

  // Hàm import data
//   const handleImport = async () => {
    
//     data.forEach(async (row) => {
//       if (row.bhyt !== '' && row.bhyt !== undefined) { var idTeiByBHYT = await FetchIdTeiByBHYT(row.bhyt); }
//       if (row.bhyt !== '' && row.bhyt !== undefined) { var idTeiByCMT = await FetchIdTeiByCMT(row.cmt); }
//       if (idTeiByBHYT === idTeiByCMT) {
//         row.teiId = idTeiByBHYT;
//       }
//       if (idTeiByBHYT !== "" && idTeiByCMT === "") {
//         row.teiId = idTeiByBHYT;
//       }
//       if (idTeiByBHYT === "" && idTeiByCMT !== "") {
//         row.teiId = idTeiByCMT;
//       }
//       if (idTeiByBHYT !== "" && idTeiByCMT !== "" && idTeiByBHYT !== idTeiByCMT) {
//         row.note += "BHYT và CMT tồn tại trên 2 BN khác nhau";
//       }
//     })
    
//     // data.forEach(async (row) => {
//     //   if (row.note === '') {
//     //     if (row.teiId === '') {
//     //       // Import Tei
//     //       row.note += importTei(createDataTei(row, programID));
//     //       setData(data);
//     //     }

//     //     if (row.teiId !== '') {
//     //       // Import Program
//     //       row.note += importEnrollment(createDataEnrollment(row, programID));
//     //       setData(data);
//     //     }
//     //   }
//     // })
//   };

  return (
    <div>
      <input type="file" onChange={async (e) => {
        const file = e.target.files[0];
        // const data = await readExcelFile(file);
        await getHeaderAndData(await readExcelFile(file));
        // setInitCompleted(true)
      }} />
      {/* {showButton && <button onClick={async () => { await handleImport(data) }}>IMPORT DATA</button>} */}
      {RenderData(header, data, keyArr)/* {initCompleted && renderData()} */}
    </div>
  );
};

// Hàm xóa dữ liệu trùng nhau trong mảng
function deleteDuplicate(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}

// Hàm để check row
const checkDataRow = (row) => {
  let errorMessage = '';
  // Check Mã đơn vị
  if (row.code === '') {
    errorMessage += "Chưa nhập Mã đơn vị. \n";
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
  // Check Mã BHYT/CMT không có giá trị
  if ((row.bhyt === '' || row.bhyt === undefined) && (row.cmt === '' || row.cmt === undefined)) {
    errorMessage += "Kiểm tra lại Mã BHYT/CMT. \n";
  }
  // Check BHYT và CMT đã tồn tại trên 2 Tei khác nhau.

  // Check Ngày phát hiện
  if (row.date2 !== '' && validateDate(row.date2) === false) {
    errorMessage += "Kiểm tra lại Ngày phát hiện. \n";
  }
  // Check nơi phát hiện
  if (row.add2 !== '' && row.add2 !== undefined && row.add2 !== '1' && row.add2 !== '2' && row.add2 !== '3' && row.add2 !== '4' && row.add2 !== '5' && row.add2 !== '6') {
    errorMessage += "Kiểm tra lại Mã Nơi phát hiện. \n";
  }

  if (errorMessage !== '') {
    return errorMessage;
  }
  return '';
}

// Hàm check Ngày tháng năm
const validateDate = (date) => {
  if (date !== undefined) {
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
  // return false;
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

// Hàm check TeiId by BHYT
// const FetchIdTeiByBHYT = async (bhyt) => {
//   if (bhyt !== '' && bhyt !== undefined) {
//     const url = `https://kln.tkyt.vn/api/trackedEntityInstances.json?fields=trackedEntityInstance&ouMode=ACCESSIBLE&attribute=JHb1hzseNMg:eq:${bhyt}&paging=false`;

//     const response = await axios.get(url, {
//       auth: {
//         username: 'anhth',
//         password: `Csdl2018@)!*`
//       }
//     });
//     if (response.data.trackedEntityInstances.length > 0) {
//       return (response.data.trackedEntityInstances[0].trackedEntityInstance);
//     }
//     return ("");
//   } else {
//     return ("");
//   }
// };
// // Hàm check Tei by CMT
// const FetchIdTeiByCMT = async (cmt) => {
//   if (cmt !== '' && cmt !== undefined) {
//     const url = `https://kln.tkyt.vn/api/trackedEntityInstances.json?fields=trackedEntityInstance&ouMode=ACCESSIBLE&attribute=ZQ93P672wQR:eq:${cmt}&paging=false`;

//     const response = await axios.get(url, {
//       auth: {
//         username: 'anhth',
//         password: `Csdl2018@)!*`
//       }
//     });
//     if (response.data.trackedEntityInstances.length > 0) {
//       return (response.data.trackedEntityInstances[0].trackedEntityInstance);
//     }
//     return ("");
//   } else {
//     return ("");
//   }
// };
// Hàm tạo mới Tei 
// const importTei = (dataTei) => {
//   return "Tạo mới BN thành công.";
// }
// Hàm đăng ký chương trình
// const importEnrollment = (dataEnrollment) => {
//   return "Đăng ký chương trình thành công.";
// }
// Hàm tạo TeiData
// const createDataTei = (row, programID) => {
//   let ngayDangKy = "2021-01-01";
//   if (row.date2 !== "" && row.date2 !== undefined) {
//     ngayDangKy = convertDate(row.date2);
//   }
//   if (row.bhyt === undefined) { row.bhyt = '' };
//   if (row.cmt === undefined) { row.cmt = '' };
//   if (row.add === undefined) { row.add = '' };
//   if (row.job === undefined) { row.job = '' };
//   if (row.phone === undefined) { row.phone = '' };
//   if (row.add2 === undefined) { row.add2 = '' };
//   if (row.date2 === undefined) { row.date2 = '' };
//   let dataTei = {
//     "trackedEntityInstances": [{
//       "orgUnit": `${row.idorg}`,
//       "trackedEntityType": "EL3fkeMR3xK",
//       "inactive": false,
//       "deleted": false,
//       "featureType": "NONE",
//       "programOwners": [],
//       "enrollments": [
//         {
//           "orgUnit": `${row.idorg}`,
//           "program": `${programID}`,
//           "enrollmentDate": `${ngayDangKy}`,
//           "incidentDate": `${ngayDangKy}`,
//           "events": []
//         }
//       ],
//       "relationships": [],
//       "attributes": [
//         {
//           "code": "WHO_001",
//           "displayName": "Mã BHYT",
//           "attribute": "JHb1hzseNMg",
//           "value": `${row.bhyt}`
//         },
//         {
//           "code": "WHO_002",
//           "displayName": "Họ và tên",
//           "attribute": "xBoLC0aruyJ",
//           "value": `${row.name}`
//         },
//         {
//           "code": "WHO_003",
//           "displayName": "Giới tính",
//           "attribute": "rwreLO34Xg7",
//           "value": `${row.sex}`
//         },
//         {
//           "code": "WHO_004",
//           "displayName": "Năm sinh",
//           "attribute": "C7USC9MC8yH",
//           "value": `${convertDate(row.birth)}`
//         },
//         {
//           "displayName": "Số CMT/CCCD",
//           "attribute": "ZQ93P672wQR",
//           "value": `${row.cmt}`
//         },
//         {
//           "displayName": "Số điện thoại",
//           "attribute": "mZbgWADLTKY",
//           "value": `${row.phone}`
//         },
//         {
//           "code": "WHO_005",
//           "displayName": "Địa chỉ",
//           "attribute": "Bxp1Lhr8ZeN",
//           "value": `${row.add}`
//         },
//         {
//           "code": "WHO_006",
//           "displayName": "Nghề nghiệp",
//           "attribute": "L4djJU4gMyb",
//           "value": `${row.job}`
//         },
//         {
//           "displayName": "Ngày phát hiện ĐTĐ",
//           "attribute": "LnYKf02oBmF",
//           "value": `${convertDate(row.date2)}`
//         },
//         {
//           "displayName": "Nơi phát hiện ĐTĐ",
//           "attribute": "LHVZXlBbn2l",
//           "value": `${row.add2}`
//         },
//         {
//           "displayName": "Chọn Xã/ Phường/ Thị trấn",
//           "attribute": "Gy1fkmBZpFk",
//           "value": `${row.idorg}`
//         }
//       ]
//     }]
//   }
//   return dataTei;
// }
// Hàm tạo DataEnrollment
// const createDataEnrollment = (row, programID) => {
//   let ngayDangKy = "2021-01-01"
//   if (row.date2 !== "" && row.date2 !== undefined) {
//     ngayDangKy = convertDate(row.date2);
//   }
//   let dataEnrollment = {
//     "enrollments": [
//       {
//         "orgUnit": `${row.idorg}`,
//         "program": `${programID}`,
//         "trackedEntityType": "EL3fkeMR3xK",
//         "trackedEntityInstance": `${row.teiId}`,
//         "enrollmentDate": `${ngayDangKy}`,
//         "incidentDate": `${ngayDangKy}`,
//         "events": []
//       }
//     ]
//   }
//   return dataEnrollment;
// }

// Hàm convert Date
// const convertDate = (mdate) => {
//   if (mdate === '' || mdate === undefined) { return '' }
//   let mDate1 = mdate.toString().split("/");
//   let mYear = parseInt(mDate1[2], 10);
//   let mMonthTemp = `0${parseInt(mDate1[1], 10)}`;
//   let mMonth = mMonthTemp.substring(mMonthTemp.length - 2);
//   let mDayTemp = `0${parseInt(mDate1[0], 10)}`;
//   let mDay = mDayTemp.substring(mDayTemp.length - 2);
//   mdate = `${mYear}-${mMonth}-${mDay}`
//   return mdate
// }

export default Menu2;
