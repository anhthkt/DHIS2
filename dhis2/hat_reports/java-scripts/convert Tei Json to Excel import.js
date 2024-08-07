const fs = require('fs');
const XLSX = require('xlsx');

// Đọc tệp JSON
const data = fs.readFileSync('./trackedEntityInstances.json', 'utf8');
const jsonData = JSON.parse(data);

// Chuyển đổi JSON thành định dạng Excel
const workbook = XLSX.utils.book_new();
const worksheetData = [['Họ tên', 'Giới tính', 'Ngày sinh', 'Mã BHYT', 'Xã']];

jsonData.trackedEntityInstances.forEach(instance => {
    const attributes = instance.attributes.reduce((acc, attr) => {
        acc[attr.attribute] = attr.value;
        return acc;
    }, {});

    const rowData = [
        attributes['xBoLC0aruyJ'] || '',
        attributes['rwreLO34Xg7'] || '',
        attributes['C7USC9MC8yH'] || '',
        attributes['JHb1hzseNMg'] || '',
        instance.programOwners[0].ownerOrgUnit || ''
    ];

    worksheetData.push(rowData);
});

const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

// Lưu tệp Excel
XLSX.writeFile(workbook, 'outputTei.xlsx');
