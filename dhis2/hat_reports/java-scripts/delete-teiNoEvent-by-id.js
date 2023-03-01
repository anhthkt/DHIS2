const _axios=require('axios');
(async (running = true) => {
    if (!running) return;
    [
        // "CH10"

        "aNysvcAguUu"

    ]
        .forEach(BHXH => {

            _axios({
                url: [
                    `https://kln.tkyt.vn/api/events.json?field=:owner&trackedEntityInstance=${BHXH}&paging=false`
                ].join(''),
                auth: {
                    username: 'anhth',
                    password: 'Csdl2018@)!*'
                }
            }).then(e => {
                try {
                    // console.log(e.data.events.length)
                    // console.log(BHXH)
                    if(e.data.events.length==0){
                        // console.log(BHXH)
                        _axios({
                        url: [
                            `https://kln.tkyt.vn/api/trackedEntityInstances/`,
                            `${BHXH}`
                        ].join(''),
                        method: "delete",
                        auth: {
                            username: 'anhth',
                            password: 'Csdl2018@)!*'
                        }
                        }).then(e => {
                            // console.log(++countDeleted)
                            console.log(BHXH)
                        }).catch(err => {
                            console.log(err)
                        })
                    } else{
                        console.log("Có event: ",BHXH)
                    }
                } catch (e) {

                }
            }).catch(err => {
                console.log(err)
            })
        })
})()