const arr = [
    {idParent: "P1", idDx: "Ronaldo", value: 2},
    {idParent: "P2", idDx: "Orange", value: 2},
    {idParent: "P1", idDx: "Donald", value: 1},
    {idParent: "P1", idDx: "Ronaldo", value: 5},
    {idParent: "P3", idDx: "Jim", value: 1},
    {idParent: "P3", idDx: "Jim", value: 5}
  ];

  var result1 = [];
  arr.reduce(function(res, value) {
    if (!res[value.idParent, value.idDx]) {
        res[value.idParent, value.idDx] = {idParent: value.idParent, idDx: value.idDx, value: value.value };
        result1.push(res[value.idParent, value.idDx])
    } else {
        let idDx1 = value.idDx
        res.idDx1.value += value.value;
        result1.
    }
    return res;
  }, {});
  
console.log(result1)
  
let result = Object.values(result1.reduce((a,{idParent, ...props})=>{
    if(!a[idParent])
        a[idParent]  = Object.assign({}, {idParent, data : [props]});
    else {
        a[idParent].data.push(props);
    }      
    return a;
},{}));

console.log(result);