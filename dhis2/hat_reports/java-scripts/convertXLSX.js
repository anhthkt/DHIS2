const xlsx = require('xlsx');
const writeJson = require('write-json-file');
let  _ = require('lodash');
let workbook = xlsx.readFile(`${__dirname}/THONG-TIN-BENH-NHAN.xlsx`);
console.log(workbook);
let   data = workbook.Sheets.Sheet1;

const directory = 'result'

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
for (let i = 1; i < keys.length; i++) {
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
                "value": `${result[i][5]}`
            },
            {
                "code": "WHO_004",
                "displayName": "Năm sinh",
                "attribute": "C7USC9MC8yH",
                "value": `${result[i][6]}`
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
                "value": `${result[i][12]}`
            },
            {
                "displayName": "Nơi phát hiện THA",
                "attribute": "ZYzDKzTIhM2",
                "value": `${result[i][13]}`
            }
        ]
    }
  }
  resultTei.trackedEntityInstances.push(mTei)
}
writeJson(`${__dirname}/${directory}/importTei.json`, resultTei)
// fs.readdir(`./${directory}`, function (err, files) {
//   files.forEach(function (file) {
//     let x = fs.readFileSync(`./${directory}/${file}`, 'utf8')
//     fs.writeFileSync(`./${directory}/${file}`, `[${x.substring(0, x.length -1).trim()}]`, {mode: 0x1b6})
//   })
// })

console.log("[*] Create JSON files successfully!!")