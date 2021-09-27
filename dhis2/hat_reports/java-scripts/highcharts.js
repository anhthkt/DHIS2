const axios = require('axios');
const fs = require('fs');

axios.get('https://dev.tkyt.vn/lucky/api/29/analytics?dimension=dx:NwjqULjhwgg;EU4ha1dPN8w;HecktRgA1ez;adEF1bzDQWW;cQw76Un9jJ8&dimension=v7S2OZvWGWY:YpvY3ghB2WW;tpWjiIDBUHI;cGDQ0sqLmFK;H5L0ZxyoJIW;cxi2i36k2VI;vNu8mOy7Rdg&filter=ou:USER_ORGUNIT&filter=pe:THIS_YEAR&displayProperty=NAME&user=Iren06i4fx6&includeNumDen=true', {
//axios.get('http://daotao.tkyt.vn/api/analytics.json?dimension=dx:TjsrDy8W8h3;TyqF8uBkL7B;CR18qa3xmiF;RRnKZsIUweW;S4NScJXJ0Bx;U5RaHHmpAFs;ChgePBcK76w;mzyg9Os6CYe;TgPeB3Q82Az;PFBtIcnqhNV&dimension=ou:OU_GROUP-OHWM3DxkeMR;d5GgtJKn0Px&dimension=pe:202001;202002;202003;202004;202005;202006;202007;202008;202009;202010;202011;202012&hierarchyMeta=true', {
    auth: {
        username: 'diepvt',
        password: '1234567@A'
    }
}).then(res => {
    console.log(res);
    let items = res.data.metaData.items
    let rows = res.data.rows
    let titleTextOu = items[res.data.metaData.dimensions.ou[0]].name
    let titleTextPe = items[res.data.metaData.dimensions.pe[0]].name
    let titleText = `${titleTextOu} - ${titleTextPe}`
    let listCategories = res.data.metaData.dimensions.v7S2OZvWGWY
    let nameCategories = getName(items, listCategories)
    let listDx = res.data.metaData.dimensions.dx
    let dataSeries = getDataSeries(items, rows, listDx, listCategories)
    console.table(dataSeries)
})

function getName(items, list) {
    var result = []
    list.forEach(e=>{
        result.push(items[e].name)
    })
    return result;
}

function getDataSeries(items, rows, listDx, listCategories){
    let result = []
    listDx.forEach(e => {
        let data = []
        listCategories.forEach(i => {
            let value = "null"
            rows.forEach(j => {
                if(j[0]==e && j[1]==i){
                    value = parseInt(j[2])
                }
            })
            data.push(value)
        })
        result.push({
            name: items[e].name,
            data: data
        })
    })
    return result;
}