const axios = require('axios');
const Excel = require('exceljs');

const urlBase = `https://dhis2pacific.org/tihe/`;
const authentication = {
  username: `admin`,
  password: `district`
}

// ID DataSets, Events, Programs
const arrDataSets = ["ol9AXnUovEw","AVI3YEg7VV9"];
const arrEvents = [];
const arrTrackers = [];

async function getMetaData(arrDataSets, arrEvents, arrTrackers) {

  const workbook = new Excel.Workbook();

  const wsDataSets = workbook.addWorksheet('DataSets');
  const wsEvents = workbook.addWorksheet('Events');
  const wsTrackers = workbook.addWorksheet('Trackers');
  const wsOptionSets = workbook.addWorksheet('OptionSets');
  const wsCatagoryOptions = workbook.addWorksheet('CatagoryOptions');
  
  wsDataSets.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Tên', key: 'name', width: 32 },
    { header: 'Loại giá trị', key: 'valueType', width: 20 },
    { header: 'Tập tùy chọn', key: 'optionSet', width: 20 },
    { header: 'Tùy chọn phân loại', key: 'categoryCombo', width: 20 }
  ];

  wsEvents.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Tên', key: 'name', width: 32 },
    { header: 'Loại giá trị', key: 'valueType', width: 20 },
    { header: 'Tập tùy chọn', key: 'optionSet', width: 20 },
    { header: 'Tùy chọn phân loại', key: 'categoryCombo', width: 20 }
  ];

  wsTrackers.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Tên', key: 'name', width: 32 },
    { header: 'Loại giá trị', key: 'valueType', width: 20 },
    { header: 'Tập tùy chọn', key: 'optionSet', width: 20 },
    { header: 'Tùy chọn phân loại', key: 'categoryCombo', width: 20 }
  ];

  wsOptionSets.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Tên', key: 'name', width: 32 },
    { header: 'Loại giá trị', key: 'valueType', width: 20 },
    { header: 'Tập tùy chọn', key: 'optionSet', width: 20 },
    { header: 'Tùy chọn phân loại', key: 'categoryCombo', width: 20 }
  ];

  wsCatagoryOptions.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Tên', key: 'name', width: 32 },
    { header: 'Loại giá trị', key: 'valueType', width: 20 },
    { header: 'Tập tùy chọn', key: 'optionSet', width: 20 },
    { header: 'Tùy chọn phân loại', key: 'categoryCombo', width: 20 }
  ];


  for (let i = 0; i < arrDataSets.length; i++) {
    let id = arrDataSets[i];
    let url = urlBase + `api/29/dataSets.json?filter=id:eq:${id}&fields=id,name,dataSetElements[dataElement[id,name,displayName,valueType,optionSet[id,name],categoryCombo[id,name]]]&paging=false`;

    let response = await axios.get(url, { auth: authentication });
    let dataSetElements = response.data.dataSets[0].dataSetElements;

    wsDataSets.addRow({
      id: response.data.dataSets[0].id,
      name: response.data.dataSets[0].name
    });

    dataSetElements.forEach((element, index) => {
      
      let optionSetName = '';
      if (element.dataElement.optionSet) {
        optionSetName = element.dataElement.optionSet.name;
        wsOptionSets.addRow({
          id: element.dataElement.optionSet.id,
          name: optionSetName
        });
      }

      let categoryComboName = '';
      if (element.dataElement.categoryCombo) {
        categoryComboName = element.dataElement.categoryCombo.name;
        wsCatagoryOptions.addRow({
          id: element.dataElement.categoryCombo.id,
          name: categoryComboName
        });
      }
      
      wsDataSets.addRow({
        stt: index + 1,
        id: element.dataElement.id,
        name: element.dataElement.displayName,
        valueType: element.dataElement.valueType,
        optionSet: optionSetName,
        categoryCombo: categoryComboName
      });
    });
  }

  for (let i = 0; i < arrEvents.length; i++) {
    let id = arrEvents[i];
    let url = urlBase + `api/programs.json?filter=id:eq:${id}&fields=id,name,programStages[programStageDataElements[dataElement[id,name,displayName,valueType,categoryCombo[id,name],optionSet[id,name]]]]&paging=false`;

    let response = await axios.get(url, { auth: authentication });
    let dataSetElements = response.data.programs[0].programStages[0].programStageDataElements;

    wsEvents.addRow({
      id: response.data.programs[0].id,
      name: response.data.programs[0].name
    });

    dataSetElements.forEach((element, index) => {
      
      let optionSetName = '';
      if (element.dataElement.optionSet) {
        optionSetName = element.dataElement.optionSet.name;
        wsOptionSets.addRow({
          id: element.dataElement.optionSet.id,
          name: optionSetName
        });
      }

      let categoryComboName = '';
      if (element.dataElement.categoryCombo) {
        categoryComboName = element.dataElement.categoryCombo.name;
        wsCatagoryOptions.addRow({
          id: element.dataElement.categoryCombo.id,
          name: categoryComboName
        });
      }
      
      wsEvents.addRow({
        stt: index + 1,
        id: element.dataElement.id,
        name: element.dataElement.displayName,
        valueType: element.dataElement.valueType,
        optionSet: optionSetName,
        categoryCombo: categoryComboName
      });
    });
  }

  for (let i = 0; i < arrTrackers.length; i++) {
    let id = arrTrackers[i];
    let url = urlBase + `api/29/programs.json?filter=id:eq:${id}&fields=id,name,programTrackedEntityAttributes[trackedEntityAttribute[id,name,displayName,valueType,aggregationType,optionSet[id,name]]]&paging=false`;

    let response = await axios.get(url, { auth: authentication });
    let trackedEntityAttributes = response.data.programs[0].programTrackedEntityAttributes;

    wsTrackers.addRow({
      id: response.data.programs[0].id,
      name: response.data.programs[0].name
    });

    trackedEntityAttributes.forEach((attribute, index) => {
      
      let optionSetName = '';
      if (attribute.trackedEntityAttribute.optionSet) {
        optionSetName = attribute.trackedEntityAttribute.optionSet.name;
        wsOptionSets.addRow({
          id: attribute.trackedEntityAttribute.optionSet.id,
          name: optionSetName
        });
      }

      let categoryComboName = '';
      if (attribute.trackedEntityAttribute.categoryCombo) {
        categoryComboName = attribute.trackedEntityAttribute.categoryCombo.name;
        wsCatagoryOptions.addRow({
          id: attribute.trackedEntityAttribute.categoryCombo.id,
          name: categoryComboName
        });
      }
      
      wsTrackers.addRow({
        stt: index + 1,
        id: attribute.trackedEntityAttribute.id,
        name: attribute.trackedEntityAttribute.displayName,
        valueType: attribute.trackedEntityAttribute.valueType,
        optionSet: optionSetName,
        categoryCombo: categoryComboName
      });
    });
  }

  await workbook.xlsx.writeFile('output.xlsx');

}

getMetaData(arrDataSets, arrEvents, arrTrackers);