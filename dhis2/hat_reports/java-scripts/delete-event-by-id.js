const _axios=require('axios');
let i = 0;
(async (running = true) => {
    if (!running) return;
    [
        // "CH10"
        "s569km6rewe","psvDS0NnTPc","IJsKTvYG4eb","KVUh0Zx1v7b","rlmdUG05Ly1","TZYOVF7sVCp","fiq1GNEmlqg","UJTRyx9gVeY","T82W5i3iwFM","PIpjRjagQGt","jtVHJWLZNVK","hulPA922H29","WcRegY8KNDJ","iEjWCKYnwsL","FbbVd6dcVE7","v8W8EZJe3f0","ZDb4MeVJOtw","lIgoCjHvcRL","zgfkpqZe4mr","LFvEdSkE9vd","Yj3tgebxoVg","fyXIUu5GjT8","IpRurJtcfwU","Zs1CxYpwfTM","YDIxwizMa2O","yDeZlVnY2eV","VNN4v5eGzdx","fxIGeU5okSZ","pyrNF3YV7oH","XBG8gdQjxxN","Htt9xgEQCZR","dC6shzdpZoF","gAvGzWQYaUh","HMC4lpSFYWn","O40usiOU6ry","SJXTLRm338h","aXFFOktMtlG","PGPbXlivCVZ","k8jh1lUNnYp","chrIrMl8aZQ","bBhP7WXwMqm","hMNkp9PrcAx","p5hl3xUsczR","MTFWipZ6MxZ","KW1nDpUuM97","babryYxizDt","HQM83uog8nl","J0H8IEGRcNY","JMWQhH1uk6a","wv2BIAueaBF","GpIElxsSEFm","UhwNvfxIpja","tYDFzlybvPH","hYU3aHRCBOJ","Yw4dRcWWIlC","qo1xewujkSD","Dr7RrEMsBe3","V3ypQqfREqf","qzSTXBlagtH","WU0EFeMmYSN","CbgDL8CzCAP","n6GjXsn5Gie","yEwBOIz2jZ3","n3BN4GZA6FU","aNqlMNzTTNv","LmnZsyp3xOe","pAzZf3qNQIl","UMuGgrugRAM","cuJy1nklMyE"

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
                            `https://kln.tkyt.vn/api/events/${idEvent}`
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