// CHÚ Ý 
// THAY ĐỔI NGÀY SỰ KIỆN: EVENTDATE 
// TÊN CỦA SHEET TRÊN FILE EXCEL: SHEETNAME


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

    let eventDate = '2022-03-06'
   
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
    var resultTeis = {
        "trackedEntityInstances": []
    };
    var mTei = '';
    var resultEvents = {
        "events": []
    };
    var mEvent = '';
    for (let i = 5; i < Object.keys(result).length + 5; i++) {
        let checkTei = await checkTeiExist(`${result[i][1]}`);
        if (checkTei.status != 0) {
            // `console.log('Vao day roi');
            mEvent = {
                "program": "MTtLjthdDgH",
                "orgUnit": `${result[i][15]}`,
                "eventDate": `${eventDate}`,
                "status": "ACTIVE",
                "programStage": "Kxa3fOFhJx9",
                "trackedEntityInstance": `${checkTei.teiID}`,
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
            resultEvents.events.push(mEvent);
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
            resultTeis.trackedEntityInstances.push(mTei);
            let iTei = {
                "trackedEntityInstances": []
            };
            iTei.trackedEntityInstances.push(mTei)
            console.log(i-4, await importTei(iTei))
        }
    }
    fs.writeFileSync(`${__dirname}/output/importEvents-NhiemVu-${orgName}-${sheetName}.json`, JSON.stringify(resultEvents));
    console.log("[*] Create JSON files New Events successfully!!")
    fs.writeFileSync(`${__dirname}/output/importTeis-NhiemVu-${orgName}-${sheetName}.json`, JSON.stringify(resultTeis));
    console.log("[*] Create JSON files New Teis successfully!!")
}

function formatDate(mdate) {
    if (mdate == '') return ''
    let style = mdate.substr(-5).charAt(0)
    let mdateYear = `${mdate.split(`${style}`)[2]}`
    let mdateMonth = `0${mdate.split(`${style}`)[0]}`.substr(-2)
    let mdateDay = `0${mdate.split(`${style}`)[1]}`.substr(-2)
    mdate = `${mdateYear}-${mdateMonth}-${mdateDay}`
    return mdate
}

function checkTeiExist(mUID) {
    return new Promise((resolve,reject)=>{
        let result = {"status": "","teiID": "", "orgUnitID": ""};
        let url = ``
        url = baseUrl + `/api/trackedEntityInstances.json?ouMode=ACCESSIBLE&program=MTtLjthdDgH&attribute=bEKyhj3UZ1A:EQ:${mUID}&paging=false`
        _axios.get(url, authentication).then(res => {
            let checkKey = res.data.trackedEntityInstances.length
            if (checkKey == 1) {
                result.status = '1'
                result.teiID = res.data.trackedEntityInstances[0].trackedEntityInstance;
                result.orgUnitID = res.data.trackedEntityInstances[0].orgUnit;
            } else {
                result.status = '0'
            }
            resolve(result);
        })
    })
}

function importTei(iTei) {
    return new Promise((resolve, reject) => {
        let result = { "status": "", "teiID": "", "orgUnitID": "" };
        let url = ``
        url = baseUrl + `/api/trackedEntityInstances`
        _axios({
            method: "post",
            url: url,
            auth: {
                username: 'anhth',
                password: '1234567@Aa'
            },
            data: iTei
          })
            .then(function (response) {
              //handle success
              result.status = response.data.message;
              console.log(response);
              resolve(result);
            })
            .catch(function (response) {
              //handle error
              result.status = response.data.message;
              console.log(response);
              resolve(result);
            });
    })
}