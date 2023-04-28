import React, { useState, useEffect } from 'react';
import RenderData from './RenderData';
import axios from 'axios';

const Menu3 = (props) => {
  const programId = props.selectedOption;
  const [data, setData] = useState(props.data);
  const header = props.header;
  const keyArr = props.keyArr;
  const selectedFields = ["stt", "code", "code2", "code3", "name", "sex", "birth", "bhyt", "cmt", "add", "job", "phone", "date2", "add2", "note"];
  const [errorData, setErrorData] = useState('');

  
    let checkData = false;
    data.forEach((row) => {
      if (row.note !== "") {
        checkData = true;
        return;
      }
    });

    if (checkData) {
      setErrorData('Kiểm tra lại dữ liệu.');
    } else {
      setErrorData('Đang import dữ liệu.');
      // Thực hiện import dữ liệu tại đây
      useEffect( async () => {
        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          await importTei(row).then((result) => {
            row.note = result;
            setData([...data]);
          });
        }
      }, [data]);
    }
  

  // Hàm tạo mới Tei 
  const importTei = async (dataTei) => {
    return "Tạo mới BN thành công.";
  }
  // Hàm đăng ký chương trình
  const importEnrollment = async (dataEnrollment) => {
    return "Đăng ký chương trình thành công.";
  }
  // Hàm tạo TeiData
  const createDataTei = (row, programID) => {
    let ngayDangKy = "2021-01-01";
    if (row.date2 !== "" && row.date2 !== undefined) {
      ngayDangKy = convertDate(row.date2);
    }
    if (row.bhyt === undefined) { row.bhyt = '' };
    if (row.cmt === undefined) { row.cmt = '' };
    if (row.add === undefined) { row.add = '' };
    if (row.job === undefined) { row.job = '' };
    if (row.phone === undefined) { row.phone = '' };
    if (row.add2 === undefined) { row.add2 = '' };
    if (row.date2 === undefined) { row.date2 = '' };
    let dataTei = {
      "trackedEntityInstances": [{
        "orgUnit": `${row.idorg}`,
        "trackedEntityType": "EL3fkeMR3xK",
        "inactive": false,
        "deleted": false,
        "featureType": "NONE",
        "programOwners": [],
        "enrollments": [
          {
            "orgUnit": `${row.idorg}`,
            "program": `${programID}`,
            "enrollmentDate": `${ngayDangKy}`,
            "incidentDate": `${ngayDangKy}`,
            "events": []
          }
        ],
        "relationships": [],
        "attributes": [
          {
            "code": "WHO_001",
            "displayName": "Mã BHYT",
            "attribute": "JHb1hzseNMg",
            "value": `${row.bhyt}`
          },
          {
            "code": "WHO_002",
            "displayName": "Họ và tên",
            "attribute": "xBoLC0aruyJ",
            "value": `${row.name}`
          },
          {
            "code": "WHO_003",
            "displayName": "Giới tính",
            "attribute": "rwreLO34Xg7",
            "value": `${row.sex}`
          },
          {
            "code": "WHO_004",
            "displayName": "Năm sinh",
            "attribute": "C7USC9MC8yH",
            "value": `${convertDate(row.birth)}`
          },
          {
            "displayName": "Số CMT/CCCD",
            "attribute": "ZQ93P672wQR",
            "value": `${row.cmt}`
          },
          {
            "displayName": "Số điện thoại",
            "attribute": "mZbgWADLTKY",
            "value": `${row.phone}`
          },
          {
            "code": "WHO_005",
            "displayName": "Địa chỉ",
            "attribute": "Bxp1Lhr8ZeN",
            "value": `${row.add}`
          },
          {
            "code": "WHO_006",
            "displayName": "Nghề nghiệp",
            "attribute": "L4djJU4gMyb",
            "value": `${row.job}`
          },
          {
            "displayName": "Ngày phát hiện ĐTĐ",
            "attribute": "LnYKf02oBmF",
            "value": `${convertDate(row.date2)}`
          },
          {
            "displayName": "Nơi phát hiện ĐTĐ",
            "attribute": "LHVZXlBbn2l",
            "value": `${row.add2}`
          },
          {
            "displayName": "Chọn Xã/ Phường/ Thị trấn",
            "attribute": "Gy1fkmBZpFk",
            "value": `${row.idorg}`
          }
        ]
      }]
    }
    return dataTei;
  }
  // Hàm tạo DataEnrollment
  const createDataEnrollment = (row, programID) => {
    let ngayDangKy = "2021-01-01"
    if (row.date2 !== "" && row.date2 !== undefined) {
      ngayDangKy = convertDate(row.date2);
    }
    let dataEnrollment = {
      "enrollments": [
        {
          "orgUnit": `${row.idorg}`,
          "program": `${programID}`,
          "trackedEntityType": "EL3fkeMR3xK",
          "trackedEntityInstance": `${row.teiId}`,
          "enrollmentDate": `${ngayDangKy}`,
          "incidentDate": `${ngayDangKy}`,
          "events": []
        }
      ]
    }
    return dataEnrollment;
  }

  // Hàm convert Date
  const convertDate = (mdate) => {
    if (mdate === '' || mdate === undefined) { return '' }
    let mDate1 = mdate.toString().split("/");
    let mYear = parseInt(mDate1[2], 10);
    let mMonthTemp = `0${parseInt(mDate1[1], 10)}`;
    let mMonth = mMonthTemp.substring(mMonthTemp.length - 2);
    let mDayTemp = `0${parseInt(mDate1[0], 10)}`;
    let mDay = mDayTemp.substring(mDayTemp.length - 2);
    mdate = `${mYear}-${mMonth}-${mDay}`
    return mdate
  }

  return (
    <div>
      <h3>Chương trình đã chọn: {programId}. {errorData && <p>{errorData}</p>}</h3>
      {data ? data.length > 0 && (
        <>
          {RenderData(header, data, keyArr, selectedFields)}
        </>
      ) : null}
    </div>
  );
};

export default Menu3;
