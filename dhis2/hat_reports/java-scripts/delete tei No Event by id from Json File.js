// Kiem tra Tei xem có events 0 => xóa. >1 thì cập nhật Chọn xã phường thị trấn = org của event đầu tiên
const _axios = require('axios');
const fs = require('fs').promises;
const async = require('async');

async function readJsonFile() {
  try {
    const data = await fs.readFile('klnSOS_public_analytnrollment_naleaupzvie_5.json', 'utf8');
    const jsonData = JSON.parse(data);

    async.parallelLimit(jsonData.map(tei => {
      return async () => {
        try {
          const eventResponse = await _axios({
            url: `https://kln.tkyt.vn/api/trackedEntityInstances.json?ou=nJm9lSLVvG8&ouMode=ACCESSIBLE&program=NAleauPZvIE&trackedEntityInstance=${tei.tei}&paging=false&fields=*,enrollments[*]`,
            auth: {
              username: 'anhth',
              password: 'Csdl2018@)!*'
            }
          });

          if (eventResponse.data.trackedEntityInstances.length !== 0) {
            if (eventResponse.data.trackedEntityInstances[0].enrollments[0].events.length === 0) {
              // await _axios({
              //   url: `https://kln.tkyt.vn/api/trackedEntityInstances/${tei.tei}`,
              //   method: 'DELETE',
              //   auth: {
              //     username: 'anhth',
              //     password: 'Csdl2018@)!*'
              //   }
              // });
              console.log(`Đã xóa trackedEntityInstance với TEI: ${tei.tei}`);
            } else {
              let attXa = {
                "attribute": "Gy1fkmBZpFk",
                "value": `${eventResponse.data.trackedEntityInstances[0].programOwners[0].ownerOrgUnit}`
              };
              eventResponse.data.trackedEntityInstances[0].attributes.push(attXa);

              let urlPost = `https://kln.tkyt.vn/api/trackedEntityInstances`;
              let resPost = await _axios({
                url: urlPost,
                method: 'POST',
                data: JSON.stringify(eventResponse.data),
                headers: {
                  'Content-Type': 'application/json'
                },
                auth: {
                  username: 'anhth',
                  password: 'Csdl2018@)!*'
                }
              });
              console.log(`Update Tei`, resPost.status, tei.tei);
            }
          }
        } catch (err) {
          console.error('Có lỗi xảy ra khi xử lý TEI:', tei.tei, err);
        }
      };
    }), 10, (err, results) => { // Set the limit here
      if (err) {
        console.error('Có lỗi xảy ra khi xử lý các TEI:', err);
      } else {
        console.log('Hoàn thành xử lý tất cả các TEI.');
      }
    });

  } catch (error) {
    console.error('Có lỗi xảy ra khi đọc file JSON:', error);
  }
}

readJsonFile();
