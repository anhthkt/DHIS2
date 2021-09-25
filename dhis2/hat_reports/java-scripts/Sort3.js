//http://daotao.tkyt.vn/api/analytics.json?dimension=dx:TjsrDy8W8h3;TyqF8uBkL7B;CR18qa3xmiF;RRnKZsIUweW;S4NScJXJ0Bx;U5RaHHmpAFs;ChgePBcK76w;mzyg9Os6CYe;TgPeB3Q82Az;PFBtIcnqhNV&dimension=ou:OU_GROUP-Gut8QH9va65;d5GgtJKn0Px&filter=pe:202001;20
const axios = require('axios');
const p2ild = require(`${__dirname}/p2ild.js`);
const fs = require('fs');

axios.get('http://daotao.tkyt.vn/api/analytics.json?dimension=dx:c6jDQSQhVpR&dimension=ou:OU_GROUP-Gut8QH9va65;d5GgtJKn0Px&dimension=pe:202001;202002;202003;202004;202005;202006;202007;202008;202009;202010;202011;202012&hierarchyMeta=true', {
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

    let objDataMetaDataOuHierarchy = res.data.metaData.ouHierarchy;
    //console.log(objDataMetaDataOuHierarchy)
  
    let arrDataRows = res.data.rows   
    //console.table(arrDataRows)
    
    let arr = groupValueByOu(res);
    console.log(arr)
    exportResult(res)
})

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

function sortResultByPe (res){
    let arr = res.data.rows;
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

function getValueNewest (res) {
    let data = sortResultByPe(res);
    //console.log(data);
    let helper = {};
    let result = data.reduce(function(r, o) {
        let key = o[0] + '-' + o[1];
        if(!helper[key]) {
            helper[key] = Object.assign({}, o);// create a copy of o
            r.push(helper[key]);
        } else {
            // helper[key][6] += 1;
            //helper[key][3] = parseInt(helper[key][3])+ parseInt(o[3]);
        }
        return r;
    }, []);
    return result;
}

function insertNameParent (res) {
    arr = getValueNewest (res);
    arr.forEach(e => {
        // Insert Ten Chi tieu
        //let nameDx = res.data.metaData.items[e[0]].name;
        //e[e[0]] = {key: e[0], namedx: nameDx, value: e[3]};
        //e.insert(4, nameDx);
        // Insert Ten Dia diem cha
        let idParent = res.data.metaData.ouHierarchy[e[1]];
        let ouParent = idParent.substr(idParent.length - 11);
        let nameParent = res.data.metaData.items[ouParent].name;
        e[e[1]] =  {key: ouParent, nameparent: nameParent};
        //e.insert(5, nameParent);
    })
    return arr;
}

function sumValue (res) {
    let data = insertNameParent(res);
    //console.log(data);
    let helper = {};
    let result = data.reduce(function(r, o) {
        let key = o[0] + '-' + o[o[1]].nameparent;
        if(!helper[key]) {
            helper[key] = Object.assign({}, o);// create a copy of o
            r.push(helper[key]);
        } else {       
            // helper[key][6] += 1;
            helper[key][3] = parseInt(helper[key][3])+ parseInt(o[3]);
        }
        return r;
    }, []);
    return result;
}

function insertValueDx (res) {
    arr = sumValue (res);
    arr.forEach(e => {
        // Insert Ten Chi tieu
        let nameDx = res.data.metaData.items[e[0]].name;
        e[e[0]] = {key: e[0], namedx: nameDx, value: e[3]};
        //e.insert(4, nameDx);
        // Insert Ten Dia diem cha
        //let idParent = res.data.metaData.ouHierarchy[e[1]];
        //let ouParent = idParent.substr(idParent.length - 11);
        //let nameParent = res.data.metaData.items[ouParent].name;
        //e[e[1]] =  {key: e[1], nameparent: nameParent};
        //e.insert(5, nameParent);
    })
    return arr;
}

function groupValueByOu (res) {
    let data = insertValueDx(res);
    //console.log(data);
    let helper = {};
    let result = data.reduce(function(r, o) {
        let key = o[o[1]].nameparent;
        if(!helper[key]) {
            helper[key] = Object.assign({}, o);// create a copy of o
            r.push(helper[key]);
        } else {       
            // helper[key][6] += 1;
            helper[key][o[0]] = o[o[0]];
        }
        return r;
    }, []);
    return result;
}

function exportResult (res){
    let data = groupValueByOu(res);
    let header = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    
    tr:nth-child(even) {
      background-color: #dddddd;
    }
    </style>
    </head>
    <body>
    
    <h2>Result Table</h2>
    
    <table>
        <tr>
        <th>Tuyến huyện</th>
        <th>Tổng số BN đang được quản lý</th>
        <th>Khám cấp thuốc tháng vừa qua</th>
        <th>Điều trị đạt huyết áp mục tiêu</th>
        </tr>
    `;
    let footer = `
    </table>
    
    </body>
    </html>`;
    fs.writeFile('results-3.html', header, function (err) {
        if (err) throw err;
        console.log('Exported!');
    })

    data.forEach(e => {
        let body = `<tr>
        <td>${e[e[1]].nameparent}</td>
        <td>${e['CR18qa3xmiF'].value}</td>
        <td>${e['RRnKZsIUweW'].value}</td>
        <td>${e['S4NScJXJ0Bx'].value}</td>
        </tr>`;
        fs.appendFile('results-3.html', body, function (err) {
            if (err) throw err;
            console.log('Exported!');
        })
    });

    fs.appendFile('results-3.html', footer, function (err) {
        if (err) throw err;
        console.log('Exported!');
    })
}