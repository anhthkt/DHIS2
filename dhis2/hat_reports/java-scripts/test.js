const axios = require('axios')
var fs = require('fs')

axios.get('http://dev.tkyt.vn/lucky/api/organisationUnits.json?fields=:owner,ancestors[id,name]&filter=path:ilike:uAsdFJIqElU&filter=level:eq:4&paging=false',{
    auth:{
        username:'diepvt',
        password:'1234567@A'
    }
}).then(res=>{
    //console.log(res.data.organisationUnits[0])
    // So luong ban ghi
    let lengthRecord = res.data.organisationUnits.length;
    //console.log(lengthRecord)
    //array.forEach((e,ind,arr) => {
    //let idRecord = e.id 
    //});    
    for(i = 0; i < lengthRecord; i++){
        //console.log(i)
        // id don vi
        let idRecord = res.data.organisationUnits[i].id;
        //console.log(idRecord)

        // ten don vi
        let nameRecord = res.data.organisationUnits[i].name;
        //console.log(nameRecord)

        // path don vi cha
        let pathRecord = res.data.organisationUnits[i];
        let formatAncestor = pathRecord.ancestors.map(e=>{return e.name});
        let resultPathRecord = formatAncestor.join("/");
        //console.log(resultPathRecord)

        //let singleRecord = idRecord + "|" + nameRecord + "|" + resultPathRecord + '\n'
        let singleRecord = `${idRecord} | ${nameRecord} | ${resultPathRecord}\n`
        //console.log(singleRecord)
        //create a file named result.csv:
        fs.appendFile('results.csv', singleRecord, function (err) {
        if (err) throw err;
        console.log('Saved!');
        });
    }
})