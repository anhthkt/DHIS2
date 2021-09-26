const axios = require('axios');
const fs = require('fs');

axios.get('http://103.124.60.43:8080/api/29/analytics/events/query/CL81ILBz33P.json?dimension=E5gcQKCVBYF&dimension=jBye5wUgSOP.PRSFYcFK3NQ&dimension=jBye5wUgSOP.dxEI0ikKoYe&dimension=jBye5wUgSOP.yjjgx13ZCqe&dimension=jBye5wUgSOP.i77vmXJlp15&dimension=jBye5wUgSOP.rlDjU6LSouB&dimension=jBye5wUgSOP.SoQRC2FVjn3&dimension=y6rVCMAkXQy&dimension=jBye5wUgSOP.wCoUvpWWXXJ&dimension=KXYuAa9Dqyt&dimension=jBye5wUgSOP.aJVuyHapMoi&dimension=jBye5wUgSOP.dVE9cCVHiQH&dimension=jBye5wUgSOP.j1UMIQFghi1&dimension=GXAEEq0iLXN&dimension=QI3Qn3V1HXX&dimension=jBye5wUgSOP.WB3A1iuHLU4&dimension=jBye5wUgSOP.tzlcXP9EXIt&dimension=jBye5wUgSOP.KbDnSKz23BT&dimension=jBye5wUgSOP.RBQxXew7RNH&dimension=jBye5wUgSOP.XCNH3OrVZeM&dimension=jBye5wUgSOP.f8PvBCEpz1T&dimension=CVFk8r3RfcM&dimension=pXhw937JsvV&dimension=jBye5wUgSOP.GEGeP3tr76C&dimension=ZhDl61ply9E&dimension=BeHItQa3k9F&dimension=evzdUjya6u4&dimension=odbi8kvORWA&dimension=CNBy0oqz15Q&dimension=y3l8eZwgtDG&dimension=pe:THIS_YEAR&dimension=ou:VzIpVQtKSOe&stage=jBye5wUgSOP&displayProperty=NAME&outputType=EVENT&desc=eventdate&pageSize=100&page=1', {
    auth: {
        username: 'anhth',
        password: '123456aA@'
    }
}).then(res => {
    //console.log(res);
    let arrDataRows = res.data.rows   
    let objItems = Object.entries(res.data.metaData.items)

    let result =arrDataRows;
    console.table(formatArrayResult(objItems, result))
    //exportResult(res);
});


function formatNumber(string){
    let phanNguyen = string.substr(0, string.indexOf('E'));
    let soMu = string.slice(string.lastIndexOf('E') + 1);
    return parseInt(parseFloat(phanNguyen) * Math.pow(10,soMu))
}

function formatArrayResult(arrItems, arr){
    arr.forEach(e => {
        e[16] = parseInt(e[16])
        e[17] = parseInt(e[17])
        e[18] = parseInt(e[18])
        e[19] = parseInt(e[19])
        e[20] = parseInt(e[20])
        e[21] = parseInt(e[21])
        arrItems.forEach(i => {if(i[1].code == e[28]){e[28] = i[1].name;}})
        arrItems.forEach(i => {if(i[1].code == e[30]){e[30] = i[1].name;}})
        arrItems.forEach(i => {if(i[1].code == e[37]){e[37] = i[1].name;}})
        arrItems.forEach(i => {if(i[1].code == e[40]){e[40] = i[1].name;}})
        arrItems.forEach(i => {if(i[1].code == e[41]){e[41] = i[1].name;}})
        if (e[22].includes("E")){e[22] = formatNumber(e[22]);} else {e[22] = parseInt(e[22])}
        if (e[26].includes("E")){e[26] = formatNumber(e[26]);} else {e[26] = parseInt(e[26])}
        if (e[34].includes("E")){e[34] = formatNumber(e[34]);} else {e[34] = parseInt(e[34])}
        e[23] = parseInt(e[23])
        e[24] = parseInt(e[24])
        e[25] = parseInt(e[25])
        e[27] = parseInt(e[27])
        e[29] = parseInt(e[29])
        e[32] = parseInt(e[32])
        e[33] = parseInt(e[33])
        e[35] = parseInt(e[35])
        e[36] = parseInt(e[36])
        e[38] = parseInt(e[38])
        e[39] = parseInt(e[39])
    })
    return arr;
}