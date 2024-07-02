const _axios=require('axios');
let i = 0;
(async (running = true) => {
    if (!running) return;
    const orgUnits = [
        // "CH10"
        "DqszZVi0zVN","DqtWbOWwzf4","DqyddAEkCdu","DrLacN6GJCZ","DrQKUA5InmA","DrvC7ajtC95","Ds7Fg2vHYKS","DsCX8UY4uhD","DsFK9uSrYCo","DspcNY2iAgK","DtnI1iF0ynW","Dul497CBu9x","DvD2oQilb6z","DvRSCCDw32P","DvRW9RkkGiZ","DwlWvKyfcBK","DxilahOqdk2","DyG1gAN5MI0","DyGIdngkl51","Dzflc9kvtHx","DzsMd7xbEdW","E0YMg4FL7zv","E1Reji01ZRU","E1XOTuesHH0","E22Je0VOSgL","E39Od2rEGDq","E4DOFrRdvqy","E4jJw29J97s","E5mgXr8IVQ5","E70upTlfbrb","E7WwSkLJGd7","E7mDjRmcDom","E7mibEPVNMi","EA1afRk2QpX","EBDTrtshPbS","EBOJY0STZWU","EBR8i21ZGkl","EBURMUEYMuj","EBmw5NbYYuk","EC9tZ2Bhgdh","ECM6fSqtgfI","EDUBTmqiX0I","EDyZMm9NV9P","EE9d81o7FIZ","EF26ujxyFqc","EG9nyseRM9F","EGfgqpjJP8E","EH2YYZVXPk5","EH7MzYi6J8A","EHIZe6Pc2u4","EHMXS22pqZY","EHXSEEFECAy","EI2MbX8gjOQ","EJ6gHxp6i7j","EJQ329sNU37","EKIQV0FbpXv","EKSu0aTIpjo","ELILYanOKUC","ELNFeBOIRvU","ELvQrleLAV9","EN54YGJUG7I","EN6LZMCRS9x","ENXuOyu3utQ","ENxpTUhhqFw","EOiSzL84emQ","EP4dyU2rZ6s","EPClpb5RQHb","EPX4AaI1Io0","EQLm2cpjgPu","ERLC95zs0aG","ES0IiNb3Ngk","ESuuHUJSRP1","ESzi8CV30tS","ETJjh9GOoAp","ETZP4d7YCCT","EUMOXWakBZJ","EWAblwbfs8D","EXW25diaXqv","EXWmdqUnkq9","EXzwKuHmx3F","EZC7tghTq3R","EbRZ4Xx2Agw","EcHIFpjf0Mm","Ed0ERko8I9N","EeokJOvRL04","EewolSQWKHh","Eeycl9Tbuas","EgyDe1bhBek","EhhL4qcow77","EiUYjj9eKYE","Eid28zOGb9v","EiskSH26QyF","EkAQEWx3kAi","EkIpaaIQ3qZ","ElDzIaIhSfA","ElWX7P6lGVf","EmPG1Jb4y3Q","EmScxwFt773","EmaFgtTHDv1","EmjubfRDGbt","EmmiFZ9ac48","EmoimJlp8nU","EmvLehIG6pS","EnxEjVHQGig","EoFNeYruXoD","EoS8JvlJNF5","Eqm6fg8tLw2","Er2hlim7Ctw","ErZ66tqbGTY","Et2WipZVepN","EtGquuxTAPR","EtivtERgfbc","EuTYsSqF8dX","Ev7PEdy96Aa","EvLeQDF00CY","ExOTwsckbCn","EydZh59gBQf","Eyo6rdII1Ip","EzGHcFXPOgO","F07vhgufViV","F0Dfs5XBuec","F19hIVp5Jjh","F1C2KCeaWxc","F1WBnnnKMLO","F31uXJm8OB7","F3Ct7tvlaQT","F3Ip1hAQNyT","F3pxCn3caYh","F4QbZR1Ajrm","F5prXT7qXcv","F6NLlqCQsy6","F6ivCruIsRE","F6wmY4eUmCU","F6yQS2ieroy","F87uTWpk67g","F8BYYtezkfd","F8EL8d9qKfg","F9E53BAEg4o","F9LWuS3CbWd","FBU6tRGSAzU","FBUI3CFoZ9t","FC0u1WAZwxZ","FCAJ6wRqmqV"
        
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