const axios = require('axios')
const fs = require('fs');

const authentication = {
    username: `anhth`,
    password: `Csdl2018@)!*`
}

async function main() {
    const url = 'https://baocao.tkyt.vn'

    const urlApi = `${url}/api/29/analytics/events/query/uX3pS8aZHN2.json?dimension=pe:LAST_3_MONTHS&dimension=ou:ZJAerHIZ8Ch&dimension=qgYbmBm4kx8.fcbbx6y83mn&stage=qgYbmBm4kx8&displayProperty=SHORTNAME&totalPages=false&outputType=EVENT&desc=qgYbmBm4kx8.fcbbx6y83mn&pageSize=1000&page=1`;

    let res = await axios.get(urlApi, { auth: authentication })
    let arrEvents = res.data.rows;
    let arrIdEvents = arrEvents.map(event => event[0]);
    // console.log(arrIdEvents);

    for (let e in arrIdEvents) {
        let urlEvent = `${url}/api/events/${arrIdEvents[e]}.json`;
        let event = await axios.get(urlEvent, { auth: authentication });
        let dataElementExists = event.data.dataValues.some(dataValue => dataValue.dataElement === "fcbbx6y83mn");
        if (!dataElementExists) {
            event.data.dataValues.push(
                {
                    "dataElement": "fcbbx6y83mn",
                    "value": event.data.created
                }
            );
            // console.log(JSON.stringify(event.data));
            let urlEventPost = `${url}/api/events/${arrIdEvents[e]}`;
            let response = await axios.put(urlEventPost, event.data, { auth: authentication });
            console.log(`${arrIdEvents[e]}`, response.data);
        }
    }

    // const response = await axios.post(urlPost, dataUsersChanged, { auth: authentication });
    // console.log('Response from server:', response);
}

main();