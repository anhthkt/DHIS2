const fs = require('fs');
const XLSX = require('xlsx');
const cheerio = require('cheerio');
const axios = require('axios');


const urlBase = `http://dev.tkyt.vn/nhanluc`;
const authentication = {
    username: `anhth`,
    password: `Csdl2018@)!*`
}

function writeFile(dataSet) {
    // Đọc nội dung HTML từ file hoặc chuỗi HTML
    // const htmlContent = fs.readFileSync('table.html', 'utf8');

    const htmlContent = dataSet.dataEntryForm.htmlCode;
    // Load nội dung HTML vào Cheerio
    const $ = cheerio.load(htmlContent);

    // Tạo một mảng để lưu trữ dữ liệu từ bảng HTML
    let data = [];

    // Lặp qua mỗi phần tử <tr> trong bảng HTML
    $('table tr').each((i, row) => {
        let rowData = [];

        // Lặp qua mỗi ô <td> trong mỗi hàng <tr>
        $(row).find('td').each((j, cell) => {
            // Kiểm tra xem ô <td> có chứa thẻ <input> hay không
            const inputElement = $(cell).find('input');
            if (inputElement.length > 0) {
                // Nếu có, lấy giá trị của thuộc tính "id" của thẻ <input>
                rowData.push(inputElement.attr('id').trim());
            } else {
                // Nếu không, lấy văn bản từ ô <td> và đẩy vào mảng dữ liệu của hàng
                rowData.push($(cell).text().trim());
            }
        });

        // Đẩy mảng dữ liệu của hàng vào mảng dữ liệu chính
        data.push(rowData);
    });
    return data;
}

async function main() {
    const path = `/api/dataSets.json?fields=id,name,dataEntryForm[*]&paging=false&filter=id:in:[D9xLxq2LP7T]`;
    url = urlBase + path;
    let response = await axios.get(url, { auth: authentication });
    // console.log(response);
    // Tạo một Workbook mới
    const wb = XLSX.utils.book_new();

    response.data.dataSets.forEach(dataSet => {
        console.log(dataSet.dataEntryForm.htmlCode);
        let data = writeFile(dataSet);
        // Tạo một WorkSheet mới từ dữ liệu
        const ws = XLSX.utils.aoa_to_sheet(data);

        // Thêm WorkSheet vào Workbook
        XLSX.utils.book_append_sheet(wb, ws, dataSet.id);

        // Ghi Workbook vào một tệp Excel
        const excelFileName = 'table.xlsx';
        XLSX.writeFile(wb, excelFileName);

        console.log(`Đã chuyển đổi và ghi vào file ${excelFileName}`);
    });
}

main();


