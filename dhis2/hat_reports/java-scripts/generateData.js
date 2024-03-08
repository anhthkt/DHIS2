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

const specificString = {
    "Lao động hợp đồng đối với VTVL là viên chức, Số lao động làm việc theo hợp đồng theo Nghị định số 111/2022/NĐ-CP (hoặc theo Nghị định số 68/2000/NĐ-CP, Nghị định số 161/2018/NĐ-CP khi chưa chuyển đổi sang Nghị định 111/2022/NĐ-CP)": "LDHD-VC-111-68-161",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Số lao động làm việc theo hợp đồng theo Nghị định số 111/2022/NĐ-CP (hoặc theo Nghị định số 68/2000/NĐ-CP, Nghị định số 161/2018/NĐ-CP khi chưa chuyển đổi sang Nghị định 111/2022/NĐ-CP)":"LD-111-68-161",
    "Cán bộ, Số lao động làm việc theo hợp đồng theo Nghị định số 111/2022/NĐ-CP (hoặc theo Nghị định số 68/2000/NĐ-CP, Nghị định số 161/2018/NĐ-CP khi chưa chuyển đổi sang Nghị định 111/2022/NĐ-CP)": "CB-LD-111-68",
    "Viên chức, Số lao động làm việc theo hợp đồng theo Nghị định số 111/2022/NĐ-CP (hoặc theo Nghị định số 68/2000/NĐ-CP, Nghị định số 161/2018/NĐ-CP khi chưa chuyển đổi sang Nghị định 111/2022/NĐ-CP)": "VC-LD-111-68",
    "Công chức, Số lao động làm việc theo hợp đồng theo Nghị định số 111/2022/NĐ-CP (hoặc theo Nghị định số 68/2000/NĐ-CP, Nghị định số 161/2018/NĐ-CP khi chưa chuyển đổi sang Nghị định 111/2022/NĐ-CP)": "CC-LD-111-68",
    
    "Lao động hợp đồng đối với VTVL là viên chức, Chứng chỉ tiếng Anh theo KNLNNVN (chi tiết 6 bậc theo TT01/2014/TT-BGDĐT)": "LDHD-VC-TA-KNLNNVN",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Chứng chỉ tiếng Anh theo KNLNNVN (chi tiết 6 bậc theo TT01/2014/TT-BGDĐT)": "LD-111-68-TA-KNLNNVN",

    "Lao động hợp đồng đối với VTVL là viên chức, Dược sĩ (cao đẳng + trung cấp)": "LDHD-VC-DS-CD-TC",
    "Viên chức, Dược sĩ (cao đẳng + trung cấp)": "VC-DS-CD-TC",

    "Cán bộ, Chứng chỉ tiếng Anh theo KNLNNVN (chi tiết 6 bậc theo TT01/2014/TT-BGDĐT)": "CB-TA-KNLNNVN",
    "Công chức, Chứng chỉ tiếng Anh theo KNLNNVN (chi tiết 6 bậc theo TT01/2014/TT-BGDĐT)": "CC-TA-KNLNNVN",
    "Viên chức, Chứng chỉ tiếng Anh theo KNLNNVN (chi tiết 6 bậc theo TT01/2014/TT-BGDĐT)": "VC-TA-KNLNNVN",

    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Dược sĩ (cao đẳng + trung cấp)": "LD-111-68-DS-CD-TC",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Dôi dư do thực hiện CPH, giao, bán, giải thể, sáp nhập, hợp nhất, chia, tách, phá sản hoặc chuyển thành CTTNHH hai TV trở lên hoặc chuyển thành ĐVSNCL theo QĐ của CQNN có thẩm quyền; sắp xếp, đổ": "LD-111-68-CPH",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Dôi dư do rà soát, sắp xếp lại tổ chức bộ máy, nhân sự theo quyết định của cơ quan có thẩm quyền của Đảng, Nhà nước": "LD-111-68-RS",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Do chuyên ngành đào tạo không phù hợp với vị trí việc làm đang đảm nhiệm nên không hoàn thành nhiệm vụ được giao": "LD-111-68-CN-KHONG-HTNV",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Do xếp loại chất lượng hàng năm không hoàn thành nhiệm vụ": "LD-111-68-KHONG-HTNV",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Do có tổng số ngày nghỉ làm việc bằng hoặc cao hơn số ngày nghỉ tối đa do ốm đau theo quy định": "LD-111-68-NGAY-NGHI",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Do chưa đạt trình độ đào tạo theo tiêu chuẩn chuyên môn, nghiệp vụ": "LD-111-68-CHUYEN-MON",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Dôi dư do cơ cấu lại đội ngũ cán bộ, công chức, viên chức theo vị trí việc làm": "LD-111-68-CO-CAU-LAI",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Dôi dư do sắp xếp lại đơn vị hành chính": "LD-111-68-SX-DVH",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Tiếng Anh trình độ đại học trở lên": "LD-111-68-TA-DH",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Ngoại ngữ khác trình độ đại học trở lên": "LD-111-68-NN-KHAC-DH",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Có chứng chỉ tiếng dân tộc": "LD-111-68-DT-CC",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Tiếng dân tộc sử dụng giao tiếp được": "LD-111-68-DT-SDD",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Tin học trình độ Trung cấp, cao đẳng": "LD-111-68-TIN-TC-CD",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Tin học trình độ Đại học trở lên": "LD-111-68-TIN-DH",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Chứng chỉ ngoại ngữ khác": "LD-111-68-NN-KHAC",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Chứng chỉ tiếng Anh khác": "LD-111-68-TA-KHAC",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Chuyên viên cao cấp và tương đương": "LD-111-68-CVCC",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Chứng chỉ tiếng Anh khác": "LD-111-68-TA-KHAC",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Số lượng người làm việc hưởng lương từ nguồn thu của đơn vị": "LD-111-68-LUONG-NTDV",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Chuyên viên chính và tương đương": "LD-111-68-CVC",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Không phải đảng viên": "LD-111-68-KHONG-DV",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Số lượng người làm việc hưởng lương từ NSNN": "LD-111-68-LUONG-NSNN",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Trung cấp, cao đẳng": "LD-111-68-TC-CD",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Trung học phổ thông": "LD-111-68-THPT",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Trung học cơ sở": "LD-111-68-THCS",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP..., Sơ cấp": "LD-111-68-SC",
    "Lao động làm việc theo NĐ111 hoặc NĐ68, Dược sĩ (cao đẳng + trung cấp)": "LD-111-68-DS-CD-TC",
    "Dôi dư do thực hiện CPH, giao, bán, giải thể, sáp nhập, hợp nhất, chia, tách, phá sản hoặc chuyển thành CTTNHH hai TV trở lên hoặc chuyển thành ĐVSNCL theo QĐ của CQNN có thẩm quyền; sắp xếp, đổi mới ...": "CPH",
    "Chứng chỉ tiếng Anh theo KNLNNVN (chi tiết 6 bậc theo TT01/2014/TT-BGDĐT)": "TA-KNLNNVN",
}

const abbreviationMap = {
    
    
    "Lao động hợp đồng đối với VTVL là viên chức, Dôi dư do thực hiện CPH, giao, bán, giải thể, sáp nhập, hợp nhất, chia, tách, phá sản hoặc chuyển thành CTTNHH hai TV trở lên hoặc chuyển thành ĐVSNCL theo QĐ của CQNN có thẩm quyền; sắp xếp, đổi mới ...": "LDHD-VC-CPH",
    "Công chức, Dôi dư do thực hiện CPH, giao, bán, giải thể, sáp nhập, hợp nhất, chia, tách, phá sản hoặc chuyển thành CTTNHH hai TV trở lên hoặc chuyển thành ĐVSNCL theo QĐ của CQNN có thẩm quyền; sắp xếp, đổi mới ...": "CC-CPH",
    "Cán bộ, Dôi dư do thực hiện CPH, giao, bán, giải thể, sáp nhập, hợp nhất, chia, tách, phá sản hoặc chuyển thành CTTNHH hai TV trở lên hoặc chuyển thành ĐVSNCL theo QĐ của CQNN có thẩm quyền; sắp xếp, đổi mới ...": "CB-CPH",
    "Viên chức, Dôi dư do thực hiện CPH, giao, bán, giải thể, sáp nhập, hợp nhất, chia, tách, phá sản hoặc chuyển thành CTTNHH hai TV trở lên hoặc chuyển thành ĐVSNCL theo QĐ của CQNN có thẩm quyền; sắp xếp, đổi mới ...": "VC-CPH",

    "Công chức, Dôi dư do rà soát, sắp xếp lại tổ chức bộ máy, nhân sự theo quyết định của cơ quan có thẩm quyền của Đảng, Nhà nước": "CC-RS",
    "Lao động hợp đồng đối với VTVL là viên chức, Dôi dư do rà soát, sắp xếp lại tổ chức bộ máy, nhân sự theo quyết định của cơ quan có thẩm quyền của Đảng, Nhà nước": "LDHD-VC-RS",
    "Cán bộ, Dôi dư do rà soát, sắp xếp lại tổ chức bộ máy, nhân sự theo quyết định của cơ quan có thẩm quyền của Đảng, Nhà nước": "CB-RS",
    "Viên chức, Dôi dư do rà soát, sắp xếp lại tổ chức bộ máy, nhân sự theo quyết định của cơ quan có thẩm quyền của Đảng, Nhà nước": "VC-RS",
    
    
    
    "Lao động hợp đồng đối với VTVL là viên chức, Do chuyên ngành đào tạo không phù hợp với vị trí việc làm đang đảm nhiệm nên không hoàn thành nhiệm vụ được giao": "LDHD-VC-CN-KHONG-HTNV",
    "Cán bộ, Do chuyên ngành đào tạo không phù hợp với vị trí việc làm đang đảm nhiệm nên không hoàn thành nhiệm vụ được giao": "CB-CN-KHONG-HTNV",
    "Công chức, Do chuyên ngành đào tạo không phù hợp với vị trí việc làm đang đảm nhiệm nên không hoàn thành nhiệm vụ được giao": "CC-CN-KHONG-HTNV",
    "Viên chức, Do chuyên ngành đào tạo không phù hợp với vị trí việc làm đang đảm nhiệm nên không hoàn thành nhiệm vụ được giao": "VC-CN-KHONG-HTNV",

    "Công chức, Do xếp loại chất lượng hàng năm không hoàn thành nhiệm vụ": "CC-KHONG-HTNV",
    "Lao động hợp đồng đối với VTVL là viên chức, Do xếp loại chất lượng hàng năm không hoàn thành nhiệm vụ": "LDHD-VC-KHONG-HTNV",
    "Viên chức, Do xếp loại chất lượng hàng năm không hoàn thành nhiệm vụ": "VC-KHONG-HTNV",
    "Cán bộ, Do xếp loại chất lượng hàng năm không hoàn thành nhiệm vụ": "CB-KHONG-HTNV",

    "Lao động hợp đồng đối với VTVL là viên chức, Do có tổng số ngày nghỉ làm việc bằng hoặc cao hơn số ngày nghỉ tối đa do ốm đau theo quy định": "LDHD-VC-NGAY-NGHI",
    "Công chức, Do có tổng số ngày nghỉ làm việc bằng hoặc cao hơn số ngày nghỉ tối đa do ốm đau theo quy định": "CC-NGAY-NGHI",
    "Viên chức, Do có tổng số ngày nghỉ làm việc bằng hoặc cao hơn số ngày nghỉ tối đa do ốm đau theo quy định": "VC-NGAY-NGHI",
    "Cán bộ, Do có tổng số ngày nghỉ làm việc bằng hoặc cao hơn số ngày nghỉ tối đa do ốm đau theo quy định": "CB-NGAY-NGHI",

    "Lao động hợp đồng đối với VTVL là viên chức, Do chưa đạt trình độ đào tạo theo tiêu chuẩn chuyên môn, nghiệp vụ": "LDHD-VC-CHUYEN-MON",

    "Lao động hợp đồng đối với VTVL là viên chức, Dôi dư do cơ cấu lại đội ngũ cán bộ, công chức, viên chức theo vị trí việc làm": "LDHD-VC-CO-CAU-LAI",
    "Viên chức, Dôi dư do cơ cấu lại đội ngũ cán bộ, công chức, viên chức theo vị trí việc làm": "VC-CO-CAU-LAI",
    "Cán bộ, Dôi dư do cơ cấu lại đội ngũ cán bộ, công chức, viên chức theo vị trí việc làm": "CB-CO-CAU-LAI",
    "Công chức, Dôi dư do cơ cấu lại đội ngũ cán bộ, công chức, viên chức theo vị trí việc làm": "CC-CO-CAU-LAI",
    "Dôi dư do cơ cấu lại đội ngũ cán bộ, công chức, viên chức theo vị trí việc làm": "CO-CAU-LAI",
    
    "Lao động hợp đồng đối với VTVL là viên chức, Dôi dư do sắp xếp lại đơn vị hành chính": "LDHD-VC-SX-DVH",
    "Viên chức, Dôi dư do sắp xếp lại đơn vị hành chính": "VC-SX-DVH",
    "Công chức, Dôi dư do sắp xếp lại đơn vị hành chính": "CC-SX-DVH",
    "Cán bộ, Dôi dư do sắp xếp lại đơn vị hành chính": "CB-SX-DVH",
    "Dôi dư do sắp xếp lại đơn vị hành chính": "SX-DVH",

    "Lao động hợp đồng đối với VTVL là viên chức, Tiếng Anh trình độ đại học trở lên": "LDHD-VC-TA-DH",
    "Công chức, Tiếng Anh trình độ đại học trở lên": "CC-TA-DH",
    "Cán bộ, Tiếng Anh trình độ đại học trở lên": "CB-TA-DH",
    "Viên chức, Tiếng Anh trình độ đại học trở lên": "VC-TA-DH",
    "Tiếng Anh trình độ đại học trở lên": "TA-DH",

    "Cán bộ, Ngoại ngữ khác trình độ đại học trở lên": "CB-NN-KHAC-DH",
    "Công chức, Ngoại ngữ khác trình độ đại học trở lên": "CC-NN-KHAC-DH",
    "Lao động hợp đồng đối với VTVL là viên chức, Chứng chỉ tiếng Anh khác": "LDHD-VC-TA-KHAC",
    "Lao động hợp đồng đối với VTVL là viên chức, Ngoại ngữ khác trình độ đại học trở lên": "LDHD-VC-NN-KHAC-DH",
    "Viên chức, Ngoại ngữ khác trình độ đại học trở lên": "VC-NN-KHAC-DH",
    "Lao động hợp đồng đối với VTVL là viên chức, Chứng chỉ ngoại ngữ khác": "LDHD-VC-NN-KHAC",
    "Lao động hợp đồng đối với VTVL là viên chức, Chứng chỉ tin học": "LDHD-VC-TIN",
    "Công chức, Chứng chỉ ngoại ngữ khác": "CC-NN-KHAC",
    "Công chức, Chứng chỉ tiếng Anh khác": "CC-TA-KHAC",
    "Cán bộ, Chứng chỉ ngoại ngữ khác": "CB-NN-KHAC",
    "Cán bộ, Chứng chỉ tiếng Anh khác": "CB-TA-KHAC",
    "Chứng chỉ ngoại ngữ khác": "NN-KHAC",
    "Chứng chỉ tiếng Anh khác": "TA-KHAC",

    "Lao động hợp đồng đối với VTVL là viên chức, Tiếng dân tộc sử dụng giao tiếp được": "LDHD-VC-DT-SDD",
    "Lao động hợp đồng đối với VTVL là viên chức, Có chứng chỉ tiếng dân tộc": "LDHD-VC-DT-CC",
    "Cán bộ, Có chứng chỉ tiếng dân tộc": "CB-DT-CC",
    "Công chức, Có chứng chỉ tiếng dân tộc": "CC-DT-CC",
    "Viên chức, Có chứng chỉ tiếng dân tộc": "VC-DT-CC",

    "Công chức, Tiếng dân tộc sử dụng giao tiếp được": "CC-DT-SDD",
    "Cán bộ, Tiếng dân tộc sử dụng giao tiếp được": "CB-DT-SDD",
    "Viên chức, Tiếng dân tộc sử dụng giao tiếp được": "VC-DT-SDD",

    "Lao động hợp đồng đối với VTVL là viên chức, Tin học trình độ Đại học trở lên": "LDHD-VC-TIN-TREN-DH",
    "Công chức, Tin học trình độ Đại học trở lên": "CC-TIN-TREN-DH",
    "Cán bộ, Tin học trình độ Đại học trở lên": "CB-TIN-TREN-DH",
    "Viên chức, Tin học trình độ Đại học trở lên": "VC-TIN-TREN-DH",
    "Tin học trình độ Đại học trở lên": "TIN-TREN-DH",

    "Lao động hợp đồng đối với VTVL là viên chức, Tin học trình độ Trung cấp, cao đẳng": "LDHD-VC-TIN-TC-CD",
    "Viên chức, Tin học trình độ Trung cấp, cao đẳng": "VC-TIN-TC-CD",
    "Cán bộ, Tin học trình độ Trung cấp, cao đẳng": "CB-TIN-TC-CD",
    "Công chức, Tin học trình độ Trung cấp, cao đẳng": "CC-TIN-TC-CD",
    "Tin học trình độ Trung cấp, cao đẳng": "TIN-TC-CD",
    
    "Lao động hợp đồng đối với VTVL là viên chức, Dược sĩ sau đại học": "LDHD-VC-DS-SAU-DH",
    "Lao động hợp đồng đối với VTVL là viên chức, Trình độ dược khác": "LDHD-VC-DS-KHAC",
    "Lao động hợp đồng đối với VTVL là viên chức, Dân tộc Khác": "LDHD-VC-DT-KHAC",
    "Lao động hợp đồng đối với VTVL là viên chức, Dân tộc Kinh": "LDHD-VC-DT-KINH",
    "Lao động hợp đồng đối với VTVL là viên chức, Số lượng người làm việc hưởng lương từ nguồn thu của đơn vị": "LDHD-VC-NLV-NGUON-THU",

    
    "Không hoàn thành, Công chức không giữ chức vụ lãnh đạo, quản lý": "KHONG-HT-CC-KHONG-LD",
    "Không hoàn thành, Công chức giữ chức vụ lãnh đạo, quản lý": "KHONG-HT-CC-LD",
    "Hoàn thành, Công chức giữ chức vụ lãnh đạo, quản lý": "HT-CC-LD",
    "Hoàn thành xuất sắc, Viên chức không giữ chức vụ quản lý": "HTXS-VC-KHONG-LD",
    "Hoàn thành xuất sắc, Công chức không giữ chức vụ lãnh đạo, quản lý": "HTXS-CC-KHONG-LD",
    "Hoàn thành tốt, Công chức không giữ chức vụ lãnh đạo, quản lý": "HTT-CC-KHONG-LD",
    "Hoàn thành tốt, Công chức giữ chức vụ lãnh đạo, quản lý": "HTT-CC-LD",
    "Hoàn thành tốt, Viên chức không giữ chức vụ quản lý": "HTT-VC-KHONG-LD",
    "Hoàn thành xuất sắc, Công chức giữ chức vụ lãnh đạo, quản lý": "HTXS-CC-LD",
    "Hoàn thành, Công chức không giữ chức vụ lãnh đạo, quản lý": "HT-CC-KHONG-LD",

    "Lao động hợp đồng đối với VTVL là viên chức, Không phải đảng viên": "LDHD-VC-KHONG-DV",
    'Lao động hợp đồng đối với VTVL là viên chức, Đảng viên': "LDHD-VC-DV",

    "Công chức, Do chưa đạt trình độ đào tạo theo tiêu chuẩn chuyên môn, nghiệp vụ": "CC-CHUYEN-MON",
    "Cán bộ, Do chưa đạt trình độ đào tạo theo tiêu chuẩn chuyên môn, nghiệp vụ": "CB-CHUYEN-MON",
    "Viên chức, Do chưa đạt trình độ đào tạo theo tiêu chuẩn chuyên môn, nghiệp vụ": "VC-CHUYEN-MON",
    "Do chưa đạt trình độ đào tạo theo tiêu chuẩn chuyên môn, nghiệp vụ": "CHUYEN-MON",

    "Lao động hợp đồng đối với VTVL là viên chức, Trung học phổ thông": "LDHD-VC-THPT",
    "Lao động hợp đồng đối với VTVL là viên chức, Trung cấp, cao đẳng": "LDHD-VC-TC-CD",
    "Lao động hợp đồng đối với VTVL là viên chức, Đại học trở lên": "LDHD-VC-TREN-DH",
    "Lao động hợp đồng đối với VTVL là viên chức, Trung học cơ sở": "LDHD-VC-THCS",
    "Lao động hợp đồng đối với VTVL là viên chức, Phó giáo sư": "LDHD-VC-PGS",
    "Lao động hợp đồng đối với VTVL là viên chức, Trung cấp": "LDHD-VC-TC",
    "Lao động hợp đồng đối với VTVL là viên chức, Giáo sư": "LDHD-VC-GS",
    "Lao động hợp đồng đối với VTVL là viên chức, Cao đẳng": "LDHD-VC-CD",
    "Lao động hợp đồng đối với VTVL là viên chức, Tiểu học": "LDHD-VC-TH",
    "Lao động hợp đồng đối với VTVL là viên chức, Thạc sĩ": "LDHD-VC-THS",
    "Lao động hợp đồng đối với VTVL là viên chức, Đại học": "LDHD-VC-DH",
    "Lao động hợp đồng đối với VTVL là viên chức, Tiến sĩ": "LDHD-VC-TS",
    
    "Lao động hợp đồng đối với VTVL là viên chức, Cao cấp": "LDHD-VC-CC",

    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP...,": "LD-111-68",
    "Lao động làm việc theo 111/2022/NĐ-CP hoặc 68/2000/NĐ-CP...": "LD-111-68",
    "Hợp đồng lao động theo NĐ 68/2000/NĐ-CP và 161/2018/NĐ-CP": "LDHD-68-161",

    "Lao động hợp đồng đối với VTVL là viên chức, Số lượng người làm việc hưởng lương từ NSNN": "LDHD-VC-NLV-NSNN",

    "Lao động hợp đồng đối với VTVL là viên chức, Không có tôn giáo": "LDHD-VC-KHONG-TON-GIAO",
    "Lao động hợp đồng đối với VTVL là viên chức, Có tôn giáo": "LDHD-VC-TON-GIAO",
    "Lao động hợp đồng đối với VTVL là viên chức, Dược sĩ đại học": "LDHD-VC-DS-DH",
    "Lao động hợp đồng đối với VTVL là viên chức, Trình độ y khác": "LDHD-VC-Y-KHAC",
    "Lao động hợp đồng đối với VTVL là viên chức, Kỹ thuật viên y": "LDHD-VC-KTV-Y",
    "Lao động hợp đồng đối với VTVL là viên chức, Bác sĩ sau đại học": "LDHD-VC-BS-SAU-DH",
    "Lao động hợp đồng đối với VTVL là viên chức, Điều dưỡng": "LDHD-VC-DD",
    "Lao động hợp đồng đối với VTVL là viên chức, Hộ sinh hoạt": "LDHD-VC-HS",

    "Buộc thôi việc, Công chức không giữ chức vụ lãnh đạo, quản lý": "BTV-CC-KHONG-LD",
    "Buộc thôi việc, Công chức giữ chức vụ lãnh đạo, quản lý": "BTV-CC-LD",
    "Buộc thôi việc, Viên chức không giữ chức vụ quản lý": "BTV-VC-KHONG-LD",
    "Hạ bậc lương, Công chức không giữ chức vụ lãnh đạo, quản lý": "HL-CC-KHONG-LD",
    "Khiển trách, Công chức không giữ chức vụ lãnh đạo, quản lý": "KT-CC-KHONG-LD",
    "Giáng chức, Công chức không giữ chức vụ lãnh đạo, quản lý": "GC-CC-KHONG-LD",
    "Giáng chức, Công chức giữ chức vụ lãnh đạo, quản lý": "GC-CC-LD",
    "Giáng chức, Viên chức không giữ chức vụ quản lý": "GC-VC-KHONG-LD",
    "Cách chức, Công chức không giữ chức vụ lãnh đạo, quản lý": "CC-CC-KHONG-LD",
    "Cách chức, Công chức giữ chức vụ lãnh đạo, quản lý": "CC-CC-LD",
    "Cách chức, Viên chức không giữ chức vụ quản lý": "CC-VC-KHONG-QL",
    "Bãi nhiệm, Công chức không giữ chức vụ lãnh đạo, quản lý": "BN-CC-KHONG-LD",
    "Bãi nhiệm, Công chức giữ chức vụ lãnh đạo, quản lý": "BN-CC-LD",
    "Bãi nhiệm, Viên chức không giữ chức vụ quản lý": "BN-VC-KHONG-QL",

    "Cảnh cáo, Công chức không giữ chức vụ lãnh đạo, quản lý": "CCAO-CC-KHONG-LD",
    "Cảnh cáo, Công chức giữ chức vụ lãnh đạo, quản lý": "CCAO-CC-LD",
    "Cảnh cáo, Viên chức không giữ chức vụ quản lý": "CCAO-VC-KHONG-QL",
    "Hạ bậc lương, Công chức giữ chức vụ lãnh đạo, quản lý": "HL-CC-LD",
    "Hạ bậc lương, Viên chức không giữ chức vụ quản lý": "HL-VC-KHONG-QL",
    "Khiển trách, Công chức giữ chức vụ lãnh đạo, quản lý": "KT-CC-LD",
    "Khiển trách, Viên chức không giữ chức vụ quản lý": "KT-VC-KHONG-QL",
    "Không hoàn thành, Viên chức không giữ chức vụ quản lý": "KHONG-HT-VC-KHONG-QL",
    "Hoàn thành, Viên chức không giữ chức vụ quản lý": "HT-VC-KHONG-QL",
    
    "Lao động hợp đồng đối với VTVL là viên chức, Từ 30 trở xuống": "LDHD-VC-D30",
    "Lao động hợp đồng đối với VTVL là viên chức, Từ 51 đến 55": "LDHD-VC-51-55",
    "Lao động hợp đồng đối với VTVL là viên chức, Từ 31 đến 40": "LDHD-VC-31-40",
    "Lao động hợp đồng đối với VTVL là viên chức, Trên 60 tuổi": "LDHD-VC-T60",
    "Lao động hợp đồng đối với VTVL là viên chức, Từ 56 đến 60": "LDHD-VC-56-60",
    "Lao động hợp đồng đối với VTVL là viên chức, Từ 41 đến 50": "LDHD-VC-41-50",

    "Phó Cục trưởng, Phó Vụ trưởng và tương đương, Nam": "PCT-PVT-NAM",
    "Phó Cục trưởng, Phó Vụ trưởng và tương đương, Nữ": "PCT-PVT-NU",
    "Cục trưởng, Vụ trưởng và tương đương, Nam": "CT-VT-NAM",
    "Cục trưởng, Vụ trưởng và tương đương, Nữ": "CT-VT-NU",
    "Phó Tổng cục trưởng và tương đương, Nam": "PTCT-NAM",
    "Phó Tổng cục trưởng và tương đương, Nữ": "PTCT-NU",
    "Tổng cục trưởng và tương đương, Nam": "TCT-NAM",
    "Tổng cục trưởng và tương đương, Nữ": "TCT-NU",

    "Lao động làm việc theo NĐ111 hoặc NĐ68, Hạng V": "LD-111-68-H5",
    "Lao động làm việc theo NĐ111 hoặc NĐ68, Hạng IV": "LD-111-68-H4",
    "Lao động làm việc theo NĐ111 hoặc NĐ68, Hạng III": "LD-111-68-H3",
    "Lao động làm việc theo NĐ111 hoặc NĐ68, Hạng II": "LD-111-68-H2",
    "Lao động làm việc theo NĐ111 hoặc NĐ68, Hạng I": "LD-111-68-H1",
    "Lao động làm việc theo NĐ111 hoặc NĐ68,": "LD-111-68",
    "Lao động làm việc theo NĐ111 hoặc NĐ68": "LD-111-68",

    "Số lao động làm việc theo hợp đồng theo NĐ 111 hoặc NĐ 68, Nghị định số 161,": "LD-111-68-161",
    "Số lao động làm việc theo hợp đồng theo NĐ 111 hoặc NĐ 68, Nghị định số 161": "LD-111-68-161",
    "Số lượng người làm việc hưởng lương từ nguồn thu của đơn vị,": "NLV-LUONG-NGUON-THU",
    "Số lượng người làm việc hưởng lương từ nguồn thu của đơn vị": "NLV-LUONG-NGUON-THU",
    "Số lượng người làm việc hưởng lương từ NSNN,": "NLV-LUONG-NSNN",
    "Số lượng người làm việc hưởng lương từ NSNN": "NLV-LUONG-NSNN",


    "Tiếng dân tộc sử dụng giao tiếp được": "DT-SDD",
    "Ngoại ngữ khác trình độ đại học trở lên": "NN-KHAC-DH",
    "Có chứng chỉ tiếng dân tộc": "DT-CC",
    "Do chuyên ngành đào tạo không phù hợp với vị trí việc làm đang đảm nhiệm nên không hoàn thành nhiệm vụ được giao": "CHUYEN-NGANH-KHONG-HTNV",
    "Dôi dư do rà soát, sắp xếp lại tổ chức bộ máy, nhân sự theo quyết định của cơ quan có thẩm quyền của Đảng, Nhà nước": "RA-SOAT",
    "Do xếp loại chất lượng hàng năm không hoàn thành nhiệm vụ": "XCLH-KHONG-HTNV",
    "Do có tổng số ngày nghỉ làm việc bằng hoặc cao hơn số ngày nghỉ tối đa do ốm đau theo quy định": "NGAY-NGHI",


    "Lao động hợp đồng đối với VTVL là viên chức, Hạng V": "LDHD-VC-H5",
    "Lao động hợp đồng đối với VTVL là viên chức, Hạng IV": "LDHD-VC-H4",
    "Lao động hợp đồng đối với VTVL là viên chức, Hạng III": "LDHD-VC-H3",
    "Lao động hợp đồng đối với VTVL là viên chức, Hạng II": "LDHD-VC-H2",
    "Lao động hợp đồng đối với VTVL là viên chức, Hạng I": "LDHD-VC-H1",

    "Lao động hợp đồng đối với VTVL là viên chức,": "LDHD-VC",
    "Lao động hợp đồng đối với VTVL là viên chức": "LDHD-VC",
    "Cán bộ, Chuyên viên cao cấp và tương đương": "CB-CVCC",
    "Công chức, Chuyên viên cao cấp và tương đương": "CC-CVCC",
    "Chuyên viên cao cấp và tương đương": "CVCC",
    "Lao động hợp đồng đối với VTVL là viên chức": "LDHD-VC",
    "Bệnh xá thuộc lực lượng vũ trang nhân dân": "BXND",
    "Tự đảm bảo chi thường xuyên và chi đầu tư": "DBCTX",
    "Cơ sở khám bệnh, chữa bệnh y học gia đình": "YHGD",
    "Viên chức hoặc hợp đồng lao động hưởng lương từ NTSN": "VC-HDLD-LUONG-NTSN",

    "Không hoàn thành,": "KHONG-HT",
    "Hoàn thành,": "HT",
    "Viên chức, Trung cấp, cao đẳng": "VC-TC-CD",
    "nguồn thu của đơn vị":"NGUON THU",
    "Chuyên ngành": "CN",
    "TTC_H": "H",
    "TTC_V": "V",
    "BCVC Số lượng vị trí việc làm": "BCVC-VTVL",
    "BCVC": " ",
    "CCCB Số lượng vị trí việc làm": "CCCB-VTVL",
    "CCCB ": " ",
    "Số tổ chức cấp phòng thuộc": "PHONG",
    "Số tổ chức cấp vụ, cục thuộc bộ": "TC-VC-THUOC-BO",
    "Số tổ chức cấp vụ, cục thuộc tổng cục": "TC-VC-THUOC-TC",
    "Số tổ chức cấp tổng cục và tương đương": "TC-TONG-CUC",
    "Số tổ chức cấp chi cục": "TC-CC",
    "Số nhân viên viên y tế thôn bản hoạt động": "NVYTTB",
    "Xã chưa có trạm y tế, ghép PKĐKKV": "XA-TYT-GHEP-PKDKKV",
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
    "Công chức,": "CC",
    "Công chức": "CC",
    "Cán bộ,": "CB",
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
    
    
    "^Số": " ",
    "Chưa định mức số lượng": "CDM",
    "hưởng lương từ": "LUONG",
    "Hợp đồng lao động NĐ 68/2000/NĐ-CP và 161/2018/NĐ-CP": "HDLD-68-161",
    "Hợp đồng lao động làm chuyên môn, nghiệp vụ": "HDLD-CM-NV",
    "hỗ trợ phục vụ": "HTPV",
    "chức danh nghề nghiệp": "CDNN",
    "chuyên môn": "CM",
    "lãnh đạo quản lý": "LDQL",
    ",": "",
    // Thêm các từ có thể viết tắt khác vào đây
};
function generateAbbreviation(phrase) {
    const abbreviationWords = [];

    phrase = phrase.toLowerCase();
    Object.entries(specificString).forEach(([from, to]) => {
        phrase = phrase.replace(xoa_dau(from).toLowerCase(), to);
    })
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
