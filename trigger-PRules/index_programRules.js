const { pull, push, pushEvents, getHeaderIndexes } = require("./utils");
const { performance } = require("perf_hooks");
const _ = require("lodash");
const moment = require("moment");
const fs = require("fs");
var util = require("util");
const {
  initProgramRules,
  runProgramRules,
} = require("./RuleEngine/ruleEngine");
// const programRulesMetadata = require("./metadata/programRules.json")
// const programRuleVariables = require("./metadata/programRuleVariables.json")

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

let errorLogs = [];
let runningLogs = [];

const LIMIT = 300;
const YEAR = 2021;
const CONTINUE_AT = 0;

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

const processEachEventPage = async (page, programRules, startDate, endDate) => {
  let dataURL = [
    `/api/events.json?orgUnit=LOdti1gATwC&program=NAleauPZvIE&totalPages=true&ouMode=DESCENDANTS&fields=:all,!lastUpdatedByUserInfo,!createdByUserInfo,dataValues[dataElement,value]`,
    `page=${page}&pageSize=${LIMIT}`,
    `startDate=${startDate}&endDate=${endDate}`,
  ].join("&");

  let eventsPayload = {
    events: [],
  };
  let data = await pull(dataURL);
  // let filteredEvents = data.events.filter(e =>{})
  //[ { type: 'ASSIGN', target: { id: 'TdMpebGRK9i' }, value: 1 } ]
  //[ { type: 'ASSIGN', target: { id: 'p7yeofZbmFi' }, value: 0 } ]

  for (let idx = 0; idx < data.events.length; idx++) {
    let ev = data.events[idx];

    // filter
    if (ev.dataValues.length <= 1) continue;
    if (ev.dataValues.some((e) => e.dataElement == "p7yeofZbmFi")) continue;
    if (!ev.dataValues.some((e) => e.dataElement == "iedBhc5hNku")) continue;
    if (!ev.dataValues.some((e) => e.dataElement == "vig6FKWLnu7")) continue;

    let actions = runProgramRules(ev, programRules);
    actions.forEach((ac) => {
      ev.dataValues.push({
        dataElement: ac.target.id,
        value: ac.value + "",
      });
    });
    eventsPayload.events.push(ev);
  }
  return eventsPayload;
};

(async () => {
  try {
    let rangeDate = 2;
    let startDate = moment().subtract(rangeDate, "days").format("YYYY-MM-DD");
    let endDate = moment().format("YYYY-MM-DD");

    let pageURL = [
      `/api/events.json?orgUnit=LOdti1gATwC&program=NAleauPZvIE&totalPages=true&ouMode=DESCENDANTS&fields=:all,!lastUpdatedByUserInfo,!createdByUserInfo,dataValues[dataElement,value]`,
      `page=${1}&pageSize=${LIMIT}`,
      `startDate=${startDate}&endDate=${endDate}`,
    ].join("&");

    let getPager = await pull(pageURL);
    let pager = getPager.pager;
    let programRuleVariables = await pull(
      "/api/programRuleVariables.json?fields=*&paging=false"
    );
    let prUIDs = [
      //   "kJ6mVgn8eBW", //THA_HATT Làm tròn Assign 0
      //   "eaXlyjnzKuK", //THA_HATT Làm tròn Assign 1
      "GrKmYFYN6e7", // THA_Đạt mục tiêu điều trị chuẩn cũ_Assign value 0
      "RlhjCs3xG1c", // THA_Đạt mục tiêu điều trị chuẩn cũ_Assign value 1
    ];

    let programRulesURL = [
      `/api/programRules.json?fields=id,displayName,condition,programRuleActions[*,optionGroup[options[code]],option[code]],program&paging=false&paging=false`,
      `filter=id:in:[${prUIDs.join(",")}]`,
    ].join("&");
    let programRulesMetadata = await pull(programRulesURL);

    let programRules = initProgramRules(
      programRulesMetadata.programRules,
      programRuleVariables.programRuleVariables
    );
    // let actions = runProgramRules(
    //     currentEvent,
    //     programRules
    // );
    // console.log("actions", actions);
    // let payloadEvents = await processEachEventPage(1, programRules)
    // console.log(JSON.stringify(payloadEvents));
    // return;

    for (let i = 1; i <= pager.pageCount; i++) {
      // if (i < CONTINUE_AT) continue;
      var t0 = performance.now();

      let payloadEvents = await processEachEventPage(
        i,
        programRules,
        startDate,
        endDate
      );

      if (payloadEvents.length <= 0) continue;
      //   PUSH to events
      let result = await pushEvents(payloadEvents);
      result = {
        // batchIndex: index,
        status: result.status,
        ...result.importCount,
        payloadEvents: payloadEvents.events.map((e) => e.event),
      };
      console.debug(JSON.stringify(result));

      var t1 = performance.now();
      console.log(
        `Running:${i}/${pager.pageCount} - ${t1 - t0 + " milliseconds."}`
      );
      if (result.status == "ERROR" && result.response) {
        let err = result.response.importSummaries.map((e) => {
          e.description, e.reference;
        });
        console.error(JSON.stringify(err));
      }
      //   if (index == 9) break;
    }
  } catch (error) {
    // console.error("error 1");
    console.log(error);
  }

  //   console.log(JSON.stringify(mappingPIandDE));
})();

// http://kln.tkyt.vn/api/programRules.json?fields=id,displayName,condition,programRuleActions[*,optionGroup[options[code]],option[code]],program&paging=false&filter=id:in:[GrKmYFYN6e7,RlhjCs3xG1c]&paging=false

// api/analytics/events/query/xvzrp56zKvI?dimension=pe:2019&dimension=ou:W6sNfkJcXGC&dimension=qgHETLc7Nsx
