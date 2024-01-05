const axios = require('axios');
const fs = require('fs').promises;


const authentication = {
  username: `anhth`,
  password: `Csdl2018@)!*`
}
const urlNL = 'http://dev.tkyt.vn/nhanluc';
const urlBC = 'https://baocao.tkyt.vn';

// Địa chỉ API endpoint để cập nhật metadata
const updateMetadataApiUrl = urlBC + '/api/metadata.json';

// Thêm hoặc cập nhật giá trị trường 'code'
async function updateCodeField(idOrgArray) {
  // Địa chỉ API endpoint
  let urlIdOrgArrBC = urlBC + `/api/organisationUnits.json?fields=id&filter=path:ilike:${idOrgArray}&filter=level:eq:4&pageSize=5000&page=3`;


  //Get idOrgArray trên BC
  let responseIdOrgArr = await axios.get(urlIdOrgArrBC, { auth: authentication });
  let idOrgArr = responseIdOrgArr.data.organisationUnits
  // let idOrgArr=[{"id": "fi6MjthhuHC"},{"id": "xSMqmMfEtRB"},{"id": "qY4SSRbzUDz"},{"id": "kakG9Ti2sHa"},{"id": "oyOvfE9hrTf"},{"id": "Tf4iBKzoKJN"},{"id": "cMyMjCoPmET"},{"id": "VkrLc8qToiA"},{"id": "RpkkZH5CwZz"},{"id": "Nz4Q6AHgren"},{"id": "XmaUIvpPSTR"},{"id": "UqtowXgfazS"},{"id": "h3wMzrRzyjo"},{"id": "bHXfX2YO5dJ"},{"id": "hnk0LZh40oH"},{"id": "khmD6em8bi5"},{"id": "LrZbz01h32B"},{"id": "CeIMzxmQjvG"},{"id": "dmus68RDOb5"},{"id": "qUICinYkMos"},{"id": "K51ZGfz4gND"},{"id": "plxWxXXlYFh"},{"id": "zZAGLBvKhYI"},{"id": "GUL0G7dEEPO"},{"id": "xu9V80qeKKV"},{"id": "z6srWrdoCOT"},{"id": "YYBeU4JovsH"},{"id": "EFusJ47a5yt"},{"id": "EebQIDzd3e1"},{"id": "bdd3q8Szbbx"},{"id": "CJ4etRag78H"},{"id": "OVwND1gT06j"},{"id": "oaoOCA4QG0L"},{"id": "wo9v9o2W1pH"},{"id": "Ah4aNp6LevO"},{"id": "ZxhbwOSepFx"},{"id": "m6p7bj5Yzb2"},{"id": "LtWvk1KvnOV"},{"id": "wtPUTohJPfr"},{"id": "UCoaK0rLSxR"},{"id": "JO2OdRyjtpm"},{"id": "BdDEY45dftJ"},{"id": "rfX0RNLoAB6"},{"id": "IbfCgxPCgNC"},{"id": "jLuN8PLzZ5D"},{"id": "pDE0OQdlZbI"},{"id": "xGY7mbFxCo2"},{"id": "L3YjnphRa6h"},{"id": "tkQp3soRRHi"},{"id": "wQlqilHDKaC"},{"id": "l0C0Rc7YoCx"},{"id": "OZkv7c1fKgK"},{"id": "R6qTvc8qI3Y"},{"id": "WwEY51tJ8FZ"},{"id": "mIFk4KwOXCP"},{"id": "EheTSoK8T37"},{"id": "h5YWuVkNlWQ"},{"id": "tBLDeDd9ebV"},{"id": "mbKqcEvgEL4"},{"id": "sGdNvFaIJlV"},{"id": "TZ0oOiP6E2T"},{"id": "DOulrWJ7ZqQ"},{"id": "QgJ0RzK5UnB"},{"id": "xwibwP1I1bU"},{"id": "qskvPd1JKCx"},{"id": "dBYF7gUHKmd"},{"id": "dssVfAlLGak"},{"id": "e2VI3D0dAE0"},{"id": "I8UpH6X78vr"},{"id": "NSnCcEH7XfW"},{"id": "cA4qDPz0lqZ"},{"id": "HsjaIxQsbp7"},{"id": "pR8GfE9Zs7A"},{"id": "n3zs8tbBiG3"},{"id": "R8jJa7e5MGX"},{"id": "qH8NbNa2wNM"},{"id": "KdN5YLLXsNF"},{"id": "NzDK2zGPI6V"},{"id": "n1zFRJl85Ua"},{"id": "frdIdp6Foq4"},{"id": "eTpe3lVZdvZ"},{"id": "TRzXSePpijC"},{"id": "NF0Aec6jUSa"},{"id": "pzY2zkHEnDT"},{"id": "lsstHpbiyfz"}]
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
          organisationUnit.organisationUnits[0].code = codeNL;
        }

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
let idOrgArray = 'LOdti1gATwC'; //BN
 updateCodeField(idOrgArray);
