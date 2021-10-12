const fs = require('fs');
const xlsx = require('xlsx');
// const writeJson = require('write-json-file');
let _ = require('lodash');
let workbook = xlsx.readFile(`${__dirname}/input/GIANG LY.xlsx`);
console.log(workbook);

let arrSheetNames = workbook.SheetNames;
for(let s = 0; s < arrSheetNames.length; s++) {
    let sheetName = workbook.SheetNames[s]; 
    
    let idOrgUnit = 'L5ZUrhTYz4T' //Xa Giang Ly
    
    let programId = ''
    if(sheetName == 'THA') programId = 'NAleauPZvIE'; //THA
    if(sheetName == 'DTD') programId = 'a7arqsOKzsr'; //DTD
    // if(sheetName == 'Que-Luu-Phoi') programId = 'gPWs4FRX9dj'; //COPD/HEN
    // if(sheetName == 'Que-Luu-Hen') programId = 'gPWs4FRX9dj'; //TTPL
    // if(sheetName == 'Que-Luu-UngThu') programId = 'XrC0U6IV4W0'; //KLN Khac
    // let programId = 'NAleauPZvIE'; //THA
    // let programId = 'a7arqsOKzsr'; //DTD
    if (programId == '') continue; //
    exportTeiFromExcel(sheetName, programId, idOrgUnit);
}


// function exportTeiFromExcel(sheetName, programId, idOrgUnit) {
function exportTeiFromExcel(sheetName, programId, idOrgUnit) {
    let data = workbook.Sheets[sheetName];

    let result = {};
    for (let row = 3; row < 1000; row++) {
        let m = `A${row}`
        if (data[`A${row}`] == undefined) break;
        result[m.slice(1)] = [];
        result[m.slice(1)].push(data[m].v);
    }

    let cols = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']

    for (let i = 0; i < cols.length; i++) {
        for (let row = 3; row < Object.keys(result).length + 3; row++) {
            let k = `${cols[i]}${row}`
            if (data[`${cols[i]}${row}`] == undefined) {
                result[k.slice(1)].push(''); continue;
            } else {
                result[k.slice(1)].push(`${data[k].v}`);
            }
        }
    }
    // for (let k in data) {
    //     if (data.hasOwnProperty(k)) {
    //         if (k[0] === '!') continue;
    //         if (!_.isArray(result[k.slice(1)])) result[k.slice(1)] = [];
    //         result[k.slice(1)].push(data[k].v);
    //     }
    // }

    let resultTei = {
        "trackedEntityInstances": []
    };
    // let keys = Object.keys(result)
    let mTei
    // for (let i = 0; i < keys.length; i++) {
    //     // console.log(result[i][6])
    //     if (result[i][0] !== 'STT') {
    // fs.appendFileSync(`${__dirname}/${directory}/importTei.json`,
    for (let i = 3; i < Object.keys(result).length + 3; i++) {
        // let idOrgUnit = '';
        // if (result[i][1] == 'Cổ Lũng') idOrgUnit = 'Q9jQLU2C2ri';
        // if (result[i][1] == 'Thiện Nghiệp') idOrgUnit = 'fN1Kp1PcQDv';
        // if (result[i][1] == 'Hàm Tiến') idOrgUnit = 'NEmThafkt61';
        // if (result[i][1] == 'Đức Nghĩa') idOrgUnit = 'JVPnZyRJsot';
        // if (result[i][1] == 'Phú Tài') idOrgUnit = 'ZxNCYQffC1r';
        // if (result[i][1] == 'Bình Hưng') idOrgUnit = 'Ds0tve5Cubq';
        // if (result[i][1] == 'Xuân An') idOrgUnit = 'CH6l2vJbw8l';
        // if (result[i][1] == 'Phú Long') idOrgUnit = 'aeTPX9GBml0';
        // if (result[i][1] == 'Phú Hài') idOrgUnit = 'uhkjfOu0BCM';
        // if (result[i][1] == 'Bắc Bình') idOrgUnit = 'Kuj9UIBKIuZ';
        if(programId == 'NAleauPZvIE'){
            mTei = {
                "orgUnit": `${idOrgUnit}`,
                "trackedEntityType": "EL3fkeMR3xK",
                "inactive": false,
                "deleted": false,
                "featureType": "NONE",
                "programOwners": [],
                "enrollments": [
                    {
                        "orgUnit": `${idOrgUnit}`,
                        "program": `${programId}`,
                        "enrollmentDate": "2021-10-06",
                        "incidentDate": "2021-10-06",
                        "events": []
                    }
                ],
                "relationships": [],
                "attributes": [
                    {
                        "code": "WHO_001",
                        "displayName": "Mã BHYT",
                        "attribute": "JHb1hzseNMg",
                        "value": `${result[i][7]}`
                    },
                    {
                        "code": "WHO_002",
                        "displayName": "Họ và tên",
                        "attribute": "xBoLC0aruyJ",
                        "value": `${result[i][4]}`
                    },
                    {
                        "code": "WHO_003",
                        "displayName": "Giới tính",
                        "attribute": "rwreLO34Xg7",
                        "value": `${convertCode(result[i][5])}`
                    },
                    {
                        "code": "WHO_004",
                        "displayName": "Năm sinh",
                        "attribute": "C7USC9MC8yH",
                        "value": `${formatDate(result[i][6])}`
                    },
                    {
                        "displayName": "Số CMT/CCCD",
                        "attribute": "ZQ93P672wQR",
                        "value": `${result[i][8]}`
                    },
                    {
                        "displayName": "Số điện thoại",
                        "attribute": "mZbgWADLTKY",
                        "value": `${result[i][11]}`
                    },
                    {
                        "code": "WHO_005",
                        "displayName": "Địa chỉ",
                        "attribute": "Bxp1Lhr8ZeN",
                        "value": `${result[i][9]}`
                    },
                    {
                        "code": "WHO_006",
                        "displayName": "Nghề nghiệp",
                        "attribute": "L4djJU4gMyb",
                        "value": `${result[i][10]}`
                    },
                    {
                        "displayName": "Ngày phát hiện THA",
                        "attribute": "RSNvyMilQxs",
                        "value": `${formatDate(result[i][12])}`
                    },
                    {
                        "displayName": "Nơi phát hiện THA",
                        "attribute": "ZYzDKzTIhM2",
                        "value": `${convertCode(result[i][13])}`
                    }
                    // {
                    //     "displayName": "Ngày phát hiện ĐTĐ",
                    //     "attribute": "LnYKf02oBmF",
                    //     "value": `${formatDate(result[i][12])}`
                    // },
                    // {
                    //     "displayName": "Nơi phát hiện ĐTĐ",
                    //     "attribute": "LHVZXlBbn2l",
                    //     "value": `${convertCode(result[i][13])}`
                    // }
                    // {
                    //     "displayName": "Ngày phát hiện ĐTĐ",
                    //     "attribute": "LnYKf02oBmF",
                    //     "value": `${formatDate(result[i][12])}`
                    // },
                    // {
                    //     "displayName": "Nơi phát hiện ĐTĐ",
                    //     "attribute": "LHVZXlBbn2l",
                    //     "value": `${convertCode(result[i][13])}`
                    // }
                ]
            }
        }

        if(programId == 'a7arqsOKzsr'){
            mTei = {
                "orgUnit": `${idOrgUnit}`,
                "trackedEntityType": "EL3fkeMR3xK",
                "inactive": false,
                "deleted": false,
                "featureType": "NONE",
                "programOwners": [],
                "enrollments": [
                    {
                        "orgUnit": `${idOrgUnit}`,
                        "program": `${programId}`,
                        "enrollmentDate": "2021-10-06",
                        "incidentDate": "2021-10-06",
                        "events": []
                    }
                ],
                "relationships": [],
                "attributes": [
                    {
                        "code": "WHO_001",
                        "displayName": "Mã BHYT",
                        "attribute": "JHb1hzseNMg",
                        "value": `${result[i][7]}`
                    },
                    {
                        "code": "WHO_002",
                        "displayName": "Họ và tên",
                        "attribute": "xBoLC0aruyJ",
                        "value": `${result[i][4]}`
                    },
                    {
                        "code": "WHO_003",
                        "displayName": "Giới tính",
                        "attribute": "rwreLO34Xg7",
                        "value": `${convertCode(result[i][5])}`
                    },
                    {
                        "code": "WHO_004",
                        "displayName": "Năm sinh",
                        "attribute": "C7USC9MC8yH",
                        "value": `${formatDate(result[i][6])}`
                    },
                    {
                        "displayName": "Số CMT/CCCD",
                        "attribute": "ZQ93P672wQR",
                        "value": `${result[i][8]}`
                    },
                    {
                        "displayName": "Số điện thoại",
                        "attribute": "mZbgWADLTKY",
                        "value": `${result[i][11]}`
                    },
                    {
                        "code": "WHO_005",
                        "displayName": "Địa chỉ",
                        "attribute": "Bxp1Lhr8ZeN",
                        "value": `${result[i][9]}`
                    },
                    {
                        "code": "WHO_006",
                        "displayName": "Nghề nghiệp",
                        "attribute": "L4djJU4gMyb",
                        "value": `${result[i][10]}`
                    },
                    // {
                    //     "displayName": "Ngày phát hiện THA",
                    //     "attribute": "RSNvyMilQxs",
                    //     "value": `${formatDate(result[i][12])}`
                    // },
                    // {
                    //     "displayName": "Nơi phát hiện THA",
                    //     "attribute": "ZYzDKzTIhM2",
                    //     "value": `${convertCode(result[i][13])}`
                    // }
                    {
                        "displayName": "Ngày phát hiện ĐTĐ",
                        "attribute": "LnYKf02oBmF",
                        "value": `${formatDate(result[i][12])}`
                    },
                    {
                        "displayName": "Nơi phát hiện ĐTĐ",
                        "attribute": "LHVZXlBbn2l",
                        "value": `${convertCode(result[i][13])}`
                    }
                    // {
                    //     "displayName": "Ngày phát hiện ĐTĐ",
                    //     "attribute": "LnYKf02oBmF",
                    //     "value": `${formatDate(result[i][12])}`
                    // },
                    // {
                    //     "displayName": "Nơi phát hiện ĐTĐ",
                    //     "attribute": "LHVZXlBbn2l",
                    //     "value": `${convertCode(result[i][13])}`
                    // }
                ]
            }
        }

        if(programId == 'gPWs4FRX9dj' || programId == 'WmEGO8Ipykm' || programId == 'XrC0U6IV4W0'){
            mTei = {
                "orgUnit": `${idOrgUnit}`,
                "trackedEntityType": "EL3fkeMR3xK",
                "inactive": false,
                "deleted": false,
                "featureType": "NONE",
                "programOwners": [],
                "enrollments": [
                    {
                        "orgUnit": `${idOrgUnit}`,
                        "program": `${programId}`,
                        "enrollmentDate": "2021-10-06",
                        "incidentDate": "2021-10-06",
                        "events": []
                    }
                ],
                "relationships": [],
                "attributes": [
                    {
                        "code": "WHO_001",
                        "displayName": "Mã BHYT",
                        "attribute": "JHb1hzseNMg",
                        "value": `${result[i][7]}`
                    },
                    {
                        "code": "WHO_002",
                        "displayName": "Họ và tên",
                        "attribute": "xBoLC0aruyJ",
                        "value": `${result[i][4]}`
                    },
                    {
                        "code": "WHO_003",
                        "displayName": "Giới tính",
                        "attribute": "rwreLO34Xg7",
                        "value": `${convertCode(result[i][5])}`
                    },
                    {
                        "code": "WHO_004",
                        "displayName": "Năm sinh",
                        "attribute": "C7USC9MC8yH",
                        "value": `${formatDate(result[i][6])}`
                    },
                    {
                        "displayName": "Số CMT/CCCD",
                        "attribute": "ZQ93P672wQR",
                        "value": `${result[i][8]}`
                    },
                    {
                        "displayName": "Số điện thoại",
                        "attribute": "mZbgWADLTKY",
                        "value": `${result[i][11]}`
                    },
                    {
                        "code": "WHO_005",
                        "displayName": "Địa chỉ",
                        "attribute": "Bxp1Lhr8ZeN",
                        "value": `${result[i][9]}`
                    },
                    {
                        "code": "WHO_006",
                        "displayName": "Nghề nghiệp",
                        "attribute": "L4djJU4gMyb",
                        "value": `${result[i][10]}`
                    },
                    // {
                    //     "displayName": "Ngày phát hiện THA",
                    //     "attribute": "RSNvyMilQxs",
                    //     "value": `${formatDate(result[i][12])}`
                    // },
                    // {
                    //     "displayName": "Nơi phát hiện THA",
                    //     "attribute": "ZYzDKzTIhM2",
                    //     "value": `${convertCode(result[i][13])}`
                    // }
                    // {
                    //     "displayName": "Ngày phát hiện ĐTĐ",
                    //     "attribute": "LnYKf02oBmF",
                    //     "value": `${formatDate(result[i][12])}`
                    // },
                    // {
                    //     "displayName": "Nơi phát hiện ĐTĐ",
                    //     "attribute": "LHVZXlBbn2l",
                    //     "value": `${convertCode(result[i][13])}`
                    // }
                    // {
                    //     "displayName": "Ngày phát hiện ĐTĐ",
                    //     "attribute": "LnYKf02oBmF",
                    //     "value": `${formatDate(result[i][12])}`
                    // },
                    // {
                    //     "displayName": "Nơi phát hiện ĐTĐ",
                    //     "attribute": "LHVZXlBbn2l",
                    //     "value": `${convertCode(result[i][13])}`
                    // }
                ]
            }
        }

        resultTei.trackedEntityInstances.push(mTei)
    }

    fs.writeFileSync(`${__dirname}/output/importTei-${sheetName}.json`, JSON.stringify(resultTei));
    // writeJson(`${__dirname}/${directory}/importTei.json`, resultTei)
    // fs.readdir(`./${directory}`, function (err, files) {
    //   files.forEach(function (file) {
    //     let x = fs.readFileSync(`./${directory}/${file}`, 'utf8')
    //     fs.writeFileSync(`./${directory}/${file}`, `[${x.substring(0, x.length -1).trim()}]`, {mode: 0x1b6})
    //   })
    // })
    console.log("[*] Create JSON files successfully!!")
}

function formatDate(mdate) {
    if (mdate == '') return ''
    let style = mdate.substr(-5).charAt(0)
    let mdateYear = `${mdate.split(`${style}`)[2]}`
    let mdateMonth = `0${mdate.split(`${style}`)[1]}`.substr(-2)
    let mdateDay = `0${mdate.split(`${style}`)[0]}`.substr(-2)
    mdate = `${mdateYear}-${mdateMonth}-${mdateDay}`
    return mdate
}

function convertCode(mValue) {
    if (mValue == '') return ''
    if (mValue && mValue.toLowerCase() == 'Nam'.toLowerCase()) {
        return '01'
    }
    if (mValue && mValue.toLowerCase() == 'Nữ'.toLowerCase()) {
        return '02'
    }
    if (mValue && mValue.toLowerCase() == 'Trạm Y tế'.toLowerCase()) {
        return '1'
    }
    if (mValue && mValue.toLowerCase() == 'Bệnh viện huyện'.toLowerCase()) {
        return '2'
    }
    if (mValue && mValue.toLowerCase() == 'Bệnh viện tỉnh'.toLowerCase()) {
        return '3'
    }
    if (mValue && mValue.toLowerCase() == 'Bệnh viện trung ương'.toLowerCase()) {
        return '4'
    }
    if (mValue && mValue.toLowerCase() == 'Bệnh viện tư nhân'.toLowerCase()) {
        return '5'
    }
    if (mValue && mValue.toLowerCase() == 'Khác'.toLowerCase()) {
        return '6'
    }
}

function add0toCMT(mCMT) {
    if (mCMT == '') return ''
    return mCMT = `0${mCMT}`
}


//=IF(N3="TYT"; "Trạm Y tế"; IF(N3="BVtỉnh"; "Bệnh viện tỉnh"; IF(N3="BV Khánh Vĩnh"; "Bệnh viện huyện"; IF(N3="PKĐK"; "Bệnh viện tư nhân"; "Khác"))))