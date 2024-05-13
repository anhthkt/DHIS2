//Update code BHYT vào attribute của OrgUnits
const axios = require('axios')
const fs = require('fs');
const readExcel = require('read-excel-file/node');


const authentication = {
    username: `anhth`,
    password: `Csdl2018@)!*`
}
const url = 'http://103.124.60.92/baocao'
const orgId = 'lXnhf8MolUv'
const pathFile = './dhis2/NhanLuc/MapCSYT 7 tỉnh/'
const nameFile = 'CSYT Gia Lai.xlsx'

async function formatResult(arr) {
    const rows = await readExcel(`${pathFile}${nameFile}`);
    // console.log(rows);
    return arr.forEach(e => {
        for(let i = 0; i < rows.length; i++) {
            if(e.id === rows[i][7]) {
                if(rows[i][9] != null) {
                    e.attributeValues.push({
                        "value": rows[i][9],
                        "attribute": {
                            "id": "Os56slbI9so"
                        }
                    })
                }
            }
        }
    })
}
async function main() {
    const urlApi = `${url}/api/organisationUnits.json?fields=:owner&paging=false&filter=path:ilike:${orgId}`;
    const urlPost = `${url}/api/metadata`;
    let res = await axios.get(urlApi, { auth: authentication })
    let arr = res.data.organisationUnits;
    await formatResult(arr);
    // console.log(arr);
    let dataOrgsChanged = {
        "organisationUnits": arr
    }
    fs.writeFile(`${pathFile}CSYT Dak Nong.json`, JSON.stringify(dataOrgsChanged, null, 2), (error) => {
        if (error) {
            console.log('An error has occurred ', error);
            return;
        }
        console.log('Data written successfully to disk');
    });
    const response = await axios.post(urlPost, dataOrgsChanged, { auth: authentication });
    console.log('Response from server:', response);
}

main();