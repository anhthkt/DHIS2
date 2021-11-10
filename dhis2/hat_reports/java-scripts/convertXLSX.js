const fs = require('fs');
const xlsx = require('xlsx');
// const writeJson = require('write-json-file');
let _ = require('lodash');
let workbook = xlsx.readFile(`${__dirname}/input/DaNang-ThanhKhe-DTD.xlsx`);
console.log(workbook);

let arrSheetNames = workbook.SheetNames;
for(let s = 0; s < arrSheetNames.length; s++) {
    let sheetName = workbook.SheetNames[s];
    // Name file output
    let orgName = 'DaNang-ThanhKhe-DTD'

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
    let arrOrg = [
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
    let idOrg = '';
    arrOrg.forEach(e=>{
        if (nameOrg == e.name){
            idOrg = e.id;
        }
    })
    return idOrg;
}

// function exportTeiFromExcel(sheetName, programId, idOrgUnit) {
function exportTeiFromExcel(sheetName, programId, idOrgUnit, orgName) {
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
    for (let i = 3; i < Object.keys(result).length + 3; i++) {
 
        idOrgUnit = getIdOrg(result[i][1]);

        if(programId == 'NAleauPZvIE'){
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

        if(programId == 'a7arqsOKzsr'){
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

        if(programId == 'gPWs4FRX9dj' || programId == 'WmEGO8Ipykm' || programId == 'XrC0U6IV4W0'){
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

    fs.writeFileSync(`${__dirname}/output/importTei-${orgName}-${sheetName}.json`, JSON.stringify(resultTei));
    // writeJson(`${__dirname}/${directory}/importTei.json`, resultTei)
    // fs.readdir(`./${directory}`, function (err, files) {
    //   files.forEach(function (file) {
    //     let x = fs.readFileSync(`./${directory}/${file}`, 'utf8')
    //     fs.writeFileSync(`./${directory}/${file}`, `[${x.substring(0, x.length -1).trim()}]`, {mode: 0x1b6})
    //   })
    // })
    console.log("[*] Create JSON files successfully!!")
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


//=IF(N3="TYT"; "Trạm Y tế"; IF(N3="BVtỉnh"; "Bệnh viện tỉnh"; IF(N3="BV Khánh Vĩnh"; "Bệnh viện huyện"; IF(N3="PKĐK"; "Bệnh viện tư nhân"; "Khác"))))