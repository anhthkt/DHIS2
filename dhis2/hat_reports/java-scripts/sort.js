let arr = [
    ['202001', 'Thang 1', '10'],
    ['202002', 'Thang 2', '12'],
    ['202003', 'Thang 3', '13'],
    ['202004', 'Thang 4', '14'],
]

arr.forEach(e => {
    e[0] = {key: e[0], value: e[2]}
})


console.table(arr)
let remapArr = arr.sort(function(a, b){
    let keyA = a.id;
    let keyB = b.id;
    if (keyA < keyB){
        return -1;
    }else{
        if (keyA > keyB) {
            return 1;
        }else {
            return 0;
        }
    }
});

for(i = 0; i < remapArr.length; i++) {
    if (remapArr[i].value == '') {
        remapArr[i].value = remapArr[i-1].value;
    }
}

console.table(remapArr);