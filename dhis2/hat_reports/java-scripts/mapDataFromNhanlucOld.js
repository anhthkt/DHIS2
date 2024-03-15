const fs = require('fs');
const axios = require('axios');
const XLSX = require('xlsx');

const url = `http://103.124.60.92/baocao/api/events.json?dryRun=false&dataElementIdScheme=UID&orgUnitIdScheme=UID&eventIdScheme=UID&idScheme=UID&payloadFormat=json`;
const auth = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YW5odGg6Q3NkbDIwMThAKSEq' // token authentication
    }
}

async function processPostRequest(dataPost) {
    try {
        // Replace dấu ; = ,
        const dataPostString = JSON.stringify(dataPost).replace(/;/g, ',');
        // Thực hiện yêu cầu POST bằng Axios
        const response = await axios.post(url, dataPostString, auth);
        console.log('Đã gửi yêu cầu POST thành công:', response.status);
    } catch (error) {
        console.error('Đã xảy ra lỗi khi gửi yêu cầu POST:', error);
    }
}

// Tên và đường dẫn của tập tin JSON
const jsonFilePath = 'data.json';
let i = 0;
// Đọc dữ liệu từ tập tin JSON
fs.readFile(jsonFilePath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Đã xảy ra lỗi khi đọc tập tin JSON:', err);
        return;
    }

    // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript
    const jsonData = JSON.parse(data);

    const uniqueOrgUnits = {};

    // Lặp qua mỗi mục trong dataValues của mỗi sự kiện
    for (const event of jsonData.dataValues) {
            const orgUnit = event.orgUnit;
            // Thêm orgUnit vào đối tượng uniqueOrgUnits
            uniqueOrgUnits[orgUnit] = true;
    }
    
    // Chuyển các orgUnit không trùng lặp thành mảng
    const orgUnitArray = Object.keys(uniqueOrgUnits);
    
    // Ghi kết quả ra file Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([orgUnitArray]);
    XLSX.utils.book_append_sheet(wb, ws, "OrgUnits");
    XLSX.writeFile(wb, "orgUnits.xlsx");
});
