const _axios = require("axios");
const _lodash = require("lodash");
//const _config = require("../../config.json");
const fs = require("fs");

//CONSTANT  
//const baseUrl = _config.urlInstanceDAOTAO_KLN;
const baseUrl = 'https://baocao.tkyt.vn';
const targetPronvince = {
    "name": "Viet Nam",
    "idOrg": "LOdti1gATwC"
}

const authentication = {
    auth: {
        // username: _config.username,
        // password: _config.password
        username: 'anhth',
        password: 'Csdl2018@)!*'
    }
}

function convertAncestorsToStringPath(arrAncestors) {
    return arrAncestors.map((ancesElement, idx, arr) => {
        return ancesElement.name
    }).join("/")
}

//Main function
(() => {
    let url = ``
    console.log(url = baseUrl + `/api/organisationUnits.json?fields=id,code,name,dataSets[id,name],ancestors[name]&filter=path:ilike:${targetPronvince.idOrg}&paging=false`)
    // +"&filter=id:in:[UPKEou47AtY]";
    _axios.get(url, authentication).then(jsonResult => {
        let resData = jsonResult.data;
        let resultCsv = `id|name|ancestors\n`;
        jsonResult.data.organisationUnits.sort((a,b)=> {return (convertAncestorsToStringPath(a.ancestors) > convertAncestorsToStringPath(b.ancestors)? 1 : -1)}).forEach((orgElement, idx, arr) => {
            resultCsv += `${orgElement.id}|${orgElement.name}|${convertAncestorsToStringPath(orgElement.ancestors)}\n${orgElement.dataSets != undefined ? orgElement.dataSets.filter(e=>e.name.toLowerCase().includes('tt37')).map(e => `||||${e.name}`).join("\n") : {}}`
        });
        fs.writeFileSync(`${__dirname}/output/orgWithCode${targetPronvince.name}.csv`, resultCsv)
    })
})();
