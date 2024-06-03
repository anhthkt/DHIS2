const _axios=require('axios');
let i = 0;
(async (running = true) => {
    if (!running) return;
    [
        // "CH10"
        "VPXMoLQA0AK","EU3npOcFwtu","Bz5kLOD4nQ7","BtYpIwia1UH","Xn1saROetJG","qjty9vHnIzD","afPWWnDwxlP","BSMP4UVbcXV","GRddGMHwMkt","RGAR6lnh54g","K9p4iSgQUIk","rAD87ZibXK9","VBNM3Oo5iAv","yeNAsR6D7qk","Z1nkuZPmwhi","V3i55TJYWWa","hHnTn1FkiOh","YmVVHlrI1ri","LYGjU45AtlP","dbxtdAuAkFc","LJCuVmdTNLz","D8k0Y5rgkMy","OKx7ZT2PCyN","HWhulqOYeIv"

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