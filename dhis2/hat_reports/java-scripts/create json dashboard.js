const _axios = require("axios");
const fs = require('fs');
const xlsx = require('xlsx');
// const writeJson = require('write-json-file');
let _ = require('lodash');
const { result } = require('lodash');

const baseUrl = 'http://daotao.tkyt.vn/dieuhanh';
const authentication = {
    auth: {
        // username: _config.username,
        // password: _config.password
        username: 'anhth',
        password: '1234567@Aa'
    }
}

let workbook = xlsx.readFile(`${__dirname}/input/BYT2022.xlsx`);
console.log(workbook);

let arrSheetNames = workbook.SheetNames;
for(let s = 0; s < arrSheetNames.length-1; s++) {
    let sheetName = workbook.SheetNames[s];
    // Name file output
    let orgName = 'BoYte'

    let eventDate = '2022-01-21'
   
    if(sheetName == 'BoYte') programId = '2'; //Bo Y te
    if(sheetName == 'ChinhPhu') programId = '0'; //Chinh Phu
    if(sheetName == 'Covid') programId = '1'; //COVID
    if (programId == '') continue; //
    exportTeiFromExcel(sheetName, programId, eventDate, orgName);
}

// function exportTeiFromExcel(sheetName, programId, idOrgUnit) {
    async function exportTeiFromExcel(sheetName, programId, eventDate, orgName) {
    let data = workbook.Sheets[sheetName];

    let result = {};
    for (let row = 5; row < 1000; row++) {
        let m = `A${row}`
        if (data[`A${row}`] == undefined) break;
        result[m.slice(1)] = [];
        result[m.slice(1)].push(data[m].v);
    }

    let cols = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R']

    for (let i = 0; i < cols.length; i++) {
        for (let row = 5; row < Object.keys(result).length + 5; row++) {
            let k = `${cols[i]}${row}`
            if (data[`${cols[i]}${row}`] == undefined) {
                result[k.slice(1)].push(''); continue;
            } else {
                result[k.slice(1)].push(`${data[k].v}`);
            }
        }
    }
        var resultTei = {
            "trackedEntityInstances": []
        };
        var mTei = ''
        for (let i = 5; i < Object.keys(result).length + 5; i++) {
            let checkTei = await checkTeiExist(`${result[i][1]}`);
            if (checkTei != 0) {
                console.log('Vao day roi');
            } else {
                mTei = {
                    "orgUnit": `${result[i][15]}`,
                    "trackedEntityType": "jbQmOZQTCvZ",
                    "inactive": false,
                    "deleted": false,
                    "featureType": "NONE",
                    "programOwners": [],
                    "relationships": [],
                    "attributes": [
                        {
                            "attribute": "bEKyhj3UZ1A",
                            "value": `${result[i][1]}`
                        },
                        {
                            "attribute": "WZ9r8gaJ9GE",
                            "value": `${programId}`
                        },
                        {
                            "attribute": "pTtMHDazedk",
                            "value": `${formatDate(result[i][2])}`
                        },
                        {
                            "attribute": "l2J7nHDYgWV",
                            "value": `${result[i][14]}`
                        },
                        {
                            "attribute": "hybfvRWTZAm",
                            "value": `${result[i][4]}`
                        },
                        {
                            "attribute": "QDKF1LkOQNi",
                            "value": `${result[i][5]}`
                        },
                        {
                            "attribute": "hQuINlqtfyM",
                            "value": `${formatDate(result[i][6])}`
                        },
                        {
                            "attribute": "kDwLFCKCKF0",
                            "value": `${result[i][7]}`
                        },
                        {
                            "attribute": "wt6rbxne6UG",
                            "value": `${result[i][17]}`
                        },
                        {
                            "attribute": "BnbudHFCrfx",
                            "value": `${formatDate(result[i][12])}`
                        },
                        {
                            "attribute": "lIp0g9CGswE",
                            "value": `${result[i][13]}`
                        }
                    ],
                    "enrollments": [
                        {
                            "orgUnit": `${result[i][15]}`,
                            "program": "MTtLjthdDgH",
                            "enrollmentDate": `${eventDate}`,
                            "incidentDate": `${eventDate}`,
                            "events": [
                                {
                                    "program": "MTtLjthdDgH",
                                    "orgUnit": `${result[i][15]}`,
                                    "eventDate": `${eventDate}`,
                                    "status": "COMPLETED",
                                    "storedBy": "anhth",
                                    "programStage": "Kxa3fOFhJx9",
                                    "dataValues": [
                                        {
                                            "dataElement": "azz71WwE2Q2",
                                            "value": `${result[i][16]}`
                                        },
                                        {
                                            "dataElement": "BO84P6Rt7RG",
                                            "value": ""
                                        },
                                        {
                                            "dataElement": "Uk09m0hfRQ5",
                                            "value": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                resultTei.trackedEntityInstances.push(mTei)
            }
        }
    
    fs.writeFileSync(`${__dirname}/output/importNhiemVu-${orgName}-${sheetName}.json`, JSON.stringify(resultTei));
    console.log("[*] Create JSON files successfully!!")
    // var resultTei = {
    //     "trackedEntityInstances": []
    // };
    // var mTei = ''
    // for (let i = 5; i < Object.keys(result).length + 5; i++) {

    //     mTei = {
    //         "orgUnit": `${result[i][15]}`,
    //         "trackedEntityType": "jbQmOZQTCvZ",
    //         "inactive": false,
    //         "deleted": false,
    //         "featureType": "NONE",
    //         "programOwners": [],
    //         "relationships": [],
    //         "attributes": [
    //             {
    //                 "attribute": "bEKyhj3UZ1A",
    //                 "value": `${result[i][1]}`
    //             },
    //             {
    //                 "attribute": "WZ9r8gaJ9GE",
    //                 "value": `${programId}`
    //             },
    //             {
    //                 "attribute": "pTtMHDazedk",
    //                 "value": `${formatDate(result[i][2])}`
    //             },
    //             {
    //                 "attribute": "l2J7nHDYgWV",
    //                 "value": `${result[i][14]}`
    //             },
    //             {
    //                 "attribute": "hybfvRWTZAm",
    //                 "value": `${result[i][4]}`
    //             },
    //             {
    //                 "attribute": "QDKF1LkOQNi",
    //                 "value": `${result[i][5]}`
    //             },
    //             {
    //                 "attribute": "hQuINlqtfyM",
    //                 "value": `${formatDate(result[i][6])}`
    //             },
    //             {
    //                 "attribute": "kDwLFCKCKF0",
    //                 "value": `${result[i][7]}`
    //             },
    //             {
    //                 "attribute": "wt6rbxne6UG",
    //                 "value": `${result[i][17]}`
    //             },
    //             {
    //                 "attribute": "BnbudHFCrfx",
    //                 "value": `${formatDate(result[i][12])}`
    //             },
    //             {
    //                 "attribute": "lIp0g9CGswE",
    //                 "value": `${result[i][13]}`
    //             }
    //         ],
    //         "enrollments": [
    //             {
    //                 "orgUnit": `${result[i][15]}`,
    //                 "program": "MTtLjthdDgH",
    //                 "enrollmentDate": `${eventDate}`,
    //                 "incidentDate": `${eventDate}`,
    //                 "events": [
    //                     {
    //                         "program": "MTtLjthdDgH",
    //                         "orgUnit": `${result[i][15]}`,
    //                         "eventDate": `${eventDate}`,
    //                         "status": "COMPLETED",
    //                         "storedBy": "anhth",
    //                         "programStage": "Kxa3fOFhJx9",
    //                         "dataValues": [
    //                             {
    //                                 "dataElement": "azz71WwE2Q2",
    //                                 "value": `${result[i][16]}`
    //                             },
    //                             {
    //                                 "dataElement": "BO84P6Rt7RG",
    //                                 "value": ""
    //                             },
    //                             {
    //                                 "dataElement": "Uk09m0hfRQ5",
    //                                 "value": ""
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    //     resultTei.trackedEntityInstances.push(mTei)
    // }
    // fs.writeFileSync(`${__dirname}/output/importNhiemVu-${sheetName}-2022.json`, JSON.stringify(resultTei));
    // console.log("[*] Create JSON files successfully!!")
}


    
    // (async function () {
    //     var resultTei = {
    //         "trackedEntityInstances": []
    //     };
    //     var mTei = ''
    //     for (let i = 5; i < Object.keys(result).length + 5; i++) {
    //         let checkTei = await checkTeiExist(`${result[i][1]}`);
    //         if (checkTei != 0) {
    //             await new Promise((resolve) => {
    //                 setTimeout(() => {
    //                     console.log('Vao day roi');
    //                     resolve();
    //                 }, 2000);
    //             });
                
    //         } else {
    //             mTei = {
    //                 "orgUnit": `${result[i][15]}`,
    //                 "trackedEntityType": "jbQmOZQTCvZ",
    //                 "inactive": false,
    //                 "deleted": false,
    //                 "featureType": "NONE",
    //                 "programOwners": [],
    //                 "relationships": [],
    //                 "attributes": [
    //                     {
    //                         "attribute": "bEKyhj3UZ1A",
    //                         "value": `${result[i][1]}`
    //                     },
    //                     {
    //                         "attribute": "WZ9r8gaJ9GE",
    //                         "value": `${programId}`
    //                     },
    //                     {
    //                         "attribute": "pTtMHDazedk",
    //                         "value": `${formatDate(result[i][2])}`
    //                     },
    //                     {
    //                         "attribute": "l2J7nHDYgWV",
    //                         "value": `${result[i][14]}`
    //                     },
    //                     {
    //                         "attribute": "hybfvRWTZAm",
    //                         "value": `${result[i][4]}`
    //                     },
    //                     {
    //                         "attribute": "QDKF1LkOQNi",
    //                         "value": `${result[i][5]}`
    //                     },
    //                     {
    //                         "attribute": "hQuINlqtfyM",
    //                         "value": `${formatDate(result[i][6])}`
    //                     },
    //                     {
    //                         "attribute": "kDwLFCKCKF0",
    //                         "value": `${result[i][7]}`
    //                     },
    //                     {
    //                         "attribute": "wt6rbxne6UG",
    //                         "value": `${result[i][17]}`
    //                     },
    //                     {
    //                         "attribute": "BnbudHFCrfx",
    //                         "value": `${formatDate(result[i][12])}`
    //                     },
    //                     {
    //                         "attribute": "lIp0g9CGswE",
    //                         "value": `${result[i][13]}`
    //                     }
    //                 ],
    //                 "enrollments": [
    //                     {
    //                         "orgUnit": `${result[i][15]}`,
    //                         "program": "MTtLjthdDgH",
    //                         "enrollmentDate": `${eventDate}`,
    //                         "incidentDate": `${eventDate}`,
    //                         "events": [
    //                             {
    //                                 "program": "MTtLjthdDgH",
    //                                 "orgUnit": `${result[i][15]}`,
    //                                 "eventDate": `${eventDate}`,
    //                                 "status": "COMPLETED",
    //                                 "storedBy": "anhth",
    //                                 "programStage": "Kxa3fOFhJx9",
    //                                 "dataValues": [
    //                                     {
    //                                         "dataElement": "azz71WwE2Q2",
    //                                         "value": `${result[i][16]}`
    //                                     },
    //                                     {
    //                                         "dataElement": "BO84P6Rt7RG",
    //                                         "value": ""
    //                                     },
    //                                     {
    //                                         "dataElement": "Uk09m0hfRQ5",
    //                                         "value": ""
    //                                     }
    //                                 ]
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //             resultTei.trackedEntityInstances.push(mTei)
    //         }
    //     }
    
    // fs.writeFileSync(`${__dirname}/output/importNhiemVu-${orgName}-${sheetName}.json`, JSON.stringify(resultTei));
    // console.log("[*] Create JSON files successfully!!")
    // })();


function formatDate(mdate) {
    if (mdate == '') return ''
    let style = mdate.substr(-5).charAt(0)
    let mdateYear = `${mdate.split(`${style}`)[2]}`
    let mdateMonth = `0${mdate.split(`${style}`)[0]}`.substr(-2)
    let mdateDay = `0${mdate.split(`${style}`)[1]}`.substr(-2)
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

async function checkTeiExist(mUID) {
    return new Promise((resolve,reject)=>{
        let result = 0;
        let url = ``
        console.log(url = baseUrl + `/api/trackedEntityInstances.json?ouMode=ACCESSIBLE&program=MTtLjthdDgH&attribute=bEKyhj3UZ1A:EQ:${mUID}&paging=false`)
        _axios.get(url, authentication).then(res => {
            let resData = res.data;
            if (res.data.trackedEntityInstances.length = 1) {
                result = res.data.trackedEntityInstances[0].orgUnit;
            }
        })
        resolve(result);
    })
}