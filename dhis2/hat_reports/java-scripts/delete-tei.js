const _axios = require("axios");
const { config } = require("process");

// let arrTeiIds = [urn7Xr2Blgp,
//     waaEvDIoRCl,
//     aiTAibRto7i,
//     j5LVLOtnDS7,
//     Y11U1ZOehVC,
//     L2FCJD56w3l,
//     d3JcoSSzo2e,
//     JsWDzD093H5,
//     yY2RAXrVp2U,
//     Ufeilr6XtU3,
//     S4CEBgVTuHE,
//     pWuufsOQQdt,
//     Zlq0cYb2ss3,
//     z0hG0aq7abX,
//     O2rcbLGwHXh,
//     ne1G2TPlJHv,
//     uyVqEJ7cSA0,
//     DRKjxMn8P37,
//     vThm9yE1srM,
//     Iu9UiG4sXYx,
//     HGZTxLVOswt,
//     dhRFItnEavw,
//     i8fs1c0F70K,
//     Nzkco1GaYd4,
//     EhuzcY5wb05,
//     qRgLAiHi4Fk,
//     vUW0C3XQyQk,
//     lhfsq0g3VXh,
//     j7Ww3EFGYK6,
//     uHivkTP9CKb,
//     o4Ws2datB2F,
//     grJjpAtPoET,
//     KNYPEopnYyK,
//     mkV1uLsQyor,
//     NNjdBn5zGBz,
//     JaSiLIWIBm7,
//     zUX6IWLmc81,
//     IYftRpDmnbb,
//     IORB5UT3Xsv,
//     IZXTzrp6G7S,
//     JkAfSIdRtwU,
//     mwJ53jDeFzY,
//     tVz2iZeSos5,
//     SMApg07nAyt,
//     TIBTQ8Ui0tV,
//     JTAQ0yEI316,
//     Rg4Mri3XBhx,
//     RACSSlDI4c1]
//     let arrTeiId = [urn7Xr2Blgp]
//     let baseUrl = "http://daotao.tkyt.vn/kln/api/trackedEntityInstances/"
// arrTeiId.forEach(e => {
//     _axios.delete(url[
//         `${baseUrl}+${e}`,{
//         authen: {
//         username: 'anhth',
//         password: 'Csdl2018@)!*'
//     }}
// ])sponse.json();
// })
let session_url = `http://daotao.tkyt.vn/kln/api/trackedEntityInstances/urn7Xr2Blgp`
_axios.delete(session_url, {}, {
    auth: {
      username: 'anhth',
      password: 'Csdl2018@)!*'
    }
  });