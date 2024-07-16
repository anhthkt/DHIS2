const _axios = require('axios'); // Import axios để thực hiện các yêu cầu HTTP
const fs = require('fs').promises; // Import module fs và sử dụng promises để đọc file JSON

async function readJsonFile() {
  try {
    // Đọc file JSON và phân tích dữ liệu
    const data = await fs.readFile('/home/tranhoanganh/dhis2/dhis2/klnSOS_public_analytnrollment_naleaupzvie_7.json', 'utf8');
    const jsonData = JSON.parse(data); // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript
    
    //console.log(jsonData); // In dữ liệu JSON ra console để kiểm tra
    
    for (const tei of jsonData) { // Lặp qua từng phần tử trong jsonData
      try {
        // Gửi yêu cầu GET đến API để kiểm tra xem có sự kiện nào liên quan đến trackedEntityInstance này không
        const eventResponse = await _axios({
          url: `https://kln.tkyt.vn/api/events.json?field=:owner&trackedEntityInstance=${tei.tei}&paging=false`,
          auth: {
            username: 'anhth',
            password: 'Csdl2018@)!*'
          }
        });

        // Kiểm tra nếu không có sự kiện nào liên quan thì gửi yêu cầu DELETE để xóa trackedEntityInstance
        if (eventResponse.data.events.length === 0) {
          await _axios({
            url: `https://kln.tkyt.vn/api/trackedEntityInstances/${tei.tei}`,
            method: 'DELETE',
            auth: {
              username: 'anhth',
              password: 'Csdl2018@)!*'
            }
          });

          console.log(`Đã xóa trackedEntityInstance với TEI: ${tei.tei}`);
        } else {
          console.log(`Có event: ${tei.tei}`);
        }
      } catch (err) {
        console.error('Có lỗi xảy ra khi xử lý TEI:', tei.tei, err);
      }
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi đọc file JSON:', error);
  }
}

readJsonFile();
