process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// const result = require(`dotenv`).config({ path: `${__dirname}/../dhis.env` })

const FormData = require('form-data')
const fs = require('fs')
const axios = require(`axios`)
var zipdir = require('zip-dir');

const baseUrl = [
  // `${process.env.urlInstanceDaotao}/api/apps`,

  // `${process.env.urlInstanceDaotaoKln}/api/apps`,
  `http://dieuhanh1.ehealth.gov.vn/api/apps`,
  // `${process.env.urlInstanceDevLucky}/api/apps`,
  // `https://dev.tkyt.vn/lucky/api/apps`,
  // `http://172.16.31.96:8524/api/32/apps`

  // `${process.env.urlInstanceBaocao91}/api/apps`,
  // `${process.env.urlInstanceBaocao92}/api/apps`,
  // `http://103.124.60.43:8080/api/32/apps`
]

/**
 * Select app import 
 * @folderName Chỗ này để tên folder chứa code vào nhé. Thư mục chứa code ngang hàng với file index.js
 * @overrideManifest a cứ để default là true nhé
 *                      Cái này là file mô tả ứng dụng trong đó chứa permission của ứng dụng. 
 *                      Ngoài superUser ra thì những người dùng khác muốn nhìn thấy ứng dụng của mình phải vứt thêm permission là tên của authorities trong file manifest này vào
 **/
const auth =  {
  username: "anhth",
  password: "CsDl2018@)!*"
};

importApp({
  isUpload: true,
  folderName: 'build'
})


async function importApp({ isUpload, folderName, overrideManifest }) {

  if (!isUpload) {
    return;
  }
  // if (overrideManifest) {
  //   let result = await prepareManifestFile({ folderName, ...overrideManifest });
  //   if (result.err) {
  //     console.log(result.msg)
  //     return
  //   }
  //   console.log(result.msg)
  // }

  zipdir(`${__dirname}/${folderName}`, { saveTo: `${__dirname}/${folderName}.zip` }, function (err, buffer) {
    baseUrl.forEach(mUrl => {
      let form = new FormData();
      form.append('file', fs.createReadStream(`${__dirname}/${folderName}.zip`), {
        filename: `${folderName}.zip`
      });
      axios.create({
        auth,
        headers: form.getHeaders(),
      }).post(mUrl, form).then(response => {
        console.log(`${response.config.url}\nStatus: Uploaded app(${folderName}) complete!`, response.status)
        reloadApp(mUrl)

      }).catch(error => {
        if (error.response) {
          console.log(error.config.url);
        }
        console.log(error.message);
      });
    });
  });
}

function reloadApp(mUrl) {
  console.log('Updating list app...')
  let postData = new FormData();
  postData.append('appReload', 'true');
  axios.post(`${mUrl.split('/api')[0]}/api/maintenance`, postData, {
    headers: postData.getHeaders(),
    auth
  }).then(response => {
    console.log('--------- Success_UPDATE_LIST_APP --------')
  }).catch(e => {
    console.log(`❌ERROR: ${e}`)
  });
}

function prepareManifestFile({ appName, folderName, appVersion, authorities }) {
  const content = {
    "version": `${appVersion}`,
    "name": `${appName ? appName : folderName}`,
    "description": "baocao.tkyt.vn/resource",
    "appType": "RESOURCE",
    "developer": {
      "name": "p2ild",
      "url": ""
    },
    "default_locale": "en",
    "activities": {
      "dhis": {
        "href": "*"
      }
    },
    "authorities": [
      `${authorities ? authorities : appName.toUpperCase()}`
    ]
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/${folderName}/manifest.webapp`, JSON.stringify(content), function (err) {
      if (err) resolve({
        'err': true,
        'msg': `manifest: ${err}`
      });

      resolve(
        {
          'msg': `manifest: inject complete!`
        })
    });
  })
}