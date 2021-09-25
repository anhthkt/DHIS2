const axios = require('axios');
const fs = require('fs');

axios.get('http://daotao.tkyt.vn/api/analytics.json?dimension=dx:TjsrDy8W8h3;TyqF8uBkL7B;CR18qa3xmiF;RRnKZsIUweW;S4NScJXJ0Bx;U5RaHHmpAFs;ChgePBcK76w;mzyg9Os6CYe;TgPeB3Q82Az;PFBtIcnqhNV&dimension=ou:OU_GROUP-OHWM3DxkeMR;d5GgtJKn0Px&dimension=pe:202001;202002;202003;202004;202005;202006;202007;202008;202009;202010;202011;202012&hierarchyMeta=true', {
//axios.get('http://daotao.tkyt.vn/api/analytics.json?dimension=dx:TjsrDy8W8h3;TyqF8uBkL7B;CR18qa3xmiF;RRnKZsIUweW;S4NScJXJ0Bx;U5RaHHmpAFs;ChgePBcK76w;mzyg9Os6CYe;TgPeB3Q82Az;PFBtIcnqhNV&dimension=ou:OU_GROUP-OHWM3DxkeMR;d5GgtJKn0Px&dimension=pe:202001;202002;202003;202004;202005;202006;202007;202008;202009;202010;202011;202012&hierarchyMeta=true', {
    auth: {
        username: 'diepvt',
        password: '1234567@A'
    }
}).then(res => {
    console.log(res);
    let arrDataHeaders = res.data.headers
    //console.table(arrDataHeaders)

    let objDataMetaDataDimensions = res.data.metaData.dimensions
    //console.log(objDataMetaDataDimensions)
    
    let objDataMetaDataItems = res.data.metaData.items
    //console.log(objDataMetaDataItems)

    let objDataMetaDataOuHierarchy = res.data.metaData.ouHierarchy
    //console.log(objDataMetaDataOuHierarchy)
  
    let arrDataRows = res.data.rows  
    //console.table(arrDataRows)
    
    let newArrRows = insertIdOuParent(arrDataRows, objDataMetaDataOuHierarchy)
    var data = getLastesPeriodValueByAncestor(sortByPe(arrDataRows))
    let sumValue = sumValueByDxAndOuParent(data)
    let resultDx = groupDxByOuParent(res, sumValue)
    ///console.log(resultDx)
    let resultOu = groupChildByOuParent(res, Object.entries(objDataMetaDataOuHierarchy))
    //console.log(resultOu)
    let result = resultDx.map((item, i) => Object.assign({}, item, resultOu[i]))
    console.log(result)
})

function sortByPe (arr) {
    let result = arr.sort(function(a, b){
        let keyA = a[2];
        let keyB = b[2];
        if (keyA < keyB){
            return 1;
        }else{
            if (keyA > keyB) {
                return -1;
            }else {
                return 0;
            }
        }
    });
    return result;
}

function getLastesPeriodValueByAncestor (arr){
    let tempArr = {};
    let result = arr.reduce(function(r, o) {
        let key = o[0] + '-' + o[1];
        if(!tempArr[key]) {
            tempArr[key] = Object.assign({}, o);// create a copy of o
            r.push(tempArr[key]);
        }
        return r;
    }, []);
    return result;
}

function getIdOuParent (objOuHierarchy, idOuChild) {
    let idOuParent = objOuHierarchy[idOuChild].substr(objOuHierarchy[idOuChild].length - 11);
    return idOuParent;
}

function insertIdOuParent (arrRows, objOuHierarchy){
    return arrRows.forEach(e => {
        e.push(getIdOuParent(objOuHierarchy, e[1]))
    })
}

function sumValueByDxAndOuParent (data) {
    //let data = insertIdOuParent(res);
    //console.log(data);
    let temp = {};
    let result = data.reduce(function(r, o) {
        let key = o[0] + '-' + o[4];
        if(!temp[key]) {
            temp[key] = Object.assign({}, o);// create a copy of o
            r.push(temp[key]);
        } else {       
            // helper[key][6] += 1;
            temp[key][3] = parseInt(temp[key][3])+ parseInt(o[3]);
        }
        return r;
    }, []);
    return result;
}

function groupDxByOuParent(res, data){
    let temp = {};
    var resultGroupDx = [];
    let result = data.reduce(function(r, o) {
        //let keyDxOuParentO = o[0] + '-' + o[4];
        let key = o[4];
        // keyDxOuParentR = r[0].dataDx[0].idDx + '-' + r[0].idOuParent;
        if(!temp[key]) {
            temp[key]= Object.assign({}, o)// create a copy of o
            r.push(temp[key]);
            //let idOuChild = temp[key].idOuChild;
            // idOuChild.push({
            //     idOuChild: o[1],
            //     nameOuChild: res.data.metaData.items[o[1]].name
            // });
            let dataDx = [];
            dataDx.push({
                idDx: o[0],
                nameDx: res.data.metaData.items[o[0]].name, 
                value: o[3]
            })
            temp[key] = ({
                idOuParent: o[4],
                name: res.data.metaData.items[o[4]].name,
                //idOuChild: idOuChild,
                dataDx: dataDx
            }); 
            resultGroupDx.push(temp[key]);
        } else {
            //if (temp[o[4]].idOuChild.includes(o[3])) {
                temp[key].dataDx.push({
                    idDx: o[0],
                    nameDx: res.data.metaData.items[o[0]].name, 
                    value: o[3]
                }) 
            //}           
            // temp[keyDxOuParentO] = ({
            //     idOuParent: o[4],
            //     name: res.data.metaData.items[o[4]].name,
            //     idOuChild: idOuChild,
            //     dataDx: dataDx
            // }); 
            //resultSum.push(temp[keyDxOuParentO]);
            //temp[keyDxOuParentO][3] = parseInt(temp[keyDxOuParentO][3])+ parseInt(o[3]);
        }
        return r;
    }, []);
    return resultGroupDx;
}

// function groupChildByOuParent (res, data) {
//     //let data = insertIdOuParent(res);
//     //console.log(data);
//     let temp = {};
//     var resultGroupOu = [];
//     let result = data.reduce(function(r, o) {
//         let key = o[4];
//         if(!temp[key]) {
//             temp[key]= Object.assign({}, o)// create a copy of o
//             r.push(temp[key]);
//             let idOuChild = [];
//                 idOuChild.push({
//                 idOuChild: o[1],
//                 nameOuChild: res.data.metaData.items[o[1]].name
//             });
//             temp[key] = ({
//                 idOuParent: o[4],
//                 name: res.data.metaData.items[o[4]].name,
//                 idOuChild: idOuChild
//             }); 
//             resultGroupOu.push(temp[key]);
//         } else {       
//             // helper[key][6] += 1;
//             //temp[key][3] = parseInt(temp[key][3])+ parseInt(o[3]);
//             temp[key].idOuChild.push({
//                 idOuChild: o[1],
//                 nameOuChild: res.data.metaData.items[o[1]].name
//             }) 
//         }
//         return r;
//     }, []);
//     return resultGroupOu;
// }

// function findOuChildExists(arr, idOuChild) {
//     return arr.some(function(e) {
//         return e.idOuChild === idOuChild;
//     }); 
// }

function groupChildByOuParent(res, data) {
    //let data = Object.entries(data);
    //console.log(data);
    let temp = {};
    var resultGroupOu = [];
    let result = data.reduce(function(r, o) {
        let key = o[1];
        if(!temp[key]) {
            temp[key]= Object.assign({}, o)// create a copy of o
            r.push(temp[key]);
            let idOuChild = [];
                idOuChild.push({
                idOuChild: o[0],
                nameOuChild: res.data.metaData.items[o[0]].name
            });
            temp[key] = ({
                idOuParent: o[1].substr(o[1].length - 11),
                idOuChild: idOuChild
            }); 
            resultGroupOu.push(temp[key]);
        } else {       
            // helper[key][6] += 1;
            //temp[key][3] = parseInt(temp[key][3])+ parseInt(o[3]);
            temp[key].idOuChild.push({
                idOuChild: o[0],
                nameOuChild: res.data.metaData.items[o[0]].name
            }) 
        }
        return r;
    }, []);
    return resultGroupOu;
}