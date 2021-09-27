const axios = require('axios')
var fs = require('fs')
var getNameOrgByID = function (res,id){
    return res.data.metaData.items[id].name;
}
axios.get('http://daotao.tkyt.vn/api/analytics.json?dimension=dx:c6jDQSQhVpR;I1vZQ4MI5hP;cl4hYISlJdX&dimension=ou:OU_GROUP-OHWM3DxkeMR;d5GgtJKn0Px;&dimension=pe:202001;202002;202003;202004;202005;202006;202007;202008;202009;202010;202011;202012&hierarchyMeta=true', {
    auth: {
        username: 'diepvt',
        password: '1234567@A'
    }
}).then(res => {
    // console.log(res)

    // Gia tri 
    //let singleMetaData = res.data.metaData.items[202001].name
    //console.log(singleMetaData)

    // Gia tri 1 row
    let lengthOu = res.data.metaData.dimensions.ou.length
    //console.log(singleRecord)

    let arrayDx = res.data.metaData.dimensions.dx
    arrayDx.forEach(e => {
        let singleDx = res.data.metaData.items[e].name
        //console.log(singleDx)
    });

    let arrayOu = res.data.metaData.dimensions.ou
    let arrayParent = []
    arrayOu.forEach(e => {
        let singleOu = res.data.metaData.items[e].name
        //console.log(singleOu)
        let singleOuHierarchy = res.data.metaData.ouHierarchy[e]
        //console.log(singleOuHierarchy)
        let idOuHierarchy = singleOuHierarchy.substr(singleOuHierarchy.length - 11)
        //console.log(idOuHierarchy)        
        arrayParent.push(idOuHierarchy)
        let nameOuHierarchy = res.data.metaData.items[idOuHierarchy].name
        //console.log(nameOuHierarchy)
        let formatOu = `${nameOuHierarchy} | ${singleOu}`
        console.log(formatOu)

    });
    let arrayRows = res.data.rows
    // arrayRows.forEach(e => {

    // });
    //let arrayOuHierarchy = res.data.metaData.ouHierarchy
    //console.table(arrayOuHierarchy)
    remapRows(res)
})

function remapRows(res) {
    let arrayRows = JSON.parse(JSON.stringify(res.data.rows));
    arrayRows.map(e => {
        e[1] = findParentByChildID(res,e[1]);
        return e;
    })
    console.log()
}

function findParentByChildID(res,childID) {
    //logic
    let path = res.data.metaData.ouHierarchy[childID];
    let parentID = path.substr(path.length - 11)
    return parentID;
}

