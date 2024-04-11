const axios = require('axios');
const Excel = require('exceljs');
const fs = require('fs');

const urlBase = `https://kln.tkyt.vn/`;
const authentication = {
  username: `anhth`,
  password: `Csdl2018@)!*`
}

// Biến để lưu trữ tất cả các lỗi
let errors = [];

// Hàm ghi lỗi vào biến errors
function logError(error) {
  if (error.response && error.response.data && error.response.data.response && error.response.data.response.importSummaries) {
      errors.push(error.response.data.response.importSummaries);
  } else {
      console.error('Lỗi không chứa thông tin cụ thể để ghi vào biến errors:', error);
  }
}
// Hàm ghi lỗi từ biến errors vào file JSON
function writeErrorsToFile() {
  const errorData = {
      timestamp: new Date().toISOString(),
      errors: errors
  };
  const errorJson = JSON.stringify(errorData, null, 2);
  fs.writeFile('error.json', errorJson, 'utf8', (err) => {
      if (err) {
          console.error('Ghi lỗi vào file JSON thất bại:', err);
      } else {
          console.log('Tất cả các lỗi đã được ghi vào file error.json');
      }
  });
}

// ID Org, Programs
const idOrg = "bjkQCdZMlcx";
const idProgram = "NAleauPZvIE";

async function getMetaData(idOrg, idProgram) {

  let url = urlBase + `api/trackedEntityInstances.json?ou=${idOrg}&ouMode=CHILDREN&program=${idProgram}&totalPages=true`;
  const urlPost = urlBase + `api/trackedEntityInstances`;
  let response = await axios.get(url, { auth: authentication });
  let totalPage = response.data.pager.pageCount;
  for (let i = 1; i <= totalPage; i++) {
    url = urlBase + `api/trackedEntityInstances.json?ou=${idOrg}&ouMode=CHILDREN&program=${idProgram}&page=${i}`;
    response = await axios.get(url, { auth: authentication });
    let dataTeis = response.data.trackedEntityInstances;
    // console.log(dataTeis);
    const dataTeisChanged = {
      trackedEntityInstances: []
    };

    // Duyệt qua mảng dataTeis để lọc và chỉnh sửa các phần tử
    dataTeis.forEach((element) => {
      const attributeIndex = element.attributes.findIndex(attr => attr.attribute === "JHb1hzseNMg");
      // Kiểm tra xem có tồn tại thuộc tính JHb1hzseNMg trong mảng attributes không
      if (attributeIndex !== -1) {
        const attributeValue = element.attributes[attributeIndex];
        // Kiểm tra độ dài của giá trị thuộc tính JHb1hzseNMg
        if (attributeValue.value.length > 19) {
          // Nếu độ dài lớn hơn 19, cắt chuỗi và chỉ lấy 15 ký tự đầu tiên
          const newBHYT = attributeValue.value.substring(0, 15);
          // Cập nhật giá trị mới cho thuộc tính JHb1hzseNMg
          element.attributes[attributeIndex].value = newBHYT;
          // Thêm phần tử đã chỉnh sửa vào mảng dataTeisChanged.trackedEntityInstances
          dataTeisChanged.trackedEntityInstances.push(element);
        }
      }
    });
    // console.log(dataTeisChanged);
    if (dataTeisChanged.trackedEntityInstances.length > 0) {
      try {
        const response = await axios.post(urlPost, dataTeisChanged, { auth: authentication });
        console.log('Response from server:', response.data.message);
      } catch (error) {
        // Nếu có lỗi, ghi lỗi vào file JSON
        if (error.response && error.response.data && error.response.data.response && error.response.data.response.importSummaries) {
          logError(error);
        } else {
          console.error('Lỗi không chứa thông tin cụ thể để ghi vào file JSON:', error);
        }
      }
    }
    
  }
  writeErrorsToFile();
};
getMetaData(idOrg, idProgram);