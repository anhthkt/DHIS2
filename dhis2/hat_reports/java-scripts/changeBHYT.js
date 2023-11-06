const _axios = require("axios");
const fs = require('fs');
const xlsx = require('xlsx');
// const writeJson = require('write-json-file');
let _ = require('lodash');
const { result } = require('lodash');

const baseUrl = 'https://kln.tkyt.vn';
const authentication = {
    auth: {
        // username: _config.username,
        // password: _config.password
        username: 'anhth',
        password: 'Csdl2018@)!*'
    }
}

let workbook = xlsx.readFile(`${__dirname}/input/changeBHYT.xlsx`);
console.log(workbook);