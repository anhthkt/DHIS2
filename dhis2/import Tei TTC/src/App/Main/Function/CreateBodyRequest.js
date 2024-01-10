// Hàm tạo TeiData
export const createDataTei = (row, programId) => {
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
    let dataTei = {};
    if (programId === "NAleauPZvIE" || programId === "a7arqsOKzsr") {
      let date2AttributeByProgramId = '';
      let add2AttributeByProgramId = '';
      if (programId === "NAleauPZvIE"){ // Tăng Huyết Áp Code Att Ngày phát hiện, Nơi phát hiện
        date2AttributeByProgramId = 'RSNvyMilQxs';
        add2AttributeByProgramId = 'ZYzDKzTIhM2';
      } else { // Đái Tháo Đường Code Att Ngày phát hiện, Nơi phát hiện
        date2AttributeByProgramId = 'LnYKf02oBmF';
        add2AttributeByProgramId = 'LHVZXlBbn2l';
      }
      dataTei = {
        "trackedEntityInstances": [{
          "orgUnit": `${row.idOrg}`,
          "trackedEntityType": "EL3fkeMR3xK",
          "inactive": false,
          "deleted": false,
          "featureType": "NONE",
          "programOwners": [],
          "enrollments": [
            {
              "orgUnit": `${row.idOrg}`,
              "program": `${programId}`,
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
              "attribute": `${date2AttributeByProgramId}`,
              "value": `${convertDate(row.date2)}`
            },
            {
              "attribute": `${add2AttributeByProgramId}`,
              "value": `${row.add2}`
            },
            {
              "displayName": "Chọn Xã/ Phường/ Thị trấn",
              "attribute": "Gy1fkmBZpFk",
              "value": `${row.idOrg}`
            }
          ]
        }]
      }
    } else {
      dataTei = {
        "trackedEntityInstances": [{
          "orgUnit": `${row.idOrg}`,
          "trackedEntityType": "EL3fkeMR3xK",
          "inactive": false,
          "deleted": false,
          "featureType": "NONE",
          "programOwners": [],
          "enrollments": [
            {
              "orgUnit": `${row.idOrg}`,
              "program": `${programId}`,
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
              "displayName": "Chọn Xã/ Phường/ Thị trấn",
              "attribute": "Gy1fkmBZpFk",
              "value": `${row.idOrg}`
            }
          ]
        }]
      }
    }
    return dataTei;
  }
  // Hàm tạo DataEnrollment
export  const createDataEnrollment = (row, programId) => {
    let ngayDangKy = "2021-01-01"
    if (row.date2 !== "" && row.date2 !== undefined) {
      ngayDangKy = convertDate(row.date2);
    }
    let dataEnrollment = {
      "enrollments": [
        {
          "orgUnit": `${row.idOrg}`,
          "program": `${programId}`,
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