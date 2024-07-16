const _axios=require('axios');
let i = 0;
(async (running = true) => {
    if (!running) return;
    [
        // "CH10"
"xjbxlBODVT7","ZzRoJCwSvNc","AomFlPqZUsg","hqolxmA7AjS","uDZsaipEXls","vgPbxPiAsUj","mH0JfUgboYp","prnHshA5CCx","qJCMFf61ARs","JyUhVZUCjEB","NjHDOJMPf7a","TmBEdD7NHQI","AIJR2Ch809D","Z23Hl4LmWCf","tAXgvcaqOwK","hANNYOqjdii","lqN7waryM3O","ncOfxpsLoQh","rHhrNa9qULN"

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
                            `http://103.124.60.92/baocao/api/organisationUnits/${idEvent}`
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