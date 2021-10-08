const fetch = require("node-fetch");
const axios = require('axios');

let apiOne = "http://kln.tkyt.vn/api/trackedEntityInstances.json?fields=*&paging=false&ou=DvwGYGtWd4F;mUgbZDZj8Fi;sfPD2bUmJoO;fayRUSP9i2C;TdyuphYJvkq;TFDRs1v7ZO1;MQXYnmpsUTZ;BNCgI8gYXSM;RTD9m4vv0Zw"
// let apiOne = "http://kln.tkyt.vn/api/trackedEntityInstances.json?fields=orgUnit,trackedEntityInstance&ou=DvwGYGtWd4F;mUgbZDZj8Fi;sfPD2bUmJoO;fayRUSP9i2C;TdyuphYJvkq;TFDRs1v7ZO1;MQXYnmpsUTZ;BNCgI8gYXSM;RTD9m4vv0Zw&paging=false&program=NAleauPZvIE"
let apiTwo = "http://kln.tkyt.vn/api/trackedEntityInstances.json?fields=orgUnit,trackedEntityInstance&ou=DvwGYGtWd4F;mUgbZDZj8Fi;sfPD2bUmJoO;fayRUSP9i2C;TdyuphYJvkq;TFDRs1v7ZO1;MQXYnmpsUTZ;BNCgI8gYXSM;RTD9m4vv0Zw&paging=false&program=a7arqsOKzsr"

const requestOne = axios.get(apiOne, {
    auth: {
        username: 'anhth',
        password: 'Csdl2018@)!*'
    }
});
const requestTwo = axios.get(apiTwo, {
    auth: {
        username: 'anhth',
        password: 'Csdl2018@)!*'
    }
});


axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
    const responseOne = responses[0].data.trackedEntityInstances
    const responseTwo = responses[1].data.trackedEntityInstances
    let programTHA = 'NAleauPZvIE'
    let programDTD = 'a7arqsOKzsr'
    changeOwnershipTei(responseOne, programTHA)
    console.log(responseOne)
    // use/access the results 
})).catch(errors => {
    // react on errors.
})

function changeOwnershipTei (arrTei, program) {
    arrTei.forEach(e => {
        if(e.orgUnit == 'DvwGYGtWd4F') e.orgUnit = 'FDPBDRJJmfe'
        if(e.orgUnit == 'mUgbZDZj8Fi') e.orgUnit = 'C1muOM82Jg1'
        if(e.orgUnit == 'sfPD2bUmJoO') e.orgUnit = 'Nq4shQrmAhU'
        if(e.orgUnit == 'fayRUSP9i2C') e.orgUnit = 'gQUv6XINpIL'
        if(e.orgUnit == 'TdyuphYJvkq') e.orgUnit = 'yxOhbC3k3HT'
        if(e.orgUnit == 'TFDRs1v7ZO1') e.orgUnit = 'wnKsES1SBHB'
        if(e.orgUnit == 'MQXYnmpsUTZ') e.orgUnit = 'CljIxQH78sH'
        if(e.orgUnit == 'BNCgI8gYXSM') e.orgUnit = 'CV5DCU19Cvv'
        if(e.orgUnit == 'RTD9m4vv0Zw') e.orgUnit = 'Y6xS79PKQwh'
        let url = ''
        url = `http://kln.tkyt.vn/api/tracker/ownership/transfer?trackedEntityInstance=${e.trackedEntityInstance}&program=${program}&ou=${e.orgUnit}`
        
    })
    return arrTei
}

// fetch("http://daotao.tkyt.vn/kln/api/tracker/ownership/transfer?trackedEntityInstance=Fc9ODyVRBZO&program=NAleauPZvIE&ou=PaJJ1kUUnB2", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "vi,en-US;q=0.9,en;q=0.8",
//     "cache-control": "no-cache",
//     "content-type": "application/json;charset=UTF-8",
//     "pragma": "no-cache"
//   },
//   "body": "{}",
//   "method": "PUT",
//   "mode": "cors",
//   "credentials": "include"
// }).then(response => {console.log(response.status)})
// .catch(err => {console.log(err)});
