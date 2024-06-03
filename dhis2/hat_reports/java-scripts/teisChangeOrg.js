const axios = require('axios');
const { error } = require('console');
const Excel = require('exceljs');
const fs = require('fs');

const authentication = {
  username: `anhth`,
  password: `Csdl2018@)!*`
}

var teis = [
  {
    "tei_uid": "ybgZWVga8dM",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "z3LNeQtahfq"
  },
  {
    "tei_uid": "KnJfp3dZ0I2",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  },
  {
    "tei_uid": "R6a0pWHnn80",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  },
  {
    "tei_uid": "nvImJBAvA6L",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  },
  {
    "tei_uid": "GNhKunZm8bm",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "lmESYZQl3bR"
  },
  {
    "tei_uid": "p9Gagjz5Zjn",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "Pd9K7M7tNgj"
  },
  {
    "tei_uid": "TJSPnAbPZSf",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "iNRdJfwPYcS"
  },
  {
    "tei_uid": "ntwP4BEY09p",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  },
  {
    "tei_uid": "UG6XnsJaJuM",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "baYnOG8p4cG"
  },
  {
    "tei_uid": "IJTBH7h7B0C",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  },
  {
    "tei_uid": "hM5YwE1g4Jo",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "q724QaW6BFx"
  },
  {
    "tei_uid": "aUx0xHXDUak",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "f5FqlWNGAkn"
  },
  {
    "tei_uid": "DFNuIPNNKgY",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  },
  {
    "tei_uid": "b7WFQ9BnIet",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  },
  {
    "tei_uid": "mGXUh6HjH74",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "q724QaW6BFx"
  },
  {
    "tei_uid": "ZXdMw4mtwm2",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "iNRdJfwPYcS"
  },
  {
    "tei_uid": "kXpKPxyT0F9",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "lmESYZQl3bR"
  },
  {
    "tei_uid": "MfoJnnN9uTz",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  },
  {
    "tei_uid": "o8TvcLQUZBB",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "JOeHqXCvVJu"
  },
  {
    "tei_uid": "Wsgq4Qh6kpI",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "lmESYZQl3bR"
  },
  {
    "tei_uid": "YZmQaCDDTB5",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "lmESYZQl3bR"
  },
  {
    "tei_uid": "Pa3DeihYNDD",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  },
  {
    "tei_uid": "D81jdREuVcw",
    "owner_tei_ou_uid": "B6CuUfmK1ua",
    "attr_tei_ou_uid": "Z9IJ6ghkQMn"
  },
  {
    "tei_uid": "cvRVI6rmu3D",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  },
  {
    "tei_uid": "Ti7rFuMHIFF",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  },
  {
    "tei_uid": "p9G2gw75ltc",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "K1dZacSlVEo"
  },
  {
    "tei_uid": "Mc12EMsrNvu",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "q724QaW6BFx"
  },
  {
    "tei_uid": "sLO8lKUx1sS",
    "owner_tei_ou_uid": "aVOwrRp1TZM",
    "attr_tei_ou_uid": "MR1tnOBxDms"
  },
  {
    "tei_uid": "ZSL0s2mERGS",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "ALMPu2Xxv6o"
  },
  {
    "tei_uid": "cCA0VkGG8Mt",
    "owner_tei_ou_uid": "aVOwrRp1TZM",
    "attr_tei_ou_uid": "l0iG2bp4Na5"
  },
  {
    "tei_uid": "vqiLT64abMq",
    "owner_tei_ou_uid": "tP16Dn2V2TO",
    "attr_tei_ou_uid": "XVvMgMSnBLl"
  },
  {
    "tei_uid": "qC8yGUVVlZz",
    "owner_tei_ou_uid": "ia4776399Vj",
    "attr_tei_ou_uid": "Dl6rYliIiEy"
  },
  {
    "tei_uid": "lMwI0ksB3Ek",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "mN656tgXkoj"
  },
  {
    "tei_uid": "PS0CTGwCnBm",
    "owner_tei_ou_uid": "qG4axl0y7gb",
    "attr_tei_ou_uid": "zhhNaq8H906"
  }
]
// console.log(teis);
async function changeOrg (teis){
  for(let i=0; i < teis.length; i++){
    // console.log(i);
    const url = `https://kln.tkyt.vn/api/trackedEntityInstances/${teis[i].tei_uid}.json`;
    let response = await axios.get(url, { auth: authentication });
    response.data.orgUnit = teis[i].attr_tei_ou_uid;
    // response.data.orgUnit = response.data.
   
    console.log(JSON.stringify(response.data));
    const urlPost = `https://kln.tkyt.vn/api/trackedEntityInstances/${teis[i].tei_uid}`;
    let resPost = await axios.put(urlPost, response.data, { auth: authentication });
    console.log(i, resPost);
  }
}

changeOrg(teis);