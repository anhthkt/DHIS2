const _axios = require("axios");
const fs = require('fs');
const xlsx = require('xlsx');
// const writeJson = require('write-json-file');
let _ = require('lodash');
const { result } = require('lodash');

const baseUrl = 'https://kln.tkyt.vn';
const authentication = {
    auth: {
        // username: _config.username,
        // password: _config.password
        username: 'anhth',
        password: 'Csdl2018@)!*'
    }
}

let workbook = xlsx.readFile(`${__dirname}/input/DanhsachBenhNhan.xlsx`);
console.log(workbook);

let arrSheetNames = workbook.SheetNames;
for(let s = 0; s < arrSheetNames.length; s++) {
    let sheetName = workbook.SheetNames[s];
    // Name file output
    let orgName = 'HaNoi'

    let idOrgUnit = ''
     
    let programId = ''
    if(sheetName == 'THA') programId = 'NAleauPZvIE'; //THA
    if(sheetName == 'DTD') programId = 'a7arqsOKzsr'; //DTD
    if(sheetName == 'COPD') programId = 'gPWs4FRX9dj'; //COPD-HEN
    if(sheetName == 'RLTT') programId = 'WmEGO8Ipykm'; //RLTT
    if(sheetName == 'KLNKHAC') programId = 'XrC0U6IV4W0'; //KLN Khac
    if (programId == '') continue; //
    exportTeiFromExcel(sheetName, programId, idOrgUnit, orgName);
}

function getIdOrg (nameOrg){
    //Ninh Binh
    let arrOrgNB = [
            {
                "id": "A1vgcRknfe5",
                "name": "Xã Gia Hưng"
            },
            {
                "id": "A89n5BYcUir",
                "name": "Xã Phú Long"
            },
            {
                "id": "AAfjzERP1rh",
                "name": "Xã Gia Thanh"
            },
            {
                "id": "aeuvj0PActw",
                "name": "Xã Quang Thiện"
            },
            {
                "id": "agBUtOEd7ES",
                "name": "Xã Tân Thành"
            },
            {
                "id": "AWYIAT9XTeO",
                "name": "Xã Gia Lâm"
            },
            {
                "id": "aZ8KWdBYPPL",
                "name": "Xã Gia Tân"
            },
            {
                "id": "B6CuUfmK1ua",
                "name": "TTYT Thành phố Tam Điệp"
            },
            {
                "id": "b6xyYgvUOFN",
                "name": "Xã Thanh Lạc"
            },
            {
                "id": "BAqlaZeQ8C3",
                "name": "Xã Khánh Hòa"
            },
            {
                "id": "Bb0JNZh9Sim",
                "name": "Xã Văn Hải"
            },
            {
                "id": "bEpMCWPh9h7",
                "name": "Xã Yên Hưng"
            },
            {
                "id": "BFieS0F4Cvm",
                "name": "Xã Ninh Mỹ"
            },
            {
                "id": "BHcj6knvRbe",
                "name": "Xã Khánh Lợi"
            },
            {
                "id": "bwicKw5HhJh",
                "name": "Xã Gia Phong"
            },
            {
                "id": "BxJEhfSKFYj",
                "name": "Xã Kim Định"
            },
            {
                "id": "c7TZgC3ztys",
                "name": "Xã Gia Trấn"
            },
            {
                "id": "C8D53Xtuszt",
                "name": "Xã Yên Lộc"
            },
            {
                "id": "CbWPKxO9CaV",
                "name": "Xã Khánh Hải"
            },
            {
                "id": "CItdVshvK3m",
                "name": "Xã Khánh An"
            },
            {
                "id": "CmyAvezvk1o",
                "name": "Xã Kỳ Phú"
            },
            {
                "id": "cSSTcG5tcDF",
                "name": "Xã Kim Tân"
            },
            {
                "id": "CxCM3Ue2hBP",
                "name": "Xã Lưu Phương"
            },
            {
                "id": "DaMOC6ucylB",
                "name": "Thị trấn Nho Quan"
            },
            {
                "id": "dcdtfTC0mLV",
                "name": "Thị trấn Bình Minh"
            },
            {
                "id": "dFoyo6Y7Fhr",
                "name": "Phường Nam Sơn"
            },
            {
                "id": "dKOByDZEctn",
                "name": "Xã Hồi Ninh"
            },
            {
                "id": "dOZQQIuUB2U",
                "name": "Xã Đức Long"
            },
            {
                "id": "dw3SXdrl2ma",
                "name": "Xã Khánh Thiện"
            },
            {
                "id": "dWWWZoqUyok",
                "name": "Xã Chính Tâm (Sáp nhập 2019)"
            },
            {
                "id": "DyGAvMfZhxH",
                "name": "Xã Kim Mỹ"
            },
            {
                "id": "dynYcmYbisx",
                "name": "Xã Khánh Cường"
            },
            {
                "id": "eA7GwNMX0aO",
                "name": "Xã Cồn Thoi"
            },
            {
                "id": "eDrHvC5zZEW",
                "name": "Phường Tân Thành"
            },
            {
                "id": "EIoDwwlB5gm",
                "name": "Xã Trường Yên"
            },
            {
                "id": "eLYrJDyRTX5",
                "name": "Xã Khánh Phú"
            },
            {
                "id": "EPxaeCvwxSs",
                "name": "Xã Như Hòa"
            },
            {
                "id": "eRzckbzzuMm",
                "name": "Xã Văn Phong"
            },
            {
                "id": "EuywuLYrfMb",
                "name": "Xã Khánh Công"
            },
            {
                "id": "EVh6dK4Nzia",
                "name": "Xã Yên Sơn"
            },
            {
                "id": "F3GsuMsP8Kd",
                "name": "Xã Gia Tường"
            },
            {
                "id": "F7qFecFZ7Ry",
                "name": "Xã Kim Chính"
            },
            {
                "id": "FV3VSdApuL6",
                "name": "Xã Quỳnh Lưu"
            },
            {
                "id": "FZm81sP21yH",
                "name": "Xã Sơn Hà"
            },
            {
                "id": "GAVruScNRJ9",
                "name": "Phường Trung Sơn"
            },
            {
                "id": "gi0417qsd04",
                "name": "Xã Lạng Phong"
            },
            {
                "id": "GIrW7cBA6Ri",
                "name": "Xã Gia Thịnh"
            },
            {
                "id": "Gr12HuYTV7f",
                "name": "Xã Gia Xuân"
            },
            {
                "id": "GSWkI6P2FWB",
                "name": "Bệnh viện Đa khoa Huyện Kim Sơn"
            },
            {
                "id": "hNlPUOkAo1P",
                "name": "Xã Gia Lập"
            },
            {
                "id": "hOQi4BtmNEl",
                "name": "Xã Chất Bình"
            },
            {
                "id": "hT0j9WyFhZR",
                "name": "Xã Khánh Mậu"
            },
            {
                "id": "iD0MkETTNzy",
                "name": "Xã Yên Mật (Sáp nhập 2019)"
            },
            {
                "id": "J40x2Owu5De",
                "name": "Xã Khánh Thượng"
            },
            {
                "id": "J7dR9k592xp",
                "name": "Xã Ninh Thắng"
            },
            {
                "id": "J9RvQaKvvwR",
                "name": "Xã Yên Phong"
            },
            {
                "id": "jFrv1HerHzk",
                "name": "Phường Nam Bình"
            },
            {
                "id": "jj9ULcBURQW",
                "name": "Xã Quang Sơn"
            },
            {
                "id": "jKk87pWPS0c",
                "name": "TTYT Huyện Yên Mô"
            },
            {
                "id": "JklXuKlmGVV",
                "name": "Xã Kim Hải"
            },
            {
                "id": "JMX27lJfRKW",
                "name": "Xã Yên Lâm"
            },
            {
                "id": "jwqZDttnPru",
                "name": "Xã Gia Tiến"
            },
            {
                "id": "jZTsDHzsEmT",
                "name": "Xã Gia Minh"
            },
            {
                "id": "k0zpQPaobzC",
                "name": "Xã Lai Thành"
            },
            {
                "id": "KT70osi6P0r",
                "name": "Xã Khánh Thịnh"
            },
            {
                "id": "KV59ztkfI4f",
                "name": "Xã Thượng Kiệm"
            },
            {
                "id": "L8t7TFVwv8j",
                "name": "Xã Ninh Giang"
            },
            {
                "id": "LLNJaNcBaxq",
                "name": "Xã Đồng Hướng"
            },
            {
                "id": "lnrJ56fBEHu",
                "name": "Xã Khánh Dương"
            },
            {
                "id": "lTfywtVPosX",
                "name": "Xã Mai Sơn"
            },
            {
                "id": "LyBXHT3PAiv",
                "name": "TTYT Huyện Kim Sơn"
            },
            {
                "id": "mDINls4ObNw",
                "name": "Xã Thượng Hòa"
            },
            {
                "id": "n1YBaV10Wlz",
                "name": "Phường Ninh Khánh"
            },
            {
                "id": "NhlGXfXnNKq",
                "name": "Xã Yên Thắng"
            },
            {
                "id": "nitYYmDGtTh",
                "name": "Xã Gia Sơn"
            },
            {
                "id": "nk8b2CBsdGm",
                "name": "Xã Đồng Phong"
            },
            {
                "id": "noGYvZ1I46b",
                "name": "Xã Xuân Chính"
            },
            {
                "id": "Ocd81m4wcmG",
                "name": "Thị trấn Thiên Tôn"
            },
            {
                "id": "oEWgoh8inj1",
                "name": "Xã Phú Sơn"
            },
            {
                "id": "oG8QpEEudAu",
                "name": "Phường Yên Bình"
            },
            {
                "id": "oha4wFHA0Ii",
                "name": "Xã Yên Hòa"
            },
            {
                "id": "ojpNcHeoP1J",
                "name": "Xã Khánh Cư"
            },
            {
                "id": "oqNqYhiiPkY",
                "name": "Xã Ninh An"
            },
            {
                "id": "ownwwYU9OSg",
                "name": "Xã Yên Thành"
            },
            {
                "id": "pfeCqgBS4Zb",
                "name": "Phường Vân Giang"
            },
            {
                "id": "PpZcCAGm1BN",
                "name": "Xã Định Hóa"
            },
            {
                "id": "pXfCc6JaQLq",
                "name": "Xã Liên Sơn"
            },
            {
                "id": "PZtCkNstwY9",
                "name": "Xã Gia Vượng"
            },
            {
                "id": "Q4uf8QTb5Hx",
                "name": "PYT thành phố Tam Điệp"
            },
            {
                "id": "QcmYuhzbQqc",
                "name": "Xã Khánh Hội"
            },
            {
                "id": "qG4axl0y7gb",
                "name": "TTYT Thành phố Ninh Bình"
            },
            {
                "id": "qGAHCEi98qp",
                "name": "Xã Gia Trung"
            },
            {
                "id": "Qm1BytbwrhI",
                "name": "Phường Ninh Phong"
            },
            {
                "id": "qmsvMpEuCNB",
                "name": "Xã Ninh Vân"
            },
            {
                "id": "QPyuEeG6ruS",
                "name": "Xã Yên Quang"
            },
            {
                "id": "QQKLbC5CVdC",
                "name": "Xã Khánh Hồng"
            },
            {
                "id": "qS5KhaYYLRu",
                "name": "TTYT Huyện Nho Quan"
            },
            {
                "id": "QtZUzMCW3Kf",
                "name": "Xã Ninh Phúc"
            },
            {
                "id": "R2d4NETc1j8",
                "name": "Xã Quảng Lạc"
            },
            {
                "id": "RBdIaD764x6",
                "name": "Xã Thạch Bình"
            },
            {
                "id": "rHgUcF2T2MR",
                "name": "Xã Khánh Nhạc"
            },
            {
                "id": "rkvNtzZNwsG",
                "name": "Phường Đông Thành"
            },
            {
                "id": "RMGuct0SrYn",
                "name": "Xã Yên Nhân"
            },
            {
                "id": "RX6060qeF7A",
                "name": "Xã Khánh Thành"
            },
            {
                "id": "rXc9FJ3rU7h",
                "name": "TTYT Huyện Gia Viễn"
            },
            {
                "id": "ry8LxyL1Fj1",
                "name": "Xã Sơn Lai"
            },
            {
                "id": "S2eIqamscBS",
                "name": "Xã Ninh Hòa"
            },
            {
                "id": "S5znUPoEmub",
                "name": "Xã Cúc Phương"
            },
            {
                "id": "SpoPAZdJirm",
                "name": "Phường Phúc Thành"
            },
            {
                "id": "sTd4j1VEcVk",
                "name": "Bệnh viện Đa khoa Huyện Nho Quan"
            },
            {
                "id": "stiMfwb1LwR",
                "name": "TTYT Huyện Yên Khánh"
            },
            {
                "id": "t7cn9nU8Ait",
                "name": "Phường Ninh Sơn"
            },
            {
                "id": "tA562BRGbWF",
                "name": "Phường Thanh Bình"
            },
            {
                "id": "tN2Ev6v7HGU",
                "name": "Xã Xuân Thiện (Sáp nhập 2019)"
            },
            {
                "id": "toclLgFnKwS",
                "name": "Xã Hùng Tiến"
            },
            {
                "id": "tTRsmZD7qYf",
                "name": "Xã Sơn Thành"
            },
            {
                "id": "TU4PGLxcraU",
                "name": "Xã Gia Thắng"
            },
            {
                "id": "TZORIjImIJx",
                "name": "Xã Yên Từ"
            },
            {
                "id": "U1rMvKUjtsn",
                "name": "Xã Yên Thái"
            },
            {
                "id": "ubxDUAWHNUc",
                "name": "Xã Gia Phú"
            },
            {
                "id": "uIhRvWcwCLc",
                "name": "Xã Khánh Trung"
            },
            {
                "id": "UIUDjvcAmw3",
                "name": "TTYT Huyện Hoa Lư"
            },
            {
                "id": "UXpZHT2UPZ5",
                "name": "Xã Gia Sinh"
            },
            {
                "id": "V1eedyqJBe0",
                "name": "Xã Kim Đông"
            },
            {
                "id": "v2Nw9TuueZB",
                "name": "Thị trấn Me"
            },
            {
                "id": "V6KfqB2E3A0",
                "name": "Xã Khánh Tiên"
            },
            {
                "id": "VawGp5BpJ7l",
                "name": "Xã Ninh Hải"
            },
            {
                "id": "VCeqm6051vn",
                "name": "Xã Lạc Vân"
            },
            {
                "id": "vcfJlCZu4dH",
                "name": "Phường Tây Sơn"
            },
            {
                "id": "vgL6t7m3vC5",
                "name": "Xã Xích Thổ"
            },
            {
                "id": "VKB19Td78ve",
                "name": "Xã Gia Thủy"
            },
            {
                "id": "VSo3VgCOx5F",
                "name": "Xã Yên Đồng"
            },
            {
                "id": "VUmzlV14pTk",
                "name": "Xã Gia Vân"
            },
            {
                "id": "W0Sybnn6T78",
                "name": "Thị trấn Yên Thịnh"
            },
            {
                "id": "Wh43fmpTimI",
                "name": "Xã Phú Lộc"
            },
            {
                "id": "wiTNsjqg1hs",
                "name": "Xã Gia Lạc"
            },
            {
                "id": "wrFHKLp3rRg",
                "name": "Xã Ninh Xuân"
            },
            {
                "id": "WRyPgI6sQxY",
                "name": "Xã Đông Sơn"
            },
            {
                "id": "wWt9nfiz7N6",
                "name": "Xã Gia Phương"
            },
            {
                "id": "wZvgAlGGu0x",
                "name": "Phường Bắc Sơn"
            },
            {
                "id": "xDbDkpUxzhq",
                "name": "Thị trấn Yên Ninh"
            },
            {
                "id": "XEcvCIDdoUZ",
                "name": "Xã Ninh Tiến"
            },
            {
                "id": "XeqMnv6PIoH",
                "name": "Xã Ninh Khang"
            },
            {
                "id": "xmPhbRY70y9",
                "name": "Phường Bích Đào"
            },
            {
                "id": "Y6iWdhKgUte",
                "name": "Thị trấn Phát Diệm"
            },
            {
                "id": "YBvcO0Wc0Zt",
                "name": "Xã Yên Mỹ"
            },
            {
                "id": "Yc7YF1W5Zd2",
                "name": "Xã Văn Phú"
            },
            {
                "id": "yPWCgZKUkfQ",
                "name": "Xã Gia Hòa"
            },
            {
                "id": "YUEFRkSdRXX",
                "name": "Xã Ân Hòa"
            },
            {
                "id": "Yz67aQFSBl6",
                "name": "Xã Kim Trung"
            },
            {
                "id": "Z39aZnXP2tU",
                "name": "Phường Nam Thành"
            },
            {
                "id": "zIX7fhxfQ26",
                "name": "Xã Khánh Vân"
            },
            {
                "id": "zsoDje3ItoP",
                "name": "Phường Tân Bình"
            },
            {
                "id": "zVOl1xtnmqx",
                "name": "Xã Khánh Thủy"
            },
            {
                "id": "ZweCmuFGbex",
                "name": "Xã Yên Mạc"
            },
            {
                "id": "zwslFumJCg2",
                "name": "Xã Ninh Nhất"
            },
            {
                "id": "zxzWxheyebg",
                "name": "Xã Văn Phương"
            }
        ]
    let idOrg = '';
    arrOrg.forEach(e=>{
        if (nameOrg == e.name){
            idOrg = e.id;
        }
    })
    return idOrg;
}

// function exportTeiFromExcel(sheetName, programId, idOrgUnit) {
async function exportTeiFromExcel(sheetName, programId, idOrgUnit, orgName) {
    let data = workbook.Sheets[sheetName];
    
    let result = {};
    for (let row = 3; row < 10000; row++) {
        let m = `A${row}`
        if (data[`A${row}`] == undefined) break;
        result[m.slice(1)] = [];
        result[m.slice(1)].push(data[m].v);
    }
    
    let cols = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']

    for (let i = 0; i < cols.length; i++) {
        for (let row = 3; row < Object.keys(result).length + 3; row++) {
            let k = `${cols[i]}${row}`
            if (data[`${cols[i]}${row}`] == undefined) {
                result[k.slice(1)].push(''); continue;
            } else {
                result[k.slice(1)].push(`${data[k].v}`);
            }
        }
    }
    // for (let k in data) {
    //     if (data.hasOwnProperty(k)) {
    //         if (k[0] === '!') continue;
    //         if (!_.isArray(result[k.slice(1)])) result[k.slice(1)] = [];
    //         result[k.slice(1)].push(data[k].v);
    //     }
    // }

    let resultTei = {
        "trackedEntityInstances": []
    };
    // let keys = Object.keys(result)
    let mTei
    // for (let i = 0; i < keys.length; i++) {
    //     // console.log(result[i][6])
    //     if (result[i][0] !== 'STT') {
    // fs.appendFileSync(`${__dirname}/${directory}/importTei.json`,
    var resultEnrollments = {
        "enrollments": []
    };
    var mEnrollment = '';
    let checkTeiorgUnitID;
    let checkTeiteiID;
    let checkTeiprogramID;
    for (let i = 3; i < Object.keys(result).length + 3; i++) {
    
        idOrgUnit = getIdOrg(result[i][1]);
        let checkTeiTHA = { "status": "", "teiID": "", "orgUnitID": "" };
        let checkTeiTHABHYT = { "status": "0", "teiID": "", "orgUnitID": "" };
        let checkTeiTHACMT = { "status": "0", "teiID": "", "orgUnitID": "" };
        let checkTeiDTD;
        
            if(`${result[i][7]}` != '') { checkTeiTHABHYT = await checkTeiTHAbyBHYTExist(`${result[i][7]}`);}
            if(`${result[i][8]}` != '') { checkTeiTHACMT = await checkTeiTHAbyCMTExist(`${result[i][8]}`);}
            if(checkTeiTHABHYT.status == 1 || checkTeiTHACMT.status == 1){
                checkTeiTHA.status = 1
                if(checkTeiTHABHYT.status == 1) {
                    checkTeiTHA.teiID = checkTeiTHABHYT.teiID
                    checkTeiTHA.orgUnitID = checkTeiTHABHYT.orgUnitID
                }
                if(checkTeiTHACMT.status == 1) {
                    checkTeiTHA.teiID = checkTeiTHACMT.teiID
                    checkTeiTHA.orgUnitID = checkTeiTHACMT.orgUnitID
                }
            } else {
                checkTeiTHA.status = 0
            }
            // checkTeiDTD = await checkTeiDTDExist(`${result[i][7]}`, `${result[i][8]}`);
            // if (checkTeiTHA.status != 0 || checkTeiDTD.status != 0) {
            //     if(checkTeiTHA.status == 1 && checkTeiDTD.status == 0 && sheetName == 'DTD') {
            //         checkTeiorgUnitID = checkTeiTHA.orgUnitID
            //         checkTeiteiID = checkTeiTHA.teiID
            //         checkTeiprogramID = "a7arqsOKzsr"
            //         mEnrollment = {
            //             "orgUnit": `${checkTeiorgUnitID}`,
            //             "program": `${checkTeiprogramID}`,
            //             "trackedEntityType": "EL3fkeMR3xK",
            //             "trackedEntityInstance": `${checkTeiteiID}`,
            //             "enrollmentDate": "2021-01-01",
            //             "incidentDate": "2021-01-01",
            //             "events": []
            //         }
            //         resultEnrollments.enrollments.push(mEnrollment);
            //     } 
            //     if(checkTeiTHA.status == 0 && checkTeiDTD.status == 1 && sheetName == 'THA') {
            //         checkTeiorgUnitID = checkTeiDTD.orgUnitID
            //         checkTeiteiID = checkTeiDTD.teiID
            //         checkTeiprogramID = "NAleauPZvIE"
            //         mEnrollment = {
            //             "orgUnit": `${checkTeiorgUnitID}`,
            //             "program": `${checkTeiprogramID}`,
            //             "trackedEntityType": "EL3fkeMR3xK",
            //             "trackedEntityInstance": `${checkTeiteiID}`,
            //             "enrollmentDate": "2021-01-01",
            //             "incidentDate": "2021-01-01",
            //             "events": []
            //         }
            //         resultEnrollments.enrollments.push(mEnrollment);
            //     }
            if (checkTeiTHA.status != 0){
                if (sheetName == 'THA') {
                    checkTeiorgUnitID = checkTeiTHA.orgUnitID
                    checkTeiteiID = checkTeiTHA.teiID
                    checkTeiprogramID = "NAleauPZvIE"
                    mEnrollment = {
                        "orgUnit": `${checkTeiorgUnitID}`,
                        "program": `${checkTeiprogramID}`,
                        "trackedEntityType": "EL3fkeMR3xK",
                        "trackedEntityInstance": `${checkTeiteiID}`,
                        "enrollmentDate": "2021-01-01",
                        "incidentDate": "2021-01-01",
                        "events": []
                    }
                    resultEnrollments.enrollments.push(mEnrollment);
                }
                if (sheetName == 'DTD') {
                    checkTeiorgUnitID = checkTeiTHA.orgUnitID
                    checkTeiteiID = checkTeiTHA.teiID
                    checkTeiprogramID = "a7arqsOKzsr"
                    mEnrollment = {
                        "orgUnit": `${checkTeiorgUnitID}`,
                        "program": `${checkTeiprogramID}`,
                        "trackedEntityType": "EL3fkeMR3xK",
                        "trackedEntityInstance": `${checkTeiteiID}`,
                        "enrollmentDate": "2021-01-01",
                        "incidentDate": "2021-01-01",
                        "events": []
                    }
                    resultEnrollments.enrollments.push(mEnrollment);
                }
                if (sheetName == 'COPD') {
                    checkTeiorgUnitID = checkTeiTHA.orgUnitID
                    checkTeiteiID = checkTeiTHA.teiID
                    checkTeiprogramID = "gPWs4FRX9dj"
                    mEnrollment = {
                        "orgUnit": `${checkTeiorgUnitID}`,
                        "program": `${checkTeiprogramID}`,
                        "trackedEntityType": "EL3fkeMR3xK",
                        "trackedEntityInstance": `${checkTeiteiID}`,
                        "enrollmentDate": "2021-01-01",
                        "incidentDate": "2021-01-01",
                        "events": []
                    }
                    resultEnrollments.enrollments.push(mEnrollment);
                }
                if (sheetName == 'RLTT') {
                    checkTeiorgUnitID = checkTeiTHA.orgUnitID
                    checkTeiteiID = checkTeiTHA.teiID
                    checkTeiprogramID = "WmEGO8Ipykm"
                    mEnrollment = {
                        "orgUnit": `${checkTeiorgUnitID}`,
                        "program": `${checkTeiprogramID}`,
                        "trackedEntityType": "EL3fkeMR3xK",
                        "trackedEntityInstance": `${checkTeiteiID}`,
                        "enrollmentDate": "2021-01-01",
                        "incidentDate": "2021-01-01",
                        "events": []
                    }
                    resultEnrollments.enrollments.push(mEnrollment);
                }
                if (sheetName == 'KLNKhac') {
                    checkTeiorgUnitID = checkTeiTHA.orgUnitID
                    checkTeiteiID = checkTeiTHA.teiID
                    checkTeiprogramID = "XrC0U6IV4W0"
                    mEnrollment = {
                        "orgUnit": `${checkTeiorgUnitID}`,
                        "program": `${checkTeiprogramID}`,
                        "trackedEntityType": "EL3fkeMR3xK",
                        "trackedEntityInstance": `${checkTeiteiID}`,
                        "enrollmentDate": "2021-01-01",
                        "incidentDate": "2021-01-01",
                        "events": []
                    }
                    resultEnrollments.enrollments.push(mEnrollment);
                }
            } else {
                if (programId == 'NAleauPZvIE') {
                    mTei = {
                        "orgUnit": `${idOrgUnit}`,
                        "trackedEntityType": "EL3fkeMR3xK",
                        "inactive": false,
                        "deleted": false,
                        "featureType": "NONE",
                        "programOwners": [],
                        "enrollments": [
                            {
                                "orgUnit": `${idOrgUnit}`,
                                "program": `${programId}`,
                                "enrollmentDate": "2021-01-01",
                                "incidentDate": "2021-01-01",
                                "events": []
                            }
                        ],
                        "relationships": [],
                        "attributes": [
                            {
                                "code": "WHO_001",
                                "displayName": "Mã BHYT",
                                "attribute": "JHb1hzseNMg",
                                "value": `${result[i][7]}`
                            },
                            {
                                "code": "WHO_002",
                                "displayName": "Họ và tên",
                                "attribute": "xBoLC0aruyJ",
                                "value": `${result[i][4]}`
                            },
                            {
                                "code": "WHO_003",
                                "displayName": "Giới tính",
                                "attribute": "rwreLO34Xg7",
                                "value": `${convertCode(result[i][5])}`
                            },
                            {
                                "code": "WHO_004",
                                "displayName": "Năm sinh",
                                "attribute": "C7USC9MC8yH",
                                "value": `${formatDate(result[i][6])}`
                            },
                            {
                                "displayName": "Số CMT/CCCD",
                                "attribute": "ZQ93P672wQR",
                                "value": `${result[i][8]}`
                            },
                            {
                                "displayName": "Số điện thoại",
                                "attribute": "mZbgWADLTKY",
                                "value": `${result[i][11]}`
                            },
                            {
                                "code": "WHO_005",
                                "displayName": "Địa chỉ",
                                "attribute": "Bxp1Lhr8ZeN",
                                "value": `${result[i][9]}`
                            },
                            {
                                "code": "WHO_006",
                                "displayName": "Nghề nghiệp",
                                "attribute": "L4djJU4gMyb",
                                "value": `${result[i][10]}`
                            },
                            {
                                "displayName": "Ngày phát hiện THA",
                                "attribute": "RSNvyMilQxs",
                                "value": `${formatDate(result[i][12])}`
                            },
                            {
                                "displayName": "Nơi phát hiện THA",
                                "attribute": "ZYzDKzTIhM2",
                                "value": `${convertCode(result[i][13])}`
                            },
                            {
                                "displayName": "Chọn Xã/ Phường/ Thị trấn",
                                "attribute": "Gy1fkmBZpFk",
                                "value": `${idOrgUnit}`
                            }
                            // {
                            //     "displayName": "Nơi phát hiện ĐTĐ",
                            //     "attribute": "LHVZXlBbn2l",
                            //     "value": `${convertCode(result[i][13])}`
                            // }
                            // {
                            //     "displayName": "Ngày phát hiện ĐTĐ",
                            //     "attribute": "LnYKf02oBmF",
                            //     "value": `${formatDate(result[i][12])}`
                            // },
                            // {
                            //     "displayName": "Nơi phát hiện ĐTĐ",
                            //     "attribute": "LHVZXlBbn2l",
                            //     "value": `${convertCode(result[i][13])}`
                            // }
                        ]
                    }
                }
    
                if (programId == 'a7arqsOKzsr') {
                    mTei = {
                        "orgUnit": `${idOrgUnit}`,
                        "trackedEntityType": "EL3fkeMR3xK",
                        "inactive": false,
                        "deleted": false,
                        "featureType": "NONE",
                        "programOwners": [],
                        "enrollments": [
                            {
                                "orgUnit": `${idOrgUnit}`,
                                "program": `${programId}`,
                                "enrollmentDate": "2021-01-01",
                                "incidentDate": "2021-01-01",
                                "events": []
                            }
                        ],
                        "relationships": [],
                        "attributes": [
                            {
                                "code": "WHO_001",
                                "displayName": "Mã BHYT",
                                "attribute": "JHb1hzseNMg",
                                "value": `${result[i][7]}`
                            },
                            {
                                "code": "WHO_002",
                                "displayName": "Họ và tên",
                                "attribute": "xBoLC0aruyJ",
                                "value": `${result[i][4]}`
                            },
                            {
                                "code": "WHO_003",
                                "displayName": "Giới tính",
                                "attribute": "rwreLO34Xg7",
                                "value": `${convertCode(result[i][5])}`
                            },
                            {
                                "code": "WHO_004",
                                "displayName": "Năm sinh",
                                "attribute": "C7USC9MC8yH",
                                "value": `${formatDate(result[i][6])}`
                            },
                            {
                                "displayName": "Số CMT/CCCD",
                                "attribute": "ZQ93P672wQR",
                                "value": `${result[i][8]}`
                            },
                            {
                                "displayName": "Số điện thoại",
                                "attribute": "mZbgWADLTKY",
                                "value": `${result[i][11]}`
                            },
                            {
                                "code": "WHO_005",
                                "displayName": "Địa chỉ",
                                "attribute": "Bxp1Lhr8ZeN",
                                "value": `${result[i][9]}`
                            },
                            {
                                "code": "WHO_006",
                                "displayName": "Nghề nghiệp",
                                "attribute": "L4djJU4gMyb",
                                "value": `${result[i][10]}`
                            },
                            // {
                            //     "displayName": "Ngày phát hiện THA",
                            //     "attribute": "RSNvyMilQxs",
                            //     "value": `${formatDate(result[i][12])}`
                            // },
                            // {
                            //     "displayName": "Nơi phát hiện THA",
                            //     "attribute": "ZYzDKzTIhM2",
                            //     "value": `${convertCode(result[i][13])}`
                            // }
                            {
                                "displayName": "Ngày phát hiện ĐTĐ",
                                "attribute": "LnYKf02oBmF",
                                "value": `${formatDate(result[i][12])}`
                            },
                            {
                                "displayName": "Nơi phát hiện ĐTĐ",
                                "attribute": "LHVZXlBbn2l",
                                "value": `${convertCode(result[i][13])}`
                            },
                            {
                                "displayName": "Chọn Xã/ Phường/ Thị trấn",
                                "attribute": "Gy1fkmBZpFk",
                                "value": `${idOrgUnit}`
                            }
                            // {
                            //     "displayName": "Ngày phát hiện ĐTĐ",
                            //     "attribute": "LnYKf02oBmF",
                            //     "value": `${formatDate(result[i][12])}`
                            // },
                            // {
                            //     "displayName": "Nơi phát hiện ĐTĐ",
                            //     "attribute": "LHVZXlBbn2l",
                            //     "value": `${convertCode(result[i][13])}`
                            // }
                        ]
                    }
                }
    
                if (programId == 'gPWs4FRX9dj' || programId == 'WmEGO8Ipykm' || programId == 'XrC0U6IV4W0') {
                    mTei = {
                        "orgUnit": `${idOrgUnit}`,
                        "trackedEntityType": "EL3fkeMR3xK",
                        "inactive": false,
                        "deleted": false,
                        "featureType": "NONE",
                        "programOwners": [],
                        "enrollments": [
                            {
                                "orgUnit": `${idOrgUnit}`,
                                "program": `${programId}`,
                                "enrollmentDate": "2021-01-01",
                                "incidentDate": "2021-01-01",
                                "events": []
                            }
                        ],
                        "relationships": [],
                        "attributes": [
                            {
                                "code": "WHO_001",
                                "displayName": "Mã BHYT",
                                "attribute": "JHb1hzseNMg",
                                "value": `${result[i][7]}`
                            },
                            {
                                "code": "WHO_002",
                                "displayName": "Họ và tên",
                                "attribute": "xBoLC0aruyJ",
                                "value": `${result[i][4]}`
                            },
                            {
                                "code": "WHO_003",
                                "displayName": "Giới tính",
                                "attribute": "rwreLO34Xg7",
                                "value": `${convertCode(result[i][5])}`
                            },
                            {
                                "code": "WHO_004",
                                "displayName": "Năm sinh",
                                "attribute": "C7USC9MC8yH",
                                "value": `${formatDate(result[i][6])}`
                            },
                            {
                                "displayName": "Số CMT/CCCD",
                                "attribute": "ZQ93P672wQR",
                                "value": `${result[i][8]}`
                            },
                            {
                                "displayName": "Số điện thoại",
                                "attribute": "mZbgWADLTKY",
                                "value": `${result[i][11]}`
                            },
                            {
                                "code": "WHO_005",
                                "displayName": "Địa chỉ",
                                "attribute": "Bxp1Lhr8ZeN",
                                "value": `${result[i][9]}`
                            },
                            {
                                "code": "WHO_006",
                                "displayName": "Nghề nghiệp",
                                "attribute": "L4djJU4gMyb",
                                "value": `${result[i][10]}`
                            },
                            {
                                "displayName": "Chọn Xã/ Phường/ Thị trấn",
                                "attribute": "Gy1fkmBZpFk",
                                "value": `${idOrgUnit}`
                            }
                            // {
                            //     "displayName": "Ngày phát hiện THA",
                            //     "attribute": "RSNvyMilQxs",
                            //     "value": `${formatDate(result[i][12])}`
                            // },
                            // {
                            //     "displayName": "Nơi phát hiện THA",
                            //     "attribute": "ZYzDKzTIhM2",
                            //     "value": `${convertCode(result[i][13])}`
                            // }
                            // {
                            //     "displayName": "Ngày phát hiện ĐTĐ",
                            //     "attribute": "LnYKf02oBmF",
                            //     "value": `${formatDate(result[i][12])}`
                            // },
                            // {
                            //     "displayName": "Nơi phát hiện ĐTĐ",
                            //     "attribute": "LHVZXlBbn2l",
                            //     "value": `${convertCode(result[i][13])}`
                            // }
                            // {
                            //     "displayName": "Ngày phát hiện ĐTĐ",
                            //     "attribute": "LnYKf02oBmF",
                            //     "value": `${formatDate(result[i][12])}`
                            // },
                            // {
                            //     "displayName": "Nơi phát hiện ĐTĐ",
                            //     "attribute": "LHVZXlBbn2l",
                            //     "value": `${convertCode(result[i][13])}`
                            // }
                        ]
                    }
                }
                resultTei.trackedEntityInstances.push(mTei)
                let iTei = {
                    "trackedEntityInstances": []
                };
                iTei.trackedEntityInstances.push(mTei)
                if(sheetName == 'DTD'){
                    fs.writeFileSync(`${__dirname}/output/importEnrollments-${sheetName}.json`, JSON.stringify(resultEnrollments));
                    console.log("[*] Create JSON files New Enrollments successfully!!")
                }
                if(sheetName == 'THA'){
                    fs.writeFileSync(`${__dirname}/output/importEnrollments-${sheetName}.json`, JSON.stringify(resultEnrollments));
                    console.log("[*] Create JSON files New Enrollments successfully!!")
                }
                if(sheetName == 'COPD'){
                    fs.writeFileSync(`${__dirname}/output/importEnrollments-${sheetName}.json`, JSON.stringify(resultEnrollments));
                    console.log("[*] Create JSON files New Enrollments successfully!!")
                }
                console.log(i, await importTei(iTei))
            }
    }
    fs.writeFileSync(`${__dirname}/output/importEnrollments-${orgName}-${sheetName}.json`, JSON.stringify(resultEnrollments));
    console.log("[*] Create JSON files New Enrollments successfully!!")
    fs.writeFileSync(`${__dirname}/output/importTeis-${orgName}-${sheetName}.json`, JSON.stringify(resultTei));
    console.log("[*] Create JSON files New Teis successfully!!")
}

function formatDate(mdate) {
    if (mdate == '') return ''
    let style = mdate.substr(-5).charAt(0)
    let mdateYear = `${mdate.split(`${style}`)[2]}`
    let mdateMonth = `0${mdate.split(`${style}`)[1]}`.substr(-2)
    let mdateDay = `0${mdate.split(`${style}`)[0]}`.substr(-2)
    mdate = `${mdateYear}-${mdateMonth}-${mdateDay}`
    return mdate
}

function convertCode(mValue) {
    if (mValue == '') return ''
    else if (mValue && mValue.toLowerCase() == 'Nam'.toLowerCase()) {
        return '01'
    }
    else if (mValue && mValue.toLowerCase() == 'Nữ'.toLowerCase()) {
        return '02'
    }
    else if (mValue && mValue.toLowerCase() == 'Nữ'.toLowerCase()) {
        return '02'
    }
    else if (mValue && mValue.toLowerCase() == 'Trạm Y tế'.toLowerCase()) {
        return '1'
    }
    else if (mValue && mValue.toLowerCase() == 'TYT'.toLowerCase()) {
        return '1'
    }
    else if (mValue && mValue.toLowerCase() == 'Bệnh viện huyện'.toLowerCase()) {
        return '2'
    }
    else if (mValue && mValue.toLowerCase() == 'BVH'.toLowerCase()) {
        return '2'
    }
    else if (mValue && mValue.toLowerCase() == 'Bệnh viện tỉnh'.toLowerCase()) {
        return '3'
    }
    else if (mValue && mValue.toLowerCase() == 'BVT'.toLowerCase()) {
        return '3'
    }
    else if (mValue && mValue.toLowerCase() == 'Bệnh viện trung ương'.toLowerCase()) {
        return '4'
    }
    else if (mValue && mValue.toLowerCase() == 'Bệnh viện tư nhân'.toLowerCase()) {
        return '5'
    }
    else if (mValue && mValue.toLowerCase() == 'Khác'.toLowerCase()) {
        return '6'
    }
    else if (mValue && mValue.toLowerCase() == 'K'.toLowerCase()) {
        return '6'
    }
    else {
        return '6'
    }
}

function add0toCMT(mCMT) {
    if (mCMT == '') return ''
    return mCMT = `0${mCMT}`
}

function checkTeiTHAbyBHYTExist(mBHYT) {
    return new Promise((resolve, reject) => {
        let result = { "status": "0", "teiID": "", "orgUnitID": "" };
        let url = ``
        if (mBHYT != '') {
            url = baseUrl + `/api/trackedEntityInstances.json?ou=nJm9lSLVvG8&ouMode=ACCESSIBLE&attribute=JHb1hzseNMg:EQ:${mBHYT}&paging=false`
            _axios.get(url, authentication).then(res => {
                let checkKey = res.data.trackedEntityInstances.length
                if (checkKey == 1) {
                    result.status = '1'
                    result.teiID = res.data.trackedEntityInstances[0].trackedEntityInstance;
                    result.orgUnitID = res.data.trackedEntityInstances[0].orgUnit;
                } else {
                    result.status = '0'
                }
                resolve(result);
            })
        }        
    })
}

function checkTeiTHAbyCMTExist(mCMT) {
    return new Promise((resolve, reject) => {
        let result = { "status": "0", "teiID": "", "orgUnitID": "" };
        let url = `` 
        if (mCMT != '') {
            url = baseUrl + `/api/trackedEntityInstances.json?ou=nJm9lSLVvG8&ouMode=ACCESSIBLE&attribute=ZQ93P672wQR:EQ:${mCMT}&paging=false`
            _axios.get(url, authentication).then(res => {
                let checkKey = res.data.trackedEntityInstances.length
                if (checkKey == 1) {
                    result.status = '1'
                    result.teiID = res.data.trackedEntityInstances[0].trackedEntityInstance;
                    result.orgUnitID = res.data.trackedEntityInstances[0].orgUnit;
                } else {
                    result.status = '0'
                }
                resolve(result);
            })
        }
        
    })
}

function checkTeiDTDExist(mBHYT, mCMT) {
    return new Promise((resolve, reject) => {
        let result = { "status": "", "teiID": "", "orgUnitID": "" };
        let url = ``        
        if (mBHYT != '') {
            url = baseUrl + `/api/trackedEntityInstances.json?ou=nJm9lSLVvG8&ouMode=ACCESSIBLE&program=a7arqsOKzsr&attribute=JHb1hzseNMg:EQ:${mBHYT}&paging=false`
        } else {
            url = baseUrl + `/api/trackedEntityInstances.json?ou=nJm9lSLVvG8&ouMode=ACCESSIBLE&program=a7arqsOKzsr&attribute=ZQ93P672wQR:EQ:${mCMT}&paging=false`
        }
        _axios.get(url, authentication).then(res => {
            let checkKey = res.data.trackedEntityInstances.length
            if (checkKey == 1) {
                result.status = '1'
                result.teiID = res.data.trackedEntityInstances[0].trackedEntityInstance;
                result.orgUnitID = res.data.trackedEntityInstances[0].orgUnit;
            } else {
                result.status = '0'
            }
            resolve(result);
        })
    })
}

function importTei(iTei) {
    return new Promise((resolve, reject) => {
        let result = { "status": "", "teiID": "", "orgUnitID": "" };
        let url = ``
        url = baseUrl + `/api/trackedEntityInstances`
        // _axios.post(url, authentication).then(res => {
        //     let checkKey = res.data.trackedEntityInstances.length
        //     if (checkKey == 1) {
        //         result.status = '1'
        //         result.teiID = res.data.trackedEntityInstances[0].trackedEntityInstance;
        //         result.orgUnitID = res.data.trackedEntityInstances[0].orgUnit;
        //     } else {
        //         result.status = '0'
        //     }
        //     resolve(result);
        // })
        _axios({
            method: "post",
            url: url,
            auth: {
                username: 'anhth',
                password: 'Csdl2018@)!*'
            },
            data: iTei
          })
            .then(function (response) {
              //handle success
              result.status = response.data.message;
              console.log(response);
              resolve(result);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
    })
}
