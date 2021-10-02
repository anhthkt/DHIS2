const fs = require('fs');
const xlsx = require('xlsx');
// const writeJson = require('write-json-file');
let _ = require('lodash');
let workbook = xlsx.readFile(`${__dirname}/input/ThaiNguyen-T8.xlsx`);
console.log(workbook);

let sheetName = workbook.SheetNames[1];
let data = workbook.Sheets[sheetName];

// const directory = 'output'

let result = {};
for (let k in data) {
    if (data.hasOwnProperty(k)) {
        if (k[0] === '!') continue;
        if (!_.isArray(result[k.slice(1)])) result[k.slice(1)] = [];
        result[k.slice(1)].push(data[k].v);
    }
}

let resultTei = {
    "trackedEntityInstances": []
};
let keys = Object.keys(result)
let mTei
for (let i = 2; i < keys.length; i++) {
    console.log(result[i][6])
    if (result[i][0] !== 'STT') {
        // fs.appendFileSync(`${__dirname}/${directory}/importTei.json`,

        mTei = {
            "orgUnit": `${result[i][1]}`,
            "trackedEntityType": "EL3fkeMR3xK",
            "inactive": false,
            "deleted": false,
            "featureType": "NONE",
            "programOwners": [],
            "enrollments": [],
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
                    "code": "WHO_004",
                    "displayName": "Số CMT/CCCD",
                    "attribute": "ZQ93P672wQR",
                    "value": `${result[i][8]}`
                },
                {
                    "code": "WHO_004",
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
            ]
        }
    }
    resultTei.trackedEntityInstances.push(mTei)
}
fs.writeFileSync(`${__dirname}/output/importTei-HoaBinh.json`, JSON.stringify(resultTei));
// writeJson(`${__dirname}/${directory}/importTei.json`, resultTei)
// fs.readdir(`./${directory}`, function (err, files) {
//   files.forEach(function (file) {
//     let x = fs.readFileSync(`./${directory}/${file}`, 'utf8')
//     fs.writeFileSync(`./${directory}/${file}`, `[${x.substring(0, x.length -1).trim()}]`, {mode: 0x1b6})
//   })
// })
function formatDate(mdate) {
    if (mdate == undefined) return ''
    mdate = `${mdate.split('-')[2]}-${mdate.split('-')[1]}-${mdate.split('-')[0]}`
    return mdate
}

function convertCode(mValue) {
    if (mValue == undefined) return ''
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

console.log("[*] Create JSON files successfully!!")