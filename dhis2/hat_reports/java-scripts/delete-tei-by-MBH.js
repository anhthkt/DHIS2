const _axios = require('axios');
let i = 0;
(async (running = true) => {
    if (!running) return;
    [
    ]
        .forEach(BHXH => {
            if(BHXH !== "") {
                i = i + 1;
                _axios({
                    url: [
                        `https://kln.tkyt.vn/api/trackedEntityInstances/query.json?ou=LOdti1gATwC&ouMode=ACCESSIBLE&trackedEntityType=EL3fkeMR3xK`
                        , `&attribute=JHb1hzseNMg:EQ:${BHXH}&paging=false`
                    ].join(''),
                    auth: {
                        username: 'anhth',
                        password: 'Csdl2018@)!*'
                    }
                }).then(e => {
                    if(e.data.rows.length > 0) {
                        try {
                        
                            _axios({
                                url: [
                                    `https://kln.tkyt.vn/api/trackedEntityInstances/`,
                                    e.data.rows[0][0]
                                ].join(''),
                                method: "delete",
                                auth: {
                                    username: 'anhth',
                                    password: 'Csdl2018@)!*'
                                }
                            }).then(e => {
                                // console.log(++countDeleted)
                                console.log(++i, BHXH)
                            })
                        } catch (e) {
        
                        }    
                    }  
                }).catch(err => {
                    console.log(err, BHXH)
                })
            } 
        })
})()