const XLSX = require('xlsx');
const workbook = XLSX.readFile(`${__dirname}/test.xlsx`);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
const keys = jsonData.shift(); //get the first row as key
let finalData = jsonData.map(row => keys.reduce((acc, key, i) => {
    acc[key] = row[i];
    return acc;
}, {}));
console.log(finalData);