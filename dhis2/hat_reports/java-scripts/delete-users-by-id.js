const _axios=require('axios');
let i = 0;
(async (running = true) => {
    if (!running) return;
    [
        // "CH10"
        "A37eAHnKijL","A50SJi9TipQ","A6eFcZP5tp6","ANVLgZ499Wb","ATibrRNF1NA","Ad5Q09i2C2b","AfSXudNqCQ0","AhZrXG8kxmj","AmiViwq9kMZ","AnzHzfrCSUl","Ao6CXPFU7y9","AutA5Dn4MTD","BWp2u32SxXG","BcolWABLS7W","Be48KWU0VFX","Bhbpf7ATkAL","Bo4BEfphnrF","C4VleBMtIkh","C5B3JROwTSD","C5xER8eN1Zz","CFWqRItrlq2","CMzquTdJRV5","CPQ2FqSHjuL","CSRLHVc6H9c","CT4fBu2EVFz","Cbc9F038Y6l","CcQ3DX9XQhR","CfWvP28Wi7X","Ch6dMHKwiNi","Chxm8k9usR0","CsSUai2Wcpr","CyGAxZjTnI8","D0iOqsFk38s","DNoybi9o1Y0","DiGjZ6egYyn","DspeEWsp0cY","EOyv9SfMTCv","ESYX9u2ap6k","EVCFjhQgWH7","EXZeTOrFd9x","EpTLxXWPiIY","Es5VQKLBFF2","EsiuABAGwcg","Etoi241YtkX","Eze75ZVqBQb","F4HUlfTieey","F4WuEsJxQxC","F8qUZIWlGOY","FBSQeRmgJeI","FJESneDgUbI","FRuMtJCpxEu","FTIewaTQvwi","FbksUUdJA6z","FesfRA0qdZC","Fr9oYsv9Fnh","FxHbTbDMqHn","G5hiMeyDKzA","GLSxlX1hegw","GXBJukbvJeb","GqRjvdHljFn","Gr0wdGVavr2","Gx8ANIxGrG6","H3sxCL95CHJ","HLRHP8cGiVf","HOegHPtKSWv","HXUwVRGEY99","HbEcQXWjlzN","HcLvwGfl7Ty","HgHG7Z2hyPu","HhfDaWAq1Xt","HiH7mSqrr7I","HlCSiExa6p2","HlJTGgh8jFl","Hpx0zIbdCdV","IT4OipGvnjo","IVwo9gTCnj1","Ibmrl6OgR0j","IyOT54dlbhv","J34KRK2Mi8T","J6B4YSnSkD2","JO9rBOtF6bN","Jf6uexWedCV","KBQqpxphfTe","KIQtXgRkuF2","KNonVT9MVim","KROaA9smr5D","KhyCVzhZBET","KxLk56a8u9i","KyUWlulNFoB","L2NN5bwvaoy","LJqYlz0fg0Q","LO2hOy1ANrQ","LhSpmNqLxF9","LlHbbFdxI7Z","Lx9LOmBxJhu","M9xpYW9Rxmy","MNBwAKbdGia","MWeYkoCLvN4","MZfdDc30GrR","Mj0X6ugRgkK","MtHxMhEs4Us","N5VEGZOzw8z"
        
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