const axios = require('axios');

let apiOne = "http://103.124.60.43:8080/api/29/analytics/events/query/CL81ILBz33P.json?dimension=pe:THIS_YEAR;LAST_12_MONTHS&dimension=ou:VzIpVQtKSOe&dimension=jBye5wUgSOP.WB3A1iuHLU4&dimension=KXYuAa9Dqyt&stage=jBye5wUgSOP&displayProperty=NAME&outputType=EVENT&desc=eventdate&pageSize=100&page=1"
let apiTwo = "http://103.124.60.43:8080/api/29/analytics/enrollments/query/BD2k1lYM265.json?dimension=pe:THIS_YEAR&dimension=ou:VzIpVQtKSOe&dimension=OQvPXFisxA7&dimension=BWSzw9Jxqw1&stage=q6Eb88fW7az&displayProperty=NAME&outputType=ENROLLMENT&desc=enrollmentdate&pageSize=100&page=1"

const requestOne = axios.get(apiOne, {
    auth: {
        username: 'anhth',
        password: '123456aA@'
    }
});
const requestTwo = axios.get(apiTwo, {
    auth: {
        username: 'anhth',
        password: '123456aA@'
    }
});


axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
    const responseOne = responses[0]
    const responseTwo = responses[1]
    console.log(responses)
    // use/access the results 
})).catch(errors => {
    // react on errors.
})