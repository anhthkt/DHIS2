const axios = require('axios');
const Excel = require('exceljs');
const fs = require('fs').promises;

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

// API get Tei By ID
async function getTeiInfoById(id) {
  url = urlBase + `api/trackedEntityInstances/${id}.json?fields=*&paging=false`;
  response = await axios.get(url, { auth: authentication });
  return dataTei = response;
}

// API get Tei By BHYT
async function getTeiInfoByBHYT(idOrg, idProgram, bhyt) {
  url = urlBase + `api/trackedEntityInstances.json?ou=${idOrg}&ouMode=ACCESSIBLE&program=${idProgram}&attribute=JHb1hzseNMg:EQ:${bhyt}&paging=false&fields=enrollments[program,enrollment,trackedEntityInstance]`;
  response = await axios.get(url, { auth: authentication });
  return dataTei = response.data;
}

// API post Enroll Tei
async function enrollTei(payload) {
  url = urlBase + `api/enrollments`;
  response = await axios.post(url, { auth: authentication });
  return dataTei = response.data;
}

// ID Org, Programs
const idOrg = "upKDIj3LE9R"; // Ngũ Hành Sơn Đà Nẵng
const idProgram = "NAleauPZvIE";

async function exportEvents(idOrg, idProgram) {
  const data = await fs.readFile('./teis.json', 'utf8');
  const teis = JSON.parse(data);
  // console.log(teis);

  for (let i = 0; i < teis.length; i++) {
    console.log(teis[i]);
    let response = await getTeiInfoById(teis[i].id);
    // console.log(response.data.enrollments);
    let teides = await getTeiInfoByBHYT(idOrg, idProgram, teis[i].bhyt);
    // console.log(teides)

    // if (response.data.enrollments.length > 0 && teides.trackedEntityInstances.length > 0) {
      if (teides.trackedEntityInstances.length > 0) {
      // console.log(JSON.stringify(teides.trackedEntityInstances[0].enrollments));
      let payload = { "enrollments": [] };
      let enrollSrc = response.data.enrollments;
      let enrollDes = teides.trackedEntityInstances[0].enrollments;
      // console.log(JSON.stringify(enrollSrc));
      // console.log(JSON.stringify(enrollDes));

      let checkDeleteTei = 0;
      let teiDelete = enrollSrc[0].trackedEntityInstance
      enrollSrc.forEach(enroll => {
        // Tìm đối tượng tương ứng với chương trình trong enrollDes
        let desEntry = enrollDes.find(des => des.program === enroll.program);
        if (enroll.events.length > 0) {
          checkDeleteTei = 1;
        }
        if (desEntry) {
          // Nếu chương trình có trong enrollDes, thay giá trị của enrollment 
          enroll.enrollment = desEntry.enrollment;
          enroll.trackedEntityInstance = enrollDes[0].trackedEntityInstance;

          // Thay giá trị của enrollment trong các events tương ứng
          enroll.events.forEach(event => {
            event.enrollment = desEntry.enrollment;
            event.trackedEntityInstance = enrollDes[0].trackedEntityInstance;
          });
          payload.enrollments.push(enroll);
        } else {
          // Nếu chương trình không có trong enrollDes, xóa enrollment và các events
          enroll.enrollment = null;
          enroll.trackedEntityInstance = enrollDes[0].trackedEntityInstance;
          enroll.events.forEach(event => {
            event.enrollment = null;
            event.trackedEntityInstance = enrollDes[0].trackedEntityInstance;
          });
          payload.enrollments.push(enroll);
        }
      });

      if (checkDeleteTei == 0) {
        await axios({
          url: `https://kln.tkyt.vn/api/trackedEntityInstances/${teiDelete}`,
          method: 'DELETE',
          auth: {
            username: 'anhth',
            password: 'Csdl2018@)!*'
          }
        });
        console.log(`Đã xóa trackedEntityInstance với TEI: ${teiDelete}`);
      } else {
        // Ghi dữ liệu ra file enroll.json
        fs.writeFile('enroll.json', JSON.stringify(payload, null, 2), (err) => {
          if (err) {
            console.error('Lỗi khi ghi file:', err);
          } else {
            console.log('Dữ liệu đã được ghi thành công vào enroll.json');
          }
        });
        // console.log(JSON.stringify(payload));
        const urlPost = urlBase + `api/enrollments`;
        let res = await axios.post(urlPost, payload, { auth: authentication });
        console.log(res);
      }
    }
  }
};
exportEvents(idOrg, idProgram);