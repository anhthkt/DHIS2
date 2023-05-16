import axios from 'axios';

const urlBase = `https://kln.tkyt.vn/api/`;
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YW5odGg6Q3NkbDIwMThAKSEq' // token authentication
    }
}
const authentication = {
    auth: {
        username: 'anhth',
        password: `Csdl2018@)!*`
    }
}

// Hàm get ID Org qua api
export const FetchIdOrg = async (codeOrg) => {
    const url = `${urlBase}organisationUnits.json?fields=code,id&filter=code:in:[${codeOrg}]&paging=false`;
    const response = await axios.get(url, authentication);
    return (response.data.organisationUnits);
};

function isAlphaNumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
  }
// Hàm check TeiId by BHYT
export const FetchIdTeiByBHYT = async (bhyt) => {
    if (bhyt !== '' && bhyt !== undefined && isAlphaNumeric(bhyt)) {
        const url = `${urlBase}trackedEntityInstances.json?fields=trackedEntityInstance,enrollments[program]&ouMode=ACCESSIBLE&attribute=JHb1hzseNMg:eq:${bhyt}&paging=false`;

        const response = await axios.get(url, authentication);
        if (response.data.trackedEntityInstances.length > 0) {
            return (response.data.trackedEntityInstances[0]);
        }
        return ("");
    } else {
        return ("");
    }
};

//
function isNumber(str) {
    return /^\d+$/.test(str);
} 
// Hàm check Tei by CMT
export const FetchIdTeiByCMT = async (cmt) => {
    if (cmt !== '' && cmt !== undefined && isNumber(cmt)) {
        const url = `${urlBase}trackedEntityInstances.json?fields=trackedEntityInstance,enrollments[program]&ouMode=ACCESSIBLE&attribute=ZQ93P672wQR:eq:${cmt}&paging=false`;
        const response = await axios.get(url, authentication);
        if (response.data.trackedEntityInstances.length > 0) {
            return (response.data.trackedEntityInstances[0]);
        }
        return ("");
    } else {
        return ("");
    }
};

// Hàm tạo mới Tei 
export async function importTei(row, dataTei) {
    const url = `${urlBase}trackedEntityInstances`;
    row.note = "Import thành công. ";
    await axios.post(url, dataTei, config)
        .then(response => {
            // handle response
            let res = response.data.response;
            if(res.importSummaries[0].href !== ''){
                return row.note = "Import thành công. ";
            }
        })
        .catch(error => {
            // handle error
        });

}
// Hàm đăng ký chương trình
export const importEnrollment = async (row, dataEnrollment) => {
    const url = `${urlBase}enrollments`;
    row.note = "Đăng ký chương trình thành công. ";
    await axios.post(url, dataEnrollment, config)
    .then(response => {
        // handle response
        let res = response.data.response;
        if (res.importSummaries[0].href !== ''){
            return row.note = "Đăng ký chương trình thành công. ";
        }  
    })
    .catch(error => {
        // handle error
    });
}