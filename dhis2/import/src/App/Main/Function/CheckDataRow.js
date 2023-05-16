

// Hàm check Ngày tháng năm
const validateDate = (date) => {
  if (date !== undefined) {
    let mDate2 = date.toString().split("/");
    let mYear2 = parseInt(mDate2[2], 10);
    let mMonth2 = parseInt(mDate2[1], 10);
    let mDay2 = parseInt(mDate2[0], 10);
    let newDate2 = new Date(mYear2, mMonth2 - 1, mDay2);
    let currentDate = new Date();
    if (newDate2.getFullYear() !== mYear2 || newDate2.getMonth() + 1 !== mMonth2 || newDate2.getDate() !== mDay2 || mYear2 < 1900 || newDate2.getTime() > currentDate.getTime()) {
      return false;
      // console.log("Kiem tra lai ngay thang nam sinh")
    } else {
      return true;
    }
    // Logger.log(mYear2+"-"+mMonth2+"-"+mDay2);
  }
  // return false;
}

function isNumber(str) {
  return /^\d+$/.test(str);
}
function isAlphaNumeric(str) {
  return /^[a-zA-Z0-9]+$/.test(str);
}
// Hàm để check row
export const checkDataRow = (row) => {
  let errorMessage = '';
  // Check Mã đơn vị
  if (row.code === '') {
    errorMessage += "Chưa nhập Mã đơn vị. \n";
  } else {
    errorMessage += '';
  }
  // Check Họ và tên
  if (row.name === undefined) {
    errorMessage += "Chưa nhập Họ và tên. \n";
  }
  // Check Giới tính
  if (!(row.sex === '01' || row.sex === '02')) {
    errorMessage += "Kiểm tra lại Mã Giới tính. \n";
  }
  // Check Ngày tháng năm sinh
  if (!validateDate(row.birth)) {
    errorMessage += "Kiểm tra lại Ngày sinh. \n";
  }
  // Check Mã BHYT/CMT không có giá trị
  if ((row.bhyt === '' || row.bhyt === undefined) && (row.cmt === '' || row.cmt === undefined)) {
    errorMessage += "Chưa nhập Mã BHYT/CMT. \n";
  }
  // Check BHYT có tiếng việt hoặc ký tự đặc biệt
  if(row.bhyt !== '' && row.bhyt !== undefined && isAlphaNumeric(row.bhyt) === false){
    errorMessage += "Kiểm tra lại Mã BHYT. \n";
  }
  // Check CMT chỉ có số.
  if (row.cmt !== '' && row.cmt !== undefined && isNumber(row.cmt) === false) {
    errorMessage += "Kiểm tra lại CMT. \n";
  }
  // Check Ngày phát hiện
  if (row.date2 !== '' && validateDate(row.date2) === false) {
    errorMessage += "Kiểm tra lại Ngày phát hiện. \n";
  }
  // Check nơi phát hiện
  if (row.add2 !== '' && row.add2 !== undefined && row.add2.toString() !== '1' && row.add2.toString() !== '2' && row.add2.toString() !== '3' && row.add2.toString() !== '4' && row.add2.toString() !== '5' && row.add2.toString() !== '6') {
    errorMessage += "Kiểm tra lại Mã Nơi phát hiện. \n";
  }

  if (errorMessage !== '') {
    return errorMessage;
  }
  return '';
}