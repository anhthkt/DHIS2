const moment = require("moment");

const daysBetween = (startDate, endDate) => {
  startDate = moment(startDate);
  endDate = moment(endDate);
  return startDate.diff(endDate, "days");
};
const yearsBetween = (startDate, endDate) => {
  startDate = moment(startDate);
  endDate = moment(endDate);
  return startDate.diff(endDate, "years");
};
const monthsBetween = (startDate, endDate) => {
  startDate = moment(startDate);
  endDate = moment(endDate);
  return startDate.diff(endDate, "months");
};
const weeksBetween = (startDate, endDate) => {
  startDate = moment(startDate);
  endDate = moment(endDate);
  return startDate.diff(endDate, "weeks");
};

const right = (param0, param1) => {
  const string = String(param0);
  const numChars = string.length < param1 ? string.length : param1;
  const returnString = string.substring(string.length - numChars, string.length);
  return returnString;
};

const floor = (param) => Math.floor(param);
const hasValue = (param) => Boolean(param);

const functions = {
  "d2:daysBetween": "daysBetween",
  "d2:yearsBetween": "yearsBetween",
  "d2:monthsBetween": "monthsBetween",
  "d2:weeksBetween": "weeksBetween",
  "d2:right": "right",
  "d2:floor": "floor",
  "d2:hasValue": "hasValue"
};

const convertBuildInFuctions = (condition) => {
  Object.keys(functions).forEach((key) => {
    const regex = new RegExp(key, "gi");
    condition = condition.replace(regex, functions[key]);
  });
  return condition;
};

module.exports = {
  convertBuildInFuctions,
  daysBetween,
  yearsBetween,
  monthsBetween,
  weeksBetween,
  right, floor, hasValue
};
