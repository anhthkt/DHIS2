const fs = require('fs');

// File path of the JSON file
const filePath = 'data.json';

// Source and destination lists
src = ["G0YNdUlxNuI","ebmis3sHmdn","scdQ3JZXVZf","ThmgypAOtFe","WHlDaK1XI4Q","qmho9XBhBNM","YRI4BfWJ7ur","u53tneEgn7N","XLpw0nIWuqj","CFwu1WXMp18","OpcnVp4Ye0P"];
des = ["O60A64VZTjM","UqF6vO9TBYN","s3VkPKNuiSE","s0fhED6Ssi4","P4QWrvQVbRQ","UgKQvyV3lei","oywCRpLYfCF","vwUir9AjFhz","mR0KVsmRFc7","Pbc7J1acNMk","xNulCihXVLl"];

// Create a mapping dictionary
const mapping = {};
src.forEach((key, index) => {
    mapping[key] = des[index];
});

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the JSON data
    let jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (err) {
        console.error('Error parsing JSON:', err);
        return;
    }

    // Replace orgUnit values
    jsonData.dataValues.forEach(item => {
        if (mapping[item.orgUnit]) {
            item.orgUnit = mapping[item.orgUnit];
        }
    });

    // Convert the updated JSON data back to string
    const updatedData = JSON.stringify(jsonData, null, 4);

    // Write the updated JSON data back to the file
    fs.writeFile(filePath, updatedData, 'utf8', err => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }
        console.log('File has been updated successfully.');
    });
});
