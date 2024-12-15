const readExcel = require('read-excel-file/node');
const _axios = require('axios');

async function readExcelFile() {
  const rows = await readExcel('./dataTeiDelete.xlsx');
  
//   const data = [];
  
  for (let i = 9; i < rows.length; i++) {
    let BHXH = rows[i][3];
    if(BHXH !== "") {
        let idTei = "";
        idTei = await _axios({
            // BHXH
            // url: [
            //     `https://kln.tkyt.vn/api/trackedEntityInstances/query.json?ou=LOdti1gATwC&ouMode=ACCESSIBLE&trackedEntityType=EL3fkeMR3xK`
            //     , `&attribute=JHb1hzseNMg:EQ:${BHXH}&paging=false`
            // ].join(''),
            // CCCD
            url: [
                `https://kln.tkyt.vn/api/trackedEntityInstances.json?ou=nJm9lSLVvG8&ouMode=ACCESSIBLE&program=NAleauPZvIE&attribute=JHb1hzseNMg:EQ:${BHXH}&paging=false&fields=*,enrollments[*]`
            ].join(''),
            auth: {
                username: 'anhth',
                password: 'Csdl2018@)!*'
            }
        })
        // console.log(BHXH);
        if(idTei.data.trackedEntityInstances.length > 0) {
            try {
                _axios({
                    url: [
                        `https://kln.tkyt.vn/api/trackedEntityInstances/`,
                        idTei.data.trackedEntityInstances[0].trackedEntityInstance
                    ].join(''),
                    method: "delete",
                    auth: {
                        username: 'anhth',
                        password: 'Csdl2018@)!*'
                    }
                }).then(e => {
                    // console.log(++countDeleted)
                    console.log(i+1, BHXH)
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