const axios = require('axios');
const fs = require('fs');

const authentication = {
    username: 'anhth',
    password: 'Csdl2018@)!*'
};

async function main() {
    const url1 = 'https://baocao.tkyt.vn'; 
    const url2 = 'https://kln.tkyt.vn'; 
    const orgId = 'eyKD8PvVOO4'; // Đắk Nông

    
    let urlApi1 = `${url1}/api/organisationUnits.json?fields=:owner&paging=false&filter=path:ilike:${orgId}`;
    let res1 = await axios.get(urlApi1, { auth: authentication });
    let orgSrc = res1.data.organisationUnits;

    
    let urlApi2 = `${url2}/api/organisationUnits.json?fields=:owner&paging=false&filter=path:ilike:${orgId}`;
    let res2 = await axios.get(urlApi2, { auth: authentication });
    let orgDes = res2.data;

    
    const attributeId = 'Os56slbI9so';
    orgSrc.forEach(srcUnit => {
        let attributeValue = srcUnit.attributeValues.find(attr => attr.attribute.id === attributeId);
        if (attributeValue) {
            let destUnit = orgDes.organisationUnits.find(destUnit => destUnit.id === srcUnit.id);
            if (destUnit) {
                let destAttribute = destUnit.attributeValues.find(attr => attr.attribute.id === attributeId);
                if (destAttribute) {
                    
                    destAttribute.value = attributeValue.value;
                } else {
           
                    destUnit.attributeValues.push({
                        value: attributeValue.value,
                        attribute: {
                            id: attributeId
                        }
                    });
                }
            }
        }
    });

   
    fs.writeFileSync('updatedOrgDes.json', JSON.stringify(orgDes, null, 2), 'utf8');

    console.log('Lưu file thành công updatedOrgDes.json');
}

main().catch(error => console.error(error));