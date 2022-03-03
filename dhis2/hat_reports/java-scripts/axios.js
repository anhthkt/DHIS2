const axios = require("axios");


const apiOu = 'B1Vl8Epj9rN';
const baseUrl = 'http://daotao.tkyt.vn/kln'
// API GET TEI ID BY OU 
const apiGetID = baseUrl + `/api/trackedEntityInstances.json?fields=trackedEntityInstance&ou=${apiOu}&ouMode=CHILDREN`;
//API DELETE TEI BY ID
const apiDeleteTeiId = baseUrl + `/api/trackedEntityInstances?strategy=DELETE`;
var bodyData;

const authentication = {
    auth: {
        username: 'anhth',
        password: 'Csdl2018@)!*'
    }
}
axios.get(apiGetID, authentication).then(function (response) {
      //handle success
      console.log(response);
      bodyData = response.data
      axios({
        method: "post",
        url: apiDeleteTeiId,
        auth: {
            username: 'anhth',
            password: 'Csdl2018@)!*'
        },
        data: bodyData
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });

