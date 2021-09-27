const arr1 = [
    {idParent: "P1", idDx: "Ronaldo", value: 2},
    {idParent: "P2", idDx: "Orange", value: 2},
    {idParent: "P1", idDx: "Donald", value: 1},
    {idParent: "P1", idDx: "Ronaldo", value: 5},
    {idParent: "P3", idDx: "Jim", value: 1},
    {idParent: "P3", idDx: "Jim", value: 5}
  ];

let helper = {};
let result = arr1.reduce(function(r, o) {
    let key = o.idParent + '-' + o.idDx;
    if(!helper[key]) {
        helper[key] = Object.assign({}, o); // create a copy of o
        r.push(helper[key]);
    } else {
        //helper[key].used += o.used;
        helper[key].value += o.value;
    }
    return r;
}, []);
console.log(result);


var arr = [
    {"shape":"square","color":"red","used":1,"instances":1},
    {"shape":"square","color":"red","used":2,"instances":1},
    {"shape":"circle","color":"blue","used":0,"instances":0},
    {"shape":"square","color":"blue","used":4,"instances":4},
    {"shape":"circle","color":"red","used":1,"instances":1},
    {"shape":"circle","color":"red","used":1,"instances":0},
    {"shape":"square","color":"blue","used":4,"instances":5},
    {"shape":"square","color":"red","used":2,"instances":1}
];

var helper = {};
var result = arr.reduce(function(r, o) {
    var key = o.shape + '-' + o.color;
    if(!helper[key]) {
        helper[key] = Object.assign({}, o); // create a copy of o
        r.push(helper[key]);
    } else {
        helper[key].used += o.used;
        helper[key].instances += o.instances;
    }
  
    return r;
}, []);
  
  console.log(result);