import React, { useState, useEffect } from 'react';
import RenderData from './RenderData';

const Menu3 = (props) => {
  const [data, setData] = useState(props.data);
  const header = props.header;
  const keyArr = props.keyArr;

  useEffect(() => {
    const checkData = () => {
      const newData = data.map((row) => {
        if (row.note !== '') {
          row.note = 'Dữ liệu lỗi';
        } else {
          row.note = importData(row);
        }
        return row;
      });
      setData(newData);
    }
    checkData();
  }, [data]);

  const importData = async (row) => {
    let postBody = convertImportData(row);
    return (postBody);
    // Hàm import data
    //   const handleImport = async () => {

    //     data.forEach(async (row) => {
    //       if (row.bhyt !== '' && row.bhyt !== undefined) { var idTeiByBHYT = await FetchIdTeiByBHYT(row.bhyt); }
    //       if (row.cmt !== '' && row.cmt !== undefined) { var idTeiByCMT = await FetchIdTeiByCMT(row.cmt); }
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
  }

  const convertImportData = (row) => {

  }
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

  return (
    <div>
      <h3>Option đã chọn: {props.selectedOption}</h3>
      {data ? data.length > 0 && (
        <>
          {RenderData(header, data, keyArr)}
        </>
      )}
    </div>
  );
};

export default Menu3;
