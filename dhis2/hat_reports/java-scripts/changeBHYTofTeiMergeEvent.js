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
async function getTeiInfoById(idOrg, idProgram, id) {
  url = urlBase + `api/trackedEntityInstances.json?ou=${idOrg}&ouMode=ACCESSIBLE&program=${idProgram}&trackedEntityInstance=${id}&paging=false&fields=*,enrollments[*],programOwners[*]`;
  response = await axios.get(url, { auth: authentication });
  return dataTei = response.data.trackedEntityInstances;
}

// API get Tei By BHYT
async function getTeiInfoByBHYT(idOrg, idProgram, bhyt) {
  url = urlBase + `api/trackedEntityInstances.json?ou=${idOrg}&ouMode=ACCESSIBLE&program=${idProgram}&attribute=JHb1hzseNMg:EQ:${bhyt}&paging=false&fields=*,programOwners[*],enrollments[*]`;
  response = await axios.get(url, { auth: authentication });
  return dataTei = response.data.trackedEntityInstances;
}

// Merge Data
function mergeTEIData(response1, response2) {
  // Tạo một tập hợp các program đã có trong response2
  const existingPrograms = new Set(
    response2.programOwners?.map(owner => owner.program) || []
  );

  // Duyệt qua từng programOwner trong response1
  response1.programOwners?.forEach(owner => {
    if (!existingPrograms.has(owner.program)) {
      // Thêm programOwner vào response2 nếu chương trình chưa có
      response2.programOwners = response2.programOwners || [];
      response2.programOwners.push(owner);
      // Cập nhật tập hợp các program
      existingPrograms.add(owner.program);
    }
  });

  // Thêm tất cả enrollments từ response1 vào response2
  response2.enrollments = [...(response2.enrollments || []), ...(response1.enrollments || [])];

  return response2;
}

// ID Org, Programs
const idOrg = "upKDIj3LE9R"; // Ngũ Hành Sơn Đà Nẵng
const idProgram = "NAleauPZvIE";

async function mergeTeis(idOrg, idProgram) {
  const data = await fs.readFile('./teis.json', 'utf8');
  const teis = JSON.parse(data);
  console.log(teis);
  for (let i = 0; i < teis.length; i++) {
    let response1 = await getTeiInfoById(idOrg, idProgram, teis[i].id);
    let response2 = await getTeiInfoById(idOrg, idProgram, teis[i].id);
    console.log(response2);
    mergeTEIData(response1, response2);
    console.log(response2);
  }

  writeErrorsToFile();
};
mergeTeis(idOrg, idProgram);