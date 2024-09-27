const axios = require('axios')
const fs = require('fs');

const authentication = {
    username: `anhth`,
    password: `Csdl2018@)!*`
}

function formatResult(arr) {
    return arr.forEach(e => {
        //    delete e.created;
        //    delete e.lastCheckedInterpretations;
        //    delete e.lastUpdated;
        //    delete e.userCredentials.created;
        //    delete e.userCredentials.lastLogin;
        //    delete e.userCredentials.lastUpdated;
        //    delete e.userCredentials.passwordLastUpdated;
        e.userCredentials.password = "1234567@Ab"
    })
}
async function main() {
    const url = 'https://baocao.tkyt.vn'
    const orgId = 'pZu0UpcC023'
    const urlApi = `${url}/api/users.json?fields=:all&filter=organisationUnits.path:ilike:${orgId}&paging=false`;
    const urlPost = `${url}/api/metadata`;
    let res = await axios.get(urlApi, { auth: authentication })
    let arr = res.data.users;
    formatResult(arr);
    // console.log(arr);
    let dataUsersChanged = {
        "users": arr
    }
    fs.writeFile(`dataUsers.json`, JSON.stringify(dataUsersChanged, null, 2), (error) => {
        if (error) {
          console.log('An error has occurred ', error);
          return;
        }
        console.log('Data written successfully to disk');
      });
    const response = await axios.post(urlPost, dataUsersChanged, { auth: authentication });
    console.log('Response from server:', response);
}

main();