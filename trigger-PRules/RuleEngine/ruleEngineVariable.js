const moment = require("moment");

const variables = {
  "V{current_date}": `"${moment().format("YYYY-MM-DD")}"`,
  "V{event_date}": "currentEvent.eventDate",
  "V{orgunit_code}": "currentEvent.orgUnit"
};

const convertBuildInVariables = (condition) => {
  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(key, "gi");
    condition = condition.replace(regex, variables[key]);
  });
  return condition;
};

const convertVariables = (condition, programRuleVariables) => {
  programRuleVariables.forEach((prv) => {
    const regex = new RegExp(`#{${prv.name}}`, "gi");
    switch (prv.programRuleVariableSourceType) {
      case "DATAELEMENT_CURRENT_EVENT":
        condition = condition.replace(
          regex,
          `dataValues.${prv.dataElement.id}`
        );
        break;
      default:
        break;
    }
  });
  return condition;
};

module.exports = { convertBuildInVariables, convertVariables };
