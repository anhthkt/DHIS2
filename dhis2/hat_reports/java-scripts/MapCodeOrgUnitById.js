const axios = require('axios');
const fs = require('fs').promises;


const authentication = {
  username: `anhth`,
  password: `Csdl2018@)!*`
}
const urlNL = 'https://nhanluc.tkyt.vn';
const urlBC = 'https://kln.tkyt.vn';

// Địa chỉ API endpoint để cập nhật metadata
const updateMetadataApiUrl = urlBC + '/api/metadata.json';

// Thêm hoặc cập nhật giá trị trường 'code'
async function updateCodeField(idOrgArray) {
  // Địa chỉ API endpoint
  let urlIdOrgArrBC = urlBC + `/api/organisationUnits.json?fields=id&filter=path:ilike:${idOrgArray}&filter=level:eq:4&paging=false`;


  //Get idOrgArray trên BC
  let responseIdOrgArr = await axios.get(urlIdOrgArrBC, { auth: authentication });
  let idOrgArr = responseIdOrgArr.data.organisationUnits
  // console.log(idOrgArr);

  for (let idorg of idOrgArr) {
    console.log(`Đang thực hiện đơn vị: ${idorg.id}`);
    // Địa chỉ API endpoint
    let apiUrlNL = urlNL + `/api/organisationUnits.json?fields=code&filter=id:eq:${idorg.id}&paging=false`;
    let apiUrlBC = urlBC + `/api/organisationUnits.json?fields=:owner&filter=id:eq:${idorg.id}&paging=false`;
    try {
      // Check thông tin đơn vị từ API trên NL
      let responseNL = await axios.get(apiUrlNL, { auth: authentication });
      // Check if responseNL has a value
      if (!responseNL.data || !responseNL.data.organisationUnits || responseNL.data.organisationUnits.length === 0) {
        // console.error(`Không có giá trị ${idorg} từ API trên NL.`);
        let logMessage = `Không có giá trị ${idorg.id} trên NL\n`;
        await fs.appendFile(`./updateLog-${idOrgArray}.txt`, logMessage);
        // return; // Exit function if there is no value
      } else {

        let codeNL = responseNL.data.organisationUnits[0].code;

        // Lấy thông tin đơn vị từ API trên BC
        let responseBC = await axios.get(apiUrlBC, { auth: authentication });
        let organisationUnit = responseBC.data;

        // Kiểm tra xem có giá trị của trường 'code' hay không
        if (!organisationUnit.organisationUnits[0].code) {
          // Nếu không có, thêm giá trị 'code': codeNL
          organisationUnit.organisationUnits[0].code = codeNL;
        } else {
          // Nếu có, sửa giá trị thành codeNL
          if (organisationUnit.organisationUnits[0].code != codeNL) {
            organisationUnit.organisationUnits[0].code = codeNL;
            // Thực hiện yêu cầu PUT để cập nhật metadata
            await axios.post(updateMetadataApiUrl, JSON.stringify(organisationUnit), {
              headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
              },
              maxBodyLength: 104857600, //100mb
              maxContentLength: 104857600, //100mb
              timeout: 1200000,
              // httpsAgent: new https.Agent({ keepAlive: true }),
              emulateJSON: true,
              auth: authentication
            })
            // Ghi log ra file text khi cập nhật thành công
            let logMessage = `Cập nhật thành công: ${JSON.stringify(organisationUnit.organisationUnits[0].id)} | ${JSON.stringify(organisationUnit.organisationUnits[0].code)} | ${JSON.stringify(organisationUnit.organisationUnits[0].name)} | ${JSON.stringify(organisationUnit.organisationUnits[0].path)}\n`;
            await fs.appendFile(`updateLog-${idOrgArray}.txt`, logMessage);
          }
        }  
        // console.log(res.data);
      }
    }

    catch (error) {
      let logMessage = `Lỗi khi cập nhật: ${idorg.id}\n`;
      await fs.appendFile(`updateLog-${idOrgArray}.txt`, logMessage);
      console.error('Lỗi khi cập nhật:', error.message);
    }
  }
}
// Gọi hàm để thực hiện cập nhật
let idOrgArray = 'uglfBEIDXHY'; //Tuyen Quang
updateCodeField(idOrgArray);
