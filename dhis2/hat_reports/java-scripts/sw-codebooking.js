//http://103.124.60.43:8080/api/29/analytics/enrollments/query/CL81ILBz33P.json?dimension=pe:THIS_YEAR&dimension=ou:VzIpVQtKSOe&dimension=E5gcQKCVBYF&dimension=odbi8kvORWA&dimension=CNBy0oqz15Q&dimension=E5gHlFCUrZT&dimension=h75XDpxMRkU&dimension=anx92HCTNpL&dimension=kQwVUXKFUhT&dimension=ZhDl61ply9E&dimension=BeHItQa3k9F&dimension=evzdUjya6u4&dimension=kC0fOb4nC3B&dimension=y3l8eZwgtDG&stage=jBye5wUgSOP&displayProperty=NAME&outputType=ENROLLMENT&desc=enrollmentdate&pageSize=100&page=1
const axios = require('axios');
const fs = require('fs');

axios.get('http://103.124.60.43:8080/api/29/analytics/enrollments/query/CL81ILBz33P.json?dimension=pe:THIS_YEAR&dimension=ou:VzIpVQtKSOe&dimension=jBye5wUgSOP.E5gcQKCVBYF&dimension=jBye5wUgSOP.odbi8kvORWA&dimension=jBye5wUgSOP.CNBy0oqz15Q&dimension=jBye5wUgSOP.E5gHlFCUrZT&dimension=jBye5wUgSOP.h75XDpxMRkU&dimension=jBye5wUgSOP.y3l8eZwgtDG&dimension=jBye5wUgSOP.N7VOzfdJPQw&dimension=jBye5wUgSOP.aWnNr8HDNEL&dimension=jBye5wUgSOP.anx92HCTNpL&dimension=jBye5wUgSOP.kQwVUXKFUhT&dimension=jBye5wUgSOP.ZhDl61ply9E&dimension=jBye5wUgSOP.BeHItQa3k9F&dimension=jBye5wUgSOP.evzdUjya6u4&dimension=jBye5wUgSOP.kC0fOb4nC3B&dimension=jBye5wUgSOP.SoQRC2FVjn3&dimension=jBye5wUgSOP.CVFk8r3RfcM&stage=jBye5wUgSOP&displayProperty=NAME&outputType=ENROLLMENT&desc=enrollmentdate&pageSize=100&page=1', {
    auth: {
        username: 'anhth',
        password: '123456aA@'
    }
}).then(res => {
    //console.log(res);
    let arrDataRows = res.data.rows   
    let objItems = Object.entries(res.data.metaData.items)

    // let result =arrDataRows;
    console.table(formatArrayResult(objItems, arrDataRows))
    //exportResult(res);
});


Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};
function formatNumber(string){
    let phanNguyen = string.substr(0, string.indexOf('E'));
    let soMu = string.slice(string.lastIndexOf('E') + 1);
    return parseInt(parseFloat(phanNguyen) * Math.pow(10,soMu))
}
function formatArrayResult(arrItems, arr){
    arr.forEach(e => {
        if(e[5]==e[6]){e[0] = "Done"} else {e[0] = "Running"} //Check status - (2)
        e[1] = e[2].substr(0, 10) // Ngày tháng - (3)
        e[2] = e[10] // Tên code booking - (4)
        arrItems.forEach(i => {if(i[1].code == e[11]){e[11] = i[1].name;}}) // lấy tên của vùng
        e[3] = e[11]; //Vùng (5)
        arrItems.forEach(i => {if(i[1].code == e[12]){e[12] = i[1].name;}}) // lấy tên của Buyer
        e[4] = e[12]; // Buyer (6)
        e[5] = parseInt(e[13]); // Cont code booking (7)
        e[6] = parseInt(e[14]); // Cont đã chạy (8)
        e[7] = parseInt(e[5] - e[6]); // Cont còn lại (9)
        e[8] = e[15].substr(0, 10); // ETD (10)
        e[9] = e[16]; // Cắt máng (11)
        e[10] = e[17]; //Ghi chú (12)
        e[11] = parseInt(e[18]); // Khối lượng đã đóng (13)
        e[12] = parseInt(e[19]); // Khối lượng hàng loại 1 (14)
        e[13] = parseFloat(e[12]/e[11]*100).toFixed(2); // Tỷ lệ hàng loại 1 (15)
        if(e[25].includes("E")){e[25] = formatNumber(e[25])} else {e[25] = parseInt(e[25])} //format Thành tiền tại cảng thực SW
        e[24] = parseInt(e[24]) // format khối lượng vỏ
        e[14] = parseFloat(e[25]/(e[11]-e[24])).toFixed(2); // Giá trung bình tại cảng FAS
        arrItems.forEach(i => {if(i[1].code == e[20]){e[20] = i[1].name;}}) // lấy tên Fowarder
        e[15] = e[20]; // Fowarder
        e[16] = parseFloat(e[21]); // Tổng cước
        e[17] = parseFloat(e[22]); // Cước SW trả
        e[18] = parseFloat(e[23]); // Cước khách trả
        e.splice(19, 7) // xóa các phần tử từ 19 - 25
    })
    return arr;
}