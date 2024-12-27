const _axios = require("axios");
const _lodash = require("lodash");
const dotenv = require("dotenv");
const ExcelJS = require('exceljs');

const fs = require("fs");

dotenv.config()
//CONSTANT  
// const baseUrl = `http://nhanluc.tkyt.vn`;
// const baseUrl = `http://dev.tkyt.vn/nhanluc`;
const baseUrl = `https://baocao.tkyt.vn`;
// const baseUrl = `http://103.124.60.92/baocao`;
// const baseUrl = `http://nhanluc.tkyt.vn`;
const orgs = [
    //   {
    //     "name": "Việt Nam",
    //     "id": "LOdti1gATwC"
    //   }
    //   {
    //     "name": "An Giang",
    //     "id": "uAsdFJIqElU"
    //   },
    //   {
    //     "name": "Bà Rịa - Vũng Tàu",
    //     "id": "BHQmfUcKfm1"
    //   },
    //   {
    //     "name": "Bình Dương",
    //     "id": "FSr4tndBddw"
    //   },
    //   {
    //     "name": "Bình Phước",
    //     "id": "ECXvzGHClbu"
    //   },
    //   {
    //     "name": "Bình Thuận",
    //     "id": "aheT3Akf5kM"
    //   },
    //   {
    //     "name": "Bình Định",
    //     "id": "TqoasbvLrM5"
    //   },
    //   {
    //     "name": "Bạc Liêu",
    //     "id": "g2S76y4JDTo"
    //   },
    //   {
    //     "name": "Bắc Giang",
    //     "id": "bvuFKVVCZxg"
    //   },
    //   {
    //     "name": "Bắc Kạn",
    //     "id": "X9S3sMrxHkI"
    //   },
      // {
      //   "name": "Bắc Ninh",
      //   "id": "kxJqRG6smMB"
      // },
    //   {
    //     "name": "Bến Tre",
    //     "id": "uf7ebucWAG0"
    //   },
    //   {
    //     "name": "Cao Bằng",
    //     "id": "rnDtB1wpoGc"
    //   },
    //   {
    //     "name": "Cà Mau",
    //     "id": "tkjhRCAQn8b"
    //   },
    //   {
    //     "name": "Các đơn vị thuộc Bộ",
    //     "id": "rY8ZzbdZcim"
    //   },
    //   {
    //     "name": "Các đơn vị trực thuộc Bộ",
    //     "id": "ISsmukUNfU8"
    //   }
    //   {
    //     "name": "Cần Thơ",
    //     "id": "OQ3zNIHUm6b"
    //   },
      // {
      //   "name": "Gia Lai",
      //   "id": "lXnhf8MolUv"
      // },
    //   {
    //     "name": "Hà Giang",
    //     "id": "nmijk75Nfap"
    //   },
    //   {
    //     "name": "Hà Nam",
    //     "id": "Ysn2ITT5OZR"
    //   },
    //   {
    //     "name": "Hà Nội",
    //     "id": "kyTR47jtla2"
    //   },
    //   {
    //     "name": "Hà Tĩnh",
    //     "id": "rVwEOBkBMc5"
    //   },
    //   {
    //     "name": "Hòa Bình",
    //     "id": "HKWxMJZWw2y"
    //   },
    //   {
    //     "name": "Hưng Yên",
    //     "id": "WOzUSf72GLJ"
    //   },
    //   {
    //     "name": "Hải Dương",
    //     "id": "ZDnpYf8xF3N"
    //   },
    //   {
    //     "name": "Hải Phòng",
    //     "id": "jdW4qKTHtRd"
    //   },
    //   {
    //     "name": "Hậu Giang",
    //     "id": "e3WipXxPCgj"
    //   },
    //   {
    //     "name": "Hồ Chí Minh",
    //     "id": "oVBHhZ43yPD"
    //   },
    //   {
    //     "name": "Khánh Hòa",
    //     "id": "xs3U9jOo6T0"
    //   },
    //   {
    //     "name": "Kiên Giang",
    //     "id": "pbBzw7Mxdcp"
    //   },
      // {
      //   "name": "Kon Tum",
      //   "id": "wewvAuC7kVe"
      // },
      // {
      //   "name": "Lai Châu",
      //   "id": "f16CpwI7Z8b"
      // },
    //   {
    //     "name": "Long An",
    //     "id": "vFyCX3tmIlN"
    //   },
      // {
      //   "name": "Lào Cai",
      //   "id": "Loz5sNNUEKt"
      // },
      // {
      //   "name": "Lâm Đồng",
      //   "id": "EStgnLIUVcQ"
      // },
    //   {
    //     "name": "Lạng Sơn",
    //     "id": "VjdV70J3HnU"
    //   },
    //   {
    //     "name": "Nam Định",
    //     "id": "tAGHn8IltiO"
      // },
      {
        "name": "Nghệ An",
        "id": "ZJAerHIZ8Ch"
      },
    //   {
    //     "name": "Ninh Bình",
    //     "id": "ptFYxVC01Dh"
    //   },
    //   {
    //     "name": "Ninh Thuận",
    //     "id": "oHhDOTe7fB3"
    //   },
    //   {
    //     "name": "Phú Thọ",
    //     "id": "Z7CRWOY8WZM"
    //   },
    //   {
    //     "name": "Phú Yên",
    //     "id": "jpN36u4t33g"
    //   },
    //   {
    //     "name": "Quảng Bình",
    //     "id": "m7LXwFuxtUy"
    //   }
    //   {
    //     "name": "Quảng Nam",
    //     "id": "W449B0OhNyD"
    //   },
    //   {
    //     "name": "Quảng Ngãi",
    //     "id": "T6PENxhvy8Z"
    //   },
    //   {
    //     "name": "Quảng Ninh",
    //     "id": "LNFIrnLxCxk"
    //   },
    //   {
    //     "name": "Quảng Trị",
    //     "id": "LaCv5lKNIBi"
    //   },
    //   {
    //     "name": "Sóc Trăng",
    //     "id": "ArAFMKW35CK"
    //   },
      // {
      //   "name": "Sơn La",
      //   "id": "pajSJ8hWr1F"
      // },
    //   {
    //     "name": "Thanh Hóa",
    //     "id": "KbhAlx7J8c7"
    //   },
      // {
      //   "name": "Thái Bình",
      //   "id": "ZF5pyHp7GUK"
      // },
      // {
      //   "name": "Thái Nguyên",
      //   "id": "d5GgtJKn0Px"
      // },
      // {
      //   "name": "Thừa Thiên Huế",
      //   "id": "N9g8JZ96gOs"
      // },
      // {
      //   "name": "Tiền Giang",
      //   "id": "BeoEarCsP0N"
      // },
      // {
      //   "name": "Trà Vinh",
      //   "id": "wJorKSdTSu2"
      // },
      // {
      //   "name": "Tuyên Quang",
      //   "id": "uglfBEIDXHY"
      // },
      // {
      //   "name": "Tây Ninh",
      //   "id": "mlcepxdsrJK"
      // },
      // {
      //   "name": "Vĩnh Long",
      //   "id": "MDVatffMnzo"
      // },
      // {
      //   "name": "Vĩnh Phúc",
      //   "id": "VOIqdFpPXFq"
      // },
      // {
      //   "name": "Yên Bái",
      //   "id": "DJptEDkQmc4"
      // },
      // {
      //   "name": "Điện Biên",
      //   "id": "GeDxqlWLx9Q"
      // },
      // {
      //   "name": "Đà Nẵng",
      //   "id": "QqvBYSvbeNj"
      // },
      // {
      //   "name": "Đắk Lắk",
      //   "id": "Y2AZV0a1Oyj"
      // },
      // {
      //   "name": "Đắk Nông",
      //   "id": "eyKD8PvVOO4"
      // },
      // {
      //   "name": "Đồng Nai",
      //   "id": "mQwBhiRXAqY"
      // },
      // {
      //   "name": "Đồng Tháp",
      //   "id": "T4hQeKvy8KI"
      // }
]
  
const authentication = {
    auth: {
        username: process.env.username,
        password: `Csdl2018@)!*`
    }
}

function wirteJsonToExcel(data, fileName) {
    // Tạo một workbook mới và một worksheet trong đó
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Định dạng tiêu đề cho worksheet (tùy chọn)
    worksheet.columns = [
        { header: 'Code', key: 'code', width: 15 },
        { header: 'Code BHYT', key: 'codebhyt', width: 15 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'ID', key: 'id', width: 25 },
        { header: 'Ancestors', key: 'ancestors', width: 40 },
        { header: 'User1', key: 'user1', width: 10 },
        { header: 'UserGroup1', key: 'usergroup1', width: 10 },
        { header: 'User2', key: 'user2', width: 10 },
        { header: 'UserGroup2', key: 'usergroup2', width: 10 },
        { header: 'User3', key: 'user3', width: 10 },
        { header: 'User4', key: 'user4', width: 10 },
        { header: 'User5', key: 'user5', width: 10 }
    ];

    // Ghi dữ liệu từ mảng JSON vào worksheet
    data.forEach(item => {
        let codeBHYT = ''
        if(item.attributeValues.length > 0) {
            codeBHYT = item.attributeValues[0].value;
        }
        worksheet.addRow({
            code: item.code,
            codebhyt: codeBHYT,
            name: item.name,
            id: item.id,
            ancestors: item.ancestors.map(ancestor => ancestor.name).join(', '), // Chuyển mảng ancestors thành chuỗi
            user1: item.user1 ? item.user1.username: null,
            usergroup1: item.user1 ? item.user1.userGroups.map(usergroup => usergroup.name).join(', ') : null,
            user2: item.user2 ? item.user2.username : null,
            usergroup2: item.user2 ? item.user2.userGroups.map(usergroup => usergroup.name).join(', '): null,
            user3: item.user3 ? item.user3.username: null,
            user4: item.user4 ? item.user4.username: null,
            user5: item.user5 ? item.user5.username: null,
        });
    });

    // Lưu workbook vào một file Excel
    workbook.xlsx.writeFile(`${fileName}.xlsx`)
        .then(function () {
            console.log('File đã được lưu.');
        })
        .catch(function (error) {
            console.error('Lỗi:', error);
        });
}

async function createExcel(org) {
    let url = ``
    url = baseUrl + `/api/organisationUnits.json?fields=id,code,name,ancestors[name],attributeValues&filter=path:ilike:${org.id}&paging=false`
    // +"&filter=id:in:[UPKEou47AtY]";
    let data = {};
    await _axios.get(url, authentication).then(jsonResult => {
        let resData = jsonResult.data;
        data = resData.organisationUnits
    })
    // Sử dụng map để trích xuất các giá trị id
    let idArray = data.map(item => item.id);
    // Sử dụng join để nối các giá trị thành một chuỗi với dấu phẩy
    let idOrgs = idArray.join(',');
    // console.log(idOrgs);

    let users = [];
    url = baseUrl + `/api/users.json?fields=id,username,organisationUnits[id],userGroups[id,name]&filter=organisationUnits.id:in:[${idOrgs}]&paging=false`
    await _axios.get(url, authentication).then(jsonResult => {
        let resData = jsonResult.data;
        users = resData.users
    })

    const mappedData = data.map(item => {
        const matchingUsers = users.filter(user => user.organisationUnits[0].id === item.id);
        return {
            ...item,
            user1: matchingUsers[0] ? matchingUsers[0] : null,
            user2: matchingUsers[1] ? matchingUsers[1] : null,
            user3: matchingUsers[2] ? matchingUsers[2] : null,
            user4: matchingUsers[3] ? matchingUsers[3] : null,
            user5: matchingUsers[4] ? matchingUsers[4] : null
        };
    });
    console.log(mappedData);

    wirteJsonToExcel(mappedData, org.name);
};

// Main function
(async () => {
    for (const org of orgs) {
      console.log(org);
      await createExcel(org);
    }
  })();