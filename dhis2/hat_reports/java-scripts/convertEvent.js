const _writeJsonFile = require('write-json-file');
const _axios = require("axios")
// _axios.get('http://kln.tkyt.vn/api/dataValueSets.json?dataSet=tONFZrjm2UU&period=202107&orgUnit=LOdti1gATwC&children=true', {
_axios.get('http://kln.tkyt.vn/api/dataValueSets.json?dataSet=tONFZrjm2UU&period=202108&orgUnit=LOdti1gATwC&children=true', {
    auth: {
        username: 'anhth',
        password: 'Csdl2018@)!*'
    }
}).then(res => {
    // console.log(res);
    let result = res.data.dataValues.reduce(function (r, a) {
        r[a.orgUnit] = r[a.orgUnit] || [];
        r[a.orgUnit].push(a);
        return r;
    }, Object.create(null));
    //console.log(result);
    let resultImport = Object.keys(result)//get list key
        .reduce((total, ou) => {// convert to import api's template 
            let pe = "2021-08-01"
            let dataValue = result[ou].map((x) => {
                if(x.dataElement == 'R9Rdr3BAGYJ'){x.dataElement = 'xcKXWpW2h0e'} //Có thuốc kết hợp 3 loại đơn chất trên
                if(x.dataElement == 'I8Eg0GDLPdk'){x.dataElement = 'pVxE2Fo1qe5'} //Có thuốc chẹn kênh can xi
                if(x.dataElement == 'RHcaS5LVP6E'){x.dataElement = 'G4UeYJf44It'} //Có thuốc ức chế men chuyển và/hoặc ức chế thụ thể
                if(x.dataElement == 'LgX47Q4nlLs'){x.dataElement = 'hPWdJuFk5qF'} //Có thuốc lợi tiểu thiazide hoặc tương tự
                if(x.dataElement == 'x4ZakxVdTKf'){x.dataElement = 'D9k02A8N5nE'} //Có thuốc kết hợp 2 loại đơn chất trên
                if(x.dataElement == 'kRJZBm6P2RE'){x.dataElement = 'XDdM6pGUoLM'} //Có thuốc kết hợp chẹn kênh canxi và hypothiazide hoặc tương tự
                if(x.dataElement == 'dXa1wH26j3t'){x.dataElement = 'tiGNbWaUfDN'} //Có thuốc kết hợp UCMC/UCTT và hypothiazide hoặc tương tự
                if(x.dataElement == 'h48D8XSiMHI'){x.dataElement = 'yUgBbBWZYMi'} //Có thực hiện cấp thuốc 28-30 ngày cho phần lớn bệnh nhân THA
                if(x.dataElement == 'ozCZLYw0dRF'){x.dataElement = 'i0M5ygSORRY'} //Có thuốc Metformin
                if(x.dataElement == 'aukRGBVqzv6'){x.dataElement = 'rta1bVCriat'} //Có thuốc Gliclazide
                if(x.dataElement == 'rV5DaUaGIzR'){x.dataElement = 'WHZjMfm4ay1'} //Có thực hiện cấp thuốc 28-30 ngày cho phần lớn bệnh nhân ĐTĐ
                if(x.dataElement == 'MohkAARZ92g'){x.dataElement = 'YpPjveUc0wA'} //Có thuốc kết hợp chẹn kênh canxi và UCMC/UCTT
                if(x.dataElement == 'rlLecgNVVwl'){x.dataElement = 'FVjtaNfbZp3'} //Tổng số viên thuốc điều trị THA hiện có
                if(x.dataElement == 'MLLIbQrTQRD'){x.dataElement = 'c2iq3ADGesQ'} //Tổng số viên thuốc điều trị ĐTĐ hiện có    
                if(x.dataElement == 'a3y72XOLlNT'){x.dataElement = 'j8iFtQyl0tQ'} //TYT - Có huyết áp kế điện tử còn sửa dụng được
                return { 'dataElement': x.dataElement, 'value': x.value }
            })
            let valueDeSEu4PbpdKRq = false
            let valueDeXAzLTInKQCV = false
            let valueDeJFGX1TmY0x = false
            let valueDeoMM3XryyZa6 = false
            dataValue.forEach(e=>{
                if (e.dataElement == 'i0M5ygSORRY' & e.value == 'true' || 
                    e.dataElement == 'rta1bVCriat' & e.value == 'true' || 
                    e.dataElement == 'D9k02A8N5nE' & e.value == 'true' 
                    ) {valueDeSEu4PbpdKRq= true}
                if (e.dataElement == 'pVxE2Fo1qe5' & e.value == 'true' ||
                    e.dataElement == 'G4UeYJf44It' & e.value == 'true' ||
                    e.dataElement == 'hPWdJuFk5qF' & e.value == 'true' ||
                    e.dataElement == 'XDdM6pGUoLM' & e.value == 'true' ||
                    e.dataElement == 'YpPjveUc0wA' & e.value == 'true' ||
                    e.dataElement == 'tiGNbWaUfDN' & e.value == 'true' ||
                    e.dataElement == 'xcKXWpW2h0e' & e.value == 'true' 
                ){valueDeXAzLTInKQCV= true} 
                })
                dataValue.push({"dataElement": "SEu4PbpdKRq", "value": `${valueDeSEu4PbpdKRq}`}) //TYT có đủ ít nhất 1 nhóm thuốc ĐTĐ không?
                dataValue.push({"dataElement": "XAzLTInKQCV", "value": `${valueDeXAzLTInKQCV}`}) //TYT có đủ ít nhất 1 nhóm thuốc THA không?
            dataValue.forEach(e=>{
                if (e.dataElement == 'SEu4PbpdKRq' & e.value == 'true' || 
                    e.dataElement == 'WHZjMfm4ay1' & e.value == 'true' || 
                    e.dataElement == 'c2iq3ADGesQ' & e.value > 0 
                    ) {valueDeJFGX1TmY0x= true}
                if (e.dataElement == 'XAzLTInKQCV' & e.value == 'true' ||
                    e.dataElement == 'yUgBbBWZYMi' & e.value == 'true' ||
                    e.dataElement == 'j8iFtQyl0tQ' & e.value == 'true' ||
                    e.dataElement == 'FVjtaNfbZp3' & e.value > 0 
                ){valueDeoMM3XryyZa6= true} 
                })
                dataValue.push({"dataElement": "JFGX1TmY0xL", "value": `${valueDeJFGX1TmY0x}`}) //TYT có khám và cấp thuốc ĐTĐ tháng vừa qua không?
                dataValue.push({"dataElement": "oMM3XryyZa6", "value": `${valueDeoMM3XryyZa6}`}) //TYT có khám và cấp thuốc THA tháng vừa qua không?
            let event = {
                "programStage": "PsjANoxkM9o",
                "orgUnit": ou,
                "program": "m2os4g4edN7",
                "eventDate": pe,
                "status": "COMPLETED",
                "attributeCategoryOptions": "xYerKDKCefk",
                "attributeOptionCombo": "HllvX50cXC0",
                "dataValues": dataValue
            }
            total['events'].push(event)
            return total
        }, { 'events': [] })
        console.log(resultImport)
        _writeJsonFile('event-CUTh-2021-08-VN.json', resultImport)
        //console.log(resultImport)
});


// let result = {
//     "events": []
// }

// let iEvent = {
//     "programStage": "PsjANoxkM9o",
//     "orgUnit": iOrgUnit,
//     "program": "m2os4g4edN7",
//     "eventDate": iEventDate,
//     "status": "COMPLETED",
//     "attributeCategoryOptions": "xYerKDKCefk",
//     "attributeOptionCombo": "HllvX50cXC0",
//     "dataValues": [
//         {
//             "dataElement": "JFGX1TmY0xL", //TYT có khám và cấp thuốc ĐTĐ tháng vừa qua không?
//             "value": "true"
//         },
//         {
//             "dataElement": "D9k02A8N5nE", //Có thuốc kết hợp 2 thành phần bao gồm metformin và Gliclazide
//             "value": de10
//         },
//         {
//             "dataElement": "WHZjMfm4ay1", //Có thực hiện cấp thuốc 28-30 ngày cho phần lớn bệnh nhân ĐTĐ
//             "value": de5
//         },
//         {
//             "dataElement": "tiGNbWaUfDN", //Có thuốc kết hợp 2 thành phần gồm UCMC/UCTT và hypothiazide hoặc tương tự (ví dụ Ebitac, Losartan-H)
//             "value": de13
//         },
//         {
//             "dataElement": "XDdM6pGUoLM", //Có thuốc kết hợp gồm chẹn kênh CA và hypothiazide
//             "value": de12
//         },
//         {
//             "dataElement": "pVxE2Fo1qe5", //Có thuốc chẹn kênh can xi (ví dụ Amlopipin, Nifedipin)
//             "value": de6
//         },
//         {
//             "dataElement": "rta1bVCriat", //Có thuốc Gliclazide (ví dụ Diamicron)
//             "value": de9
//         },
//         {
//             "dataElement": "FVjtaNfbZp3", //Tổng số viên thuốc điều trị THA hiện có
//             "value": de0
//         },
//         {
//             "dataElement": "G4UeYJf44It", //Có thuốc UCMC/UCTT (ví dụ Enalapril, Coversin, Losartan)
//             "value": de1
//         },
//         {
//             "dataElement": "i0M5ygSORRY", //Có thuốc Metformin
//             "value": de8
//         },
//         {
//             "dataElement": "oMM3XryyZa6", //TYT có khám và cấp thuốc THA tháng vừa qua không?
//             "value": "true"
//         },
//         {
//             "dataElement": "c2iq3ADGesQ", //Tổng số viên thuốc điều trị ĐTĐ hiện có
//             "value": "34"
//         },
//         {
//             "dataElement": "yUgBbBWZYMi", //Có thực hiện cấp thuốc 28-30 ngày cho phần lớn bệnh nhân THA
//             "value": de4
//         },
//         {
//             "dataElement": "hPWdJuFk5qF", //Có thuốc lợi tiểu hypothiazide hoặc tương tự, ví dụ indapamide (Furosemide KHÔNG thuộc nhóm này)
//             "value": de3
//         },
//         {
//             "dataElement": "YpPjveUc0wA", //Có thuốc kết hợp 2 thành phần gồm chẹn kênh can xi và UCMC/UCTT
//             "value": de11
//         },
//         {
//             "dataElement": "j8iFtQyl0tQ", //TYT có huyết áp kế điện tử còn sử dụng được
//             "value": de7
//         },
//         {
//             "dataElement": "xcKXWpW2h0e", //Có thuốc kết hợp 3 thành phần (chẹn kênh can xi + UCMC/UCTT + hypothiazide hoặc tương tự)
//             "value": de2
//         }
//     ]
// }
// result.events.push(iEvent)