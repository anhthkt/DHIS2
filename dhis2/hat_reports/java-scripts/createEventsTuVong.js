const fs = require('fs');
const XLSX = require('xlsx');

function createJson(data) {
    let event ={
        "status": "COMPLETED",
        "program": "uX3pS8aZHN2",
        "programStage": "qgYbmBm4kx8",
        "enrollment": "u3alfNGM9EB",
        "orgUnit": `${data[2]}`,
        "followup": false,
        "deleted": false,
        "attributeOptionCombo": "HllvX50cXC0",
        "attributeCategoryOptions": "xYerKDKCefk",
        "eventDate": "2024-04-04T00:00:00.000",
        "dataValues": [
            {
                "dataElement": "EfvY4Ig7n6n",
                "value": "2024-04-04"
            },
            {
                "dataElement": "VKt28EykKgX",
                "value": "1"
            },
            {
                "dataElement": "v8xMS84OMhc",
                "value": "2024-04-04"
            },
            {
                "dataElement": "nsMLAhezeHp",
                "value": "1"
            },
            {
                "dataElement": "zE55pkddJ0D",
                "value": "2024-04-04"
            },
            {
                "dataElement": "f0wPk4WKCmU",
                "value": "VŨ THỊ MAY"
            },
            {
                "dataElement": "iEz9szT8t1L",
                "value": "R54"
            },
            {
                "dataElement": "e9Fi3vqopEy",
                "value": "true"
            },
            {
                "dataElement": "f3vMvXFidOr",
                "value": "Lao phổi"
            },
            {
                "dataElement": "TGWnfY7u1hs",
                "value": "2024-04-04"
            },
            {
                "dataElement": "xFuCxD7I7dm",
                "value": "Thạch Vũ Thiện"
            },
            {
                "dataElement": "KGZANMISs5K",
                "value": "Bệnh viện huyện"
            },
            {
                "dataElement": "TNAffIjJ5fu",
                "value": "0365973289"
            },
            {
                "dataElement": "O24nNmlRpxX",
                "value": "F"
            },
            {
                "dataElement": "ONipRLfjDrQ",
                "value": "1"
            },
            {
                "dataElement": "W636zm2n4bX",
                "value": `${data[8]}`
            },
            {
                "dataElement": "t7NHqtYqncz",
                "value": "Suy yếu tuổi già tự nhiên"
            },
            {
                "dataElement": "ksXGblaQZHL",
                "value": "true"
            },
            {
                "dataElement": "fcbbx6y83mn",
                "value": "2024-04-04"
            },
            {
                "dataElement": "CCLebncCrqd",
                "value": "Anh chồng"
            },
            {
                "dataElement": "ohCmJ9ZWHot",
                "value": "UBND Xã"
            },
            {
                "dataElement": "ATSqSaZnepy",
                "value": "true"
            },
            {
                "dataElement": "amfixvUrTEW",
                "value": "1949-02-08"
            },
            {
                "dataElement": "apLYj7N7izK",
                "value": "02"
            },
            {
                "dataElement": "j3Yo9Dl5wN5",
                "value": "2024-04-04"
            },
            {
                "dataElement": "vshLwzSkK1a",
                "value": "Già"
            },
            {
                "dataElement": "RRoodjfWLoX",
                "value": "Xóm Đồi"
            },
            {
                "dataElement": "v32efSNbncR",
                "value": "65"
            },
            {
                "dataElement": "vwczPFDKv9X",
                "value": "A15-A16"
            },
            {
                "dataElement": "tfXeGE4u5ok",
                "value": "BVH"
            }
        ]
    }
    

    return event;
}
// Hàm đọc dữ liệu từ file Excel
function readDataFromExcel() {
    const filePath = "DSTuVong.xlsx"
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    let result = { "events": [] }
    for (let i = 1; i < data.length; i++) {
        result.events.push(createJson(data[i]))
    }
    console.log(result)
    fs.writeFileSync(`output.json`, JSON.stringify(result, null, 2));
    console.log(`Đã tạo file JSON thành công`);
}

readDataFromExcel();