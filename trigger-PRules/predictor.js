const { pull, push, pushDataValue } = require("./utils");
const { performance } = require("perf_hooks");
const _ = require("lodash");
const fs = require("fs");
var util = require("util");

let errorLogs = [];
let runningLogs = [];

const LIMIT = 10;
const YEAR = 2019;
const CONTINUE_AT = 10;

const dataFilter = (data) => {
  switch (data) {
    case "0.0":
      return " ";
    default:
      return data;
  }
};

var error_file = fs.createWriteStream(__dirname + "/error2.log", {
  flags: "w",
});
var log_file = fs.createWriteStream(__dirname + "/log2.log", {
  flags: "w",
});

console.debug = function (d) {
  log_file.write(util.format(d) + "\n");
};

console.error = function (d, type) {
  switch (type) {
    default: {
      error_file.write(util.format(d) + "\n");
    }
  }
  //   log_stdout.write(util.format(d) + "\n");
};

const programRules = [
  {
    id: "kJ6mVgn8eBW",
    displayName: "THA_HATT Làm tròn Assign 0",
  },
  {
    id: "eaXlyjnzKuK",
    displayName: "THA_HATT Làm tròn Assign 1",
  },
  {
    id: "GrKmYFYN6e7",
    displayName: "THA_Đạt mục tiêu điều trị chuẩn cũ_Assign value 0",
  },
  {
    id: "RlhjCs3xG1c",
    displayName: "THA_Đạt mục tiêu điều trị chuẩn cũ_Assign value 1",
  },
];

const convertToAggregate = async (ous, pe, mapping) => {
  let dataSetPayload = {
    dataValues: [],
  };

  let dataURL = [
    `/api/29/analytics.json?dimension=pe:${pe}&dimension=ou:${ous.join(";")}`,
    `dimension=dx:` +
      Object.keys(mapping)
        .map((e) => e)
        .join(";"),
  ].join("&");
  let data = await pull(dataURL);
  let dataGroupByOrg = _.groupBy(data.rows, 2);
  //   console.log("dataGroupByOrg",JSON.stringify(dataGroupByOrg))

  Object.keys(dataGroupByOrg).forEach((ou) => {
    Object.entries(mapping).forEach(([key, obj]) => {
      let val = dataGroupByOrg[ou].find((r) => r[0] == key);
      let falsyValues = [0.0, "0.0", "", " "];
      if (val) {
        if (!falsyValues.includes(val[3])) {
          dataSetPayload.dataValues.push({
            dataElement: obj.output,
            period: pe,
            orgUnit: ou,
            categoryOptionCombo: obj.outputCombo,
            value: dataFilter(val[3]),
          });
        } else {
          errorLogs.push(
            `${key}|${obj.output}|${pe}|${ou}|${obj.outputCombo}|${val[3]}`
          );
        }
      } else {
        errorLogs.push(
          `${key}|${obj.output}|${pe}|${ou}|${obj.outputCombo}|${"noVal"}`
        );
      }
    });
  });

  console.error(errorLogs.join("\n"));
  return dataSetPayload;
};

(async () => {
  try {
    let programOrgs = await pull(
      "/api/programs/xvzrp56zKvI.json?fields=organisationUnits[id,name]"
    );

    let predictors = await pull(
      "/api/predictors.json?paging=false&fields=*,organisationUnitLevels[id,name]"
    );

    let mappingPIandDE = predictors.predictors.reduce((res, e) => {
      let PIKey = e.generator.expression.match(/{(.*?)}/g)[0];
      res[PIKey.replace(/{/g, "").replace(/}/g, "")] = {
        output: e.output.id,
        outputCombo: e.outputCombo.id,
      };
      return res;
    }, {});

    let chunkedOrg = _.chunk(
      programOrgs.organisationUnits.map((e) => e.id),
      LIMIT
    );

    for (let index in chunkedOrg) {
      if (index < CONTINUE_AT) continue;
      var t0 = performance.now();

      let dataSetPayload = await convertToAggregate(
        chunkedOrg[index],
        YEAR,
        mappingPIandDE
      );

      //   PUSH to dataSet
      let result = await pushDataValue(dataSetPayload);
      result = {
        batchIndex: index,
        status: result.status,
        ...result.importCount,
        orgUnits: chunkedOrg[index],
      };
      console.debug(JSON.stringify(result));

      var t1 = performance.now();
      console.log(
        `Running:${chunkedOrg[index].length * index + LIMIT}/${
          programOrgs.organisationUnits.length
        } - ${t1 - t0 + " milliseconds."}`
      );
      //   if (index == 9) break;
    }
  } catch (error) {
    // console.error("error 1");
    console.log(error);
  }

  //   console.log(JSON.stringify(mappingPIandDE));
})();

// https://dhis2.asia/laomembers/api/analytics?dimension=pe:2019&dimension=ou:W6sNfkJcXGC&dimension=dx:qgHETLc7Nsx;L0EgY4EomHv.U4fdHCMef6x

// api/analytics/events/query/xvzrp56zKvI?dimension=pe:2019&dimension=ou:W6sNfkJcXGC&dimension=qgHETLc7Nsx
