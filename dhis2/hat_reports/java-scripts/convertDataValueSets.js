const fs = require('fs');
const axios = require('axios');
const XLSX = require('xlsx');

// Hàm đọc mapping table từ file Excel
function readMappingTableFromExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Giả sử mapping table ở sheet đầu tiên
    const worksheet = workbook.Sheets[sheetName];
    const mappingTable = XLSX.utils.sheet_to_json(worksheet);
    return mappingTable;
}

const authentication = {
    username: `anhth`,
    password: `Csdl2018@)!*`
}
// Hàm main
// const dataSetId = 't5w7mj2gG8t,MQJjDw7mR73,I5WdVPn7APv,FDoCgzxmrHJ,npbhGALYQF4,E6BgvmSSeEF,CD0h14DBMdW,WFTtT7TzqVB,YK9H8riuEIQ,bsDiOguEu9o,nrP08SVo09v,FWJucjOMj35,Dq83wOzoxnc,Ph19Cx7kOLj';
const dataSetId = 't5w7mj2gG8t';

async function main(dataSetId) {
    try {
        // Gọi API để lấy dữ liệu
        const response = await axios.get('http://nhanluc.tkyt.vn/api/dataValueSets.json', {
            params: {
                dataSet: 't5w7mj2gG8t,MQJjDw7mR73,I5WdVPn7APv,FDoCgzxmrHJ,npbhGALYQF4,E6BgvmSSeEF,CD0h14DBMdW,WFTtT7TzqVB,YK9H8riuEIQ,bsDiOguEu9o,nrP08SVo09v,FWJucjOMj35,Dq83wOzoxnc,Ph19Cx7kOLj',
                orgUnit: 'iNZewtduXP4',
                children: true,
                startDate: '2020-01-01',
                endDate: '2024-03-20'
            },
            auth: authentication
        });

        // Lấy dataValues từ response
        const dataValues = response.data.dataValues;

        // Đọc mapping table từ file Excel
        const mappingTable = readMappingTableFromExcel('mapping_table.xlsx');

        // Tạo mảng để lưu dataValues mới
        const dataValuesNew = { "dataValues": [] };
        const dataValuesErr = { "dataValues": [] };;

        // Lặp qua mỗi phần tử trong dataValues và thực hiện đổi giá trị
        dataValues.forEach(dataValue => {
            // Tìm idNew tương ứng với idOld trong mapping table
            const mappingDeCat = `${dataValue.dataElement}-${dataValue.categoryOptionCombo}`;
            const mappingDataElement = mappingTable.find(entry => entry.idOld === mappingDeCat);
            const mappingOrgUnit = mappingTable.find(entry => entry.idOld === dataValue.orgUnit);
            const mappingAttributeOptionCombo = mappingTable.find(entry => entry.idOld === dataValue.attributeOptionCombo);

            if (!mappingDataElement || !mappingOrgUnit || !mappingAttributeOptionCombo || !dataValue.value) {
                dataValuesErr.dataValues.push(dataValue); // Nếu không tìm thấy mapping, thêm vào mảng dataValuesErr
                // return;
            } else {
                if (!mappingDataElement.idNew || !mappingOrgUnit.idNew || !mappingAttributeOptionCombo.idNew) {
                    dataValuesErr.dataValues.push(dataValue); // Nếu không tìm thấy mapping, thêm vào mảng dataValuesErr
                    // return;
                } else {

                    // Thực hiện đổi giá trị
                    const newDataValue = {
                        dataElement: mappingDataElement.idNew.slice(0, 11),
                        period: dataValue.period,
                        orgUnit: mappingOrgUnit.idNew,
                        categoryOptionCombo: mappingDataElement.idNew.slice(12, 23),
                        attributeOptionCombo: mappingAttributeOptionCombo.idNew,
                        value: dataValue.value,
                    };
                    dataValuesNew.dataValues.push(newDataValue);
                }
            }
        });
        
       // Tạo một đối tượng để lưu trữ các phần tử duy nhất
const uniqueElements = {};

// Duyệt qua mảng dataValues để lọc các phần tử duy nhất
dataValues.forEach((dataValue) => {
    const key = JSON.stringify({
        dataElement: dataValue.dataElement,
        period: dataValue.period,
        orgUnit: dataValue.orgUnit,
        categoryOptionCombo: dataValue.categoryOptionCombo,
        attributeOptionCombo: dataValue.attributeOptionCombo,
    });

    if (uniqueElements[key]) {
        // Nếu phần tử đã tồn tại, cộng giá trị value vào phần tử đó
        uniqueElements[key].value += parseFloat(dataValue.value);
    } else {
        // Nếu không, thêm phần tử mới
        uniqueElements[key] = {
            ...dataValue
        };
    }
});

        // Ghi dataValuesNew vào file JSON mới
        fs.writeFileSync(`dataValuesNew.json`, JSON.stringify(mergedDataValues, null, 2));
        console.log(`Đã lưu dữ liệu mới vào file dataValuesNew.json`);

        // Ghi dataValuesErr vào file JSON mới
        fs.writeFileSync(`dataValuesErr.json`, JSON.stringify(dataValuesErr, null, 2));
        console.log(`Đã lưu dữ liệu lỗi vào file dataValuesErr.json`);
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error);
    }
}

// Gọi hàm main để thực thi
main(dataSetId);
