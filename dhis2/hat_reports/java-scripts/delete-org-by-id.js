const _axios=require('axios');
let i = 0;
(async (running = true) => {
    if (!running) return;
    [
        // "CH10"
        "OAnyMX67p3p","CtJNF0qBilK"


    ] 
            .forEach(idEvent => {
                
            // _axios({
            //     url: [
            //         `https://kln.tkyt.vn/api/trackedEntityInstances/query.json?ou=LOdti1gATwC&ouMode=ACCESSIBLE&trackedEntityType=EL3fkeMR3xK`
            //         , `&attribute=JHb1hzseNMg:EQ:${BHXH}&paging=false`
            //     ].join(''),
            //     auth: {
            //         username: 'anhth',
            //         password: 'Csdl2018@)!*'
            //     }
            // }).then(e => {
            //     try {
                    _axios({
                        url: [
                            `http://dev.tkyt.vn/nhanluc/api/organisationUnits/${idEvent}`
                        ].join(''),
                        method: "delete",
                        auth: {
                            username: 'anhth',
                            password: 'Csdl2018@)!*'
                        }
                    }).then(e => {
                        // console.log(++countDeleted)
                        i++
                        console.log(i)
                    }).catch(err => {
                        console.log(err)
                    })
//                 } catch (e) {

//                 }
//             }).catch(err => {
//                 console.log(err)
//             })
        })
})()