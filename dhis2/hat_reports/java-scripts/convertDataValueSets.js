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

async function main() {
    let urlOrg = `http://nhanluc.tkyt.vn/api/organisationUnits.json?fields=id,name&filter=level:eq:2&paging=false`
    const responseOrg = await axios.get(urlOrg, {
        auth: authentication
    });
    // console.log(responseOrg.data.organisationUnits);
    for (const org of responseOrg.data.organisationUnits) {
        let url = `http://nhanluc.tkyt.vn/api/dataValueSets.json?dataSet=t5w7mj2gG8t&orgUnit=${org.id}&children=true&startDate=2020-01-01&endDate=2024-03-20`;
        // Gọi API để lấy dữ liệu
        const response = await axios.get(url, {
            auth: authentication
        });

        // console.log(dataValues);
        if (Object.keys(response.data).length > 0) {
            let dataValues = response.data.dataValues;
            // Đọc mapping table từ file Excel
            const mappingTable = readMappingTableFromExcel('mapping_table.xlsx');

            // Tạo mảng để lưu dataValues mới
            const dataValuesNew = { "dataValues": [] };
            const dataValuesErr = { "dataValues": [] };

            // Lặp qua mỗi phần tử trong dataValues và thực hiện đổi giá trị
            await dataValues.forEach(dataValue => {
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

            // Ghi dataValuesNew vào file JSON mới
            fs.writeFileSync(`dataValuesNew-${org.name}.json`, JSON.stringify(dataValuesNew, null, 2));
            console.log(`Đã lưu dữ liệu mới vào file dataValuesNew-${org.name}.json`);

            // Ghi dataValuesErr vào file JSON mới
            // fs.writeFileSync(`dataValuesErr-${org.name}.json`, JSON.stringify(dataValuesErr, null, 2));
            // console.log(`Đã lưu dữ liệu lỗi vào file dataValuesErr.json`);
            let urlPost = `http://dev.tkyt.vn/nhanluc/api/dataValueSets.json`;
            try {
                const responsePost = await axios.post(urlPost, dataValuesNew, { auth: authentication });
                console.log('Response from server:', responsePost.data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
};



// Gọi hàm main để thực thi
main();
