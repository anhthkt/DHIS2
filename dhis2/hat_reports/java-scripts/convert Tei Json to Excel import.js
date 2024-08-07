const fs = require('fs');
const XLSX = require('xlsx');
const axios = require('axios');

const authentication = {
    username: 'anhth',
    password: 'Csdl2018@)!*'
};

// Hàm để chuyển đổi ngày từ yyyy-mm-dd sang dd/mm/yyyy
const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

async function convertTei() {
    const url = 'https://kln.tkyt.vn/api/trackedEntityInstances.json?ou=nmijk75Nfap&ouMode=ACCESSIBLE&program=NAleauPZvIE&attribute=Gy1fkmBZpFk:EQ:Tcc7DwL9Gyy&fields=programOwners,attributes&paging=false';
    
    try {
        const response = await axios.get(url, { auth: authentication });
        const jsonData = response.data;

        // Chuyển đổi JSON thành định dạng Excel
        const workbook = XLSX.utils.book_new();
        const worksheetData = [['Họ tên', 'Giới tính', 'Ngày sinh', 'Mã BHYT', 'Xã']];

        jsonData.trackedEntityInstances.forEach(instance => {
            const attributes = instance.attributes.reduce((acc, attr) => {
                acc[attr.attribute] = attr.value;
                return acc;
            }, {});

            const formattedDateOfBirth = formatDate(attributes['C7USC9MC8yH']);

            const rowData = [
                attributes['xBoLC0aruyJ'] || '',
                attributes['rwreLO34Xg7'] || '',
                formattedDateOfBirth,
                attributes['JHb1hzseNMg'] || '',
                instance.programOwners[0].ownerOrgUnit || ''
            ];

            worksheetData.push(rowData);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Lưu tệp Excel
        XLSX.writeFile(workbook, 'outputTei.xlsx');
        
        console.log('Tệp Excel đã được tạo thành công.');

    } catch (error) {
        console.error('Lỗi khi thực hiện yêu cầu hoặc xử lý dữ liệu:', error);
    }
}

convertTei();
