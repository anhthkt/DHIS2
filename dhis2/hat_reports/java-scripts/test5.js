const axios = require('axios');
const fs = require('fs');

axios.get('http://daotao.tkyt.vn/api/analytics.json?dimension=dx:c6jDQSQhVpR;I1vZQ4MI5hP;cl4hYISlJdX&dimension=ou:OU_GROUP-OHWM3DxkeMR;d5GgtJKn0Px;&dimension=pe:202001;202002;202003;202004;202005;202006;202007;202008;202009;202010;202011;202012&hierarchyMeta=true', {
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

    let result = sumValue(res);
    console.table(result);
    exportResult(res);
});

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

function insertRows (res) {
    arr = res.data.rows
    arr.forEach(e => {
        // Insert Ten Chi tieu
        let nameDx = res.data.metaData.items[e[0]].name;
        e.insert(4, nameDx);
        // Insert Ten Dia diem cha
        let idParent = res.data.metaData.ouHierarchy[e[1]];
        let ouParent = idParent.substr(idParent.length - 11);
        let nameParent = res.data.metaData.items[ouParent].name;
        e.insert(5, nameParent);
        // Insert So Co So
        let itemsDx = countOu(res, idParent);
        e.insert(6, itemsDx);
    })
    return arr;
}

function countOu (res, idParent) {
    let objDataMetaDataOuHierarchy = res.data.metaData.ouHierarchy
    objDataMetaDataOuHierarchy = Object.values(objDataMetaDataOuHierarchy);
    let count = 0;
    for(var i = 0; i < objDataMetaDataOuHierarchy.length; ++i){
    if(objDataMetaDataOuHierarchy[i] == idParent)
        count++;
    }
    return count;
}

function sumValue (res) {
    let data = insertRows(res);
    //console.log(data);
    let helper = {};
    let result = data.reduce(function(r, o) {
        let key = o[0] + '-' + o[5];
        if(!helper[key]) {
            helper[key] = Object.assign({}, o); // create a copy of o
            r.push(helper[key]);
        } else {
            // helper[key][6] += 1;
            helper[key][3] = parseInt(helper[key][3])+ parseInt(o[3]);
        }
        return r;
    }, []);
    return result;
}

function exportResult (res){
    let data = sumValue(res);
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
        <th>Cơ sở y tế</th>
        <th>Số cơ cở</th>
        <th>Tổng số giường được BHYT thanh toán</th>
        </tr>
    `;
    let footer = `
    </table>
    
    </body>
    </html>`;
    fs.writeFile('results.html', header, function (err) {
        if (err) throw err;
        console.log('Exported!');
    })

    data.forEach(e => {
        let body = `<tr>
        <td>${e[5]}</td>
        <td>${e[6]}</td>
        <td>${e[3]}</td>
        </tr>`;
        fs.appendFile('results.html', body, function (err) {
            if (err) throw err;
            console.log('Exported!');
        })
    });

    fs.appendFile('results.html', footer, function (err) {
        if (err) throw err;
        console.log('Exported!');
    })
}