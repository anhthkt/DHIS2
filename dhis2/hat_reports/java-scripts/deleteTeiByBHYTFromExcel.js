const readExcel = require('read-excel-file/node');
const _axios = require('axios');

async function readExcelFile() {
  const rows = await readExcel('./data.xlsx');
  
//   const data = [];
  
  for (let i = 9; i < rows.length; i++) {
    let BHXH = rows[i][3];
    if(BHXH !== "") {
        let idTei = "";
        idTei = await _axios({
            url: [
                `https://kln.tkyt.vn/api/trackedEntityInstances/query.json?ou=LOdti1gATwC&ouMode=ACCESSIBLE&trackedEntityType=EL3fkeMR3xK`
                , `&attribute=JHb1hzseNMg:EQ:${BHXH}&paging=false`
            ].join(''),
            auth: {
                username: 'anhth',
                password: 'Csdl2018@)!*'
            }
        })
        console.log(BHXH);
        if(idTei.data.rows.length > 0) {
            try {
                _axios({
                    url: [
                        `https://kln.tkyt.vn/api/trackedEntityInstances/`,
                        idTei.data.rows[0][0]
                    ].join(''),
                    method: "delete",
                    auth: {
                        username: 'anhth',
                        password: 'Csdl2018@)!*'
                    }
                }).then(e => {
                    // console.log(++countDeleted)
                    console.log(i, BHXH)
                })
            } catch (e) {
                console.log(e);
            }    
        }
    }     
  }
//   console.log(data);
}

readExcelFile();