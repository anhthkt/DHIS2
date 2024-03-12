const fs = require('fs');
const axios = require('axios');

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
const jsonFilePath = 'events.json';
let i = 0;
// Đọc dữ liệu từ tập tin JSON
fs.readFile(jsonFilePath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Đã xảy ra lỗi khi đọc tập tin JSON:', err);
        return;
    }

    // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript
    const jsonData = JSON.parse(data);

    // Lặp qua mỗi sự kiện trong mảng "events"
    for (const event of jsonData.events) {
        i++;
        const createdDate = new Date(event.created);
        const year = createdDate.getFullYear();
        const month = String(createdDate.getMonth() + 1).padStart(2, '0');
        const date = String(createdDate.getDate()).padStart(2, '0');
        const createdDateString = `${year}-${month}-${date}`;
        // Kiểm tra xem trong mảng "dataValues" đã có "dataElement": "fcbbx6y83mn" chưa
        const existingDataElement = event.dataValues.find(dataValue => dataValue.dataElement === "fcbbx6y83mn");

        // Nếu "dataElement": "fcbbx6y83mn" chưa tồn tại, thêm nó với "value" là ngày tháng năm của "created"
        if (!existingDataElement) {
            event.dataValues.push({
                "dataElement": "fcbbx6y83mn",
                "value": createdDateString
            });
            let dataPost = { "events": [] }
            dataPost.events.push(event);
            console.log(i, dataPost.events[0].event);
            await processPostRequest(dataPost);
        } else {
            // Nếu "dataElement": "fcbbx6y83mn" đã tồn tại, cập nhật "value" thành ngày tháng năm của "create"
            // existingDataElement.value = createdDateString;
        }
        // let dataPost = { "events": [] }
        // dataPost.events.push(event);
        // console.log(dataPost.events[0].event, i);
        // await processPostRequest(dataPost);
    };

    // Ghi lại dữ liệu đã được cập nhật vào tập tin JSON
    // fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), err => {
    //     if (err) {
    //         console.error('Đã xảy ra lỗi khi ghi lại tập tin JSON:', err);
    //         return;
    //     }
    //     console.log('Đã cập nhật thành công dữ liệu vào tập tin JSON.');
    // });
});
