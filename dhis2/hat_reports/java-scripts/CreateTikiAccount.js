
const _axios = require("axios");

const TelegramBot = require('node-telegram-bot-api');
// const token = '1648772630:AAFLbs-osWYpJJIqBvl-t0cJxdB668jCO5k'; //@bot changePass
const token = '1653926740:AAG5JMtGp6tSC8YI8sLGwnLi7ImKuvowlv4'; //@bot tiki
const bot = new TelegramBot(token, { polling: true });
const FormData = require('form-data')

const urlTiki = "https://tiki.vn"
const urlTest = "https://gorest.co.in"

const DES_URL = urlTiki

const apiSentOTP = `${DES_URL}/api/v2/customers/otp_codes`

const urlApiPostFormUser = `${DES_URL}/api/v2/customers`

// --------------- Get require telegram message from users(2 option) ---------------

bot.onText(/\/p (.+)/, (msg, match) => {
    const mParam = match[1].split(" ");
    if (mParam.length <= 0) {
        bot.sendMessage(chatId,
            `vui lòng nhập số điện thoại`, { parse_mode: "HTML" })
        return;
    }
    const phoneNumber = mParam[0]
    bot.sendMessage(msg.chat.id, `Đang gửi otp đến số điện thoại "<b>${phoneNumber}</b>"...`, { parse_mode: "HTML" })
    sendOTP(phoneNumber, msg.chat.id)
})
const surnameArr = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Phan", "Vũ", "Đặng", "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý"]
const lastNameArr = ["Trang", "Linh", "Phương", "Hương", "Thảo", "Hà", "Huyền", "Ngọc", "Hằng", "Giang", "Nhung", "Yến", "Nga", "Mai", "Thu", "Hạnh", "Vân", "Hoa", "Hiền"]

function generateUserInfo(phoneNumber, otpText) {
    var sn = getRandomInt(0, surnameArr.length - 1)
    var ln = getRandomInt(0, lastNameArr.length - 1)
    const mFullName = `${surnameArr[sn]} ${lastNameArr[ln]}`
    const mBirthday = `${getRandomInt(1970, 2000)}-${getRandomInt(1, 12)}-${getRandomInt(1, 27)}`

    return {
        full_name: mFullName,
        phone_number: phoneNumber,
        otp_code: otpText,
        email: `${phoneNumber}@gmail.com`,
        password: "123456aA@",
        gender: "male",
        birthday: mBirthday,
        newsletter: "true"
    }
}

function sendOTP(phoneNumber, chatId) {
    const opts = {
        reply_markup: {
            force_reply: true
        }
    }

    // const apiSentOTP = `${ursInfoArr.DES_URL}/api/v2/customers/otp_codes`
    _axios.post(apiSentOTP, JSON.stringify({ "phone_number": `${phoneNumber}` }), {
        headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json'
        }
    }).then(resultSentOTP => {
        if (resultSentOTP.status == "200") {

        } else {

        }
        resultSentOTP.data
        bot.sendMessage(chatId, `Nhập mã OTP của số đt(${phoneNumber}):`, opts).then(addTemplate => {
            const replyListenerId = bot.onReplyToMessage(addTemplate.chat.id, addTemplate.message_id, msg => {
                bot.removeReplyListener(replyListenerId)
                sendFormRegister(phoneNumber, msg.text, msg.chat.id)
            })
        })
    }).catch(e => {
        //ERROR
        try {
            bot.sendMessage(chatId,
                `❌❌ERROR_ON_otp(<b>${phoneNumber}</b>)::${e.message}\n${e.response.data.error.errors.map((m, indx) => { return indx + "." + m.message }).join("\n")}
            `, { parse_mode: "HTML" })
        } catch {}
        console.log("ERROR")
    })
}


function sendFormRegister(phoneNumber, otpText, chatId) {
    const ursInfoArr = generateUserInfo(phoneNumber, otpText)
    if (ursInfoArr == undefined) { return; }

    let postData = new FormData();
    postData.append('full_name', ursInfoArr.full_name);
    postData.append('phone_number', ursInfoArr.phone_number);
    postData.append('otp_code', ursInfoArr.otp_code);
    postData.append('email', ursInfoArr.email);
    postData.append('password', ursInfoArr.password);
    postData.append('gender', ursInfoArr.gender);
    postData.append('birthday', ursInfoArr.birthday);
    postData.append('newsletter', 'true');
    // const urlApiPostFormUser = `${DES_URL}/public-api/users` //test
    _axios.post(urlApiPostFormUser, postData, {
        headers: postData.getHeaders()
    }).then(response => {
        // bot.sendMessage(chatId, `Thông tin người dùng
        // ${JSON.stringify(ursInfoArr)}`, { parse_mode: "HTML" })
        bot.sendMessage(chatId, `✅✅SUCCESS:
        full_name: <b>${ursInfoArr.full_name}</b>
        phone_number: <b>${ursInfoArr.phone_number}</b>
        birthday: <b>${ursInfoArr.birthday}</b>
        `, { parse_mode: "HTML" })
    }).catch(e => {
        //ERROR
        try {
            bot.sendMessage(chatId, `❌❌ERROR_ON_sendFormRegister::${e.message}`, { parse_mode: "HTML" })


        } catch {}
        console.log("ERROR")
    });
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}