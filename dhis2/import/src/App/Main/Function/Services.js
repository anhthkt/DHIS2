import axios from 'axios';

const urlBase = `https://kln.tkyt.vn/api`;
const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YW5odGg6Q3NkbDIwMThAKSEq' // token authentication
    }
}

// Hàm get ID Org qua api
export const FetchIdOrg = async (codeOrg) => {
    const url = `${urlBase}/organisationUnits.json?fields=code,id&filter=code:in:[${codeOrg}]&paging=false`;
    const response = await axios.get(url, {
        auth: {
            username: 'anhth',
            password: `Csdl2018@)!*`
        }
    });
    return (response.data.organisationUnits);
};

// Hàm check TeiId by BHYT
export const FetchIdTeiByBHYT = async (bhyt) => {
    if (bhyt !== '' && bhyt !== undefined) {
        const url = `${urlBase}/trackedEntityInstances.json?fields=trackedEntityInstance,enrollments[program]&ouMode=ACCESSIBLE&attribute=JHb1hzseNMg:eq:${bhyt}&paging=false`;

        const response = await axios.get(url, {
            auth: {
                username: 'anhth',
                password: `Csdl2018@)!*`
            }
        });
        if (response.data.trackedEntityInstances.length > 0) {
            return (response.data.trackedEntityInstances[0]);
        }
        return ("");
    } else {
        return ("");
    }
};
// // Hàm check Tei by CMT
export const FetchIdTeiByCMT = async (cmt) => {
    if (cmt !== '' && cmt !== undefined) {
        const url = `${urlBase}/trackedEntityInstances.json?fields=trackedEntityInstance,enrollments[program]&ouMode=ACCESSIBLE&attribute=ZQ93P672wQR:eq:${cmt}&paging=false`;
        const response = await axios.get(url, {
            auth: {
                username: 'anhth',
                password: `Csdl2018@)!*`
            }
        });
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
    const url = `${urlBase}/trackedEntityInstances`;
    row.note = "Đang import ...";
    await axios.post(url, dataTei, config)
        .then(response => {
            // handle response
            let res = response.data.response;
            return row.note = res.importSummaries[0].href;
        })
        .catch(error => {
            // handle error
        });

}
// Hàm đăng ký chương trình
export const importEnrollment = async (row, dataEnrollment) => {
    const url = `${urlBase}/enrollments`;
    row.note = "Đang import ...";
    await axios.post(url, dataEnrollment, config)
    .then(response => {
        // handle response
        let res = response.data.response;
        return row.note = res.importSummaries[0].href;
    })
    .catch(error => {
        // handle error
    });
}