const _axios=require('axios');
(async (running = true) => {
    if (!running) return;
    [
        // "CH10"
        "TS2808021530306","HC4804800003780","BT2808021559523","BT2808021571995","BT2808021618438","GD4808021628244","HT2808021607573","HT2804800000666","HT3806697211874","CK2808021583487","CB2808021637727","BT2808021632226","TS2808021557538","GD4808008010960","TS2808023200230","BT2808021528763"
    ]
        .forEach(BHXH => {

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
                        console.log(e.data)
                    }).catch(err => {
                        console.log(err)
                    })
                } catch (e) {

                }
            }).catch(err => {
                console.log(err)
            })
        })
})()