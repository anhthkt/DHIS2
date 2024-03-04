const { default: axios } = require("axios");
const Excel = require('exceljs');
// const { instanceConfig } = require("../_0_importObjectDhis2/instance.config");

processData()
// Function to process the data and return the desired array
async function processData() {

    const workbook = new Excel.Workbook();
    const wsData = workbook.addWorksheet('Data');
    wsData.columns = [
        { header: 'STT', key: 'stt', width: 10 },
        { header: 'ID', key: 'id', width: 10 },
        { header: 'NAME', key: 'name', width: 10 },
        { header: 'CODE', key: 'code', width: 32 },
        { header: 'CODE DE', key: 'codede', width: 20 },
        { header: 'CODE CAT', key: 'codecat', width: 20 }
      ];

    let jsonData = await axios({
        url: 'https://dev.tkyt.vn/nhanluc/api/dataElements.json?fields=id,shortName,categoryCombo[categoryOptionCombos[id,shortName,code]]&paging=false',
        auth: {
            username: `anhth`,
            password: `Csdl2018@)!*`
          }
    }).then(e => e.data)
    const dataArray = [];

    // Loop through dataElements array
    jsonData.dataElements.forEach(dataElement => {
        const dataElementName = dataElement.shortName;
        const dataElementID = dataElement.id;

        // Loop through categoryOptionCombos array inside categoryCombo object
        dataElement.categoryCombo.categoryOptionCombos.forEach(categoryOptionCombo => {
            const categoryOptionComboName = categoryOptionCombo.shortName;
            const categoryOptionComboID = categoryOptionCombo.id;

            // Concatenate name and ID with delimiter _
            const columnName = `${dataElementName.trim()}||${categoryOptionComboName.trim()}`;
            const columnID = `${dataElementID}.${categoryOptionComboID}`;

            // Generate simplified name
            const CODE_NAME = columnName.split('||').map(e =>
                generateAbbreviation(
                    xoa_dau(e)
                )
            )
            const simplifiedName =
                generateAbbreviation(
                    xoa_dau(columnName)
                );

            // Push data to the array
            dataArray.push({ columnName, columnID, simplifiedName, CODE_NAME });
            wsData.addRow({
                id: columnID,
                name: columnName,
                code: simplifiedName,
                codede: CODE_NAME[0],
                codecat: CODE_NAME[1]
              });
        });
    });
    await workbook.xlsx.writeFile('generateData.xlsx');
    return dataArray;
    
}



const abbreviationMap = {
    "Lao động hợp đồng đối với VTVL là viên chức, Số lao động làm việc theo hợp đồng theo Nghị định số 111/2022/NĐ-CP (hoặc theo Nghị định số 68/2000/NĐ-CP, Nghị định số 161/2018/NĐ-CP khi chưa chuyển đổi sang Nghị định 111/2022/NĐ-CP)": "LDHD-VC-111-68-161",
    "Lao động hợp đồng đối với VTVL là viên chức, Dôi dư do thực hiện CPH, giao, bán, giải thể, sáp nhập, hợp nhất, chia, tách, phá sản hoặc chuyển thành CTTNHH hai TV trở lên hoặc chuyển thành ĐVSNCL theo QĐ của CQNN có thẩm quyền; sắp xếp, đổi mới ...": "LDHD-VC-CPH",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Số lao động làm việc theo hợp đồng theo Nghị định số 111/2022/NĐ-CP (hoặc theo Nghị định số 68/2000/NĐ-CP, Nghị định số 161/2018/NĐ-CP khi chưa chuyển đổi sang Nghị định 111/2022/NĐ-CP)":"LD-111-68-161",
    "Công chức, Dôi dư do thực hiện CPH, giao, bán, giải thể, sáp nhập, hợp nhất, chia, tách, phá sản hoặc chuyển thành CTTNHH hai TV trở lên hoặc chuyển thành ĐVSNCL theo QĐ của CQNN có thẩm quyền; sắp xếp, đổi mới ...": "CC-CPH",
    "Cán bộ, Dôi dư do thực hiện CPH, giao, bán, giải thể, sáp nhập, hợp nhất, chia, tách, phá sản hoặc chuyển thành CTTNHH hai TV trở lên hoặc chuyển thành ĐVSNCL theo QĐ của CQNN có thẩm quyền; sắp xếp, đổi mới ...": "CB-CPH",
    "Viên chức, Dôi dư do thực hiện CPH, giao, bán, giải thể, sáp nhập, hợp nhất, chia, tách, phá sản hoặc chuyển thành CTTNHH hai TV trở lên hoặc chuyển thành ĐVSNCL theo QĐ của CQNN có thẩm quyền; sắp xếp, đổi mới ...": "VC-CPH",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Dôi dư do thực hiện CPH, giao, bán, giải thể, sáp nhập, hợp nhất, chia, tách, phá sản hoặc chuyển thành CTTNHH hai TV trở lên hoặc chuyển thành ĐVSNCL theo QĐ của CQNN có thẩm quyền; sắp xếp, đổ": "LD-111-68-CPH",
    "Cán bộ, Số lao động làm việc theo hợp đồng theo Nghị định số 111/2022/NĐ-CP (hoặc theo Nghị định số 68/2000/NĐ-CP, Nghị định số 161/2018/NĐ-CP khi chưa chuyển đổi sang Nghị định 111/2022/NĐ-CP)": "CB-LD-111-68",
    "Viên chức, Số lao động làm việc theo hợp đồng theo Nghị định số 111/2022/NĐ-CP (hoặc theo Nghị định số 68/2000/NĐ-CP, Nghị định số 161/2018/NĐ-CP khi chưa chuyển đổi sang Nghị định 111/2022/NĐ-CP)": "VC-LD-111-68",
    "Lao động hợp đồng đối với VTVL là viên chức, Dôi dư do rà soát, sắp xếp lại tổ chức bộ máy, nhân sự theo quyết định của cơ quan có thẩm quyền của Đảng, Nhà nước": "LDHD-VC-RS",
    "Lao động hợp đồng đối với VTVL là viên chức, Do chuyên ngành đào tạo không phù hợp với vị trí việc làm đang đảm nhiệm nên không hoàn thành nhiệm vụ được giao": "LDHD-VC-KHONG-HTNV",
    "Lao động hợp đồng đối với VTVL là viên chức, Do có tổng số ngày nghỉ làm việc bằng hoặc cao hơn số ngày nghỉ tối đa do ốm đau theo quy định": "LDHD-VC-NGAY-NGHI",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Dôi dư do rà soát, sắp xếp lại tổ chức bộ máy, nhân sự theo quyết định của cơ quan có thẩm quyền của Đảng, Nhà nước": "LD-111-68-RS",
    "Cán bộ, Dôi dư do rà soát, sắp xếp lại tổ chức bộ máy, nhân sự theo quyết định của cơ quan có thẩm quyền của Đảng, Nhà nước": "CB-RS",
    "Viên chức, Dôi dư do rà soát, sắp xếp lại tổ chức bộ máy, nhân sự theo quyết định của cơ quan có thẩm quyền của Đảng, Nhà nước": "VC-RS",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Do chuyên ngành đào tạo không phù hợp với vị trí việc làm đang đảm nhiệm nên không hoàn thành nhiệm vụ được giao": "LD-111-68-KHONG-HTNV",
    "Lao động hợp đồng đối với VTVL là viên chức, Chứng chỉ tiếng Anh theo KNLNNVN (chi tiết 6 bậc theo TT01/2014/TT-BGDĐT)": "LDHD-VC-TA-KNLNNVN",
    "Công chức, Do chuyên ngành đào tạo không phù hợp với vị trí việc làm đang đảm nhiệm nên không hoàn thành nhiệm vụ được giao": "CC-KHONG-HTNV",
    "Viên chức, Do chuyên ngành đào tạo không phù hợp với vị trí việc làm đang đảm nhiệm nên không hoàn thành nhiệm vụ được giao": "VC-KHONG-HTNV",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Do có tổng số ngày nghỉ làm việc bằng hoặc cao hơn số ngày nghỉ tối đa do ốm đau theo quy định": "LD-111-68-NGAY-NGHI",
    "Lao động hợp đồng đối với VTVL là viên chức, Do chưa đạt trình độ đào tạo theo tiêu chuẩn chuyên môn, nghiệp vụ": "LDHD-VC-CHUYEN-MON",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP...,": "LD-111-68",
    "nguồn thu của đơn vị":"NGUON THU",
    "Chuyên ngành": "CN",
    "TTC_": " ",
    "BCVC": " ",
    "CCCB ": " ",
    "CM_Chuyên môn": "CM",
    "Cộng tác viên": "CTV",
    "y tế/dân số": "YTDS",
    "số lượng": "SL",
    "kế hoạch": "KH",
    "người làm việc": "NLV",
    "theo": " ",
    "viên chức,": "VC",
    "viên chức": "VC",
    "người lao động": "NLD",
    "t/ứng": " ",
    "vị trí việc làm": "VTVL",
    "có mặt đến": "CMD",
    "thực hiện": "TH",
    "Tổng số": "TS",
    "người LV đến": "NLV",
    "LV đến": "LV",
    "lý luận chính trị": "LLCT",
    "Trình độ học vấn": "TDHV",
    "cán bộ, công chức": "CBCC",
    "Bác sĩ": "BS",
    "răng hàm mặt": "RHM",
    "y học cổ truyền": "YHCT",
    "y học dự phòng": "YHDP",
    "Khúc xạ nhãn khoa": "KXNK",
    "được đánh giá, xếp loại chất lượng": "DGXL",
    "là người dân tộc thiểu số": "DAN TOC",
    "Công chức": "CC",
    "Cán bộ": "CB",
    "Y tế công cộng": "YTCC",
    "dân tộc thiểu số": "DAN TOC",
    "thuộc VP/TT/Vụ/Cục": "VP-TT-V-C",
    "trình độ lí luận và giới": "LL-GT",
    "chức vụ và giới": "CV-GT",
    "dân tộc và giới": "DT-GT",
    "học hàm và giới": "HH-GT",
    "học vấn và giới": "HV-GT",
    "nhóm tuổi và giới": "NT-GT",
    "tôn giáo và giới": "TG-GT",
    "đảng viên và giới": "DV-GT",
    "cơ quan quản lý nhà nước": "CQQLNN",
    "đánh giá, xếp loại": "DGXL",
    "Số": " ",
    "Chưa định mức số lượng": "CDM",
    "hưởng lương từ": "LUONG",
    "Hợp đồng lao động NĐ 68/2000/NĐ-CP và 161/2018/NĐ-CP": "HDLD-68-161",
    "Hợp đồng lao động làm chuyên môn, nghiệp vụ": "HDLD-CM-NV",
    "hỗ trợ phục vụ": "HTPV",
    "chức danh nghề nghiệp": "CDNN",
    "chuyên môn": "CM",
    "lãnh đạo quản lý": "LDQL",
    // Thêm các từ có thể viết tắt khác vào đây
};
function generateAbbreviation(phrase) {
    const abbreviationWords = [];

    phrase = phrase.toLowerCase();
    Object.entries(abbreviationMap).forEach(([from, to]) => {
        let re = new RegExp(xoa_dau(from.toLowerCase()), 'g');
        phrase = phrase.replace(re, to);
    })

    console.log(phrase)

    const words = phrase.split('_');
    words.forEach(word => {
        const subWords = word.split(' ');
        const abbreviationSubWords = [];
        subWords.forEach(subWord => {
            abbreviationSubWords.push(subWord.charAt(0).toUpperCase() + subWord.slice(1));
        });
        abbreviationWords.push(abbreviationSubWords.join('_'));
    });

    return abbreviationWords.join('_').toUpperCase().replace(new RegExp('__', 'g'), '');
}


function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}
