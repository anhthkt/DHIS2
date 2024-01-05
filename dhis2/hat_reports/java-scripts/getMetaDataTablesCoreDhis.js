const axios = require('axios');
const Excel = require('exceljs');

const urlBase = `http://dev.tkyt.vn/nhanluc/`;
const authentication = {
  username: `anhth`,
  password: `Csdl2018@)!*`
}

const arrResouces = [
  // "dataElementGroups", "dataElements", "dataSets", "indicators", "indicatorGroups", "indicatorTypes", "organisationUnitGroupSets", "organisationUnitGroups", "organisationUnits", "users", "validationRules"
  "validationRules"
];

async function getMetaData() {

  const workbook = new Excel.Workbook();

  const ws_dataElementGroups = workbook.addWorksheet('dataElementGroups');
  const ws_dataElements = workbook.addWorksheet('dataElements');
  const ws_dataSets = workbook.addWorksheet('dataSets');
  const ws_indicators = workbook.addWorksheet('indicators');
  const ws_indicatorGroups = workbook.addWorksheet('indicatorGroups');
  const ws_indicatorTypes = workbook.addWorksheet('indicatorTypes');
  const ws_organisationUnitGroupSets = workbook.addWorksheet('organisationUnitGroupSets');
  const ws_organisationUnitGroups = workbook.addWorksheet('organisationUnitGroups');
  const ws_organisationUnits = workbook.addWorksheet('organisationUnits');
  const ws_users = workbook.addWorksheet('users');
  const ws_validationRules = workbook.addWorksheet('validationRules');
  const ws_Datavalue = workbook.addWorksheet('Datavalue');


  ws_dataElementGroups.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'uid', key: 'id', width: 20 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'created', key: 'created', width: 20 },
    { header: 'lastupdated', key: 'lastupdated', width: 20 }
  ];

  ws_dataElements.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'uid', key: 'id', width: 10 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'created', key: 'created', width: 20 },
    { header: 'lastupdated', key: 'lastupdated', width: 20 },
    { header: 'code', key: 'code', width: 20 },
    { header: 'valuetype', key: 'valuetype', width: 20 },
    { header: 'categorycomboid', key: 'categorycomboid', width: 20 },
    { header: 'aggregationtype', key: 'aggregationtype', width: 20 },
    { header: 'optionsetid', key: 'optionsetid', width: 20 }
  ];

  ws_dataSets.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'uid', key: 'id', width: 20 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'created', key: 'created', width: 20 },
    { header: 'lastupdated', key: 'lastupdated', width: 20 },
    { header: 'code', key: 'code', width: 20 }
  ];

  ws_indicators.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'uid', key: 'id', width: 20 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'created', key: 'created', width: 20 },
    { header: 'lastupdated', key: 'lastupdated', width: 20 },
    { header: 'indicatortypeid', key: 'indicatortypeid', width: 20 }
  ];

  ws_indicatorGroups.columns = [
    { header: 'STT', key: 'stt', width: 10 },
    { header: 'uid', key: 'id', width: 10 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'created', key: 'created', width: 20 },
    { header: 'lastupdated', key: 'lastupdated', width: 20 }
  ];

  ws_indicatorTypes.columns = [
    { header: 'STT', key: 'id', width: 10 },
    { header: 'uid', key: 'id', width: 10 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'created', key: 'created', width: 20 },
    { header: 'lastupdated', key: 'lastupdated', width: 20 }
  ];

  ws_organisationUnitGroupSets.columns = [
    { header: 'STT', key: 'id', width: 10 },
    { header: 'uid', key: 'id', width: 10 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'created', key: 'created', width: 20 },
    { header: 'lastupdated', key: 'lastupdated', width: 20 }
  ];

  ws_organisationUnitGroups.columns = [
    { header: 'STT', key: 'id', width: 10 },
    { header: 'uid', key: 'id', width: 10 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'created', key: 'created', width: 20 },
    { header: 'lastupdated', key: 'lastupdated', width: 20 }
  ];

  ws_organisationUnits.columns = [
    { header: 'STT', key: 'id', width: 10 },
    { header: 'uid', key: 'id', width: 10 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'created', key: 'created', width: 20 },
    { header: 'lastupdated', key: 'lastupdated', width: 20 },
    { header: 'parentid', key: 'parentid', width: 20 },
    { header: 'code', key: 'code', width: 20 },
    { header: 'path', key: 'path', width: 20 }
  ];

  ws_users.columns = [
    { header: 'STT', key: 'id', width: 10 },
    { header: 'uid', key: 'id', width: 10 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'created', key: 'created', width: 20 },
    { header: 'lastupdated', key: 'lastupdated', width: 20 },
    { header: 'username', key: 'username', width: 20 }
  ];

  ws_validationRules.columns = [
    { header: 'STT', key: 'id', width: 10 },
    { header: 'uid', key: 'id', width: 10 },
    { header: 'name', key: 'name', width: 20 },
    { header: 'created', key: 'created', width: 20 },
    { header: 'lastupdated', key: 'lastupdated', width: 20 },
    { header: 'leftexpressionid', key: 'leftexpressionid', width: 20 },
    { header: 'rightexpressionid', key: 'rightexpressionid', width: 20 },
    { header: 'operator', key: 'operator', width: 20 },
    { header: 'periodtypeid', key: 'periodtypeid', width: 20 }
  ];

  ws_Datavalue.columns = [
    { header: 'STT', key: 'id', width: 10 },
    { header: 'dataelementid', key: 'dataelementid', width: 10 },
    { header: 'periodid', key: 'periodid', width: 20 },
    { header: 'categoryoptioncomboid', key: 'categoryoptioncomboid', width: 20 },
    { header: 'attributeoptioncomboid', key: 'attributeoptioncomboid', width: 20 },
    { header: 'value', key: 'value', width: 20 },
    { header: 'created', key: 'created', width: 20 }
  ];

  for (var i = 0; i < arrResouces.length; i++) {
    let resource = arrResouces[i];
    let url = urlBase + `api/${resource}.json?fields=:owner&paging=false`;
    let response = await axios.get(url, { auth: authentication });
    let data = response.data[resource];
    data.forEach((element, index) => {
      
      let worksheet = workbook.getWorksheet(resource);
      let rowData = {
        stt: index + 1,
        id: element.id, 
        name: element.name,
        created: element.created,
        lastupdated: element.lastUpdated
      };

      if (element.code !== undefined) {
        rowData.code = element.code; 
      }
      if (element.valueType !== undefined) {
        rowData.valuetype = element.valueType; 
      }
      if (element.categoryCombo !== undefined) {
        rowData.categorycomboid = element.categoryCombo.id; 
      }
      if (element.aggregationType !== undefined) {
        rowData.aggregationtype = element.aggregationType; 
      }
      if (element.indicatorType !== undefined) {
        rowData.indicatortypeid = element.indicatorType.id; 
      }
      // if (element.indicatortypeid !== undefined) {
      //   rowData.indicatortypeid = element.indicatortypeid; 
      // }
      if (element.parent !== undefined) {
        rowData.parentid = element.parent.id; 
      }
      if (element.path !== undefined) {
        rowData.path = element.path; 
      }
      if (element.path !== undefined) {
        rowData.path = element.path; 
      }
      if (element.username !== undefined) {
        rowData.username = element.username; 
      }
      if (element.leftSide !== undefined) {
        rowData.leftexpressionid = element.leftSide.description; 
      }
      if (element.rightSide !== undefined) {
        rowData.rightexpressionid = element.rightSide.description; 
      }
      if (element.operator !== undefined) {
        rowData.operator = element.operator; 
      }
      if (element.periodType !== undefined) {
        rowData.periodtypeid = element.periodType; 
      }

      worksheet.addRow(rowData);
    });
  }

  await workbook.xlsx.writeFile('output.xlsx');
}

getMetaData();