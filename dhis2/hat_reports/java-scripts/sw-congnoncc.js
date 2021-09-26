//http://103.124.60.43:8080/api/29/analytics/enrollments/query/CL81ILBz33P.json?dimension=pe:THIS_YEAR&dimension=ou:VzIpVQtKSOe&dimension=E5gcQKCVBYF&dimension=odbi8kvORWA&dimension=CNBy0oqz15Q&dimension=E5gHlFCUrZT&dimension=h75XDpxMRkU&dimension=anx92HCTNpL&dimension=kQwVUXKFUhT&dimension=ZhDl61ply9E&dimension=BeHItQa3k9F&dimension=evzdUjya6u4&dimension=kC0fOb4nC3B&dimension=y3l8eZwgtDG&stage=jBye5wUgSOP&displayProperty=NAME&outputType=ENROLLMENT&desc=enrollmentdate&pageSize=100&page=1
const axios = require('axios');
const fs = require('fs');

let apiCongNoNCC = "http://103.124.60.43:8080/api/29/analytics/events/query/CL81ILBz33P.json?dimension=pe:THIS_YEAR;LAST_12_MONTHS&dimension=ou:VzIpVQtKSOe&dimension=jBye5wUgSOP.WB3A1iuHLU4&dimension=KXYuAa9Dqyt&stage=jBye5wUgSOP&displayProperty=NAME&outputType=EVENT&desc=eventdate&pageSize=100&page=1"
let apiThanhToanNCC = "http://103.124.60.43:8080/api/29/analytics/enrollments/query/BD2k1lYM265.json?dimension=pe:THIS_YEAR&dimension=ou:VzIpVQtKSOe&dimension=q6Eb88fW7az.OQvPXFisxA7&dimension=q6Eb88fW7az.ce9nxcrFBTR&dimension=q6Eb88fW7az.BWSzw9Jxqw1&stage=q6Eb88fW7az&displayProperty=NAME&outputType=ENROLLMENT&desc=enrollmentdate&pageSize=100&page=1"

const requestOne = axios.get(apiCongNoNCC, {
    auth: {
        username: 'anhth',
        password: '123456aA@'
    }
});
const requestTwo = axios.get(apiThanhToanNCC, {
    auth: {
        username: 'anhth',
        password: '123456aA@'
    }
});
axios.all([requestOne, requestTwo]).then(axios.spread((...res) => {
    const responseOne = res[0]
    const responseTwo = res[1]
    let arrDataRowsCongNo = res[0].data.rows
    let arrDataRowsThanhToan = res[1].data.rows
    let arrItems = Object.entries(res[0].data.metaData.items)
    
    let result = mapResultCongNoNCC(arrItems, arrDataRowsCongNo, arrDataRowsThanhToan)
    console.log(result) 
})).catch(errors => {
    // react on errors.
})

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
function formatNumber(string) {
    let phanNguyen = string.substr(0, string.indexOf('E'));
    let soMu = string.slice(string.lastIndexOf('E') + 1);
    return parseInt(parseFloat(phanNguyen) * Math.pow(10, soMu))
}

function sumValueByCodeNCC(arrDataRows) {
    //let arrDataRows = res.data.rows;
    // format Array Rows
    arrDataRows.forEach(e => {
        e[0] = e[13] //copy code Nha cung cap tu vi tri 13 len 0
        e[1] = parseInt(e[2].substr(5, 2)); // lấy tháng sự kiện
        if (e[14].includes("E")) { e[2] = formatNumber(e[14]); } else { e[2] = parseInt(e[14]) } // format giá trị
        // e[2] = parseInt(formatNumber(e[14]));
        e.splice(3, 12); // xóa các phần tử từ vị trí 3 - 15 trong mảng
    })
    // Sum cong no theo thang
    let temp = {};
    let resultSum = arrDataRows.reduce(function (r, o) {
        let key = o[0] + '-' + o[1];
        if (!temp[key]) {
            temp[key] = Object.assign({}, o);// create a copy of o
            r.push(temp[key]);
        } else {
            // helper[key][6] += 1;
            temp[key][2] = parseInt(temp[key][2]) + parseInt(o[2]); //tính tổng công nợ theo ncc-tháng
            //temp[key][14] = parseInt(temp[key][2])+ parseInt(o[2]);
        }
        return r;
    }, []);
    // group by NCC
    let temp1 = {};
    let resultGroupVT = [];
    let resultGroup = resultSum.reduce(function (r, o) {
        let key = o[0];
        if (!temp1[key]) {
            temp1[key] = Object.assign({}, o);// create a copy of o
            r.push(temp1[key]);
            // Format kết quả
            let dataDx = [];
            dataDx.push({
                key: o[1], // số tháng
                value: o[2] // giá trị
            })
            temp1[key] = ({
                0: o[0], // code NCC
                1: o[2], // tổng công nợ theo năm
                2: dataDx // chi tiết công nợ theo tháng
            });
            resultGroupVT.push(temp1[key]);
        } else {
            temp1[key][1] = parseInt(temp1[key][1]) + parseInt(o[2]);
            temp1[key][2].push({
                key: o[1],
                value: o[2]
            })
        }
        return r;
    }, []);
    return resultGroupVT;
}

//Lấy danh sách các nhà cung cấp
function getListNCC(arr) {
    let result = [];
    arr.forEach(e => {
        if (e[1].code != undefined) {
            if (e[1].code.includes("NCC")) {
                result.push({ 0: e[1].code, 1: e[1].name })
            }
        }
    })
    return result
}

//map công nợ phát sinh trong năm với bảng danh sách nhà cung cấp
function resultCongNoNCC(arrItems, arrDataRows) {
    let listNCC = getListNCC(arrItems);
    let sumValue = sumValueByCodeNCC(arrDataRows);
   
    listNCC.forEach(e => {
        e[2] = 0;
        e[3] = 0;
        for (i = 0; i < sumValue.length; i++) {
            if (e[0] == sumValue[i][0]) {
                e[2] = sumValue[i][1] // công nợ phát sinh trong năm
                e[3] = sumValue[i][2] // công nợ phát sinh từng tháng
            }
        }
    })
    return listNCC;
}

function formatArrThanhToanNCC (arr) {
    return arr.forEach(e => {
        e[0] = e[10] //copy code NCC tu vi tri 10 len 0
        if (e[11].includes("E")) { e[1] = formatNumber(e[11]); } else { e[1] = parseInt(e[11]) } 
        if (e[12].includes("E")) { e[2] = formatNumber(e[12]); } else { e[2] = parseInt(e[12]) } 
        e.splice(3,10)
    })
}

//map thanh toán phát sinh trong năm với bảng danh sách nhà cung cấp
function resultThanhToanNCC(arrItems, arrDataRows) {
    let listNCC = getListNCC(arrItems);
    formatArrThanhToanNCC(arrDataRows)   
    listNCC.forEach(e => {
        e[2] = 0;
        e[3] = 0;
        for (i = 0; i < arrDataRows.length; i++) {
            if (e[0] == arrDataRows[i][0]) {
                e[2] = arrDataRows[i][1]
                e[3] = arrDataRows[i][2]
            }
        }
    })
    return listNCC;
}

function mapResultCongNoNCC(arrItems, arrDataRowsCongNo, arrDataRowThanhToan) {
    // let listNCC = getListNCC(arrItems);
    let arrCongNoNCC = resultCongNoNCC(arrItems, arrDataRowsCongNo)
    let arrThanhToanNCC = resultThanhToanNCC(arrItems, arrDataRowThanhToan)
    arrCongNoNCC.forEach(e => {
        for (let i = 0; i < arrThanhToanNCC.length; i++){
            if(e[0] == arrThanhToanNCC[i][0]) {
                e[4] = arrThanhToanNCC[i][2] //số dư đầu kỳ
                e[5] = arrThanhToanNCC[i][3] // Tổng thanh toán NCC
            }
        }
    })
    return arrCongNoNCC;
}

//Lấy giá trị công nợ năm
function getValueByMonth(month, row) {
    let result = 0;
    row[3].forEach(e => {
        if (e.key == month) {
            result = e.value;
        }
    })
    return result;
}

//Lấy giá trị công nợ theo tháng
function getValueByYear(row) {
    if (row[2] == undefined) {
        result = 0
    } else {
        result = row[2]
    }
    return result;
}