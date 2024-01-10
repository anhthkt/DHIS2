import React, { useState } from 'react';
import XLSX from 'xlsx';
import RenderDataMenu2 from './Function/RenderDataMenu2';
import RenderData from './Function/RenderData';
import { Modal, Row, Col } from 'antd';
import { FetchIdOrg, FetchIdTeiByBHYT, FetchIdTeiByCMT } from './Function/Services';
import { checkDataRow } from './Function/CheckDataRow';



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

  // Get TeiID
  const getTeiId = async (result) => {
    const newResult = [...result];
    for (let i = 0; i < newResult.length; i++) {
      const row = newResult[i];
      if (row.note === '' && (row.TeiId === undefined || row.TeiId === '')) {
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
          const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 2, blankrows: false }).filter((row) => row.some((cell) => cell !== '')); // Đọc file excel từ dòng thứ 2

          // Chuyển đổi định dạng cột G, M (ngày tháng)
          for (let i = 0; i < data.length; i++) {
            const row = data[i];
            const birth = row[6]; // Giá trị ngày tháng trong cột G
            const date2 = row[12]; // Giá trị ngày tháng trong cột M
            if (birth && typeof birth === 'number') {
              row[6] = XLSX.SSF.format('dd/mm/yyyy', birth); // Chuyển đổi định dạng ngày tháng
            }
            if (date2 && typeof date2 === 'number') {
              row[12] = XLSX.SSF.format('dd/mm/yyyy', date2); // Chuyển đổi định dạng tiền tệ
            }
          }

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
    const keyArr = ["key", "code", "code2", "code3", "name", "sex", "birth", "bhyt", "cmt", "add", "job", "phone", "date2", "add2", "note", "idOrg", "teiId", "program"];
    // setHeader(header);
    // setKeyArr(keyArr);
    // props.onGetHeader(header);
    props.onGetKeyArr(keyArr);
    // keyArr.push(`${keyArr.length + 1}`)
    const rows = data.slice(2); // Data lấy từ dòng thứ 3
    let result = [];
    // Map value: data Excel vào key: keyArr 
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      const obj = {};
      keyArr.forEach((col, index) => {
        obj[col] = row[index];
      });
      obj.note = checkDataRow(obj);
      obj.key = i + 1;
      result.push(obj);
    }
    // rows.forEach((row) => {
    //   const obj = {};
    //   keyArr.forEach((col, index) => {
    //     obj[col] = row[index];
    //   });
    //   obj.note = checkDataRow(obj);
    //   obj.key = i;
    //   result.push(obj);
    // });

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

  const handleUploadFile = async(e) => {
    const file = e.target.files[0];
    // const data = await readExcelFile(file);
    await getHeaderAndData(await readExcelFile(file));
  }

  return (
    <div key="menu2">
      <Row justify="space-around">
        <Col span={2}></Col>
        <Col span={2}><h4><input type="file" onChange={handleUploadFile} /></h4></Col>
        <Col span={2}></Col>
      </Row>
      <Modal open={isLoading} title="Đang xử lý dữ liệu">
        <p>Vui lòng đợi trong giây lát...</p>
      </Modal>
      {data && (RenderData(data))}
    </div>
  );
};

export default Menu2;