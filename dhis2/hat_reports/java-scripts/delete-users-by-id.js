const _axios=require('axios');
let i = 0;
(async (running = true) => {
    if (!running) return;
    const orgUnits = [
        // "CH10"
        "TBmmfdraxRW"
        
    ] 
    for (const idEvent of orgUnits) {
        try {
            await _axios({
                url: `http://daotao.tkyt.vn/api/users/${idEvent}`,
                method: "delete",
                auth: {
                    username: 'anhth',
                    password: 'Csdl2018@)!*'
                }
            });
            i++;
            console.log(`Deleted ${idEvent}. Count: ${i}`);
        } catch (err) {
            console.error(`Error deleting ${idEvent}:`, err);
        }
    }
})()