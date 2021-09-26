const axios = require('axios')
const fs = require('fs');
const _write_json_file = require('write-json-file');

axios.get('http://172.16.31.96:8524/api/users.json?fields=:owner&paging=false', {
    auth: {
        username: 'anhth',
        password: 'Csdl2018@)!*'
    }
}).then(res => {
    // console.log(res)
    let arr = res.data.users
    formatResult(arr);
    // console.log(data)
    _write_json_file("result-api.json",arr)
});

function formatResult(arr){
    return arr.forEach(e=>{
       delete e.created;
       delete e.lastCheckedInterpretations;
       delete e.lastUpdated;
       delete e.userCredentials.created;
       delete e.userCredentials.lastLogin;
       delete e.userCredentials.lastUpdated;
       delete e.userCredentials.passwordLastUpdated;
       e.userCredentials.password = "1234567@Kln"
    })
}