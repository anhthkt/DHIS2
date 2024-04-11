const _axios=require('axios');
let i = 0;
(async (running = true) => {
    if (!running) return;
    [
        // "CH10"
        "ADTOOjA5N58","AMAIL9X3r1e","AYeGDTSmRqC","BQlk1knEyMT","BW9DCK2QLaD","CcmdKQ7nSF0","DbB1dzsMMHF","E55HfYBCbDr","Ee6GerWYimM","EhVOHfSFoa8","EkjUoasrtsV","Ezi02dVO36Z","F2WWPe2KFSN","H4Atn6m7njh","HcSUaxVJPBd","ID3zsHfVUkx","IMavigHmgnr","IqkxdJFRwKm","Iy3K2pbm4nV","KGVToIcHZG1","MQbwY8XA5bw","MW6ahGTNulE","N9wO9h8frPT","NriJeFELSDP","OEfrAOAgSE7","PT5z4T04TwC","Q2Do5QqU16A","QAhN9HxHY67","QMrO9xxnnnX","Qn31SQscE30","QoFrC5ASrjp","Rc2qQFh8Uep","RjaMg27gOo6","S5Iu7ELehzf","Tl9hgD2OI8z","U6ApSdet4ll","UQcn063dMSn","VoeXtjm8hFb","WDOeb5nqUng","WTDBjPJMLNU","WZ3POeXSVwJ","Wb9ghb5LviP","Wc0BDzzpzvZ","Wv7PgjkDV6K","XKL5khqOOXh","Xwylt02tjKk","YBYhqWgPtSk","Z5MJkzyZ5GV","ZI14MZiI2eF","a4dY0lcswGU","arQCQzAFPcM","auxRlDU3JMu","av2YaRhWAzZ","cBAOKrGahjk","cIfziVoHVZH","ckPDdqqgGPu","dF3guI7tN7e","dFiY9cdWLxT","dwzAH4ndFHl","eAzlCcg3Zt8","eMIs3gBPP90","eX16IvRiLel","gM6SOpvzUpe","iZDt4qUxmAX","jfy5VSq3rih","kKf4W2G19Nh","kTFgzzb8FdV","knBnJkTiQ6H","lJvNGroK3C7","lw7n4UQ9LTz","mPtsNZlTSFh","msVzMjduwie","n6b1qQ5eMC5","n8zm68BzGEv","o1CnfImwM9d","o3p9JTzwCxu","oKfm774ru9F","oaLB1pKGsP3","pkaFYMD5XKW","q5R3y4JR8Zt","rCTajE310Dz","rRBcAfaiWHJ","smrhkQcBpYx","tE5AMkWvwSv","tX3lUniAZ80","tctd9UQpC4G","tjaaJQRAPFl","unfLKEOtJ1a","vjxmguXVRpN","vqZ15Wmnhsv","vsK6XR7XsGg","wfmhGqeJlCy","wqzYLqKvVWW","x3ped4mT8Bc","xEqD8f6Afp7","xrLRuDUm8xy","ydCR4xlUFTN","yxiKd4zd8Ny","zTqCTqEY2ue","ztCjgKHiUZ9","AAWwuzaNBhc","AXN9ZV3KccX","AutAEbkxBTq","BYr1hQobwTJ","Bdv88Ud6Jdo","CiApKghbNKk","Czsde2RabMa","DCSh7jIBq18","DP3WTrgwXWf","DP9Zkf1tdh5","E3lEgmmGMrZ","ECwj43gzOIS","Eyzq2UuCaO3","F6tMVwXj37h","Fy6rl7RCviK","GsGTIpobRhQ","HIH5aWW8d7i","HfGprEXe6dJ","I6aMpXZWEnX","IKUPrVlyDxq","IruuuTAiI9P","JBMovNZ22kl","JUfU6JN3hur","Jy1hGrSla9d","KAr3u4mxou2","KLLnGEksz9Q","Kmozffs4h9L","L78Z4pbg76H","NV20FGaF6sX","O6gRjClo4lV","OlmhHo0xtKW","PkiJDjOlHqY","Q2W2OXXTKgv","QWtMALxhkzb","SryuNCFQ36N","SvaW2MBix6z","TMyr0ZDL9pG","TXVQwFIR6JX","VBGJop2lNNQ","VFENyaGTbuw","VX1wPcLJ3C1","WJpuPXJDInK","WN2PBslCOh2","WYDUJW7aIN0","WhOeY7ijgLI","XUMbWvNq8ei","XXbVqSsZ3Pi","YHzG52YoTWz","YQ9m2f2bk1S","YQu44fvt80o","YWYsaUyUuDZ","YuEkD9gHtKT","aD6B291FGr1","aaUKAbTH27g","bazaW0KL9pM","brQojGr6tTR","crA46hcGbPK","dBaPd4ZCwra","djpGuF522zB","dsN4Kha4bPk","e36Q6dBDxlr","ferHeYJv09j","fn0fpkydR40","fqj6wqaD1BQ","gbNpmRjAMm4","grHVvLsRT4l","hGCVSAdt5Oy","hscdM34Mejg","iiAViX5swHU","itRbAykPKBr","ivwNHDgHnZ7","j6j0itDRIs8","kV7XsVu7dHn","kk2fMeNkHXp","kmInhf1A5q6","lZ0lIw9PQ6B","ldTjeQOSKsu","niZ4uCjGk3Y","oY1AeS5l7AV","oauq1wqA7VM","oomexgMGGUQ","pTDToiIsVtk","pdE4vfnczD6","pmx55DktRmZ","qECPWjXFdUW","qvbag9Z547Y","reGwoIeReyu","uSlsXAm7tFj","uSv3ZNC4AAI","v1yywkPflPD","vR3tqwXyPJE","w0mU7I1S3HA","xQdyLLyuyld","xbbhok5Xidy","xufMkW2MUWt","yCzHgEMLQfe","yjSGuseCY6G","zM1uO3Se13J","zUWB9XTpFOF","zzciyHA5ofU","AAcDp0fia5Z","AoIaiTM12Gn","BkYn34hX4oq","CY3vyJaNf6W","EiLyTuq4scX","EuUKjIDMM0P","Ey1YlLrd7Af","F2nDb4NrT92","FNw4WR8TtXf","FOjzi9EiXSG","FUq7rJzILDv","FXJWZu6EODG","FiN0IFt38pU","FqsJwY3CFxf","FyU2MbLOagE","GUGf0kuEbsp","GnP3DcGfgYB","H2Cts9nj0ZT","HDBE5InlVoM","HI2r2WAQbUb","HRyFFzFYbpU","Kh7MceGXTD8","LGohef05ArE","LJKjlcWLWie","LM0C9mlYuPv","N2TAxyxVN5t","N6RBS3eqBFG","NQbFanVKUkM","OS4eHDVyS88","OxyVwY8mUk4","PasreM5oKUD","PzDdUvzbp91","RfbI7C5Y6MJ","TAy1tr4M0bh","TCfHVxmPhAg","TwGPru1SDIR","UI4UPp3RwRC","UXVjjosHHF4","Vd5BCTBa0Ja","WqcYQ5Zy5j3","XAMJzFENFsz","XM8KRpHh6eh","XP1pxGcNYab","XzzSEvKI1h2","Y29yPdiKC9M","Y3GdybZeTWe","YS26xPCglOl","Yn5Sh6fVavn","Z1TQ7fCQuBa","Z4b68d4MRfV","ZFG8AQ1Ei3T","ZZSgTrDAJFb","ZyToNP6ajGV","aMzEPTsvAnZ","asT96jov8O6","bAomCGWKwn8","dCP3my8VGkQ","dNwVa5kfcYo","djj5JVTJe6j","dquqkbYuEIU","e9DfI1jwFEU","eir9Y8iDfl3","f5WJ9PqzCxB","fEiwOdoknTD","gOsOs6GdFvo","gfPGZ8SzV46","h6Cw3W81Se3","huQQckHQgQN","iWyKKjMDXfN","idiBtBJ34bf","jKQtb4HlhQa","k01sVSCp7TX","lZAc7xAMjF7","m7huxx00BkM","mKlJVqqVhAt","nXaZJllej8p","nbQ8DvNbjqT","oaaFqX6qoBP","olp59jb2nx2","p0re1SvE1dM","p39GBDVIxVy","qK3TIjnpweS","qQK37kyz0ZT","qYbuEyxupJm","rAjzGhP0bOy","rFLfIGN6ucJ","rSq1BzLodJY","raYou9eC7Pb","rhIXvCoFsQG","rmfgIq37jWu","sUTKX8GSKEd","t3uythnsZCx","tbqkulyq6PN","twb9SGGIZdQ","uK9Knju05AS","uRul6GSnNOD","uoOfmoln3F4","vQjLdGmMKXa","wyjNle82LzV","x846eQGTqog","BUbhcpbheCd","CNEzegbqdkq","CscwbiQUsVg","D4WpT6936w8","G9vfUGmvePu","GE2jWGJ622Z","IS9scW2Z6Ca","InSMebzY0vE","Jx9mxS9spO9","K6E84iuvzbt","KeTmrSwI3aD","OhHqXcfDOrN","QWDWZTxp4TE","QlWvMw2Ue0J","TSFLy2LqZrN","TymAfO3SL1L","VtB4S4yPwlp","X2aGRTR3FZI","Zovh524fvbh","akjcjvT6tn2","eRKNgpzze5a","hGCG0gW2o5q","hQi4PW7CFhS","lCoWAwGHnxT","mUEQj06gFQZ","nIZJ02boeay","qRnIqBvD9Qg","rLJdxMbgFai","vticWpcqmGG","wXnO6lH7jN8","xCFlESciiAD","xycedNCvkIU","y06pWNUdXJm"

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
                            `http://103.124.60.92/baocao/api/events/${idEvent}`
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