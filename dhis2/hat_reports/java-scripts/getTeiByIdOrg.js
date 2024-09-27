const axios = require('axios');
const Excel = require('exceljs');

const urlBase = `https://kln.tkyt.vn/`;
const authentication = {
  username: `anhth`,
  password: `Csdl2018@)!*`
}

// ID Benh-Nhan, Events, Programs
const idOrg = "Y2AZV0a1Oyj"; //Dak Lak


async function getMetaData(idOrg) {

  const workbook = new Excel.Workbook();

  const wsTei = workbook.addWorksheet('Benh-Nhan');

  wsTei.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Tên', key: 'name', width: 30 },
    { header: 'Giới tính', key: 'sex', width: 20 },
    { header: 'Năm sinh', key: 'birthDate', width: 20 },
    { header: 'Mã BHYT', key: 'bhyt', width: 20 },
    { header: 'Số CMT/CCCD', key: 'cmt', width: 20 },
    { header: 'Địa chỉ', key: 'add', width: 20 },
    { header: 'Xã/Phường/Thị trấn', key: 'add1', width: 20 },
    { header: 'Nghề nghiệp', key: 'job', width: 20 },
    { header: 'SĐT', key: 'phone', width: 20 }
  ];

  const dataTeis = new Set();
  // const programs = ["NAleauPZvIE", "a7arqsOKzsr", "gPWs4FRX9dj", "WmEGO8Ipykm", "XrC0U6IV4W0"]
  const programs = ["NAleauPZvIE"]
  for (const program of programs) {
    let url = urlBase + `api/trackedEntityInstances.json?ou=${idOrg}&ouMode=CHILDREN&program=${program}&paging=false`;
    try {
      const response = await axios.get(url, { auth: authentication });
      if (response.data.trackedEntityInstances.length > 0) {
        response.data.trackedEntityInstances.forEach(row => dataTeis.add(row));
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
    }
  }
  const dataArray = Array.from(dataTeis);
  let set = new Set();
  let uniqueArr = [];

  dataArray.forEach(subArr => {
    let key = subArr.trackedEntityInstance;
    if (!set.has(key)) { // Kiểm tra xem chuỗi đã tồn tại trong tập hợp hay chưa
      set.add(key); // Thêm chuỗi vào tập hợp
      uniqueArr.push(subArr); // Thêm mảng con vào mảng kết quả
    }
  });

  uniqueArr.forEach((element, index) => {
    wsTei.addRow({
      stt: index + 1,
      id: element.trackedEntityInstance,
      name: element.attributes.find(attr => attr.attribute === 'xBoLC0aruyJ')?.value || '',
      sex: element.attributes.find(attr => attr.attribute === 'rwreLO34Xg7')?.value || '',
      birthDate: element.attributes.find(attr => attr.attribute === 'C7USC9MC8yH')?.value || '',
      bhyt: element.attributes.find(attr => attr.attribute === 'JHb1hzseNMg')?.value || '',
      cmt: element.attributes.find(attr => attr.attribute === 'ZQ93P672wQR')?.value || '',
      add: element.attributes.find(attr => attr.attribute === 'Bxp1Lhr8ZeN')?.value || '',
      add1: element.attributes.find(attr => attr.attribute === 'Gy1fkmBZpFk')?.value || '',
      job: element.attributes.find(attr => attr.attribute === 'L4djJU4gMyb')?.value || '',
      phone: element.attributes.find(attr => attr.attribute === 'mZbgWADLTKY')?.value || ''
    });
  });



  await workbook.xlsx.writeFile(`TTC-Benh-Nhan-${idOrg}.xlsx`);

}

getMetaData(idOrg);