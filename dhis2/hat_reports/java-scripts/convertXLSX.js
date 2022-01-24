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

let workbook = xlsx.readFile(`${__dirname}/input/DaNang-NHS-DTD.xlsx`);
console.log(workbook);

let arrSheetNames = workbook.SheetNames;
for(let s = 0; s < arrSheetNames.length; s++) {
    let sheetName = workbook.SheetNames[s];
    // Name file output
    let orgName = 'HaNam'

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

    //Tuyen Quang
    
    let arrOrgTQ = [
        {
            "id": "Ao8hZC6kMGq",
            "name": "Xã Tân Mỹ"
        },
        {
            "id": "aOciGoBJAkd",
            "name": "Xã Tuân Lộ"
        },
        {
            "id": "aPM38Qy0G8s",
            "name": "Xã Lương Thiện"
        },
        {
            "id": "apVgIFr4DI9",
            "name": "Phòng khám đa khoa khu vực Minh Đức"
        },
        {
            "id": "at4RT6tuwlX",
            "name": "Xã Trung Yên"
        },
        {
            "id": "bdkxIVY5Kjc",
            "name": "Xã Kháng Nhật"
        },
        {
            "id": "bFLeIZn8ikF",
            "name": "Xã Lưỡng Vượng"
        },
        {
            "id": "BGye2Ep3EMg",
            "name": "Xã Thượng Ấm"
        },
        {
            "id": "BUrlb4yucE7",
            "name": "Xã Phúc Thịnh"
        },
        {
            "id": "bXkuGL5X8sr",
            "name": "Xã Sinh Long"
        },
        {
            "id": "C0r8VlCDQDX",
            "name": "Xã Kiến Thiết"
        },
        {
            "id": "Cacfnp7bIqy",
            "name": "Xã Bình Phú"
        },
        {
            "id": "CB4qsjGwwhe",
            "name": "Phòng khám đa khoa khu vực Thượng Lâm"
        },
        {
            "id": "ch5njKVl7wl",
            "name": "Xã Minh Khương"
        },
        {
            "id": "CI7Kpd661tp",
            "name": "Xã Phú Bình"
        },
        {
            "id": "CiDzNVNxs0p",
            "name": "Xã Lăng Can"
        },
        {
            "id": "CoOSorWieTE",
            "name": "Xã Hà Lang"
        },
        {
            "id": "CpkUKGF88i1",
            "name": "Xã Đại Phú"
        },
        {
            "id": "DadahC429sG",
            "name": "Xã Mỹ Bằng"
        },
        {
            "id": "DCGjNykzoom",
            "name": "Xã Thanh Tương"
        },
        {
            "id": "DegOisQareM",
            "name": "Xã Thành Long"
        },
        {
            "id": "deJsJbgv7gs",
            "name": "Xã Lang Quán"
        },
        {
            "id": "dF77Q6FQiCH",
            "name": "Phường Hưng Thành"
        },
        {
            "id": "EbLKZIzNJAr",
            "name": "Xã Tri Phú"
        },
        {
            "id": "EbS41jqY4Es",
            "name": "Thị trấn Na Hang"
        },
        {
            "id": "eBX9Rx7TvKY",
            "name": "Xã Thái Bình"
        },
        {
            "id": "EeZstGo7KQO",
            "name": "Xã Bình Yên"
        },
        {
            "id": "Egu7WvW3RdK",
            "name": "Xã Sơn Phú"
        },
        {
            "id": "EQT1UMSBSvX",
            "name": "Xã Yên Lập"
        },
        {
            "id": "EQuzG322Ktt",
            "name": "Xã Trung Sơn"
        },
        {
            "id": "euslnYxlhKe",
            "name": "Xã Hào Phú"
        },
        {
            "id": "eyfx9xJQrPp",
            "name": "Xã Chi Thiết"
        },
        {
            "id": "fekqN1X2g0a",
            "name": "Xã Lực Hành"
        },
        {
            "id": "GaZfdMYnKV5",
            "name": "Xã Chiêu Yên"
        },
        {
            "id": "GcYESJacg2u",
            "name": "Xã Trung Hòa"
        },
        {
            "id": "GEb10bpNq4o",
            "name": "Xã Kim Phú"
        },
        {
            "id": "GpYk5o8v818",
            "name": "Phòng khám đa khoa khu vực Sơn Nam"
        },
        {
            "id": "gQWu9jlzBhx",
            "name": "Xã Khuôn Hà"
        },
        {
            "id": "gTSudwwK6b2",
            "name": "Xã Yên Hoa"
        },
        {
            "id": "GTz50yuFLcw",
            "name": "Xã Nông Tiến"
        },
        {
            "id": "Hb2X7605oR3",
            "name": "Xã Tân Long"
        },
        {
            "id": "hV0u7LYFMYH",
            "name": "Xã Bình An"
        },
        {
            "id": "IJ282kpUKyc",
            "name": "TTYT Huyện Lâm Bình"
        },
        {
            "id": "IluiDTEqPkB",
            "name": "Xã Vân Sơn"
        },
        {
            "id": "ISb87wMHsVT",
            "name": "Xã Ngọc Hội"
        },
        {
            "id": "iSwGx8lpcSg",
            "name": "Thị trấn Sơn Dương"
        },
        {
            "id": "iWKJ6ZovaDz",
            "name": "Phòng khám đa khoa khu vực Đông Thọ"
        },
        {
            "id": "izQeNXR56nY",
            "name": "TTYT Huyện Na Hang"
        },
        {
            "id": "JAGKsRMpvqN",
            "name": "Xã Tân Tiến"
        },
        {
            "id": "JEcqL6bO8Us",
            "name": "Xã Thượng Lâm"
        },
        {
            "id": "jEOEFB2jygF",
            "name": "Xã Tân An"
        },
        {
            "id": "JGGRw6l9KNS",
            "name": "Xã Cấp Tiến"
        },
        {
            "id": "jK13IKhk3h5",
            "name": "Xã Hồng Lạc"
        },
        {
            "id": "jzv60RwbIUT",
            "name": "Xã Năng Khả"
        },
        {
            "id": "k9w8JMBYcqU",
            "name": "Xã Tân Thành"
        },
        {
            "id": "kdn5s6TGk5M",
            "name": "Xã Sầm Dương"
        },
        {
            "id": "KI7rnwyFWvM",
            "name": "Xã Mỹ Bằng"
        },
        {
            "id": "KlJaC0eHtLT",
            "name": "Xã Kiên Đài"
        },
        {
            "id": "KLqYFiGXmhL",
            "name": "Xã Thái Hòa"
        },
        {
            "id": "kMbJZ5cVyV1",
            "name": "Xã Phúc Ứng"
        },
        {
            "id": "koDcRjGiAoW",
            "name": "Xã Thượng Giáp"
        },
        {
            "id": "kq0JGaJi593",
            "name": "Xã Minh Hương"
        },
        {
            "id": "KShjpXCgv0Z",
            "name": "Xã Hùng Mỹ"
        },
        {
            "id": "KzzGoa0AWyE",
            "name": "Xã Đà Vị"
        },
        {
            "id": "l05pELLCEKB",
            "name": "Xã Bình Nhân"
        },
        {
            "id": "LduyoSR6wZD",
            "name": "Xã Phú Lương"
        },
        {
            "id": "Lo9THxbyK8D",
            "name": "Xã Trường Sinh"
        },
        {
            "id": "lPnY37ZljbT",
            "name": "Xã Thắng Quân"
        },
        {
            "id": "luDR5WXjQNf",
            "name": "Xã Ninh Lai"
        },
        {
            "id": "M9Ck237YtQX",
            "name": "Xã Minh Quang"
        },
        {
            "id": "MBAECdfkobR",
            "name": "Phường Phan Thiết"
        },
        {
            "id": "mIKhLQcbckz",
            "name": "Xã Kim Bình (sáp nhập 2020)"
        },
        {
            "id": "mMgkUr4gQMY",
            "name": "Xã Hồng Thái"
        },
        {
            "id": "mNCCHPJpiZC",
            "name": "Xã Xuân Lập"
        },
        {
            "id": "MpN8gsmLp01",
            "name": "Xã Văn Phú"
        },
        {
            "id": "mSLbNRLxduw",
            "name": "Xã Thổ Bình"
        },
        {
            "id": "MTpIA7MkNTh",
            "name": "Xã Đức Ninh"
        },
        {
            "id": "N02icnbuHPs",
            "name": "Xã Thiện Kế"
        },
        {
            "id": "n2yCAMNnOIT",
            "name": "Xã Thanh Phát"
        },
        {
            "id": "N9i7lj2a6qS",
            "name": "Xã Kim Phú"
        },
        {
            "id": "njb04sHNMZf",
            "name": "Xã Yên Phú"
        },
        {
            "id": "NtYcDUgzGiD",
            "name": "Xã Hợp Thành"
        },
        {
            "id": "O50BaBevv4z",
            "name": "Phòng khám đa khoa khu vực Tân Trào"
        },
        {
            "id": "ohXJYdb9ILy",
            "name": "Xã Thái Sơn"
        },
        {
            "id": "Onfyj2OJaNI",
            "name": "Xã Vĩnh Lợi"
        },
        {
            "id": "OOPHGOUqYwc",
            "name": "Xã Bằng Cốc"
        },
        {
            "id": "oPCZt28s1JO",
            "name": "Xã Công Đa"
        },
        {
            "id": "OPoGDTFhcvm",
            "name": "Phòng khám đa khoa khu vực Kim Bình"
        },
        {
            "id": "opx7LRh6X0b",
            "name": "Xã Chân Sơn"
        },
        {
            "id": "pDuJndDBISd",
            "name": "Xã Hoàng Khai"
        },
        {
            "id": "plYC9Tl4xwG",
            "name": "Xã Tân Thịnh"
        },
        {
            "id": "pmI2kACbq3S",
            "name": "Thị trấn Tân Yên"
        },
        {
            "id": "PocfIjAsEzF",
            "name": "Xã Trung Trực"
        },
        {
            "id": "pUQAJJ6cZiW",
            "name": "Xã Tràng Đà"
        },
        {
            "id": "PVGWP8it3qk",
            "name": "Xã Phú Thịnh"
        },
        {
            "id": "pYIKQzzSdrm",
            "name": "PYT Huyện Chiêm Hóa"
        },
        {
            "id": "q8kpRBMylby",
            "name": "Xã Tú Thịnh"
        },
        {
            "id": "qft40HloXsa",
            "name": "Xã Tam Đa"
        },
        {
            "id": "QKmSEb6Ljd7",
            "name": "Xã An Khang"
        },
        {
            "id": "QnqVqw1BoWW",
            "name": "Xã Thượng Nông"
        },
        {
            "id": "QSgNmi4DIhv",
            "name": "Xã Phúc Yên"
        },
        {
            "id": "QSrq09Th9ye",
            "name": "TTYT Huyện Yên Sơn"
        },
        {
            "id": "qtbobsQOTWj",
            "name": "Xã Phúc Sơn"
        },
        {
            "id": "qTqc9nSDk3J",
            "name": "Xã Linh Phú"
        },
        {
            "id": "qU0IdVd5Uys",
            "name": "Xã Nhữ Hán"
        },
        {
            "id": "r03rCiQ8jn8",
            "name": "Xã Đạo Viện"
        },
        {
            "id": "R66pQ8qiphr",
            "name": "Xã Phù Lưu"
        },
        {
            "id": "r7NwkAiEduf",
            "name": "Xã Trung Minh"
        },
        {
            "id": "RiYXLlnULL7",
            "name": "TTYT Huyện Chiêm Hóa"
        },
        {
            "id": "RrfqlLlKlpL",
            "name": "Phường Tân Quang"
        },
        {
            "id": "rwQCL8WELiC",
            "name": "Xã Vinh Quang"
        },
        {
            "id": "S3lXakVZw0Z",
            "name": "Xã Bình Xa"
        },
        {
            "id": "s45LR7HxcWx",
            "name": "Xã Yên Thuận"
        },
        {
            "id": "S8qeJmxRVxc",
            "name": "Phường Ỷ La"
        },
        {
            "id": "sgfFXlr4FVx",
            "name": "Xã Hồng Quang"
        },
        {
            "id": "SkVbz49Iq2p",
            "name": "Xã Đông Lợi"
        },
        {
            "id": "t0jo1wFSINU",
            "name": "Phường Minh Xuân"
        },
        {
            "id": "TbfZEm1557C",
            "name": "Xã Đồng Quý"
        },
        {
            "id": "TcTN0OHFYBr",
            "name": "Xã Trung Hà"
        },
        {
            "id": "TFCX9mlgXMh",
            "name": "Bệnh viện đa khoa khu vực Kim Xuyên"
        },
        {
            "id": "TgR7EpUgKL8",
            "name": "Xã Yên Lâm"
        },
        {
            "id": "tkp7HEVCx7b",
            "name": "Xã Bạch Xa"
        },
        {
            "id": "tLJSll2tyTT",
            "name": "Xã Nhữ Khê"
        },
        {
            "id": "tsbYiHGCmtu",
            "name": "TTYT Huyện Sơn Dương"
        },
        {
            "id": "TzrKgDBgy6F",
            "name": "Xã Côn Lôn"
        },
        {
            "id": "u3aQ3q69swL",
            "name": "Xã Hòa An"
        },
        {
            "id": "UckKLLfRDUy",
            "name": "Xã Kim Quan"
        },
        {
            "id": "uIwUuXsVE8k",
            "name": "Phòng khám đa khoa khu vực Trung Môn"
        },
        {
            "id": "uPL70NZK1SZ",
            "name": "Phường Tân Hà"
        },
        {
            "id": "V5eQOBCHlYL",
            "name": "Xã Minh Dân"
        },
        {
            "id": "vb011JLk42r",
            "name": "Xã Tân Thanh"
        },
        {
            "id": "vFA5rFjvSHH",
            "name": "Xã Lâm Xuyên"
        },
        {
            "id": "VGz6UJ91yIf",
            "name": "Xã Yên Nguyên"
        },
        {
            "id": "vRTCzLa9j6P",
            "name": "Xã Vĩnh Lộc"
        },
        {
            "id": "w00uPblObUH",
            "name": "Xã Đội Bình"
        },
        {
            "id": "wJxra9SGrcm",
            "name": "Xã Sơn Nam"
        },
        {
            "id": "WNlPKbbHr5c",
            "name": "Xã Tân Trào"
        },
        {
            "id": "WorBUtRyGda",
            "name": "Xã Quí Quân"
        },
        {
            "id": "WRBaASCnbNq",
            "name": "Xã Mỹ Bằng"
        },
        {
            "id": "wSNcnFEXnUu",
            "name": "Xã Tiến Bộ"
        },
        {
            "id": "WTT8VFmOHMS",
            "name": "Xã Quyết Thắng"
        },
        {
            "id": "wvk8jUdCzvO",
            "name": "Xã Hợp Hòa"
        },
        {
            "id": "XgIPJFcOKlJ",
            "name": "Xã Phúc Ninh"
        },
        {
            "id": "XifvXlkKRIc",
            "name": "Xã Hòa Phú"
        },
        {
            "id": "xo9G70YGpDN",
            "name": "TTYT Huyện Hàm Yên"
        },
        {
            "id": "XPGD5WaEYbh",
            "name": "Xã Xuân Quang"
        },
        {
            "id": "xPZXafTvaBE",
            "name": "Xã Đội Cấn"
        },
        {
            "id": "xSMqmMfEtRB",
            "name": "Bệnh viện đa khoa khu vực ATK"
        },
        {
            "id": "XyjN2FhMdi4",
            "name": "Xã Nhân Lý"
        },
        {
            "id": "Y6Ac0DRxUyD",
            "name": "Phòng khám đa khoa khu vực Xuân Vân"
        },
        {
            "id": "yGNiBdr1CQ1",
            "name": "TTYT Thành phố Tuyên Quang"
        },
        {
            "id": "Yj1iB6rjASa",
            "name": "Xã Hùng Đức"
        },
        {
            "id": "Yr4OjTKAM71",
            "name": "Xã An Tường"
        },
        {
            "id": "YTHwjqTZz0M",
            "name": "Xã Tuân Lộ (Sáp nhập 2019)"
        },
        {
            "id": "YwYOSCmIk3U",
            "name": "Xã Khau Tinh"
        },
        {
            "id": "YYH8eFFgMfG",
            "name": "Xã Đông Thọ"
        },
        {
            "id": "Z4uys10Wji8",
            "name": "Xã Minh Thanh"
        },
        {
            "id": "z9dbwWQTxHc",
            "name": "Xã Thái Long"
        },
        {
            "id": "Zldr0gCrmDl",
            "name": "Xã Mỹ Lâm"
        },
        {
            "id": "ZM2M7hlsJXc",
            "name": "Xã Hùng Lợi"
        },
        {
            "id": "znTVV1j1ARV",
            "name": "Bệnh viện đa khoa khu vực Yên Hoa"
        },
        {
            "id": "ZUe8EYH7XMK",
            "name": "Xã Nhân Mục"
        }
    ]
    // Đà Nẵng 
    let arrOrgDN = [
        {
            "id": "wIalkCzACQj",
            "name": "Xã Hòa Tiến"
        },
        {
            "id": "gbVsphERWss",
            "name": "Xã Hòa Sơn"
        },
        {
            "id": "uHWxsxidHC7",
            "name": "Xã Hòa Phước"
        },
        {
            "id": "FM7qJDqeMHy",
            "name": "Xã Hòa Phú"
        },
        {
            "id": "hjNrbG13pjM",
            "name": "Xã Hòa Phong"
        },
        {
            "id": "WScH4nlKM3n",
            "name": "Xã Hòa Ninh"
        },
        {
            "id": "ROs7d2KcgZY",
            "name": "Xã Hòa Nhơn"
        },
        {
            "id": "wRi1pfZEV2j",
            "name": "Xã Hòa Liên"
        },
        {
            "id": "nVXmcjVbnzq",
            "name": "Xã Hòa Khương"
        },
        {
            "id": "iK3o60855pY",
            "name": "Xã Hòa Châu"
        },
        {
            "id": "GCJ1R0Mz0dp",
            "name": "Xã Hòa Bắc"
        },
        {
            "id": "VdDXA128d3v",
            "name": "TTYT Huyện Hòa Vang"
        },
        {
            "id": "CojKnhd2eWO",
            "name": "PYT Huyện Hòa Vang"
        },
        {
            "id": "r4cDEYNKzqe",
            "name": "Trạm Y tế xã"
        },
        {
            "id": "GxBVwYU8tfT",
            "name": "TTYT Quận Cẩm Lệ"
        },
        {
            "id": "SkaeGGFWlln",
            "name": "PYT Quận Cẩm Lệ"
        },
        {
            "id": "vD0Cnw7stl0",
            "name": "Phường Khuê Trung"
        },
        {
            "id": "jvceaP4qJeG",
            "name": "Phường Hòa Xuân"
        },
        {
            "id": "ZN1SxRXkjCj",
            "name": "Phường Hòa Thọ Đông"
        },
        {
            "id": "vX0XpAvoNto",
            "name": "Phường Hòa Thọ Tây"
        },
        {
            "id": "g2xRUfqVQ2I",
            "name": "Phường Hoà Phát"
        },
        {
            "id": "P5k8LFZJIiM",
            "name": "Phường Hoà An"
        },
        {
            "id": "HMwpbZTyBmY",
            "name": "Phòng khám đa khoa Hữu Thọ - Công ty TNHH MTV Dịch vụ y tế Hữu Thọ"
        },
        {
            "id": "hKfjDcUQrc1",
            "name": "Phòng khám đa khoa Hòa Xuân"
        },
        {
            "id": "D45JGT03cHr",
            "name": "TTYT Quận Hải Châu"
        },
        {
            "id": "vdZLFbCOS9X",
            "name": "Trung tâm y khoa - Đại học Đà Nẵng"
        },
        {
            "id": "nuV6uw0aogl",
            "name": "Trung tâm chẩn đoán y khoa kỹ thuật cao Thiện Nhân"
        },
        {
            "id": "nY7uHHnKbMU",
            "name": "Trung tâm chẩn đoán y khoa - Đại học kỹ thuật y dược Đà Nẵng"
        },
        {
            "id": "CkDNv7fr1un",
            "name": "Trung tâm Bác sĩ Gia đình Phúc Khang Đà Nẵng"
        },
        {
            "id": "pC1DrMortWS",
            "name": "PYT Quận Hải Châu"
        },
        {
            "id": "h5mWweEAs9A",
            "name": "Phường Thạch Thang"
        },
        {
            "id": "znY2eRyu73E",
            "name": "Phường Thuận Phước"
        },
        {
            "id": "kjOCXmvyIEt",
            "name": "Phường Thanh Bình"
        },
        {
            "id": "iuJoYXyv1wr",
            "name": "Phường Phước Ninh"
        },
        {
            "id": "Fub4abaIsy2",
            "name": "Phường Nam Dương"
        },
        {
            "id": "sDOvc7R1T0n",
            "name": "Phường Hải Châu 2"
        },
        {
            "id": "UQxZpBKQNBE",
            "name": "Phường Hải Châu 1"
        },
        {
            "id": "aCd2wIw5Jes",
            "name": "Phường Hòa Thuận Đông"
        },
        {
            "id": "YVfZ0fcTdfm",
            "name": "Phường Hòa Thuận Tây"
        },
        {
            "id": "kqPYcZv4haX",
            "name": "Phường Hòa Cường Nam"
        },
        {
            "id": "hsqfRzxTe8k",
            "name": "Phường Hòa Cường Bắc"
        },
        {
            "id": "dorBUGxZc4u",
            "name": "Phường Bình Thuận"
        },
        {
            "id": "BoIwj93ubmX",
            "name": "Phường Bình Hiên"
        },
        {
            "id": "wtVz1ke8Gmg",
            "name": "Phòng khám đa khoa Thiện Phước"
        },
        {
            "id": "di3T9jVF8rT",
            "name": "Phòng khám đa khoa quốc tế Đông Phương"
        },
        {
            "id": "HpHcQQmEZbv",
            "name": "Phòng khám đa khoa Phương Đông"
        },
        {
            "id": "gjW2pLWZFtj",
            "name": "Phòng khám đa khoa Hồng Phước"
        },
        {
            "id": "cFRyMLO6nLZ",
            "name": "Phòng khám đa khoa An Phúc"
        },
        {
            "id": "EiFM94jzGTH",
            "name": "Phòng khám Gia đình"
        },
        {
            "id": "gVZ2zB7kVNi",
            "name": "TTYT Quận Liên Chiểu"
        },
        {
            "id": "M2a8zNmQ7YQ",
            "name": "PYT Quận Liên Chiểu"
        },
        {
            "id": "TAnm1fKQCfk",
            "name": "Phường Hòa Khánh Bắc"
        },
        {
            "id": "VbE7SMRIFr1",
            "name": "Phường Hoà Minh"
        },
        {
            "id": "eNr5dv5L3qe",
            "name": "Phường Hoà Khánh Nam"
        },
        {
            "id": "eWd48aW55q7",
            "name": "Phường Hoà Hiệp Nam"
        },
        {
            "id": "Ql9fFsBkSod",
            "name": "Phường Hoà Hiệp Bắc"
        },
        {
            "id": "ybhkwBFovtd",
            "name": "Phòng khám đa khoa Ân Đức 1"
        },
        {
            "id": "lApi538sLYZ",
            "name": "Phòng khám đa khoa Y Đức Healthcare"
        },
        {
            "id": "SdHg1tNp1ay",
            "name": "Phòng khám đa khoa Phước An 2"
        },
        {
            "id": "OeuDnflJcvo",
            "name": "Phòng khám đa khoa Pasteur"
        },
        {
            "id": "RD1Nz166Ck3",
            "name": "Phòng khám đa khoa 247"
        },
        {
            "id": "RLpRuh1NKWm",
            "name": "TTYT Quận Ngũ Hành Sơn"
        },
        {
            "id": "zEbuGoGYae6",
            "name": "PYT Quận Ngũ Hành Sơn"
        },
        {
            "id": "PVL7vcFmH0z",
            "name": "Phường Mỹ An"
        },
        {
            "id": "P2IEMq4Fk8A",
            "name": "Phường Khuê Mỹ"
        },
        {
            "id": "hwMgEkDDBjZ",
            "name": "Phường Hoà Quý"
        },
        {
            "id": "EIJvv2oAVKP",
            "name": "Phường Hoà Hải"
        },
        {
            "id": "NQTd084PU3T",
            "name": "TYT Nại Hiên Đông"
        },
        {
            "id": "FQAAGfgJQAg",
            "name": "TTYT Quận Sơn Trà"
        },
        {
            "id": "nrjcX4s4enP",
            "name": "PYT Quận Sơn Trà"
        },
        {
            "id": "LGoS6h5M7kY",
            "name": "Phường Thọ Quang"
        },
        {
            "id": "Udpd7u9ZJeW",
            "name": "Phường Phước Mỹ"
        },
        {
            "id": "krrsxoqYccg",
            "name": "Phường Mân Thái"
        },
        {
            "id": "wmLYgxEz00N",
            "name": "Phường An Hải Đông"
        },
        {
            "id": "DuPzgsUKOG1",
            "name": "Phường An Hải Tây"
        },
        {
            "id": "evAkosLJyiI",
            "name": "Phường An Hải Bắc"
        },
        {
            "id": "Ft6Uw7OhGe7",
            "name": "Phòng khám đa khoa Phúc Khang"
        },
        {
            "id": "QM9ien3FAor",
            "name": "TTYT Quận Thanh Khê"
        },
        {
            "id": "UmCjZE4qrDZ",
            "name": "PYT Quận Thanh Khê"
        },
        {
            "id": "jcBFxJzWrxN",
            "name": "Phường Xuân Hà"
        },
        {
            "id": "XyMM8LdcSUX",
            "name": "Phường Vĩnh Trung"
        },
        {
            "id": "Xq8cbVyEo9y",
            "name": "Phường Tân Chính"
        },
        {
            "id": "xvkRzIJYcB8",
            "name": "Phường Thạc Gián"
        },
        {
            "id": "nFnuBAC1nKo",
            "name": "Phường Thanh Khê Đông"
        },
        {
            "id": "gNDG92mJHhF",
            "name": "Phường Thanh Khê Tây"
        },
        {
            "id": "VOgZKW4UJYk",
            "name": "Phường Tam Thuận"
        },
        {
            "id": "aOkad9eKi5A",
            "name": "Phường Hòa Khê"
        },
        {
            "id": "ScwYmCCkSAT",
            "name": "Phường Chính Gián"
        },
        {
            "id": "QSuBhuQo6Ol",
            "name": "Phường An Khê"
        },
        {
            "id": "mEYN8ORDo6o",
            "name": "Phòng khám đa khoa Thiên Kim"
        },
        {
            "id": "YZgywqEjywO",
            "name": "Phòng khám đa khoa Hữu Nghị"
        }
    ]

    //Phú Yên
    let arrOrgPY = [
        {
            "id": "a1jZGf2P85p",
            "name": "Xã Suối Trai"
        },
        {
            "id": "A50W9mKkTqi",
            "name": "Xã Xuân Quang 3"
        },
        {
            "id": "aaeVIEhzOpC",
            "name": "Xã Hòa Tân Đông"
        },
        {
            "id": "aENYcJvnZTz",
            "name": "Xã Xuân Thọ 1"
        },
        {
            "id": "b7scBzgplma",
            "name": "Xã Hòa Định Đông"
        },
        {
            "id": "bDrVD9V4VTL",
            "name": "Xã Xuân Quang 2"
        },
        {
            "id": "bG5JwN04nBW",
            "name": "Xã Hòa Tân Tây"
        },
        {
            "id": "blX6K9M85Km",
            "name": "Phường 5"
        },
        {
            "id": "bv3vj9p8cle",
            "name": "TTYT Huyện Đồng Xuân"
        },
        {
            "id": "C9cnPGbO5KZ",
            "name": "Phòng Y tế Dân số huyện Phú Hòa"
        },
        {
            "id": "CT9TEcDxXAN",
            "name": "Xã Hòa Quang Nam"
        },
        {
            "id": "CTj7pXnhHt0",
            "name": "Xã Phú Mỡ"
        },
        {
            "id": "DaHe0uPopan",
            "name": "Xã Xuân Cảnh"
        },
        {
            "id": "dF9Eua6tu2a",
            "name": "Xã An Hòa Hải"
        },
        {
            "id": "dFPIp2Lchvi",
            "name": "Xã Sông Hinh"
        },
        {
            "id": "dfZzut83Mz5",
            "name": "Phường Hòa Xuân Tây"
        },
        {
            "id": "eIr0WCxMOgu",
            "name": "Xã Bình Ngọc"
        },
        {
            "id": "eJWSEVZZbPu",
            "name": "Xã Xuân Phương"
        },
        {
            "id": "enHpSA0B5QA",
            "name": "Xã Xuân Bình"
        },
        {
            "id": "EUQgnNw0YsT",
            "name": "Phòng Y tế Dân số thành phố Tuy Hòa"
        },
        {
            "id": "ExLhEwh7d4h",
            "name": "Phòng Y tế Dân số huyện Sơn Hòa"
        },
        {
            "id": "F9ABiyiikkE",
            "name": "Xã Hòa Xuân Nam"
        },
        {
            "id": "fdZOCr3tFCY",
            "name": "TTYT Thị xã Sông Cầu"
        },
        {
            "id": "FfoBKmcNGst",
            "name": "Xã Xuân Sơn Bắc"
        },
        {
            "id": "fmdMqElC1w2",
            "name": "Xã An Dân"
        },
        {
            "id": "fo2oeEnEcd8",
            "name": "Xã Hòa Kiến"
        },
        {
            "id": "FTXUjh11IOb",
            "name": "Xã EaBia"
        },
        {
            "id": "fvVpZIW5SK2",
            "name": "Phường Xuân Phú"
        },
        {
            "id": "gEdccq0aPsV",
            "name": "Xã Cà Lúi"
        },
        {
            "id": "gycqDD53vmo",
            "name": "TTYT Huyện Tuy An"
        },
        {
            "id": "H9F9tnsJVWq",
            "name": "Phường Phú Thạnh"
        },
        {
            "id": "HdvNpWSjsoU",
            "name": "Xã Hòa Đồng"
        },
        {
            "id": "hK5ZrAKrxSI",
            "name": "Xã An Thạch"
        },
        {
            "id": "hx3p74OVNRv",
            "name": "Phường 2"
        },
        {
            "id": "HXM15yM64vN",
            "name": "Xã Xuân Lãnh"
        },
        {
            "id": "hZXKJPcRy0T",
            "name": "Xã Hòa Quang Bắc"
        },
        {
            "id": "iO3LdTx26U5",
            "name": "Phòng Y tế Dân số huyện Tây Hòa"
        },
        {
            "id": "J1k1GC28SPO",
            "name": "Xã An Hiệp"
        },
        {
            "id": "j25FYuN7h5h",
            "name": "Xã An Chấn"
        },
        {
            "id": "J60s6HpZe4V",
            "name": "Xã Sơn Giang"
        },
        {
            "id": "Jbjxn7l3a6N",
            "name": "TTYT Huyện Sông Hinh"
        },
        {
            "id": "jDtEL4avcTC",
            "name": "Phường Xuân Đài"
        },
        {
            "id": "jGTSThfO5kW",
            "name": "Xã Xuân Quang 1"
        },
        {
            "id": "Jwpmw3M8Ky0",
            "name": "Xã Hòa Trị"
        },
        {
            "id": "KbG5puyuCMl",
            "name": "Phường 9"
        },
        {
            "id": "kLNJSQyPhRa",
            "name": "Phường Xuân Thành"
        },
        {
            "id": "Kntv5E3Inhw",
            "name": "Xã Sơn Long"
        },
        {
            "id": "KqG04PH0Rq3",
            "name": "TTYT Thành phố Tuy Hoà"
        },
        {
            "id": "KSuZysNyvpk",
            "name": "Xã Xuân Lâm"
        },
        {
            "id": "Kw7paVeZvlT",
            "name": "Thị trấn Củng Sơn"
        },
        {
            "id": "LC7fQxmvEaB",
            "name": "Xã Hòa An"
        },
        {
            "id": "lFhwa0dr8cj",
            "name": "Xã Bình Kiến"
        },
        {
            "id": "liEYtF7rni4",
            "name": "Xã Sơn Nguyên"
        },
        {
            "id": "lViLtORyPjT",
            "name": "Xã Sơn Định"
        },
        {
            "id": "lZAeVS4KzAm",
            "name": "Xã Sơn Hội"
        },
        {
            "id": "MfjnpAf69uO",
            "name": "Xã Đức Bình Tây"
        },
        {
            "id": "MiK3UX7A028",
            "name": "Xã An Ninh Tây"
        },
        {
            "id": "MwJhCRouIF0",
            "name": "Phường Hoà Vinh"
        },
        {
            "id": "N2jESXNq6AH",
            "name": "Phường 8"
        },
        {
            "id": "ncKFzou45pn",
            "name": "Xã An Hải"
        },
        {
            "id": "NewSeezu3d0",
            "name": "Phường Hòa Hiệp Bắc"
        },
        {
            "id": "nkp9qFT3TvK",
            "name": "Xã An Nghiệp"
        },
        {
            "id": "NNUocgB1gkF",
            "name": "Xã An Xuân"
        },
        {
            "id": "NVDSF3QIaQb",
            "name": "Phường Hòa Hiệp Nam"
        },
        {
            "id": "O6pWEQ3j6Xq",
            "name": "Xã Xuân Phước"
        },
        {
            "id": "oCvN2tCIqzq",
            "name": "Phường 1"
        },
        {
            "id": "ofirQAjs2JW",
            "name": "Phòng Y tế Dân số huyện Tuy An"
        },
        {
            "id": "OjuYBVU9uAG",
            "name": "Xã Suối Bạc"
        },
        {
            "id": "oVx7CdSSiNg",
            "name": "Xã An Phú"
        },
        {
            "id": "oybMuoy2x4u",
            "name": "Xã Xuân Hải"
        },
        {
            "id": "OYELNBdLDaJ",
            "name": "Xã Hòa Bình 1"
        },
        {
            "id": "p5JSenswCX5",
            "name": "Phường Phú Đông"
        },
        {
            "id": "P5YSyMc6D1q",
            "name": "Xã EaBar"
        },
        {
            "id": "P8yO75o2Mja",
            "name": "Phường 3"
        },
        {
            "id": "PldiJXvqFww",
            "name": "Xã An Định"
        },
        {
            "id": "pVxksCMEXaS",
            "name": "Xã Đa Lộc"
        },
        {
            "id": "q1TtCh3qjVy",
            "name": "Xã Sơn Hà"
        },
        {
            "id": "qqa0bRQQYYw",
            "name": "Xã Hòa Thịnh"
        },
        {
            "id": "QRumsg8LQeW",
            "name": "Xã Hòa Xuân Đông"
        },
        {
            "id": "qWPHsIRa2c4",
            "name": "Xã Đức Bình Đông"
        },
        {
            "id": "QZExeklV2WJ",
            "name": "Xã Sơn Thành Tây"
        },
        {
            "id": "r3TE3GtrzKd",
            "name": "Xã Krông Pa"
        },
        {
            "id": "Rd7WcSjKrAt",
            "name": "Xã Sơn Thành Đông"
        },
        {
            "id": "rdfLat4lmxV",
            "name": "TTYT Huyện Tây Hoà"
        },
        {
            "id": "rGWKF1haKje",
            "name": "Xã EaTrol"
        },
        {
            "id": "rnApxZz9mbl",
            "name": "TTYT Huyện Sơn Hòa"
        },
        {
            "id": "RXcwdMDoU8t",
            "name": "Phòng Y tế Dân số Thị xã Sông Cầu"
        },
        {
            "id": "sxxgmqYaHtb",
            "name": "Xã Phước Tân"
        },
        {
            "id": "TE14T8gSb8O",
            "name": "Xã An Lĩnh"
        },
        {
            "id": "Tf4iBKzoKJN",
            "name": "Phòng Y tế Dân số thị xã Đông Hòa"
        },
        {
            "id": "tFsRECjUZIi",
            "name": "Xã Ea Lâm"
        },
        {
            "id": "tgVbAzcAIsM",
            "name": "Xã Hòa Mỹ Tây"
        },
        {
            "id": "TmZNY0kWL6g",
            "name": "Phường 6"
        },
        {
            "id": "uBlCx60vLXF",
            "name": "TTYT Thị xã Đông Hòa"
        },
        {
            "id": "UfmLV1onSvd",
            "name": "Xã An Cư"
        },
        {
            "id": "V6FLpsemwIZ",
            "name": "Xã An Hòa"
        },
        {
            "id": "V6xKLGHdrtr",
            "name": "Xã Ealy"
        },
        {
            "id": "vdxjh3E0cki",
            "name": "Xã An Ninh Đông"
        },
        {
            "id": "VrLTc62FSoJ",
            "name": "Xã Hòa Thắng"
        },
        {
            "id": "VvXhk114JkN",
            "name": "Xã Xuân Lộc"
        },
        {
            "id": "VZ04sZrsE5e",
            "name": "TTYT Huyện Phú Hoà"
        },
        {
            "id": "wCfLaJ4Bmon",
            "name": "Xã Hòa Thành"
        },
        {
            "id": "wdm5LoA7FzN",
            "name": "Xã Sơn Xuân"
        },
        {
            "id": "WflbxOQRJVG",
            "name": "Phường 7"
        },
        {
            "id": "WH3VgnOHoPy",
            "name": "Xã Hòa Định Tây"
        },
        {
            "id": "WRnlzF1D6cL",
            "name": "Xã Hòa Phong"
        },
        {
            "id": "wtPUTohJPfr",
            "name": "Xã Ea Bá"
        },
        {
            "id": "WWa7KWEG8Cg",
            "name": "Phòng Y tế Dân số huyện Đồng Xuân"
        },
        {
            "id": "x5pEshYbCo9",
            "name": "Xã Hòa Tâm"
        },
        {
            "id": "XBaNQoWdYDZ",
            "name": "Xã Xuân Thọ 2"
        },
        {
            "id": "XFYYOlCbqaK",
            "name": "Xã Xuân Long"
        },
        {
            "id": "xjuVSH9ofGt",
            "name": "Xã An Mỹ"
        },
        {
            "id": "XSivAy7rfoj",
            "name": "Xã Xuân Hòa"
        },
        {
            "id": "YAYTdFgevYJ",
            "name": "Xã An Thọ"
        },
        {
            "id": "YF05RQxSrSM",
            "name": "Xã Sơn Phước"
        },
        {
            "id": "YIoh1f2vd37",
            "name": "Xã Eachà Rang"
        },
        {
            "id": "yvASzB9rkiJ",
            "name": "Phòng Y tế Dân số huyện Sông Hinh"
        },
        {
            "id": "yxDngqzEKMD",
            "name": "Xã Xuân Thịnh"
        },
        {
            "id": "Zd725vGTTiZ",
            "name": "Xã Hòa Mỹ Đông"
        },
        {
            "id": "ZkNiwwN33jk",
            "name": "Xã Xuân Sơn Nam"
        },
        {
            "id": "ZoFUrOnPF6T",
            "name": "Phường 4"
        },
        {
            "id": "ZPq0OvKsDUf",
            "name": "Xã Hòa Hội"
        },
        {
            "id": "zTzgrnGeAwC",
            "name": "Xã Hòa Phú"
        }
    ]

    // Dak Lak
    let arrOrgDakLak = [
        {
            "id": "A02SSzvNraq",
            "name": "PYT Tp.Buôn Ma Thuột"
        },
        {
            "id": "A7TW3M95sD3",
            "name": "Xã Hòa Thuận"
        },
        {
            "id": "absirJcaslJ",
            "name": "Xã Bình Thuận"
        },
        {
            "id": "Ah4aNp6LevO",
            "name": "Xã Ea BHốk"
        },
        {
            "id": "aJCcdcn0pil",
            "name": "Xã Chư KBô"
        },
        {
            "id": "ajyXb4FsQr3",
            "name": "Xã Hòa Lễ"
        },
        {
            "id": "AlKBJQnM2rI",
            "name": "Xã Ea KPam"
        },
        {
            "id": "aNdvTsFkL6T",
            "name": "Xã Cư Né"
        },
        {
            "id": "AtAF4MvPwmL",
            "name": "Xã Tam Giang"
        },
        {
            "id": "aUtTCSdXrjC",
            "name": "TTYT Huyện Krông Năng"
        },
        {
            "id": "avg1VR5ymqQ",
            "name": "Xã Krông Á"
        },
        {
            "id": "b5uIRPy2AJn",
            "name": "PYT M'Drắk"
        },
        {
            "id": "b6I1b8THnHH",
            "name": "Bệnh viện Mắt Tây Nguyên"
        },
        {
            "id": "bBKJCHHthoK",
            "name": "Xã Ea Siên"
        },
        {
            "id": "bCmu8HD3Zvu",
            "name": "Xã Ea Puk"
        },
        {
            "id": "BdDEY45dftJ",
            "name": "Xã Ea Drông"
        },
        {
            "id": "bFCg6J71aEW",
            "name": "Thị trấn Ea Kar"
        },
        {
            "id": "biQb42JfHXa",
            "name": "Xã Ia JLơi"
        },
        {
            "id": "Bpq2pKALzAf",
            "name": "Phường Tân An"
        },
        {
            "id": "BtlEZUWaMeH",
            "name": "Xã Quảng Điền"
        },
        {
            "id": "CGaufrPpquY",
            "name": "Xã Ea Tir"
        },
        {
            "id": "cj5glf4GKy1",
            "name": "Xã Ea Pil"
        },
        {
            "id": "CJgV002Np7R",
            "name": "Xã Cư Pơng"
        },
        {
            "id": "CJkCNi2HjU8",
            "name": "Xã Cư Prông"
        },
        {
            "id": "CnxWqjpBohn",
            "name": "Xã Ea R'Bin"
        },
        {
            "id": "Cwf2cglwgQd",
            "name": "Phường Thành Nhất"
        },
        {
            "id": "CXx7m878Ylr",
            "name": "Xã Ea Trul"
        },
        {
            "id": "CyG28plKF7a",
            "name": "Bệnh viện Nhi Đức Tâm "
        },
        {
            "id": "D4xar50nJZN",
            "name": "PYT Ea Kar"
        },
        {
            "id": "dFl5UQxMo8h",
            "name": "Xã Hòa An"
        },
        {
            "id": "DkQ17pDLnXf",
            "name": "Xã Vụ Bổn"
        },
        {
            "id": "dlBWmNQ2ZvJ",
            "name": "Xã Ea Sol"
        },
        {
            "id": "DPgFa3CvUb3",
            "name": "Xã Ea Trang"
        },
        {
            "id": "DSGHLnYZE9x",
            "name": "Xã Cư ÊBur"
        },
        {
            "id": "DzENpfpSUxV",
            "name": "Xã Quảng Hiệp"
        },
        {
            "id": "E8zEw69vtla",
            "name": "Phường Tân Tiến"
        },
        {
            "id": "eF5zMsmUwkS",
            "name": "Xã Đắk Liêng"
        },
        {
            "id": "eIjgw1JiZbP",
            "name": "Xã Ea Nuôl"
        },
        {
            "id": "ej3pzWK9AIP",
            "name": "Xã Ea Nam"
        },
        {
            "id": "eNuTqP8bTMI",
            "name": "Xã Ea Tam"
        },
        {
            "id": "ESq6Z1Ms9vo",
            "name": "Xã Hòa Thắng"
        },
        {
            "id": "EvH3upGsJbH",
            "name": "Xã Pơng Drang"
        },
        {
            "id": "EwU53gaK6TG",
            "name": "Phường Đoàn Kết"
        },
        {
            "id": "EwY9aiEfqNW",
            "name": "Xã Cư KTy"
        },
        {
            "id": "FdWowIxWm9S",
            "name": "Phường Thống Nhất"
        },
        {
            "id": "fIpNIRyVkjJ",
            "name": "Xã Ea Ngai"
        },
        {
            "id": "fJZxWMLURsA",
            "name": "Xã Ea Tiêu"
        },
        {
            "id": "fWsywbp8kos",
            "name": "Xã Ea M' Doal"
        },
        {
            "id": "FzEZNrRCP76",
            "name": "Xã Ea Kênh"
        },
        {
            "id": "gbxBsZCoqXu",
            "name": "Phường Đạt Hiếu"
        },
        {
            "id": "GGXNAqLhJjL",
            "name": "Phường Bình Tân"
        },
        {
            "id": "gOCN7bUpUej",
            "name": "Xã Hòa Đông"
        },
        {
            "id": "gu9jOUW65PM",
            "name": "Xã Ea Kuêh"
        },
        {
            "id": "gumi1e7RyVn",
            "name": "Xã Krông Jing"
        },
        {
            "id": "GWTBT7YJkxP",
            "name": "Xã Cư ELang"
        },
        {
            "id": "Gy8CtdJsf9Q",
            "name": "TTYT Huyện Krông Búk"
        },
        {
            "id": "gz1IcnKsGdQ",
            "name": "PYT Krông Bông"
        },
        {
            "id": "H5Y3CCW3Smt",
            "name": "Xã Cư Ê Wi"
        },
        {
            "id": "H8tpLFLT88G",
            "name": "Thị trấn Quảng Phú"
        },
        {
            "id": "HBGsPrf8Pnl",
            "name": "PYT Krông Ana"
        },
        {
            "id": "Hfa9qx8K2tz",
            "name": "Thị trấn Krông Kmar"
        },
        {
            "id": "HkQ52zNzozJ",
            "name": "Xã Ea Ô"
        },
        {
            "id": "hKRRTEXItzJ",
            "name": "Xã Yang Tao"
        },
        {
            "id": "HlR5mEMI32M",
            "name": "Xã Hòa Sơn"
        },
        {
            "id": "hUcMyOxqToB",
            "name": "Xã Ea Kmút"
        },
        {
            "id": "IbfCgxPCgNC",
            "name": "Xã Ea H'MLay"
        },
        {
            "id": "IdRntAXvC2G",
            "name": "PYT Buôn Đôn"
        },
        {
            "id": "iGKzQvQ4XMD",
            "name": "Xã Cư KBang"
        },
        {
            "id": "iKkRu3BZS3B",
            "name": "PYT Krông Năng"
        },
        {
            "id": "iMrodM7opmo",
            "name": "Xã Hòa Tân"
        },
        {
            "id": "INketVj6fnG",
            "name": "TTYT Huyện Cư M'gar"
        },
        {
            "id": "IrxWH5QnXYU",
            "name": "Xã Tân Lập"
        },
        {
            "id": "ItmoVAe8Slz",
            "name": "Phường Tự An"
        },
        {
            "id": "iwmQ1KU7mgV",
            "name": "Xã Tân Tiến"
        },
        {
            "id": "IylwavuEckl",
            "name": "Phường Tân Thành"
        },
        {
            "id": "jij3nc8pc9N",
            "name": "Phường Tân Lập"
        },
        {
            "id": "jk09D8OFqhU",
            "name": "TTYT Huyện Buôn Đôn"
        },
        {
            "id": "jLuN8PLzZ5D",
            "name": "Xã Ea H'leo"
        },
        {
            "id": "JO2OdRyjtpm",
            "name": "Xã Ea D'Rơng"
        },
        {
            "id": "jOX4PLClIcd",
            "name": "Xã Khuê Ngọc Điền"
        },
        {
            "id": "jTujo1l4ak1",
            "name": "Xã Ea Tar"
        },
        {
            "id": "JW4fh2S5Oh7",
            "name": "Xã Ea Sô"
        },
        {
            "id": "JWQy0dPKymB",
            "name": "TTYT Huyện Cư Kuin"
        },
        {
            "id": "kgKhkOzNAID",
            "name": "Phường Thiện An"
        },
        {
            "id": "kHbsu98uwz9",
            "name": "PYT Krông Búk"
        },
        {
            "id": "Ko3hAUpCfax",
            "name": "Xã Ea Ning"
        },
        {
            "id": "kogMqbuKKa9",
            "name": "Xã Ea Tóh"
        },
        {
            "id": "KQnpHPZV7Ml",
            "name": "Xã Cư Drăm"
        },
        {
            "id": "L3YjnphRa6h",
            "name": "Xã Ea Hiu"
        },
        {
            "id": "L5cqmCIaMb6",
            "name": "Xã Ea M'DRóh"
        },
        {
            "id": "L5pu557ANbT",
            "name": "Xã Hòa Thành"
        },
        {
            "id": "lNv4bSfjKta",
            "name": "Phường An Bình"
        },
        {
            "id": "LP3DQZBQKNt",
            "name": "Xã Dlê Yang"
        },
        {
            "id": "LPMaWxGxCDp",
            "name": "Xã Dang Kang"
        },
        {
            "id": "lSfKZWXMNin",
            "name": "TTYT Huyện M'Đrắk"
        },
        {
            "id": "LtWvk1KvnOV",
            "name": "Xã Ea Bung"
        },
        {
            "id": "lVl9Tk3BK34",
            "name": "Xã Ea Rốk"
        },
        {
            "id": "lXsGFrgvz7Z",
            "name": "Xã Dray Sáp"
        },
        {
            "id": "m6p7bj5Yzb2",
            "name": "Xã Ea Blang"
        },
        {
            "id": "m9ub7p1KiEP",
            "name": "TTYT Huyện Krông Bông"
        },
        {
            "id": "mBXJyF566Zm",
            "name": "Xã Cư Huê"
        },
        {
            "id": "MgVGVha7aSU",
            "name": "Xã Hòa Hiệp"
        },
        {
            "id": "mmsWxmfLvdS",
            "name": "TTYT Huyện Ea Kar"
        },
        {
            "id": "MqkYOUpBWwV",
            "name": "Xã Ea Wer"
        },
        {
            "id": "mWI50ur4qWi",
            "name": "Thị trấn Ea Drăng"
        },
        {
            "id": "n59FIt5NSRB",
            "name": "Xã Ea Tu"
        },
        {
            "id": "NbGuMMXc1t2",
            "name": "Xã Ea M'nang"
        },
        {
            "id": "ndNFkwQZnEH",
            "name": "Phường Tân Hòa"
        },
        {
            "id": "nF9Id9FQOOe",
            "name": "PYT Tx Buôn Hồ"
        },
        {
            "id": "nG7wvnVWhLx",
            "name": "Xã Quảng Tiến"
        },
        {
            "id": "nIatpHmcBoa",
            "name": "Xã Cư Dliê M'nông"
        },
        {
            "id": "NMXun4uJ6Mn",
            "name": "Xã Ya Tờ Mốt"
        },
        {
            "id": "No3l9nDOxGE",
            "name": "Xã Bình Hòa"
        },
        {
            "id": "nPCsmpxDLtO",
            "name": "Xã Ea Yiêng"
        },
        {
            "id": "NWCVSckqANS",
            "name": "Xã Hòa Tiến"
        },
        {
            "id": "O3K8QWj3QrU",
            "name": "Thị trấn Ea Pốk"
        },
        {
            "id": "O5TjBdTfmem",
            "name": "Bệnh viện Đa khoa Hòa Bình "
        },
        {
            "id": "oarEdDCgWEF",
            "name": "Bệnh viện đa khoa thị xã Buôn Hồ"
        },
        {
            "id": "of6yXttNKSi",
            "name": "TTYT Huyện Krông Pắc"
        },
        {
            "id": "oFRkrmVqzUD",
            "name": "Thị trấn Phước An"
        },
        {
            "id": "oKDgxm4Gr7P",
            "name": "Xã Ea Hồ"
        },
        {
            "id": "ooqSN71bZu0",
            "name": "Thị trấn Buôn Trấp"
        },
        {
            "id": "OQqcc00r1Rk",
            "name": "Xã Nam Ka"
        },
        {
            "id": "OSGf9iCtuyv",
            "name": "Xã Đắk Nuê"
        },
        {
            "id": "otD5vPva5V8",
            "name": "Xã Ea Ktur"
        },
        {
            "id": "otJyMJzSS3t",
            "name": "Xã Cư Klông"
        },
        {
            "id": "OumomxH1zit",
            "name": "Xã Ea Sar"
        },
        {
            "id": "OX4lK8VsSuB",
            "name": "TTYT Huyện Ea Súp"
        },
        {
            "id": "p1qiwJBlTJO",
            "name": "PYT Lắk"
        },
        {
            "id": "PCPYtRk3SN2",
            "name": "Xã Hòa Xuân"
        },
        {
            "id": "pDE0OQdlZbI",
            "name": "Xã Ea H'đinh"
        },
        {
            "id": "pfp1lKVNEhA",
            "name": "Thị trấn Ea Súp"
        },
        {
            "id": "pGCnSp7wF8a",
            "name": "Thị trấn Krông Năng"
        },
        {
            "id": "pMVHlfnXgND",
            "name": "Phường Khánh Xuân"
        },
        {
            "id": "pr6ll0X0Ywf",
            "name": "Xã Ea Sin"
        },
        {
            "id": "prvGpbWsHw9",
            "name": "Xã Hòa Phú"
        },
        {
            "id": "PSq8SBn5Hge",
            "name": "Xã Ia Lốp"
        },
        {
            "id": "PYrBxf5Ud3D",
            "name": "TTYT Huyện Lắk"
        },
        {
            "id": "q0851paOfDY",
            "name": "Xã Cư M'Lan"
        },
        {
            "id": "qAR4LpRWc1u",
            "name": "Xã Ea Uy"
        },
        {
            "id": "QhBiBrZ1tzr",
            "name": "Xã Krông Na"
        },
        {
            "id": "QIPboFwmmC4",
            "name": "Phường An Lạc"
        },
        {
            "id": "QKZbisxErVV",
            "name": "Bệnh viện Đa khoa Thiện Hạnh"
        },
        {
            "id": "QV1bLiymYAI",
            "name": "Xã Cuor Đăng"
        },
        {
            "id": "QzOIZR6Jbbk",
            "name": "Xã Cư Jang"
        },
        {
            "id": "QZzQkMXwYWp",
            "name": "Xã Tân Hoà"
        },
        {
            "id": "R0o2OaHRyBm",
            "name": "Xã Hòa Khánh"
        },
        {
            "id": "r9eONcSob6b",
            "name": "Xã Xuân Phú"
        },
        {
            "id": "rfX0RNLoAB6",
            "name": "Xã Ea Dăh"
        },
        {
            "id": "rhKym30EOpB",
            "name": "Xã Ea Tân"
        },
        {
            "id": "RO5asKKWoUd",
            "name": "Xã Ea KNuec"
        },
        {
            "id": "ROw9KiYT94P",
            "name": "Xã Ea Păl"
        },
        {
            "id": "RTQI1Atdf1Y",
            "name": "Xã Ea Lai"
        },
        {
            "id": "SDG0bNIsPo2",
            "name": "Xã Ea Khal"
        },
        {
            "id": "sfX8AT1aNqO",
            "name": "Xã Krông Nô"
        },
        {
            "id": "siPIPE8yzQT",
            "name": "TTYT Huyện Ea H'leo"
        },
        {
            "id": "Slb2AhoTtKk",
            "name": "Xã Phú Xuân "
        },
        {
            "id": "SmbdY9EflQ8",
            "name": "Xã Ia RVê"
        },
        {
            "id": "SpRh20CxEu6",
            "name": "Xã ĐLiê Ya"
        },
        {
            "id": "sseD7KcfAgg",
            "name": "Xã Cư M'ta"
        },
        {
            "id": "StbJ4eyqbE0",
            "name": "Xã Ea Huar"
        },
        {
            "id": "suTOQ28bTJv",
            "name": "Xã Ea HĐing"
        },
        {
            "id": "SWFAUuPItPS",
            "name": "Xã Cư M'gar"
        },
        {
            "id": "Tc8tsKoYRwM",
            "name": "Phường Ea Tam"
        },
        {
            "id": "tgyaHzqvr2J",
            "name": "Xã Ea Kao"
        },
        {
            "id": "TzxZRGkYEAw",
            "name": "Bệnh viện Đa khoa Cao Nguyên "
        },
        {
            "id": "U1g363wfJLa",
            "name": "Phường Thắng Lợi"
        },
        {
            "id": "u68OvSHdHgw",
            "name": "Xã Băng A Drênh"
        },
        {
            "id": "ub3H0radJCj",
            "name": "Xã Cư Bao"
        },
        {
            "id": "uc8C7ZJro92",
            "name": "PYT Krông Pắc"
        },
        {
            "id": "UCoaK0rLSxR",
            "name": "Xã Ea Bông"
        },
        {
            "id": "UDtLNvgvfIL",
            "name": "Xã Phú Xuân (Trạm y tế 49)"
        },
        {
            "id": "UeAp0Xi71OK",
            "name": "Xã Cư Mốt"
        },
        {
            "id": "uIn7MuO3ON2",
            "name": "Xã Cư Suê"
        },
        {
            "id": "UMoNfQ6amd5",
            "name": "Xã Ea Tih"
        },
        {
            "id": "UV0ilXbqeI1",
            "name": "Xã Cư K Róa"
        },
        {
            "id": "UwTgIap07in",
            "name": "Xã KRông Búk"
        },
        {
            "id": "UXuW5aSDtvS",
            "name": "Phòng khám Đa khoa 719"
        },
        {
            "id": "v29jW2EsAJw",
            "name": "Xã Cư Ni"
        },
        {
            "id": "v6zIV06UmGY",
            "name": "Thị trấn M'Đrắk"
        },
        {
            "id": "vCGdLUymiWS",
            "name": "Xã Ea Riêng"
        },
        {
            "id": "vCHG23MgfE6",
            "name": "PYT Cư Kuin"
        },
        {
            "id": "VGt9BJBS3eu",
            "name": "Xã Ea Kiết"
        },
        {
            "id": "vieOPDY3Nq6",
            "name": "TTYT Thị Xã Buôn Hồ"
        },
        {
            "id": "vkGTOqQoIFh",
            "name": "Phường Tân Lợi"
        },
        {
            "id": "vkojmnqEMze",
            "name": "Thị trấn Ea Knốp"
        },
        {
            "id": "Vs21bDccwr4",
            "name": "PYT Ea Súp"
        },
        {
            "id": "vzGotq4APxX",
            "name": "Xã Phú Lộc"
        },
        {
            "id": "w0QM09VYJO1",
            "name": "Xã Ea Na"
        },
        {
            "id": "w2cHdUJf75S",
            "name": "Xã Buôn Tría"
        },
        {
            "id": "w3V8SsiasXP",
            "name": "Xã Cư Prao"
        },
        {
            "id": "w7G6NRimbIB",
            "name": "PYT Ea H' Leo"
        },
        {
            "id": "W9aoQ3T4keQ",
            "name": "Xã Cư A Mung"
        },
        {
            "id": "W9hHvdCXrww",
            "name": "Xã Ea Ral"
        },
        {
            "id": "wLUYGePoVLl",
            "name": "Xã Bông Krang"
        },
        {
            "id": "WTVcpVxszjW",
            "name": "Xã Dray Bhăng"
        },
        {
            "id": "wWhdAeDz04x",
            "name": "Xã Cư San"
        },
        {
            "id": "WX7dIkYlfaO",
            "name": "Xã Ea Wy"
        },
        {
            "id": "x2gBIGjg7pK",
            "name": "TTYT Huyện Krông A Na"
        },
        {
            "id": "X7vfXfIBHyG",
            "name": "TTYT Thành phố Buôn Ma Thuột"
        },
        {
            "id": "xGY7mbFxCo2",
            "name": "Xã Ea Hiao"
        },
        {
            "id": "XicRu4pPTZ1",
            "name": "Xã Ea Phê"
        },
        {
            "id": "XiuQ6IEPEEH",
            "name": "PYT Cư M'Gar"
        },
        {
            "id": "XkvozZlP1e3",
            "name": "Xã Ea Hu"
        },
        {
            "id": "xlCYx0FoNkS",
            "name": "Xã Cuôr KNia"
        },
        {
            "id": "XpoODDetH96",
            "name": "Xã Ea Kly"
        },
        {
            "id": "XrB5pTGKlPZ",
            "name": "Xã Yang Reh"
        },
        {
            "id": "XuhENq1mNVn",
            "name": "Xã Buôn Triết"
        },
        {
            "id": "xxhLq6ETrXv",
            "name": "Xã Ea Tul"
        },
        {
            "id": "yA0gtD4eKSW",
            "name": "Xã Hòa Phong"
        },
        {
            "id": "YAuKeeuPfUj",
            "name": "Phường Thành Công"
        },
        {
            "id": "Yc2T5LrlLcQ",
            "name": "Xã Ea Lê"
        },
        {
            "id": "yDDrNFisyPz",
            "name": "Xã Ea Đar"
        },
        {
            "id": "YiApjkrFc71",
            "name": "Thị trấn Liên Sơn"
        },
        {
            "id": "YUQ3SYuJd1I",
            "name": "Xã Đắk Phơi"
        },
        {
            "id": "YxQN401IlqP",
            "name": "Xã Yang Mao"
        },
        {
            "id": "Z76yAD5Hetl",
            "name": "Xã Cư Bông"
        },
        {
            "id": "zavoTSoHanG",
            "name": "Xã Ea Yông"
        },
        {
            "id": "zBIwE5jO8XA",
            "name": "Bệnh viện đa khoa TP Buôn Ma Thuột"
        },
        {
            "id": "ZDLW6eXyRUi",
            "name": "Xã Dur KMăl"
        },
        {
            "id": "znWYMtN9U0O",
            "name": "Xã Ea Kuăng"
        },
        {
            "id": "Zpbh0VOhfbV",
            "name": "Phường Thống Nhất"
        },
        {
            "id": "ZxhbwOSepFx",
            "name": "Xã Ea Bar"
        },
        {
            "id": "zyKHRwzUjxO",
            "name": "Xã Cư Pui"
        }
    ]

    // Ha Noi
    let arrOrgHaNoi = [
        {
            "id": "a3o5JmNTo1G",
            "name": "Phường Biên Giang"
        },
        {
            "id": "a4AJdmnMUdX",
            "name": "Xã Canh Nậu"
        },
        {
            "id": "ACy9h2pGeZx",
            "name": "Xã Vân Nội"
        },
        {
            "id": "Ad5FP0kGgdD",
            "name": "Phường Nguyễn Du"
        },
        {
            "id": "afYV3GySOmB",
            "name": "TTYT Huyện Hoài Đức"
        },
        {
            "id": "aGjrgUrQ4Ee",
            "name": "Xã Tân Hưng"
        },
        {
            "id": "ahxwaxCwRvS",
            "name": "PYT Quận Cầu Giấy"
        },
        {
            "id": "AimCPAdokW3",
            "name": "Phường Hàng Buồm"
        },
        {
            "id": "AIvDDXZ5Ayg",
            "name": "Xã Đồng Tân"
        },
        {
            "id": "aJKbfixar1L",
            "name": "Xã Thọ Xuân"
        },
        {
            "id": "AjskS4NFYkM",
            "name": "Xã Yên Sơn"
        },
        {
            "id": "Al3sqqIth4z",
            "name": "Xã Phú Cường"
        },
        {
            "id": "ALMPu2Xxv6o",
            "name": "Phường Tân Mai"
        },
        {
            "id": "ARuI9J4Ou2U",
            "name": "Xã Thanh Thùy"
        },
        {
            "id": "aSEYKySwoCk",
            "name": "Xã Vạn Phúc"
        },
        {
            "id": "aslLFP6vKNj",
            "name": "Phường Bồ Đề"
        },
        {
            "id": "ASUVVLzS35v",
            "name": "Xã Liên Mạc"
        },
        {
            "id": "Asyc8qsGoSL",
            "name": "Xã Đại Xuyên"
        },
        {
            "id": "aVIVSYrMTzk",
            "name": "Xã Phú Túc"
        },
        {
            "id": "aXzdxnP9Fm3",
            "name": "Xã Tráng Việt"
        },
        {
            "id": "Ay82QLXEB4m",
            "name": "PKĐK Phan Chu Trinh"
        },
        {
            "id": "b17Sy8Cw0jm",
            "name": "Phường Vĩnh Tuy"
        },
        {
            "id": "b3YxO4kMx91",
            "name": "Xã Tuy Lai"
        },
        {
            "id": "B67g9q5chVP",
            "name": "Xã Tri Trung"
        },
        {
            "id": "B6eGMmaVui8",
            "name": "Xã Quảng Phú Cầu"
        },
        {
            "id": "b6MuNHbsO7O",
            "name": "Phường Xuân Tảo"
        },
        {
            "id": "B8P7smlJVoW",
            "name": "Xã Nam Phong"
        },
        {
            "id": "BANs8VYjLCP",
            "name": "Phường Bách Khoa"
        },
        {
            "id": "Bb4trZtxN12",
            "name": "Phường Thổ Quan"
        },
        {
            "id": "Bb5bvvorxzv",
            "name": "Bệnh viện đa khoa Huyện Chương Mỹ"
        },
        {
            "id": "BBA8ZVSP4b2",
            "name": "Phường Chương Dương"
        },
        {
            "id": "BcGRXXGcnZI",
            "name": "Phường Cát Linh"
        },
        {
            "id": "bDgweYS1mwg",
            "name": "Phường Thượng Cát"
        },
        {
            "id": "Bdm1fJIav0B",
            "name": "Xã Hữu Bằng"
        },
        {
            "id": "bE6TJBuaddd",
            "name": "Xã Phụng Thượng"
        },
        {
            "id": "BGHMQvcEaAh",
            "name": "Xã Tản Hồng"
        },
        {
            "id": "BKjp9a7xQ1F",
            "name": "PKĐK Nghĩa Tân"
        },
        {
            "id": "BKM19WebREw",
            "name": "TTYT Quận Long Biên"
        },
        {
            "id": "BPBgicKGk8n",
            "name": "Xã Xuy Xá"
        },
        {
            "id": "bqkUJ4p0VfV",
            "name": "TTYT Huyện Đan Phượng"
        },
        {
            "id": "BRFLQrAlJF6",
            "name": "Bệnh viện đa khoa Huyện Mê Linh"
        },
        {
            "id": "bTLXUCq2C9G",
            "name": "Xã Vạn Kim"
        },
        {
            "id": "BuEZRawClRn",
            "name": "PYT Huyện Ba Vì"
        },
        {
            "id": "bVC49CG2Eul",
            "name": "Xã Liệp Tuyết"
        },
        {
            "id": "bws38gXJZuE",
            "name": "Phường Giáp Bát"
        },
        {
            "id": "BX27Pgiukry",
            "name": "PYT Huyện Sóc Sơn"
        },
        {
            "id": "BYIZnDnvjzw",
            "name": "Xã Ngũ Hiệp"
        },
        {
            "id": "BZd8stA7FUm",
            "name": "Xã Phương Trung"
        },
        {
            "id": "BzFTiD7XjDT",
            "name": "Xã Phúc Lâm"
        },
        {
            "id": "C5KUNCGPGPh",
            "name": "TTYT Huyện Thạch Thất"
        },
        {
            "id": "c5oFUH0YDhk",
            "name": "Phường Đức Giang"
        },
        {
            "id": "C9eHN86ITkl",
            "name": "Phường Giang Biên"
        },
        {
            "id": "c9kcS1oHUDN",
            "name": "Xã Tân Ước"
        },
        {
            "id": "cazEyGpCUO1",
            "name": "Phường Bùi Thị Xuân"
        },
        {
            "id": "CbrO3IkYQze",
            "name": "Xã Ngọc Mỹ"
        },
        {
            "id": "cCVj9gPkfKX",
            "name": "Phường Đông Ngạc"
        },
        {
            "id": "CfDaax8c8er",
            "name": "Phường Cống Vị"
        },
        {
            "id": "CH5aUdHaacI",
            "name": "Phường Trung Liệt"
        },
        {
            "id": "CIlwRWqxtNO",
            "name": "PKĐK Số 3"
        },
        {
            "id": "CIvMhX7eH7I",
            "name": "Xã Lưu Hoàng"
        },
        {
            "id": "CL27pXYUl9m",
            "name": "PYT Huyện Phú Xuyên"
        },
        {
            "id": "clUGd7i7FXY",
            "name": "Xã Đồng Phú"
        },
        {
            "id": "cPkWGESkwx6",
            "name": "Xã Minh Châu"
        },
        {
            "id": "cqaKtBiAvkI",
            "name": "Phường Trương Định"
        },
        {
            "id": "CrMmMD624Mr",
            "name": "Xã Đại Thắng"
        },
        {
            "id": "cs9HIunw0Zh",
            "name": "PKĐK Khu vực 1"
        },
        {
            "id": "cSOTrgfOENc",
            "name": "Xã Song Phượng"
        },
        {
            "id": "CUmNuvk4g6e",
            "name": "Xã Tân Phú"
        },
        {
            "id": "CUnI0ldhINX",
            "name": "Xã Phùng Xá"
        },
        {
            "id": "cwU3lLfH4kW",
            "name": "Xã Bắc Phú"
        },
        {
            "id": "CXCb9OxiILF",
            "name": "Xã Cổ Đông"
        },
        {
            "id": "cxJx63yvF3U",
            "name": "TTYT Huyện Chương Mỹ"
        },
        {
            "id": "CydYkHUmECs",
            "name": "Xã Liên Ninh"
        },
        {
            "id": "CYZUtg81ogX",
            "name": "Xã Hợp Tiến"
        },
        {
            "id": "D02yTZxSY9Z",
            "name": "Xã Minh Đức"
        },
        {
            "id": "d1EjvF1ujKY",
            "name": "xã Đồng Tâm"
        },
        {
            "id": "D2tWHnJoSWR",
            "name": "Xã Xuân Dương"
        },
        {
            "id": "d2ur6dBvF8Y",
            "name": "Xã Mai Đình"
        },
        {
            "id": "D5wCXyjXZxI",
            "name": "PYT Quận Tây Hồ"
        },
        {
            "id": "DAg1tvzpU0Z",
            "name": "PKĐK Đông Mỹ"
        },
        {
            "id": "dC4lMR3ardb",
            "name": "PYT Huyện Phúc Thọ"
        },
        {
            "id": "dIXs5SeZk6a",
            "name": "Phường Cầu Diễn"
        },
        {
            "id": "dncEmhTD7Sp",
            "name": "Xã Kim Chung"
        },
        {
            "id": "dNNiuEdS21c",
            "name": "Xã Thạch Thán"
        },
        {
            "id": "DphjzSU2L59",
            "name": "Xã Cao Thành"
        },
        {
            "id": "DPzHGIT1rsa",
            "name": "Phường Khương Trung"
        },
        {
            "id": "dQTkcG56QRK",
            "name": "Xã Văn Phú"
        },
        {
            "id": "DrobIukuXiI",
            "name": "Xã Vật Lại"
        },
        {
            "id": "dSppdxbjUbh",
            "name": "Xã Quang Lãng"
        },
        {
            "id": "DswrPon1rxN",
            "name": "Xã Tri Thủy"
        },
        {
            "id": "DT1OHV8U7Jq",
            "name": "Xã Trần Phú"
        },
        {
            "id": "dTW2QLB4O5P",
            "name": "Phường Phú La"
        },
        {
            "id": "DTx25vxPZoP",
            "name": "PKĐK Mai Hương"
        },
        {
            "id": "DViAKg0utFI",
            "name": "Xã Tự Lập"
        },
        {
            "id": "DVtyQ1hrtMQ",
            "name": "Phường Tương Mai"
        },
        {
            "id": "DYFH2dkMW99",
            "name": "Xã Tiến Xuân"
        },
        {
            "id": "dZ1sQQfR4lH",
            "name": "Xã Nguyên Khê"
        },
        {
            "id": "e2p9KrzsYnk",
            "name": "Xã Tiên Dương"
        },
        {
            "id": "e3ubo6bQDp6",
            "name": "PKĐK Hương Sơn"
        },
        {
            "id": "e875bLvTFnv",
            "name": "Xã Tam Đồng"
        },
        {
            "id": "eBA16prliPF",
            "name": "Xã Nam Sơn"
        },
        {
            "id": "ebAVtlfqQq0",
            "name": "Xã Hồng Quang"
        },
        {
            "id": "Ec7u4Fs1hJz",
            "name": "Xã Quất Động"
        },
        {
            "id": "edWjTTJQmJz",
            "name": "Phường Yết Kiêu"
        },
        {
            "id": "eEgaKICuRRw",
            "name": "Phường Việt Hưng"
        },
        {
            "id": "ehbWO5qPSA6",
            "name": "PKĐK Hàng Bún"
        },
        {
            "id": "ei5FMMQxmCY",
            "name": "Xã Văn Tự"
        },
        {
            "id": "Ej9qx9mskB2",
            "name": "xã Tây Đằng"
        },
        {
            "id": "EjmfySN93XL",
            "name": "TTYT Huyện Thanh Oai"
        },
        {
            "id": "eJPCTMesTqX",
            "name": "PYT Quận Thanh Xuân"
        },
        {
            "id": "ek233dy5ZNJ",
            "name": "Phường Hàng Bồ"
        },
        {
            "id": "eL60DfKAvtK",
            "name": "Phường Thanh Xuân Bắc"
        },
        {
            "id": "ELhpTWdXBWq",
            "name": "Xã Minh Trí"
        },
        {
            "id": "en6ybScjai7",
            "name": "Xã Thanh Xuân"
        },
        {
            "id": "ENMM1yTFVtD",
            "name": "Xã Tiến Thịnh"
        },
        {
            "id": "Eo4MEDpJEBO",
            "name": "Xã Xuân Giang"
        },
        {
            "id": "EQDsBZnaQLT",
            "name": "Phường Khương Đình"
        },
        {
            "id": "ESE6zV1HJME",
            "name": "Xã Khai Thái"
        },
        {
            "id": "ESgil0H402K",
            "name": "PYT Huyện Chương Mỹ"
        },
        {
            "id": "eTRPncFh4X5",
            "name": "PKĐK Lương Mỹ"
        },
        {
            "id": "EvrAubpD4LZ",
            "name": "Xa Tam Xa"
        },
        {
            "id": "eWx2cUgSOY1",
            "name": "Xã Hoàng Long"
        },
        {
            "id": "exArxNHF2Ec",
            "name": "Xã Minh Quang"
        },
        {
            "id": "exJdSl5sjRp",
            "name": "PKĐK Kim Anh"
        },
        {
            "id": "exxglTBTdii",
            "name": "Phường Phố Huế"
        },
        {
            "id": "f1jXnf7gHBZ",
            "name": "TTYT Huyện Đông Anh"
        },
        {
            "id": "f5FqlWNGAkn",
            "name": "Xã Ngọc Hồi"
        },
        {
            "id": "f5tasAdAvWa",
            "name": "Xã Hồng Thái"
        },
        {
            "id": "Fa0wT4X3Tu4",
            "name": "Xã Thọ Lộc"
        },
        {
            "id": "FaXAs7RMvs0",
            "name": "PKĐK Hoàng Hoa Thám"
        },
        {
            "id": "FddWRs3KvmS",
            "name": "PKĐK Hòa Thạch"
        },
        {
            "id": "FE91vZI3NWs",
            "name": "Xã Kim Thư"
        },
        {
            "id": "feM9zyRwd1g",
            "name": "Xã Cần Kiệm"
        },
        {
            "id": "fEzJwGpdnYR",
            "name": "Xã Phương Tú"
        },
        {
            "id": "fftlj2mjhyp",
            "name": "Phường Ô Chợ Dừa"
        },
        {
            "id": "fGIJHxVF5Tz",
            "name": "Phường Phúc Lợi"
        },
        {
            "id": "fhBJhb781U7",
            "name": "Xã Hòa Sơn"
        },
        {
            "id": "FHhFmJ6Qw14",
            "name": "Phường Vĩnh Phúc"
        },
        {
            "id": "FhYw3qlhtro",
            "name": "Xã Bình Minh"
        },
        {
            "id": "FigxayhRGeS",
            "name": "Phường Thanh Trì"
        },
        {
            "id": "fiqJJyhbj1L",
            "name": "TTYT Huyện Phúc Thọ"
        },
        {
            "id": "fKv7uqIVYIK",
            "name": "Xã Trầm Lộng"
        },
        {
            "id": "flAR2iXbX0O",
            "name": "Xã Hiệp Thuận"
        },
        {
            "id": "fliEC8QG7Rk",
            "name": "Xã Thanh Văn"
        },
        {
            "id": "FnGnkxGCvtr",
            "name": "Xã Sơn Đông"
        },
        {
            "id": "fnTp62vXNTk",
            "name": "Phường Mễ Trì"
        },
        {
            "id": "FOqfSs1pkPQ",
            "name": "Xã Đông Xuân"
        },
        {
            "id": "FPU1CxQuLi7",
            "name": "Xã Kim Sơn"
        },
        {
            "id": "FQbQMSN0SOW",
            "name": "Phường Phúc Tân"
        },
        {
            "id": "FQqNKilIcJK",
            "name": "PKĐK Đồng Tân"
        },
        {
            "id": "FsOlAKMQsCL",
            "name": "Phường Láng Hạ"
        },
        {
            "id": "Ft33IjTSfmM",
            "name": "Xã Ba Vì"
        },
        {
            "id": "FwEE1oPYPeN",
            "name": "Phường Phú Thượng"
        },
        {
            "id": "FwRUz2vd9bI",
            "name": "Xã Phú Sơn"
        },
        {
            "id": "fx9OL0goFwb",
            "name": "Xã Minh Cường"
        },
        {
            "id": "fxGirTEUN1v",
            "name": "Xã Long Xuyên"
        },
        {
            "id": "fZi4aiopAzf",
            "name": "Phường Dịch Vọng"
        },
        {
            "id": "fzlK5lpDfNw",
            "name": "Xã Đa Tốn"
        },
        {
            "id": "fZVB0IawM5N",
            "name": "Xã Ngọc Tảo"
        },
        {
            "id": "G2JZ9FcvOoI",
            "name": "Xã Văn Đức"
        },
        {
            "id": "g5UiXQWGAn3",
            "name": "Xã Tân Dân"
        },
        {
            "id": "g9EHjVzg3ea",
            "name": "Thị trấn Kim Bài"
        },
        {
            "id": "GA8RycH82Vc",
            "name": "Xã Thượng Lâm"
        },
        {
            "id": "GARUa6grIpr",
            "name": "PKĐK Minh Phú"
        },
        {
            "id": "Gd8udXSQ0JP",
            "name": "Phường Hoàng Văn Thụ"
        },
        {
            "id": "gDiVlL1SZGB",
            "name": "Xã Dương Quang"
        },
        {
            "id": "GDKBT6yAu7q",
            "name": "Xã Hương Sơn"
        },
        {
            "id": "gehBdqt8whp",
            "name": "Xã Vĩnh Ngọc"
        },
        {
            "id": "Gf8vyx9ngIp",
            "name": "Phường Đội Cấn"
        },
        {
            "id": "gFsEagUzG2j",
            "name": "Xã Xuân Canh"
        },
        {
            "id": "ggYe5gphMzt",
            "name": "PKĐK Xuân Giang"
        },
        {
            "id": "GHEFZ6g39GW",
            "name": "Phường Nghĩa Tân"
        },
        {
            "id": "ghNmWvgnoE4",
            "name": "Xã Tản Lĩnh"
        },
        {
            "id": "GHrucWxPpIy",
            "name": "Xã Trung Hoà"
        },
        {
            "id": "GHxUBS2FYZs",
            "name": "Phường Nam Đồng"
        },
        {
            "id": "GiTYMOEvO04",
            "name": "Phường Kim Mã"
        },
        {
            "id": "gl4MQbQQO8n",
            "name": "PKĐK Bà Triệu"
        },
        {
            "id": "gLCmlUWn9Bl",
            "name": "PKĐK Ngãi Cầu"
        },
        {
            "id": "gLTd1MFhk3e",
            "name": "Xã Thư Phú"
        },
        {
            "id": "GmD794c1HZ1",
            "name": "Phường Quỳnh Mai"
        },
        {
            "id": "gSQJoruT38E",
            "name": "Xã Hòa Lâm"
        },
        {
            "id": "gvHGnBhg73d",
            "name": "Xã Liên Hà"
        },
        {
            "id": "GwQfkBxvFzg",
            "name": "Xã Cam Thượng"
        },
        {
            "id": "gXrOtsTgMoz",
            "name": "Phường Phạm Đình Hồ"
        },
        {
            "id": "gZdhIk01YKc",
            "name": "Xã Thanh Cao"
        },
        {
            "id": "h1LfL3fZeRg",
            "name": "Xã Vĩnh Quỳnh"
        },
        {
            "id": "h3wMzrRzyjo",
            "name": "Phường Đức Thắng"
        },
        {
            "id": "H4qvOZ0Dcg2",
            "name": "Phường Long Biên"
        },
        {
            "id": "h9OwI88gwcw",
            "name": "Phường Nguyễn Trung Trực"
        },
        {
            "id": "hAcXBkYI2mZ",
            "name": "TTYT Huyện Thanh Trì"
        },
        {
            "id": "HDw4rTVFtVI",
            "name": "PYT Huyện Đông Anh"
        },
        {
            "id": "he0JaghrWWe",
            "name": "Xã Đặng Xá"
        },
        {
            "id": "HgHdssbXHqv",
            "name": "Xã Kim Nỗ"
        },
        {
            "id": "hHCgzijzgiZ",
            "name": "Phường Hàng Bông"
        },
        {
            "id": "HJZkVcC6BUc",
            "name": "Xã Phú Minh"
        },
        {
            "id": "HKdzJI9ndeZ",
            "name": "Xã Hạ Mỗ"
        },
        {
            "id": "HlbqnORYUl2",
            "name": "PYT Quận Bắc Từ Liêm"
        },
        {
            "id": "hm7WmhLIj4y",
            "name": "Xã Hạ Bằng"
        },
        {
            "id": "hNbYIyegiNK",
            "name": "TTYT Quận Hoàng Mai"
        },
        {
            "id": "hNka61SfvHr",
            "name": "Xã Trường Thịnh"
        },
        {
            "id": "HnXJXpTWfw5",
            "name": "Phường Quan Hoa"
        },
        {
            "id": "hPGc64lpuHA",
            "name": "Xã Yên Trung"
        },
        {
            "id": "hpoX19JCEYB",
            "name": "Xã Tân Minh"
        },
        {
            "id": "HPpA6UfodxJ",
            "name": "Xã Phương Đình"
        },
        {
            "id": "HqD8VNxciED",
            "name": "Xã Kim Lũ"
        },
        {
            "id": "HqtxTzZYUnf",
            "name": "TTYT Huyện Gia Lâm"
        },
        {
            "id": "hRL71dvI97S",
            "name": "Phường Trần Phú"
        },
        {
            "id": "HS7zk4qRt2U",
            "name": "Xã Cao Viên"
        },
        {
            "id": "hSBW0QcsdTL",
            "name": "Xã Dũng Tiến"
        },
        {
            "id": "HsjNohuQlmA",
            "name": "Phường Hàng Gai"
        },
        {
            "id": "hSWx1XrwGuU",
            "name": "Xã Vạn Thắng"
        },
        {
            "id": "HTUwwq9VvBY",
            "name": "Xã Phú Kim"
        },
        {
            "id": "Htys8dQ1rZo",
            "name": "PKĐK Đại Thịnh"
        },
        {
            "id": "HTZMqmRTkCM",
            "name": "Phường Đồng Tâm"
        },
        {
            "id": "HUEyPlD1cTg",
            "name": "xã  Đông Quang"
        },
        {
            "id": "HVSxcjHkJUz",
            "name": "Xã Phú Châu"
        },
        {
            "id": "hwC7bgTchhB",
            "name": "Phường Cửa Nam"
        },
        {
            "id": "HXhX8qc7wQ2",
            "name": "Xã Hữu Hoà"
        },
        {
            "id": "Hz9U55ytQOW",
            "name": "PKĐK Số 1"
        },
        {
            "id": "i2MPzTmLOAG",
            "name": "Phường Phú Lương"
        },
        {
            "id": "I2ZleZgSaRx",
            "name": "Phường Thịnh Quang"
        },
        {
            "id": "i4Y5uU1k7zP",
            "name": "Xã Hiền Giang"
        },
        {
            "id": "i55129Vq7fy",
            "name": "Phường Giảng Võ"
        },
        {
            "id": "I6aHA6GjR2n",
            "name": "Xã Thụy An"
        },
        {
            "id": "I7ZuSBD5d76",
            "name": "Xã Song Phương"
        },
        {
            "id": "I8Ou4fyCnvB",
            "name": "Xã An Thượng"
        },
        {
            "id": "i9LOCFFoVTS",
            "name": "Xã Tân Hội"
        },
        {
            "id": "ibbhpxR5J6A",
            "name": "Phường Viên Sơn"
        },
        {
            "id": "Ibp2WK9doFF",
            "name": "Xã Thanh Lâm"
        },
        {
            "id": "idZyuzzDdVR",
            "name": "Xã Cổ Bi"
        },
        {
            "id": "IExQUKw9JUH",
            "name": "Xã Hồng Phong"
        },
        {
            "id": "iFBJ2lRPtLN",
            "name": "Xã Phương Độ"
        },
        {
            "id": "iGZ51WAt2d9",
            "name": "Phường Cự Khối"
        },
        {
            "id": "iigBVziGh0o",
            "name": "PYT Huyện Thường Tín"
        },
        {
            "id": "IigkeSKa7C0",
            "name": "Xã Thanh Đa"
        },
        {
            "id": "iNwlOA9KP3O",
            "name": "Xã Phú Thị"
        },
        {
            "id": "Io21y0I1Ozl",
            "name": "Xã Hồng Kỳ"
        },
        {
            "id": "iQANJmqubue",
            "name": "Xã Văn Võ"
        },
        {
            "id": "iqcbwk7v0gW",
            "name": "Xã Đông Xuân"
        },
        {
            "id": "IQuniCar6iQ",
            "name": "Xã Liên Trung"
        },
        {
            "id": "iRIdPt17vkE",
            "name": "Xã Tòng Bạt"
        },
        {
            "id": "ITDVIlZRD6O",
            "name": "Xã Phú Phương"
        },
        {
            "id": "ITqOCuATx4v",
            "name": "Xã Ba Trại"
        },
        {
            "id": "itzhmYXn7wa",
            "name": "TTYT Quận Thanh Xuân"
        },
        {
            "id": "Iu3oCAQj5hs",
            "name": "Xã Khánh Thượng"
        },
        {
            "id": "iu8zTqdNUiw",
            "name": "Xã Viên An"
        },
        {
            "id": "iuwYwbMwMLR",
            "name": "Xã Phú Cát"
        },
        {
            "id": "ivihHJPLdiq",
            "name": "PYT Huyện Mỹ Đức"
        },
        {
            "id": "Ix5sJtoeZIc",
            "name": "Phường Phúc Xá"
        },
        {
            "id": "ixrh4hb43E8",
            "name": "Xã Đại Cường"
        },
        {
            "id": "iyFAl6Hrftd",
            "name": "Xã Bích Hòa"
        },
        {
            "id": "iYThrY2m4Li",
            "name": "Xã Trung Châu"
        },
        {
            "id": "iyWy83l5Gf9",
            "name": "Xã Cộng Hòa"
        },
        {
            "id": "iZ0wubPdAEL",
            "name": "Xã Thạch Hoà"
        },
        {
            "id": "iZUmfJEEIMP",
            "name": "TTYT Quận Tây Hồ"
        },
        {
            "id": "IZWzdzJhRnp",
            "name": "Xã Bát Tràng"
        },
        {
            "id": "j0dL0W03PSL",
            "name": "PKĐK Hồng Kỳ"
        },
        {
            "id": "J1R0aeoYssn",
            "name": "PKĐK Số 2"
        },
        {
            "id": "J4jWkMybTKt",
            "name": "Xã Trạch Mỹ Lộc"
        },
        {
            "id": "JCa3Y1AaSDI",
            "name": "PYT Quận Hà Đông"
        },
        {
            "id": "JCwxm67MEP8",
            "name": "Xã Tam Hiệp"
        },
        {
            "id": "JDDbDfc83oV",
            "name": "Xã Phù Lưu"
        },
        {
            "id": "JdycYKglp12",
            "name": "Xã Tam Hưng"
        },
        {
            "id": "jgKhi9PwUB3",
            "name": "Xã Dị Nậu"
        },
        {
            "id": "JgKnRuAX0FL",
            "name": "PK bác sỹ gia đình Hàng Bài"
        },
        {
            "id": "jhD8OYtFQ0U",
            "name": "Phường Trung Sơn Trầm"
        },
        {
            "id": "JHZw4nLXJ4v",
            "name": "PKĐK Miền Đông"
        },
        {
            "id": "JIDwx2jlSTm",
            "name": "Xã Đốc Tín"
        },
        {
            "id": "JiJzLFphI87",
            "name": "Phường Khương Mai"
        },
        {
            "id": "jirA5oRucQC",
            "name": "PKĐK Tản Lĩnh"
        },
        {
            "id": "jIxuFtmKJt9",
            "name": "PKĐK Lưu Hoàng"
        },
        {
            "id": "Jj108ByVKEt",
            "name": "Xã Hồng Minh"
        },
        {
            "id": "JK8XCqEKGLx",
            "name": "PYT Huyện Mê Linh"
        },
        {
            "id": "JksoCU6eFQO",
            "name": "Xã Lại Thượng"
        },
        {
            "id": "JLPxUiNWnIv",
            "name": "Xã Phúc Tiến"
        },
        {
            "id": "jmMvzsyMJj7",
            "name": "Xã Kim Quan"
        },
        {
            "id": "JmQtn8GqUNz",
            "name": "Xã Xuân Phú"
        },
        {
            "id": "JpkwO1mlHSV",
            "name": "Xã Hòa Thạch"
        },
        {
            "id": "jpoZ8aqaPTz",
            "name": "Xã Minh Khai"
        },
        {
            "id": "jRB0all95VP",
            "name": "Phường Ngọc Khánh"
        },
        {
            "id": "jsSDQMAVWZg",
            "name": "Xã An Phú"
        },
        {
            "id": "JtIfbtE0UkF",
            "name": "Xã Tự Nhiên"
        },
        {
            "id": "jtVbxRkRrSS",
            "name": "Xã Kiêu Kỵ"
        },
        {
            "id": "JU1TFwY8Y6r",
            "name": "Phường Xuân La"
        },
        {
            "id": "jwEIhSuxELX",
            "name": "Thị trấn Chúc Sơn"
        },
        {
            "id": "jY0Co7MFZQP",
            "name": "PYT Huyện ứng Hòa"
        },
        {
            "id": "jYqlHPhym66",
            "name": "Xã Ninh Sở"
        },
        {
            "id": "jZqS6LXaZJe",
            "name": "Xã Nam Phương Tiến"
        },
        {
            "id": "K1KKzROgEzW",
            "name": "Xã Sơn Đồng"
        },
        {
            "id": "kB4oPYbDpgR",
            "name": "Xã Phú Nghĩa"
        },
        {
            "id": "kCFrXjkDIqd",
            "name": "Xã Quảng Bị"
        },
        {
            "id": "kFB48uVoCiS",
            "name": "Xã Phùng Xá"
        },
        {
            "id": "kgf7IJ7PHYw",
            "name": "Phường Hàng Bạc"
        },
        {
            "id": "KHwolrke4FE",
            "name": "Xã Văn Nhân"
        },
        {
            "id": "KLLSd3oc202",
            "name": "PKĐK Linh Đàm"
        },
        {
            "id": "KMEH1K8mQV5",
            "name": "Phường Trung Hoà"
        },
        {
            "id": "kNf5mszCJ5T",
            "name": "Phường Phương Canh"
        },
        {
            "id": "KoJrVl6RkGx",
            "name": "Phường Mộ Lao"
        },
        {
            "id": "KphsjjuHUFX",
            "name": "Xã Hoàng Văn Thụ"
        },
        {
            "id": "Kqi47RGWFHj",
            "name": "Phường Thượng Thạnh"
        },
        {
            "id": "kraQDSHOPky",
            "name": "PKĐK Xuân Mai"
        },
        {
            "id": "KRipAzqQddH",
            "name": "PKĐK Bồ Đề"
        },
        {
            "id": "kSgFSv9DwDx",
            "name": "Phường Thanh Nhàn"
        },
        {
            "id": "ktZZq2SMHou",
            "name": "Xã Đan Phượng"
        },
        {
            "id": "KUfaAQUI7TJ",
            "name": "Xã Hoàng Diệu"
        },
        {
            "id": "KuPKQes0fXg",
            "name": "Bệnh viện đa khoa Huyện Quốc Oai"
        },
        {
            "id": "kVq8CJUChXs",
            "name": "Xã Kim Chung"
        },
        {
            "id": "kVYwQYq4juP",
            "name": "Xã Tân Xã"
        },
        {
            "id": "kZUkRCp3StZ",
            "name": "Thị trấn Đông Anh"
        },
        {
            "id": "L0u4KZngJCj",
            "name": "Phường Bưởi"
        },
        {
            "id": "LCtY0XsYWwE",
            "name": "Xã Yên Viên"
        },
        {
            "id": "Le4ADOypR3r",
            "name": "Phường Sài Đồng"
        },
        {
            "id": "leEMVHyuk5d",
            "name": "PKĐK Thạch Đà"
        },
        {
            "id": "leZQ5NnOiEP",
            "name": "Xã Thái Hòa"
        },
        {
            "id": "lF7XopdHO12",
            "name": "Phường Hàng Mã"
        },
        {
            "id": "LF8UJvs2QUI",
            "name": "Xã Hữu Văn"
        },
        {
            "id": "lfHQoD2VOnW",
            "name": "Xã Kim Đường"
        },
        {
            "id": "Lfv1VYmtrsk",
            "name": "Phường Láng Thượng"
        },
        {
            "id": "lgEREbesCnJ",
            "name": "Xã Nghĩa Hương"
        },
        {
            "id": "lj1wtlWbYT4",
            "name": "Xã Châu Can"
        },
        {
            "id": "LjhCauUKgYG",
            "name": "Bệnh viện đa khoa Huyên Thường Tín"
        },
        {
            "id": "LkFw4cjUagV",
            "name": "Phường Hạ Đình"
        },
        {
            "id": "lkMwH1S6fFv",
            "name": "Phường Ngọc Hà"
        },
        {
            "id": "lmoASZdWKxo",
            "name": "Phường Liên Mạc"
        },
        {
            "id": "LnppLXGG9ca",
            "name": "Phường Minh Khai"
        },
        {
            "id": "lNvp8k8u3Uz",
            "name": "Phường Phan Chu Trinh"
        },
        {
            "id": "loq4F7e1P1J",
            "name": "Xã Tốt Động"
        },
        {
            "id": "lQDpDYiP0Sv",
            "name": "Phường Yên Sở"
        },
        {
            "id": "luH2tWgvmYH",
            "name": "Xã An Khánh"
        },
        {
            "id": "LUU3CakFVSN",
            "name": "Bệnh viện đa khoa Huyện Đan Phượng"
        },
        {
            "id": "lvS8HdS5Jpt",
            "name": "TTYT Huyện Ba Vì"
        },
        {
            "id": "LXYLP5yR2pc",
            "name": "Phường Thuỵ Phương"
        },
        {
            "id": "ly7UAQMdGHQ",
            "name": "PYT Huyện Thanh Trì"
        },
        {
            "id": "LZIx1fj9DWR",
            "name": "PYT Quận Hai Bà Trưng"
        },
        {
            "id": "M2iTv2UXHXG",
            "name": "TTYT Huyện Mỹ Đức"
        },
        {
            "id": "M6GfyVGTT7F",
            "name": "Xã Lê Lợi"
        },
        {
            "id": "m8KEux1sInP",
            "name": "Xã Đồng Trúc"
        },
        {
            "id": "M9dgmbmko5r",
            "name": "TTYT Huyện Phú Xuyên"
        },
        {
            "id": "M9ILAGfSjTS",
            "name": "PKĐK Thanh Xuân"
        },
        {
            "id": "m9NWTys38OS",
            "name": "Xã Dương Liễu"
        },
        {
            "id": "MG7cILvSNmk",
            "name": "Thị trấn Phú Xuyên"
        },
        {
            "id": "MHL3ivC83iT",
            "name": "PKĐK Tô Hiệu"
        },
        {
            "id": "mJcRMem3rP4",
            "name": "Xã Hiền Ninh"
        },
        {
            "id": "MJezskHUybI",
            "name": "Thị trấn Yên Viên"
        },
        {
            "id": "mLkAq6qkUHO",
            "name": "Xã Tiến Thắng"
        },
        {
            "id": "MMsDK2mffbW",
            "name": "Xã Văn Hoàng"
        },
        {
            "id": "mrHVqz8W3bg",
            "name": "PYT Quận Hoàng Mai"
        },
        {
            "id": "msMJAylu8Dm",
            "name": "Xã Đường Lâm"
        },
        {
            "id": "MSwnOz0AREh",
            "name": "Xã Sen Chiểu"
        },
        {
            "id": "mT1gaKGe9XW",
            "name": "Xã Đông Yên"
        },
        {
            "id": "MTjJGnNeMu2",
            "name": "Xã Cổ Đô"
        },
        {
            "id": "mX1PxvauOrc",
            "name": "Xã Thụy Phú"
        },
        {
            "id": "mZJLIJST4O1",
            "name": "Xã Đồng Lạc"
        },
        {
            "id": "N5fbveo77dt",
            "name": "Xã Vân Canh"
        },
        {
            "id": "n7LqmBg1gXF",
            "name": "PKĐK An Mỹ"
        },
        {
            "id": "n99Ax908a3H",
            "name": "Xã Văn Khê"
        },
        {
            "id": "N9kLhRZPeAx",
            "name": "Phường Minh Khai"
        },
        {
            "id": "NaQ7mrPWDyV",
            "name": "Xã Uy Nỗ"
        },
        {
            "id": "nAzk0KryLGu",
            "name": "Xã Hương Ngải"
        },
        {
            "id": "nB8fOa4Ir1L",
            "name": "Phường Đống Mác"
        },
        {
            "id": "NcQaFaPF0w3",
            "name": "Xã Phượng Dực"
        },
        {
            "id": "nGn0VvTBzJ7",
            "name": "Bệnh viện đa khoa Huyện Hoài Đức"
        },
        {
            "id": "NgwCLo4D9CP",
            "name": "Phường Hàng Đào"
        },
        {
            "id": "NHo0S9tERr8",
            "name": "TTYT Huyện Quốc Oai"
        },
        {
            "id": "NIFlq8QvmZK",
            "name": "Xã Chàng Sơn"
        },
        {
            "id": "NiHqtPK5VDN",
            "name": "Xã Tam Thuấn"
        },
        {
            "id": "nITtJVBalAQ",
            "name": "Xã Hải Bối"
        },
        {
            "id": "nMvWOZjLjmz",
            "name": "TTYT Quận Đống Đa"
        },
        {
            "id": "NNlWtxo1z4F",
            "name": "Xã Viên Nội"
        },
        {
            "id": "nsDIgSN1EN7",
            "name": "Thị trấn Trâu Quỳ"
        },
        {
            "id": "nSWoWnVYRmg",
            "name": "Xã Thuần Mỹ"
        },
        {
            "id": "NvHNOHYwkW0",
            "name": "Xã Vạn Điểm"
        },
        {
            "id": "NWRB3AYvqS2",
            "name": "Phường Bạch Đằng"
        },
        {
            "id": "nWWypqiHx8L",
            "name": "Phường Kim Giang"
        },
        {
            "id": "NYT9n8v881X",
            "name": "Xã Tam Hiệp"
        },
        {
            "id": "Nz3MfeWRncu",
            "name": "Phường Phú Thịnh"
        },
        {
            "id": "Nz8cxQa6tee",
            "name": "Xã Thọ An"
        },
        {
            "id": "nZFS01fG8Eg",
            "name": "Xã Dục Tú"
        },
        {
            "id": "O02iGzrcF4O",
            "name": "Xã Hồng Dương"
        },
        {
            "id": "o2yUggJkgqQ",
            "name": "TTYT Quận Cầu Giấy"
        },
        {
            "id": "O3IlFWneVka",
            "name": "Xã Nghiêm Xuyên"
        },
        {
            "id": "o8Gvlbikbbb",
            "name": "Phường Mỹ Đình 2"
        },
        {
            "id": "OAsA025FYTE",
            "name": "Xã Mỹ Lương"
        },
        {
            "id": "obBWEzqcKUw",
            "name": "PKĐK Yên Hòa"
        },
        {
            "id": "obY5S6KtS8J",
            "name": "Phường Thuỵ Khuê"
        },
        {
            "id": "oCnaOXOIBC2",
            "name": "Phường Trung Hưng"
        },
        {
            "id": "ODtMtZPD0sp",
            "name": "Xã Đồng Tiến"
        },
        {
            "id": "OGty2SSdXWQ",
            "name": "PKĐK Trung Giã"
        },
        {
            "id": "oIWGQBczBUI",
            "name": "Xã Thượng Cốc"
        },
        {
            "id": "OiZT1whscpG",
            "name": "PKĐK Cầu Diểu"
        },
        {
            "id": "Ol9Wuh7w1HC",
            "name": "Phường Đại Mỗ"
        },
        {
            "id": "oLkmFMBhlG9",
            "name": "Phường Quang Trung"
        },
        {
            "id": "ond8IKp6nwI",
            "name": "Phường Điện Biên"
        },
        {
            "id": "onsZk1MvESb",
            "name": "Phường Nhật Tân"
        },
        {
            "id": "OO13GPAofBU",
            "name": "Phường Ngã Tư Sở"
        },
        {
            "id": "OoiK6QYK3zG",
            "name": "Xã Thủy Xuân Tiên"
        },
        {
            "id": "OQiHv3S0W1e",
            "name": "Phường Quang Trung"
        },
        {
            "id": "OSFOJ52LstL",
            "name": "Xã Cự Khê"
        },
        {
            "id": "Ot7pepGIyLe",
            "name": "PYT Quận Hoàn Kiếm"
        },
        {
            "id": "OtaihAgMooq",
            "name": "Xã Chương Dương"
        },
        {
            "id": "oVjPHo5ftyJ",
            "name": "PKĐK Trung tâm"
        },
        {
            "id": "ovQv3Ozc8cd",
            "name": "Bệnh viện đa khoa Huyên Mỹ Đức"
        },
        {
            "id": "oy2VdYBMsRL",
            "name": "Xã Tân Triều"
        },
        {
            "id": "OYYxuwAIqxN",
            "name": "Phường Trung Tự"
        },
        {
            "id": "P1P4geXf7yt",
            "name": "Xã Bắc Hồng"
        },
        {
            "id": "P47NTrrsS3y",
            "name": "Phường Đại Kim"
        },
        {
            "id": "p6FE7TnnGbg",
            "name": "Phường Lĩnh Nam"
        },
        {
            "id": "P9rchuCqbdf",
            "name": "PKĐK Bất Bạt"
        },
        {
            "id": "pAFOojoMSBo",
            "name": "Xã Hợp Đồng"
        },
        {
            "id": "pBmCPiXdtwW",
            "name": "Xã Di Trạch"
        },
        {
            "id": "pCGcPmvGNWO",
            "name": "Xã Chu Minh"
        },
        {
            "id": "Pe1P8lv6AJL",
            "name": "PKĐK Thạch Bàn"
        },
        {
            "id": "PLmI56tJW0C",
            "name": "TTYT Quận Hai Bà Trưng"
        },
        {
            "id": "PMCAPZN5R7O",
            "name": "Xã Hồng Sơn"
        },
        {
            "id": "PNYCAURa7sS",
            "name": "PYT Huyện Đan Phượng"
        },
        {
            "id": "POAABDgSHmo",
            "name": "PYT Huyện Thanh Oai"
        },
        {
            "id": "PQLYMUz0LcZ",
            "name": "Xã Bột Xuyên"
        },
        {
            "id": "PqMoPdYBykK",
            "name": "Xã Hòa Phú"
        },
        {
            "id": "pR9tqFbpYI7",
            "name": "Phường Trần Hưng Đạo"
        },
        {
            "id": "pRTrbQyDsi2",
            "name": "Xã Võng La"
        },
        {
            "id": "PvLhk557ZBT",
            "name": "Xã Dương Hà"
        },
        {
            "id": "PVrGZuUAJxa",
            "name": "Phường Lê Đại Hành"
        },
        {
            "id": "PW5b4UIDUY1",
            "name": "Xã Dương Xá"
        },
        {
            "id": "pWflQr3lM5i",
            "name": "Xã Đại Yên"
        },
        {
            "id": "PwxSiYGiIOU",
            "name": "Thị trấn Văn Điển"
        },
        {
            "id": "pXu3ANORyqN",
            "name": "Xã Phượng Cách"
        },
        {
            "id": "pxYkDCHUm4U",
            "name": "Phường Tây Tựu"
        },
        {
            "id": "Py7iWfO1EVc",
            "name": "Xã Việt Long"
        },
        {
            "id": "pYAejrbz1t2",
            "name": "Xã Liên Hà"
        },
        {
            "id": "PYgcp6RUQG8",
            "name": "Xã Phú Mãn"
        },
        {
            "id": "q1ef83LmHTF",
            "name": "Xã Đại Đồng"
        },
        {
            "id": "q1yTxNBwZfP",
            "name": "Xã Liên Châu"
        },
        {
            "id": "q3rIexsn6h6",
            "name": "Phường Đồng Mai"
        },
        {
            "id": "Q4NA2sFQBqw",
            "name": "TTYT Huyện Thường Tín"
        },
        {
            "id": "q80siSK9hvf",
            "name": "Xã La Phù"
        },
        {
            "id": "q9ppiv3IIrN",
            "name": "Phường Phương Liệt"
        },
        {
            "id": "QAuBulYNO2o",
            "name": "Phường Quang Trung"
        },
        {
            "id": "QCQK2QXm0OB",
            "name": "Xã Liên Hiệp"
        },
        {
            "id": "qdgzIkr3kWF",
            "name": "Phường Thanh Xuân Trung"
        },
        {
            "id": "QEcbogKLgez",
            "name": "Xã Tiên Dược"
        },
        {
            "id": "qjI8tzkhQCX",
            "name": "Xã Cao Dương"
        },
        {
            "id": "QJQRqbJjaHK",
            "name": "Xã Sơn Đà"
        },
        {
            "id": "QP1DNEg378K",
            "name": "Xã Vân Phúc"
        },
        {
            "id": "qp7DXz7WEjm",
            "name": "Xã Đắc Sở"
        },
        {
            "id": "qpTQyHEsoVG",
            "name": "Phường Hàng Bài"
        },
        {
            "id": "qq89sxdLU1N",
            "name": "Xã Vân Hà"
        },
        {
            "id": "QSGPrnd12Ke",
            "name": "Xã Hồng Hà"
        },
        {
            "id": "QtTw9ot6WDZ",
            "name": "Xã Nguyễn Trãi"
        },
        {
            "id": "qUGbgLtgfrz",
            "name": "Xã Đức Hoà"
        },
        {
            "id": "QXbJRwuOTmH",
            "name": "Xã Tiền Phong"
        },
        {
            "id": "RAHJK3XNDiW",
            "name": "Xã Phú Minh"
        },
        {
            "id": "rAJ7U8pVUpz",
            "name": "Xã Xuân Thu"
        },
        {
            "id": "rAUrCaixgjz",
            "name": "Phường Trung Văn"
        },
        {
            "id": "rcpGgCzIxEp",
            "name": "Phường Nhân Chính"
        },
        {
            "id": "RezmAME8QDl",
            "name": "PKĐK Yên Bình"
        },
        {
            "id": "RGJReOiSG48",
            "name": "Phường Trung Phụng"
        },
        {
            "id": "rJDclsAZm23",
            "name": "Phường Sơn Lộc"
        },
        {
            "id": "rJECAKjpxiu",
            "name": "Xã Vân Côn"
        },
        {
            "id": "Rk7D7TDBQpW",
            "name": "Xã Văn Bình"
        },
        {
            "id": "rlAn5w8s88L",
            "name": "Xã Yên Thường"
        },
        {
            "id": "rnkduEWyVot",
            "name": "Xã Trung Tú"
        },
        {
            "id": "RosdPD7GN0u",
            "name": "Xã Quang Minh"
        },
        {
            "id": "rpeLXeeA3QO",
            "name": "Xã Phụng Châu"
        },
        {
            "id": "rpXuLG5GDxW",
            "name": "PYT Huyện Gia Lâm"
        },
        {
            "id": "rPZodVLl21B",
            "name": "Xã Minh Phú"
        },
        {
            "id": "rqVLFg9FfCM",
            "name": "Xã Chu Phan"
        },
        {
            "id": "rruUwB58Zj3",
            "name": "Xã Hòa Nam"
        },
        {
            "id": "RTMTphqRSes",
            "name": "Thị trấn Quốc Oai"
        },
        {
            "id": "RUtQhaKto3G",
            "name": "TTYT Huyện ứng Hòa"
        },
        {
            "id": "rv1tyR7hn9S",
            "name": "Phường Quán Thánh"
        },
        {
            "id": "rx1sqXlzrEx",
            "name": "Xã Sơn Công"
        },
        {
            "id": "RzWfwW48pLH",
            "name": "Xã Mỹ Thành"
        },
        {
            "id": "RZwnvg5aK8k",
            "name": "Xã Thụy Hương"
        },
        {
            "id": "rzWObSoGcoh",
            "name": "Xã Vân Từ"
        },
        {
            "id": "s1QGel9W4A9",
            "name": "Bệnh viện đa khoa Huyện Ba Vì"
        },
        {
            "id": "S28lgzsheiG",
            "name": "Xã An Tiến"
        },
        {
            "id": "S50GCMw1zDg",
            "name": "Phường Vĩnh Hưng"
        },
        {
            "id": "S8IQ0g0Q9UR",
            "name": "Phường Ngô Quyền"
        },
        {
            "id": "s8k1XBtYhUD",
            "name": "Xã Thượng Vực"
        },
        {
            "id": "sAahyvp2WaJ",
            "name": "Xã Việt Hùng"
        },
        {
            "id": "SagXxUbEP2c",
            "name": "Xã Nam Hồng"
        },
        {
            "id": "sc6xX1FADyk",
            "name": "Xã Phú Đông"
        },
        {
            "id": "ScVdRUyYDQE",
            "name": "Xã Phù Lỗ"
        },
        {
            "id": "SGJre4ONRlp",
            "name": "Xã Tân Lập"
        },
        {
            "id": "SHjNUZYqTnU",
            "name": "Xã Đại Hùng"
        },
        {
            "id": "skKaC9S7FRg",
            "name": "TTYT Thị Xã Sơn Tây"
        },
        {
            "id": "SKqXYBoODVw",
            "name": "Phường Mai Động"
        },
        {
            "id": "SlaaVvRNLne",
            "name": "Xã Đức Thượng"
        },
        {
            "id": "sLlb5PJNbPX",
            "name": "Thị trấn Đại Nghĩa"
        },
        {
            "id": "sLXEYgzqTNV",
            "name": "Xã Hợp Thanh"
        },
        {
            "id": "SlZUo6ij7cB",
            "name": "Xã Thanh Mai"
        },
        {
            "id": "SMXikJgfS7W",
            "name": "Xã Nam Triều"
        },
        {
            "id": "sn0IOkUI7QY",
            "name": "Xã Liên Phương"
        },
        {
            "id": "Snc8fQ1b383",
            "name": "Phường Khương Thượng"
        },
        {
            "id": "sol40D0eSr3",
            "name": "Phường Kiến Hưng"
        },
        {
            "id": "SqszC24ms3b",
            "name": "Xã Thượng Mỗ"
        },
        {
            "id": "sqXV2NRKZQ5",
            "name": "Xã Cẩm Đình"
        },
        {
            "id": "SsbtUsMdU14",
            "name": "Xã Hùng Tiến"
        },
        {
            "id": "SwVxDMtImEC",
            "name": "Phường Dương Nội"
        },
        {
            "id": "SxFIkfFGu77",
            "name": "Xã Phúc Hòa"
        },
        {
            "id": "sZ5trsCkppW",
            "name": "Xã Mai Lâm"
        },
        {
            "id": "T3aHpcXYWRY",
            "name": "Bệnh viện đa khoa Huyện Gia Lâm"
        },
        {
            "id": "T4weO0jXVKS",
            "name": "TTYT Quận Ba Đình"
        },
        {
            "id": "t8fvWiCegQ5",
            "name": "Thị trấn Xuân Mai"
        },
        {
            "id": "t9qKHtb8Avy",
            "name": "Xã Đức Giang"
        },
        {
            "id": "TbiFNCY2a3V",
            "name": "Phường Kim Liên"
        },
        {
            "id": "TDitPH7CgkE",
            "name": "Xã Cẩm Yên"
        },
        {
            "id": "tdwSv9ZOw3K",
            "name": "Xã Đại Áng"
        },
        {
            "id": "TeE9CK5ZogA",
            "name": "Phường Yên Phụ"
        },
        {
            "id": "TfkSAdFM8V1",
            "name": "PYT Quận Ba Đình"
        },
        {
            "id": "tlP7Smojvuq",
            "name": "Xã Thanh Liệt"
        },
        {
            "id": "TLYtXzsTlEt",
            "name": "Bệnh viện đa khoa Huyện Thạch Thất"
        },
        {
            "id": "tNMPVUPLgSF",
            "name": "Phường Nghĩa Đô"
        },
        {
            "id": "TnUoYNps5Iy",
            "name": "Phường Thịnh Liệt"
        },
        {
            "id": "TPSJU9xzWOh",
            "name": "Xã Đại Thịnh"
        },
        {
            "id": "tRogTANXfGi",
            "name": "Xã Vạn Thái"
        },
        {
            "id": "Tsby6sApHwi",
            "name": "PKĐK Minh Quang"
        },
        {
            "id": "tsh6Zgfy6mQ",
            "name": "Xã Đông Lỗ"
        },
        {
            "id": "tSiX7dn9J0q",
            "name": "Phường Thanh Xuân Nam"
        },
        {
            "id": "tSq4TSqyazq",
            "name": "Phường Cổ Nhuế 1"
        },
        {
            "id": "ttykzZuPRAA",
            "name": "Thị trấn Thường Tín"
        },
        {
            "id": "tTZXz5qfNHn",
            "name": "Xã Kim An"
        },
        {
            "id": "TuZu74aJ6eI",
            "name": "Phường Liễu Giai"
        },
        {
            "id": "Tvg8Vv1KnP6",
            "name": "Phường Thanh Lương"
        },
        {
            "id": "tW1GFHpZuO5",
            "name": "TTYT Quận Hà Đông"
        },
        {
            "id": "tX3cyIbieHp",
            "name": "Xã Tích Giang"
        },
        {
            "id": "TX6fLBVQzKx",
            "name": "Xã Bắc Sơn"
        },
        {
            "id": "txg9tUbvDtM",
            "name": "Xã Khánh Hà"
        },
        {
            "id": "TzTaukI5CUj",
            "name": "PKĐK Chèm"
        },
        {
            "id": "u3mZXY1aW9M",
            "name": "Phường Đồng Nhân"
        },
        {
            "id": "U5h1rNuBi64",
            "name": "Xã Lam Điền"
        },
        {
            "id": "U6qOBlwvtvi",
            "name": "Xã Tứ Hiệp"
        },
        {
            "id": "U7BgoFzvRHW",
            "name": "Phường Cầu Dền"
        },
        {
            "id": "uBb3e7PuDNN",
            "name": "Xã Minh Tân"
        },
        {
            "id": "UbeuRBNqTI7",
            "name": "Xã Cát Quế"
        },
        {
            "id": "UC7CdyYJxLx",
            "name": "Xã Vân Nam"
        },
        {
            "id": "UdV3l8GBFKs",
            "name": "Phường Văn Miếu"
        },
        {
            "id": "ueLabxKXkxW",
            "name": "Xã Kim Lan"
        },
        {
            "id": "UfRawIYZWmb",
            "name": "Thị trấn Liên Quan"
        },
        {
            "id": "uGrpHXnuTNe",
            "name": "Phường Quỳnh Lôi"
        },
        {
            "id": "UhKttE6f8Kp",
            "name": "Xã Dân Hòa"
        },
        {
            "id": "UJFyaM7y6we",
            "name": "Xã Tô Hiệu"
        },
        {
            "id": "UKLMSyWQ9Ou",
            "name": "Phường Xuân Đỉnh"
        },
        {
            "id": "UKQtQ2wqpeB",
            "name": "Xã Bình Yên"
        },
        {
            "id": "UNeys3gCrQj",
            "name": "Xã Duyên Thái"
        },
        {
            "id": "UO7wE8cnKj7",
            "name": "Xã Ngọc Hòa"
        },
        {
            "id": "uQeEawi4ukA",
            "name": "Xã Hà Hồi"
        },
        {
            "id": "uRAKvMUeEUX",
            "name": "Xã Kim Hoa"
        },
        {
            "id": "US7612AJAii",
            "name": "Phường Phúc Diễn"
        },
        {
            "id": "uT6ioI12Sqy",
            "name": "Xã Yên Bình"
        },
        {
            "id": "utpcVgu8RPM",
            "name": "Phường Phú Lãm"
        },
        {
            "id": "Uwpeaq8pXis",
            "name": "Phường Yên Hòa"
        },
        {
            "id": "v2CEcoyL5l2",
            "name": "Xã Vân Hoà"
        },
        {
            "id": "v2Px7Rw5hAJ",
            "name": "Phường Thành Công"
        },
        {
            "id": "v5hWmaY7qKK",
            "name": "Xã Sài Sơn"
        },
        {
            "id": "VBnoeLTr7Bd",
            "name": "Xã Tân Dân"
        },
        {
            "id": "VCt4DHr63Hz",
            "name": "Phường Xuân Khanh"
        },
        {
            "id": "VDAAQUcQUYh",
            "name": "Xã Thạch Đà"
        },
        {
            "id": "VeC3fhL6ASh",
            "name": "PKĐK Lạc Long Quân"
        },
        {
            "id": "VEDCW7n5qVH",
            "name": "Thị trấn Phúc Thọ"
        },
        {
            "id": "vFLz4uAWNjD",
            "name": "Xã Tân Hòa"
        },
        {
            "id": "VFO3PgF8iBe",
            "name": "Xã Cấn Hữu"
        },
        {
            "id": "vfYVegp0bRx",
            "name": "Phường Thượng Đình"
        },
        {
            "id": "vhHRuzNMFCZ",
            "name": "Xã Hòa Bình"
        },
        {
            "id": "VHvTam9EJt6",
            "name": "PYT Thị Xã Sơn Tây"
        },
        {
            "id": "vIC02o3PLcz",
            "name": "Xã Ninh Hiệp"
        },
        {
            "id": "VIQWvbfzKdY",
            "name": "Thị trấn Phùng"
        },
        {
            "id": "VkczT47gxwb",
            "name": "Xã Đại Mạch"
        },
        {
            "id": "Vn3G6a06zmZ",
            "name": "Xã Đông Sơn"
        },
        {
            "id": "vnUzwdkvg3M",
            "name": "Phường Lý Thái Tổ"
        },
        {
            "id": "vO3Oypado5q",
            "name": "PYT Quận Đống Đa"
        },
        {
            "id": "vSOns3NQxFN",
            "name": "Thị trấn Trạm Trôi"
        },
        {
            "id": "VTfm9FTzjH7",
            "name": "Xã Yên Bài"
        },
        {
            "id": "vtkamZHRVHh",
            "name": "Phường Ngọc Thụy"
        },
        {
            "id": "VtUtMP0SlbT",
            "name": "Xã Quang Tiến"
        },
        {
            "id": "vugl1CWyyYP",
            "name": "Xã Thanh Mỹ"
        },
        {
            "id": "VuqadsWpnH4",
            "name": "Xã Mê Linh"
        },
        {
            "id": "vVE9HAT0EPr",
            "name": "Xã Bạch Hạ"
        },
        {
            "id": "vvvzy6LQ0Rc",
            "name": "Xã Tân Minh"
        },
        {
            "id": "VxggrEzClFY",
            "name": "Phường Phương Liên"
        },
        {
            "id": "vY66vbuUirK",
            "name": "Bệnh viện đa khoa Huyện Thanh Oai"
        },
        {
            "id": "vZeF1vtA4Rt",
            "name": "PYT Quận Nam Từ Liêm"
        },
        {
            "id": "w0QhQj5fRwR",
            "name": "Xã Đông Dư"
        },
        {
            "id": "w4eWfunP3sL",
            "name": "Phường Bạch Mai"
        },
        {
            "id": "w6Q02Ex88AF",
            "name": "Bệnh viện đa khoa Huyện Phú Xuyên"
        },
        {
            "id": "w72oHg2QUI9",
            "name": "Xã Đông Phương Yên"
        },
        {
            "id": "w7AjaQNDXGJ",
            "name": "Xã Thống Nhất"
        },
        {
            "id": "w7GvKiZf7o1",
            "name": "Xã Hồng Vân"
        },
        {
            "id": "W7ZrbWeTHiA",
            "name": "Phường Khâm Thiên"
        },
        {
            "id": "w9XwblfyehI",
            "name": "Phường Phúc La"
        },
        {
            "id": "wB6YljnFBIF",
            "name": "Phường Thạch Bàn"
        },
        {
            "id": "wBNw3DRsnXS",
            "name": "Phường Vạn Phúc"
        },
        {
            "id": "wcZ48IFYs1H",
            "name": "Thị trấn Vân Đình"
        },
        {
            "id": "WdLoo0qs8ks",
            "name": "Xã Đình Xuyên"
        },
        {
            "id": "wgCrjFGfdde",
            "name": "Phường Phương Mai"
        },
        {
            "id": "WISrGMETGDz",
            "name": "Xã Liên Bạt"
        },
        {
            "id": "wixYPlOfJSw",
            "name": "Xã Lê Thanh"
        },
        {
            "id": "WJ8K8On8Djm",
            "name": "Phường Ngọc Lâm"
        },
        {
            "id": "WL7unEPc6Q7",
            "name": "Xã Thắng Lợi"
        },
        {
            "id": "WmgWq7Cd9Cz",
            "name": "Xã Võng Xuyên"
        },
        {
            "id": "WMlSHeYBFWx",
            "name": "Xã Tả Thanh Oai"
        },
        {
            "id": "wNEPBwkETAR",
            "name": "Xã Thạch Xá"
        },
        {
            "id": "WOMjdOWMgdy",
            "name": "Phường Nguyễn Trãi"
        },
        {
            "id": "wqCKotZixCG",
            "name": "Phường Quảng An"
        },
        {
            "id": "wSGxpfMofqr",
            "name": "TTYT Huyện Mê Linh"
        },
        {
            "id": "wwHuxOiiQKl",
            "name": "PKĐK Lương Ngọc Quyến"
        },
        {
            "id": "wY2Cnv17VCS",
            "name": "Xã Yên Sở"
        },
        {
            "id": "WYcTrFYVt8X",
            "name": "PKĐK Ngọc Tảo"
        },
        {
            "id": "WZKBkNjT213",
            "name": "Xã Vân Tảo"
        },
        {
            "id": "X16oM4Fxo24",
            "name": "Xã Cổ Loa"
        },
        {
            "id": "X1KpVMRiqLy",
            "name": "Xã Phong Vân"
        },
        {
            "id": "X5HyVhDFNnH",
            "name": "Xã Đông La"
        },
        {
            "id": "X6LvMiSngdl",
            "name": "Phường Văn Quán"
        },
        {
            "id": "x7JSZAdXZqd",
            "name": "PhườngTây Mỗ"
        },
        {
            "id": "XBM8tPSzDe6",
            "name": "Xã Đồng Thái"
        },
        {
            "id": "xbnhzX6WUx8",
            "name": "Phường Đồng Xuân"
        },
        {
            "id": "xCKk11FNcJu",
            "name": "Bệnh viện đa khoa Huyện Phúc Thọ"
        },
        {
            "id": "XcueO5EXG2p",
            "name": "Phường Cửa Đông"
        },
        {
            "id": "XDC0zBS7iKJ",
            "name": "Phường Phúc Đồng"
        },
        {
            "id": "XdDrFu1ht3M",
            "name": "Xã Thuỵ Lâm"
        },
        {
            "id": "XEjmA0g7JRl",
            "name": "Xã Tuyết Nghĩa"
        },
        {
            "id": "xGYvxujv2VJ",
            "name": "Xã Xuân Sơn"
        },
        {
            "id": "XInwPJrB8Te",
            "name": "Phường Xuân Phương"
        },
        {
            "id": "XJTUphCJxDD",
            "name": "Xã Liên Hồng"
        },
        {
            "id": "XKMbJuFXL9F",
            "name": "Xã Phù Lưu Tế"
        },
        {
            "id": "XLBDPKgzNju",
            "name": "Phường Hoàng Liệt"
        },
        {
            "id": "XLIbSiCfgd3",
            "name": "Xã Đội Bình"
        },
        {
            "id": "XlZ7kiLFdri",
            "name": "Xã Ngọc Liệp"
        },
        {
            "id": "XMPrC1TVYSa",
            "name": "Xã Yên Mỹ"
        },
        {
            "id": "xN3mBVC9yHR",
            "name": "Phường Hà Cầu"
        },
        {
            "id": "XNXIXKuGB8K",
            "name": "Xã Đông Mỹ"
        },
        {
            "id": "xP3srHlTkcB",
            "name": "Xã Cẩm Lĩnh"
        },
        {
            "id": "XQOF9CXy8DV",
            "name": "Xã Tiên Phong"
        },
        {
            "id": "xSoTJmsSF8u",
            "name": "phường Lê Lợi"
        },
        {
            "id": "xTJozcSdJIs",
            "name": "Xã Lệ Chi"
        },
        {
            "id": "XUQUDSY561k",
            "name": "Phường Hàng Trống"
        },
        {
            "id": "xWg79velmXy",
            "name": "Xã Châu Sơn"
        },
        {
            "id": "xXJi4KUeNWL",
            "name": "Phường Ngô Thì Nhậm"
        },
        {
            "id": "xzRbdcz9kbs",
            "name": "PKĐK Liên Hồng"
        },
        {
            "id": "y04PmlIqufG",
            "name": "Phường Phú Diễn"
        },
        {
            "id": "Y0c5xNidLVJ",
            "name": "Xã Sơn Hà"
        },
        {
            "id": "Y1qjvnXn9aR",
            "name": "Phường Gia Thụy"
        },
        {
            "id": "Y4OZu8MgqRM",
            "name": "Xã Tảo Dương Văn"
        },
        {
            "id": "y6p2e6tJS84",
            "name": "Xã Duyên Hà"
        },
        {
            "id": "Yad4duvYecm",
            "name": "Xã Tân Tiến"
        },
        {
            "id": "yaGAn2L5Ff7",
            "name": "Xã Nhị Khê"
        },
        {
            "id": "YcZlfePjspu",
            "name": "Xã Hòa Xá"
        },
        {
            "id": "yErjInVQJgY",
            "name": "Xã Xuân Nộn"
        },
        {
            "id": "yF7VLETR6ns",
            "name": "Phường Dịch Vọng Hậu"
        },
        {
            "id": "yg3tuG7U1Mz",
            "name": "Xã Lại Yên"
        },
        {
            "id": "yhADKwOi0jM",
            "name": "Thị trấn Sóc Sơn"
        },
        {
            "id": "YHwqBqZvtDZ",
            "name": "Xã Bình Phú"
        },
        {
            "id": "YinMpGlJtuG",
            "name": "PKĐK Lê Lợi"
        },
        {
            "id": "YIP0jt0nXda",
            "name": "PYT Huyện Hoài Đức"
        },
        {
            "id": "YJxxLEkGMgx",
            "name": "Xã Hát Môn"
        },
        {
            "id": "YKsRhnYnBEU",
            "name": "PKĐK Dân Hòa"
        },
        {
            "id": "yLy5T88KP2b",
            "name": "PKĐK Lĩnh Nam"
        },
        {
            "id": "YmmdzrXudFR",
            "name": "Phường Quốc Tử Giám"
        },
        {
            "id": "yNZ3gIOdXEr",
            "name": "Xã Đồng Tháp"
        },
        {
            "id": "yOcuGZBxh3v",
            "name": "Xã Chi Đông"
        },
        {
            "id": "YoYoNJV8G09",
            "name": "Xã Chuyên Mỹ"
        },
        {
            "id": "yQFqMTE6eQn",
            "name": "TTYT Quận Hoàn Kiếm"
        },
        {
            "id": "yqNWunUUqWk",
            "name": "PYT Quận Long Biên"
        },
        {
            "id": "yQUz2Z6SiRP",
            "name": "TTYT Quận Bắc Từ Liêm"
        },
        {
            "id": "ySkSdeqhjOS",
            "name": "Xã Đại Thành"
        },
        {
            "id": "yT9nROjhWjf",
            "name": "Phường Phú Đô"
        },
        {
            "id": "yVHKRpNs53Z",
            "name": "Xã Kim Sơn"
        },
        {
            "id": "yWw4eF6PBZT",
            "name": "Phường Trúc Bạch"
        },
        {
            "id": "yy0dSEWG3px",
            "name": "Xã Vạn Yên"
        },
        {
            "id": "YY6q1he3VJf",
            "name": "Phường Mai Dịch"
        },
        {
            "id": "YyKLvRTt68f",
            "name": "Phường Tứ Liên"
        },
        {
            "id": "z0GKjCMaOzc",
            "name": "Phường Yên Nghĩa"
        },
        {
            "id": "Z2citYlibJO",
            "name": "PYT Huyện Quốc Oai"
        },
        {
            "id": "z2EySdEsOkz",
            "name": "Xã Tiên Phương"
        },
        {
            "id": "z33RkjRH4lB",
            "name": "TTYT Huyện Sóc Sơn"
        },
        {
            "id": "z3594SqePhM",
            "name": "Xã An Mỹ"
        },
        {
            "id": "Z3bc0ufV2if",
            "name": "Xã Phù Đổng"
        },
        {
            "id": "z3LNeQtahfq",
            "name": "Phường Định Công"
        },
        {
            "id": "Z3n4OccFBXs",
            "name": "Xã Phù Linh"
        },
        {
            "id": "z442v6B8NU9",
            "name": "Xã Đỗ Động"
        },
        {
            "id": "Z4DnsGp7EBS",
            "name": "Phường Cổ Nhuế 2"
        },
        {
            "id": "Z5qlmutZbNX",
            "name": "PYT Huyện Thạch Thất"
        },
        {
            "id": "Z7yoeypGCpD",
            "name": "Phường La Khê"
        },
        {
            "id": "Z8wAb8mOD6c",
            "name": "Xã Tiền Phong"
        },
        {
            "id": "Z9FolJXnPhA",
            "name": "Xã Quang Trung"
        },
        {
            "id": "zA2cPZYM9Cf",
            "name": "Xã Hoàng Kim"
        },
        {
            "id": "zA73nnTBbOY",
            "name": "Phường Hàng Bột"
        },
        {
            "id": "ZD4hBArdAFe",
            "name": "Xã Phú Cường"
        },
        {
            "id": "Zh9UELBU4Hp",
            "name": "Xã Phú Yên"
        },
        {
            "id": "ZhYp8yycFIQ",
            "name": "Xã Trung Giã"
        },
        {
            "id": "ZI1DmVwRo3d",
            "name": "Xã Đông Hội"
        },
        {
            "id": "zjs3tWj3sb7",
            "name": "Xã Vân Hà"
        },
        {
            "id": "ZK8siQU9gOr",
            "name": "Xã Trung Mầu"
        },
        {
            "id": "ZkdcIcNqLAb",
            "name": "Xã Đồng Quang"
        },
        {
            "id": "ZL1AV9v3xjq",
            "name": "Xã Mỹ Hưng"
        },
        {
            "id": "zLyfWTDSu8I",
            "name": "Xã Thanh Bình"
        },
        {
            "id": "zpsBRA2mO3w",
            "name": "Phường Tràng Tiền"
        },
        {
            "id": "Zq5rqMy8Wz8",
            "name": "Xã Hòa Chính"
        },
        {
            "id": "ZqpJw3hQ4Gv",
            "name": "Xã Đại Hưng"
        },
        {
            "id": "ZSPSDOh1MIq",
            "name": "TTYT Quận Nam Từ Liêm"
        },
        {
            "id": "ZT0eR3MoPgA",
            "name": "Xã Phú Nam An"
        },
        {
            "id": "zWgSO4Umb13",
            "name": "Phường Mỹ Đình 1"
        },
        {
            "id": "zwi8sg1kHgI",
            "name": "Phường Văn Chương"
        },
        {
            "id": "ZxB2wMYHZ3A",
            "name": "Xã Tiền Yên"
        },
        {
            "id": "zXds3ebEdvB",
            "name": "Xã Trường Yên"
        }
    ]

    // Ha Nam
    let arrOrg = [
        {
            "id": "kGNtYxgWtmn",
            "name": "Xã Đồng Du"
        },
        {
            "id": "A0yd74ppAu7",
            "name": "Xã Liêm Túc"
        },
        {
            "id": "A2eqN0DZtV1",
            "name": "Xã Đức Lý"
        },
        {
            "id": "A5Thl9zQS1l",
            "name": "Xã Duy Hải"
        },
        {
            "id": "ahqNJhmhIBB",
            "name": "Thị trấn Kiện Khê"
        },
        {
            "id": "aPKTZx0FqMa",
            "name": "Xã Tiên Sơn"
        },
        {
            "id": "AsLOkMxXUZM",
            "name": "Phường Lương Khánh Thiện"
        },
        {
            "id": "AZY5VZPy4NE",
            "name": "Xã Tượng Lĩnh"
        },
        {
            "id": "b3Gi09mdb6S",
            "name": "Phường Quang Trung"
        },
        {
            "id": "BFUxFlCDAov",
            "name": "Phường Châu Sơn"
        },
        {
            "id": "BqCHbeaba0N",
            "name": "Xã Văn Lý"
        },
        {
            "id": "bxvlFBAnopb",
            "name": "Xã Tiến Thắng"
        },
        {
            "id": "bz6N54vF3QY",
            "name": "Xã Văn Xá"
        },
        {
            "id": "c3TvWuE7Ql2",
            "name": "Thị trấn Ba Sao"
        },
        {
            "id": "CGKbbIpIluK",
            "name": "Thị trấn Bình Mỹ"
        },
        {
            "id": "cLdoxVZ2CzT",
            "name": "Xã Liêm Tuyền"
        },
        {
            "id": "cmNb4JnwQI7",
            "name": "Xã Thanh Nguyên"
        },
        {
            "id": "cRJwIKUbIaD",
            "name": "Xã Nhật Tân"
        },
        {
            "id": "CUQbu3foIHR",
            "name": "Thị trấn Hòa Mạc"
        },
        {
            "id": "CWwV64lTSmh",
            "name": "Xã Tiên Hiệp"
        },
        {
            "id": "D0BebPAFcct",
            "name": "Xã Liêm Phong"
        },
        {
            "id": "D6vyLrirTZZ",
            "name": "Xã Trác Văn"
        },
        {
            "id": "DK6i4SK0KEs",
            "name": "PYT Huyện Kim Bảng"
        },
        {
            "id": "DKUtegZvsqA",
            "name": "Xã Nhân Hưng"
        },
        {
            "id": "DKwfRmPMIMD",
            "name": "Xã Hoàng Tây"
        },
        {
            "id": "dOV59LB3ybZ",
            "name": "Xã Liêm Chung"
        },
        {
            "id": "DPpxcP06HFW",
            "name": "Xã Nhân Mỹ"
        },
        {
            "id": "duQvQjleppS",
            "name": "Xã Yên Nam"
        },
        {
            "id": "E9dX5LPcOM0",
            "name": "Xã Nhân Khang"
        },
        {
            "id": "eDyDSp2KvPm",
            "name": "Xã Thi Sơn"
        },
        {
            "id": "EeH7TywV0SH",
            "name": "PYT Huyện Duy Tiên"
        },
        {
            "id": "eeWk27OQDdX",
            "name": "Xã Tiêu Động"
        },
        {
            "id": "elxAcwmQVwy",
            "name": "Xã Châu Giang"
        },
        {
            "id": "EM4SIB71z18",
            "name": "PYT Huyện Bình Lục"
        },
        {
            "id": "EZgIQvHZtGI",
            "name": "Xã Tân Sơn"
        },
        {
            "id": "F16Uvb63HUP",
            "name": "Xã Nhật Tựu"
        },
        {
            "id": "f43rNyfy52V",
            "name": "Xã Khả Phong"
        },
        {
            "id": "fNBRk5FhMBe",
            "name": "Xã An Nội"
        },
        {
            "id": "fNCMKGoP7LE",
            "name": "Xã Yên Bắc"
        },
        {
            "id": "Fq3Z3mdIzEi",
            "name": "Xã Thanh Phong"
        },
        {
            "id": "fU0q1XoYajM",
            "name": "Xã Mỹ Thọ"
        },
        {
            "id": "fyyF4JxSSAx",
            "name": "Xã Thanh Lưu"
        },
        {
            "id": "G0dM9UpnWwg",
            "name": "Xã Phù Vân"
        },
        {
            "id": "g2wtCYQQxbw",
            "name": "Xã Nhân Chính"
        },
        {
            "id": "Gg22gXerXCy",
            "name": "TTYT Huyện Duy Tiên"
        },
        {
            "id": "gmUz1RPvjvO",
            "name": "Xã Thanh Nghị"
        },
        {
            "id": "Gs0pIp9ACRD",
            "name": "Xã Tiên Ngoại"
        },
        {
            "id": "GuDj0dsIDAD",
            "name": "Xã Kim Bình"
        },
        {
            "id": "GVVbDhslDTm",
            "name": "Xã Trịnh Xá"
        },
        {
            "id": "h1Kjy8F4Erm",
            "name": "Xã An Ninh"
        },
        {
            "id": "H3nkR0BLUTS",
            "name": "Xã Chính Lý"
        },
        {
            "id": "HIqiwpk657J",
            "name": "Xã Vũ Bản"
        },
        {
            "id": "HqbZrr37N4Q",
            "name": "Xã Nhân Bình"
        },
        {
            "id": "I1cgPTEDR3A",
            "name": "Xã Liên Sơn"
        },
        {
            "id": "IalY6VETW5s",
            "name": "Xã Nguyễn Úy"
        },
        {
            "id": "iBYF55EJTEj",
            "name": "Xã Tiên Tân"
        },
        {
            "id": "iCbiT4LXru5",
            "name": "Phường Đồng Văn"
        },
        {
            "id": "IegqASln8Qk",
            "name": "Xã Chân Lý"
        },
        {
            "id": "iISCN7uEEOH",
            "name": "Xã Thanh Tân"
        },
        {
            "id": "irzJn1GPOz6",
            "name": "Xã Đinh Xá"
        },
        {
            "id": "isF1cwfYGIa",
            "name": "Xã Thanh Thủy"
        },
        {
            "id": "isrRwipKuiK",
            "name": "Xã La Sơn"
        },
        {
            "id": "iWF3owdCYGe",
            "name": "Xã Công Lý"
        },
        {
            "id": "Je0ceaPLJV2",
            "name": "Phường Trần Hưng Đạo"
        },
        {
            "id": "JkW4y1tfYos",
            "name": "Phường Thanh Châu"
        },
        {
            "id": "JuYrMoWGxN0",
            "name": "Xã Nhân Thịnh"
        },
        {
            "id": "KtM5LgytCEn",
            "name": "Xã Đồng Lý"
        },
        {
            "id": "kZyKZp8oBxQ",
            "name": "Xã Thanh Hương"
        },
        {
            "id": "laGbGakH3Jl",
            "name": "Xã Thanh Hà"
        },
        {
            "id": "LBSVNB2n7Ko",
            "name": "Xã Bắc Lý"
        },
        {
            "id": "LHULz4tbkU1",
            "name": "Phường Liêm Chính"
        },
        {
            "id": "MDsLr3szgQe",
            "name": "Thị trấn Vĩnh Trụ"
        },
        {
            "id": "mggrqrVyyrq",
            "name": "Xã Châu Sơn"
        },
        {
            "id": "MKjZvkkXqDg",
            "name": "Xã An Lão"
        },
        {
            "id": "NndSsRkSG07",
            "name": "Xã Phú Phúc"
        },
        {
            "id": "odlfeuPouoH",
            "name": "Phường Lam Hạ"
        },
        {
            "id": "OP7xEbkDmHY",
            "name": "Xã Hoàng Đông"
        },
        {
            "id": "p1fSiL8k1t1",
            "name": "Xã Đại Cương"
        },
        {
            "id": "P5bhgNLZWF8",
            "name": "Phường Hai Bà Trưng"
        },
        {
            "id": "P7TFkd1JSAf",
            "name": "PYT Huyện Lý Nhân"
        },
        {
            "id": "PAy0dtn8v8j",
            "name": "Xã Liêm Sơn"
        },
        {
            "id": "phbod40YTnO",
            "name": "TTYT Huyện Bình Lục"
        },
        {
            "id": "PoDHWAs1hfz",
            "name": "Xã Duy Minh"
        },
        {
            "id": "qC7Vdvc6kM1",
            "name": "PYT Thành phố Phủ Lý"
        },
        {
            "id": "qJjQpalOIxT",
            "name": "Xã Bồ Đề"
        },
        {
            "id": "QQLRnnY2U00",
            "name": "Phường Thanh Tuyền"
        },
        {
            "id": "R0YxAc7a8Wc",
            "name": "Xã Chuyên Ngoại"
        },
        {
            "id": "ri2RTTVhAcT",
            "name": "Xã Xuân Khê"
        },
        {
            "id": "SjFcxiffPDr",
            "name": "Xã An Mỹ"
        },
        {
            "id": "SndAcdzqt1u",
            "name": "TTYT Huyện Lý Nhân"
        },
        {
            "id": "SO7iMU3v5w5",
            "name": "Xã Lê Hồ"
        },
        {
            "id": "svTEqmHtQv3",
            "name": "Xã Hưng Công"
        },
        {
            "id": "sx7BLBeTQWT",
            "name": "TTYT Thành phố Phủ Lý"
        },
        {
            "id": "SxuoFjvST20",
            "name": "Xã Ngọc Sơn"
        },
        {
            "id": "t6YmGnXN6XH",
            "name": "Phường Lê Hồng Phong"
        },
        {
            "id": "U0JbQ8YfKxf",
            "name": "Xã Bình Nghĩa"
        },
        {
            "id": "UACx4Lrz38w",
            "name": "Xã Nhân Nghĩa"
        },
        {
            "id": "uFdITLFznxQ",
            "name": "Xã Liêm Tiết"
        },
        {
            "id": "UI12Ub4MEPV",
            "name": "Xã Hòa Hậu"
        },
        {
            "id": "UMF9ogXDSiU",
            "name": "Xã Thanh Tâm"
        },
        {
            "id": "UMTSKCsiwZM",
            "name": "Xã Mộc Bắc"
        },
        {
            "id": "UmyTw8XGVea",
            "name": "TTYT Huyện Thanh Liêm"
        },
        {
            "id": "UyRGOhyyvHN",
            "name": "TTYT Huyện Kim Bảng"
        },
        {
            "id": "vcFsbkenSur",
            "name": "Xã Đồng Hoá"
        },
        {
            "id": "vtm5CPh4xu9",
            "name": "Xã Thụy Lôi"
        },
        {
            "id": "W4FhZfiAHXr",
            "name": "PYT Huyện Thanh Liêm"
        },
        {
            "id": "w8IAERF0mcZ",
            "name": "Xã Ngọc Lũ"
        },
        {
            "id": "WcJQRbUUN9p",
            "name": "Xã Tiên Hải"
        },
        {
            "id": "wJ4LCwYYZi8",
            "name": "Xã Trần Hưng Đạo"
        },
        {
            "id": "WQYEAvTIt3X",
            "name": "Xã Thanh Sơn"
        },
        {
            "id": "wx2YVgvWg3Z",
            "name": "Xã Mộc Nam"
        },
        {
            "id": "x2WNpbMsanu",
            "name": "Xã Thanh Hải"
        },
        {
            "id": "XGpD7mMttyu",
            "name": "Xã Hợp Lý"
        },
        {
            "id": "XOgkO9gzXVo",
            "name": "Phường Minh Khai"
        },
        {
            "id": "xT0GFbkQjRV",
            "name": "Xã Trung Lương"
        },
        {
            "id": "Y4AjaeeQUhn",
            "name": "Xã An Đổ"
        },
        {
            "id": "y9nlZZRpRrV",
            "name": "Xã Liêm Cần"
        },
        {
            "id": "YcHxKHu96Cb",
            "name": "Xã Liêm Thuận"
        },
        {
            "id": "YCYghtx7qCV",
            "name": "Xã Nguyên Lý"
        },
        {
            "id": "yk0xkNLsFjK",
            "name": "Xã Đạo Lý"
        },
        {
            "id": "YqbMGXjXWq7",
            "name": "Phường Bạch Thượng"
        },
        {
            "id": "yVOz8DbREsX",
            "name": "Thị trấn Quế"
        },
        {
            "id": "zMXd082mmwK",
            "name": "Xã Đồn Xá"
        },
        {
            "id": "ZOjZ8aJb5ur",
            "name": "Xã Tiên Nội"
        },
        {
            "id": "zQYRlcolkkr",
            "name": "Xã Tràng An"
        },
        {
            "id": "zWXiThbeVir",
            "name": "Thị Trấn Tân Thanh"
        },
        {
            "id": "zx0m4znor3J",
            "name": "Xã Bối Cầu"
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
    for (let row = 3; row < 1000; row++) {
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
    for (let i = 3; i < Object.keys(result).length + 3; i++) {
        let checkTei = await checkTeiExist(`${result[i][7]}`);
        idOrgUnit = getIdOrg(result[i][1]);
        if (checkTei.status != 0) {
            mEnrollment = {
                "orgUnit": `${checkTei.orgUnitID}`,
                "program": "a7arqsOKzsr",
                "trackedEntityType": "EL3fkeMR3xK",
                "trackedEntityInstance": `${checkTei.teiID}`,
                "enrollmentDate": "2021-01-01",
                "incidentDate": "2021-01-01",
                "events": []
            }
            resultEnrollments.enrollments.push(mEnrollment);
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
        }
    }
    fs.writeFileSync(`${__dirname}/output/importEnrollments-NhiemVu-${orgName}-${sheetName}.json`, JSON.stringify(resultEnrollments));
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
    if (mValue && mValue.toLowerCase() == 'Nam'.toLowerCase()) {
        return '01'
    }
    if (mValue && mValue.toLowerCase() == 'Nữ'.toLowerCase()) {
        return '02'
    }
    if (mValue && mValue.toLowerCase() == 'Trạm Y tế'.toLowerCase()) {
        return '1'
    }
    if (mValue && mValue.toLowerCase() == 'Bệnh viện huyện'.toLowerCase()) {
        return '2'
    }
    if (mValue && mValue.toLowerCase() == 'Bệnh viện tỉnh'.toLowerCase()) {
        return '3'
    }
    if (mValue && mValue.toLowerCase() == 'Bệnh viện trung ương'.toLowerCase()) {
        return '4'
    }
    if (mValue && mValue.toLowerCase() == 'Bệnh viện tư nhân'.toLowerCase()) {
        return '5'
    }
    if (mValue && mValue.toLowerCase() == 'Khác'.toLowerCase()) {
        return '6'
    }
}

function add0toCMT(mCMT) {
    if (mCMT == '') return ''
    return mCMT = `0${mCMT}`
}

function checkTeiExist(mBHYT) {
    return new Promise((resolve, reject) => {
        let result = { "status": "", "teiID": "", "orgUnitID": "" };
        let url = ``
        url = baseUrl + `/api/trackedEntityInstances.json?ou=nJm9lSLVvG8&ouMode=ACCESSIBLE&program=NAleauPZvIE&attribute=JHb1hzseNMg:EQ:${mBHYT}&paging=false`
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

//=IF(N3="TYT"; "Trạm Y tế"; IF(N3="BVtỉnh"; "Bệnh viện tỉnh"; IF(N3="BV Khánh Vĩnh"; "Bệnh viện huyện"; IF(N3="PKĐK"; "Bệnh viện tư nhân"; "Khác"))))