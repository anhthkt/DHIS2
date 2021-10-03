const result = require(`dotenv`).config({ path: `${__dirname}/../dhis.env` })

const FormData = require('form-data')
const fs = require('fs')
const axios = require(`axios`)
var zipdir = require('zip-dir');

const baseUrl = [
  //`https://dev.tkyt.vn/lucky/api/apps`,
  `http://daotao.tkyt.vn/kln/api/apps`,
  `http://kln.tkyt.vn/api/apps`


  // `${process.env.urlInstanceKln}/api/32/apps`,
  // `http://172.16.31.96:8524/api/32/apps`
  // `${process.env.urlInstanceBaocao91}/api/apps`,
  // `${process.env.urlInstanceBaocao92}/api/apps`
  // `http://103.124.60.43:8080/api/32/apps`
]

/**
 * Select app import 
 * @appname Chỗ này để tên folder chứa code vào nhé. Thư mục chứa code ngang hàng với file index.js
 * @isOverrideManifest a cứ để default là true nhé
 *                      Cái này là file mô tả ứng dụng trong đó chứa permission của ứng dụng. 
 *                      Ngoài superUser ra thì những người dùng khác muốn nhìn thấy ứng dụng của mình phải vứt thêm permission là tên của authorities trong file manifest này vào
 **/
// importApp(appname = 'p2_kln_customreport')
// importApp(appname = 'p2_core_customreport')
importApp(
  appname = 'ha_ncd_customreport',
  appVersion = '1.0',
  isOverrideManifest = true
  )



async function importApp(appName,appVersion,isOverrideManifest) {
  if (isOverrideManifest) {
    let result = await prepareManifestFile(appName,appVersion);
    if (result.err) {
      console.log(result.msg)
      return
    }
    console.log(result.msg)
  }

  zipdir(`${__dirname}/${appName}`, { saveTo: `${__dirname}/${appName}.zip` }, function (err, buffer) {
    baseUrl.forEach(mUrl => {
      let form = new FormData();
      form.append('file', fs.createReadStream(`${__dirname}/${appName}.zip`), {
        filename: `${appName}.zip`
      });
      axios.create({
        auth: {
          username: 'anhth',
          password: 'Csdl2018@)!*'
        },
        headers: form.getHeaders(),
      }).post(mUrl, form).then(response => {
        console.log(`Status: Uploaded app complete!`, response.config.url, response.status)
        reloadApp()
      }).catch(error => {
        if (error.response) {
          console.log(error.config.url);
        }
        console.log(error.message);
      });
    });
  });
}

function reloadApp() {
  console.log('Updating list app...')
  let postData = new FormData();
  postData.append('appReload', 'true');
  axios.post(`http://daotao.tkyt.vn/kln/api/maintenance`, postData, {
    headers: postData.getHeaders(),
    auth: {
      username: 'anhth',
      password: 'Csdl2018@)!*'
    }
  }).then(response => {
    console.log('--------- Success_UPDATE_LIST_APP --------')
  }).catch(e => {
    console.log(`❌ERROR: ${e}`)
  });
}

function prepareManifestFile(appName,appVersion) {
  const content = {
    "version": `${appVersion}`,
    "name": `${appName}`,
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
      `${appName.toUpperCase()}`
    ]
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/${appName}/manifest.webapp`, JSON.stringify(content), function (err) {
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