import React, { useState } from 'react';
import XLSX from 'xlsx';
import RenderData from './Function/RenderData';
import { Modal } from 'antd';
import { FetchIdOrg, FetchIdTeiByBHYT, FetchIdTeiByCMT } from './Function/Services';
import { Row, Col } from 'antd';



const Menu2 = (props) => {
  const [excelFile, setExcelFile] = useState(null);
  // const [header, setHeader] = useState([]);
  // const [keyArr, setKeyArr] = useState([]);
  const [data, setData] = useState([]);
  // const selectedFields = ["stt", "code", "code2", "code3", "name", "sex", "birth", "bhyt", "cmt", "add", "job", "phone", "date2", "add2", "note"];
  const [isLoading, setIsLoading] = useState(false);

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

  // Get TeiID
  const getTeiId = async (result) => {
    const newResult = [...result];
    for (let i = 0; i < newResult.length; i++) {
      const row = newResult[i];
      if (row.note === '') {
        let idTeiByBHYT = "";
        let idTeiByCMT = "";
        let rowNote = '';
        let rowTeiId = '';
        let program = [];
        if (row.bhyt !== '' && row.bhyt !== undefined) {
          let resFetchIdTeiByBHYT = await FetchIdTeiByBHYT(row.bhyt);
          idTeiByBHYT = resFetchIdTeiByBHYT.trackedEntityInstance;
          program = resFetchIdTeiByBHYT.enrollments;
        }
        if (row.cmt !== '' && row.cmt !== undefined) {
          let resFetchIdTeiByCMT = await FetchIdTeiByCMT(row.cmt);
          idTeiByCMT = resFetchIdTeiByCMT.trackedEntityInstance;
          program = resFetchIdTeiByCMT.enrollments;
        }

        if (idTeiByBHYT !== "" && idTeiByCMT !== "" && idTeiByBHYT !== idTeiByCMT) {
          rowNote = "BHYT và CMT tồn tại trên 2 BN khác nhau. ";
          rowTeiId = '';
          program = [];
        } else {
          // row.note += "Import hoặc Enrollment"
          if (idTeiByBHYT !== "" && idTeiByCMT !== "" && idTeiByBHYT === idTeiByCMT) {
            rowTeiId = idTeiByBHYT;
            // rowNote = "Đã có tei theo BHYT và CMT. "
          }
          if (idTeiByBHYT !== "" && idTeiByCMT === "") {
            rowTeiId = idTeiByBHYT;
            // rowNote = "Đã có tei theo BHYT. "
          }
          if (idTeiByBHYT === "" && idTeiByCMT !== "") {
            rowTeiId = idTeiByCMT;
            // rowNote = "Đã có tei theo CMT. "
          }
        }
        row.note += rowNote;
        if (rowTeiId === undefined) { row.teiId = ""; } else { row.teiId = rowTeiId; }
        if (program === undefined) { row.program = []; } else { row.program = program; }

      }
    }
    return newResult;
  };

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
  async function getHeaderAndData(data) {
    setIsLoading(true);
    // const header = data[0]; // Dòng đầu tiên là header hiển thị ra table
    // header.push("Ghi chú");
    const keyArr = ["stt", "code", "code2", "code3", "name", "sex", "birth", "bhyt", "cmt", "add", "job", "phone", "date2", "add2", "note", "idOrg", "teiId", "program"];
    // setHeader(header);
    // setKeyArr(keyArr);
    // props.onGetHeader(header);
    props.onGetKeyArr(keyArr);
    // keyArr.push(`${keyArr.length + 1}`)
    const rows = data.slice(2); // Data lấy từ dòng thứ 3
    let result = [];
    // Map value: data Excel vào key: keyArr 
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

    // Map idOrg vào data
    result.forEach((row1) => {
      var found = 0;
      idOrgArr.forEach((row2) => {
        if (parseInt(row1.code) === parseInt(row2.code)) {
          row1.idOrg = row2.id;
          found = 1;
        }
      });
      if (found !== 1) {
        row1.idOrg = '';
        row1.note += 'Kiểm tra lại mã đơn vị. \n';
      }
    });

    await getTeiId(result);

    setData(result);
    props.onGetData(result);
    setIsLoading(false);
  }

  return (
    <div>
      <Row justify="space-around">
        <Col span={2}></Col>
        <Col span={2}><h4><input type="file" onChange={async (e) => {
        const file = e.target.files[0];
        // const data = await readExcelFile(file);
        await getHeaderAndData(await readExcelFile(file));
      }} /></h4>
      </Col>
        <Col span={2}></Col>
      </Row>
      <Modal visible={isLoading} title="Đang xử lý dữ liệu">
        <p>Vui lòng đợi trong giây lát...</p>
      </Modal>
      {data && (RenderData(data))}
    </div>
  );
};

export default Menu2;