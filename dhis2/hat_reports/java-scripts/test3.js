const axios = require('axios')

axios.get('http://daotao.tkyt.vn/api/analytics.json?dimension=dx:c6jDQSQhVpR;I1vZQ4MI5hP;cl4hYISlJdX&dimension=ou:OU_GROUP-OHWM3DxkeMR;d5GgtJKn0Px;&dimension=pe:202001;202002;202003;202004;202005;202006;202007;202008;202009;202010;202011;202012&hierarchyMeta=true', {
    auth: {
        username: 'diepvt',
        password: '1234567@A'
    }
}).then(res => {
    console.log(res)
    //let singleParentId = findParentByChildId(res,'kyTj9trWOsl')
    //console.log(singleParentId)
    //remapRows(res)
    //let arrayDx = res.data.metaData.dimensions.dx
    let uniqueParent = getListOuParent(res)
    let result = uniqueParent.map(idParent => {        
        let data = sumValue(idParent,res);   
        return {
            idParent: idParent,
            data : data
        }
    });
    //console.table(result)
    result.forEach(e => {
        let resultIdParent = e.idParent
        let resultNameParent = res.data.metaData.items[resultIdParent].name
        let resultData = `${resultNameParent}`
        e.data.forEach(i => {
            let resultIdDx = i.sum
            resultData = `${resultData} | ${i.sum}`
        });
        console.log(resultData)
    });
});

function findParentByChildId(res,childId) {
    let pathParent = res.data.metaData.ouHierarchy[childId]
    let parentId = pathParent.substr(pathParent.length - 11)
    return parentId
}

function remapRows(res){
    let arrayRows = JSON.parse(JSON.stringify(res.data.rows))
    return arrayRows.map(
        e => {
            e[1] = findParentByChildId(res,e[1])
            return e
        }
    )
}

function getListOuParent(res){
    let arrayNewRows = remapRows(res).map(e=>{return e[1]})
    return unique = arrayNewRows.filter((item, i, ar) => ar.indexOf(item) === i);
    console.log(unique);
}

function sumValue(parentId,res){
    let arrayDx = res.data.metaData.dimensions.dx
    let arrayDataRows = remapRows(res)
    let sumResult = []
    arrayDx.forEach(e => {
        let sumDx = 0
        arrayDataRows.forEach(
            row => {
                if (parentId == row[1] && e == row[0]){
                    sumDx+= parseInt(row[3])
                }
            }
        )
        sumResult.push({
            id : e,
            sum : sumDx
        })
    });
    return sumResult
}