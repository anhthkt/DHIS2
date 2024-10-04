const fs = require('fs');
const fetch = require('node-fetch');
const async = require('async');
const moment = require('moment');
const axios = require("axios");

const authentication = {
    auth: {
        username: process.env.username,
        password: `Csdl2018@)!*`
    }
}


// Hàm đọc tệp JSON chứa danh sách tài khoản
function readAccountsFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
    }
    return [];
}

// Hàm ghi logs khi đăng nhập thành công
function writeLog(url, username, password, status) {
    const logEntry = {
        url: url,
        username: username,
        password: password,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
        status: status
    };

    fs.appendFileSync('login_logs.json', JSON.stringify(logEntry) + '\n', (err) => {
        if (err) {
            console.error('Error writing log:', err);
        }
    });
}

// Hàm kiểm tra đăng nhập với mật khẩu
async function checkLogin(url, username, passwords) {
    for (let password of passwords) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (response.ok) {
                console.log(`Login successful: ${username}, Password: ${password}`);
                writeLog(url, username, password, 'success');
                return; // Dừng lại khi đăng nhập thành công
            } else {
                console.log(`Login failed for: ${username} with password: ${password}`);
                writeLog(url, username, password, 'failed');
            }
        } catch (error) {
            console.error('Error during login attempt:', error);
            writeLog(url, username, password, 'error');
        }
    }
}

// Hàm chính thực hiện kiểm tra tài khoản từ danh sách
async function main() {
    const url = 'https://nhanluc.tkyt.vn/dhis-web-commons/security/login.action'; // URL để đăng nhập
    const passwords = ['Nhanluc@2024', '123456@Ab']; // Danh sách mật khẩu mặc định
    // const accounts = readAccountsFromFile('accounts.json');
    // const orgID = "LOdti1gATwC"; //Viet Nam
    const orgID = "AsdFJIqElU"; //An Giang
    let urlUser = `https://nhanluc.tkyt.vn/api/users.json?fields=username&filter=organisationUnits.path:ilike:${orgID}&paging=false`;
    await axios.get(urlUser, authentication).then(jsonResult => {
        let resData = jsonResult.data;
        return accounts = resData.users
    })
    console.log(accounts);
    const limit = 5; // Số lượng tác vụ song song cùng lúc

    // Tạo danh sách các tác vụ để thực hiện
    const tasks = accounts.map(account => {
        return async function (callback) {
            await checkLogin(url, account.username, passwords, callback);
            // callback();
        };
    });

    // Sử dụng parallelLimit để chạy các tác vụ song song với giới hạn
    async.parallelLimit(tasks, limit, (err, results) => {
        if (err) {
            console.error('Error occurred during parallel execution:', err);
        } else {
            console.log('All tasks completed');
        }
    });
}

main();
