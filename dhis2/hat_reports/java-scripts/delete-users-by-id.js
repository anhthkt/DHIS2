const _axios=require('axios');
let i = 0;
(async (running = true) => {
    if (!running) return;
    [
        // "CH10"

        "emLmoatQDnC","exoAUcXtOF8","gQU396CEP1w","grxUPBeWn5h","hE9WPt0XrJ4","iTh5WR6p2eD","js7w7grsnGb","lGt6mPtKA2O","lOQQ4ZXd2qv","lWeAuk51h0e","lrxQSgwOOdK","mzDVW3neZFm","nDSLkQuqMQ9","nG8Is1alVuN","nk82ONdmc0n","ocUHXk37Rmr","pVFNgE7WjBv","qQMgujLJUeS","qwWmzoCJlL7","rKBkjOdHi1q","roRzm74s8fF","rw5FAXuhN7h","tAthR6m9len","tM2qbvgQ1Se","xgnoXcUbRi6","zw9XwYlfHs8"
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
                            `http://dev.tkyt.vn/nhanluc/api/38/users/${idEvent}`
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