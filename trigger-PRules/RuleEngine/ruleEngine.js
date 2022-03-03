const {
  convertBuildInVariables,
  convertVariables
} = require("./ruleEngineVariable");
const {
  convertBuildInFuctions,
  daysBetween, yearsBetween, monthsBetween, weeksBetween,
  right, floor, hasValue
} = require("./ruleEngineFunction");
const functionNames = [
  "daysBetween",
  "yearsBetween",
  "monthsBetween",
  "weeksBetween",
  "right", "floor", "hasValue"
];
const functions = [daysBetween, yearsBetween, monthsBetween, weeksBetween, right, floor, hasValue];

const checkValue = (de, value, compulsory, t) => {
  if (!value && compulsory) {
    return { status: false, message: t("thisFieldIsRequired") };
  }
  if (!value) return true;
  switch (de.valueType) {
    case "INTEGER":
      if (isNaN(value) || value > 999999999 || value < -999999999) {
        return { status: false, message: t("valueMustBeInteger") };
      }
      break;
    case "NUMBER":
      if (
        isNaN(value) ||
        value > 99999999999999999999 ||
        value < -99999999999999999999
      ) {
        return { status: false, message: t("valueMustBeNumber") };
      }
      break;
    case "PERCENTAGE":
      if (isNaN(value) || value > 100 || value < 0) {
        return {
          status: false,
          message: t("valueMustBeBetween0And100")
        };
      }
      break;
    case "INTEGER_POSITIVE":
      if (isNaN(value) || value > 999999999 || value < 1) {
        return {
          status: false,
          message: t("valueMustBePositiveInteger")
        };
      }
      break;
    case "INTEGER_NEGATIVE":
      if (isNaN(value) || value > -1 || value < -999999999) {
        return {
          status: false,
          message: t("valueMustBeNegativeInteger")
        };
      }
      break;
    case "INTEGER_ZERO_OR_POSITIVE ":
      if (isNaN(value) || value > 999999999 || value < 0) {
        return {
          status: false,
          message: t("valueMustBeZeroOrPositiveInteger")
        };
      }
      break;
    case "PHONE_NUMBER ":
      if (isNaN(value)) {
        return { status: false, message: t("valueMustBePhoneNumber") };
      }
      break;
    case "EMAIL":
      // eslint-disable-next-line
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase())) {
        return { status: false, message: t("valueMustBeEmail") };
      }
      break;
    case "COORDINATES":
    case "UNIT_INTERVAL":
    case "FILE_RESOURCE":
    case "LETTER":
    case "IMAGE":
    case "URL":
    case "USERNAME":
      return {
        status: false,
        message: t("unsupportedValueType") + " " + de.valueType
      };
    default:
      return true;
  }
  return true;
};

const generateAction = (result, currentEvent, action, actions) => {
  /*
      "DISPLAYTEXT",
      "DISPLAYKEYVALUEPAIR",
      "HIDEFIELD",
      "HIDESECTION",
      "HIDEPROGRAMSTAGE",
      "ASSIGN",
      "SHOWWARNING",
      "WARNINGONCOMPLETE",
      "SHOWERROR",
      "ERRORONCOMPLETE",
      "CREATEEVENT",
      "SETMANDATORYFIELD",
      "SENDMESSAGE",
      "SCHEDULEMESSAGE",
      "HIDEOPTION",
      "SHOWOPTIONGROUP",
      "HIDEOPTIONGROUP"
    */
  if (result === true) {
    switch (action.programRuleActionType) {
      case "HIDEFIELD":
        actions.push({
          type: "HIDEFIELD",
          target: action.dataElement
        });
        actions.push({
          type: "ASSIGN",
          target: action.dataElement,
          value: ""
        });
        break;
      case "ASSIGN":
        actions.push({
          type: "ASSIGN",
          target: action.dataElement,
          value: evaluate(currentEvent, action.data)
        });
        break;
      case "SHOWERROR":
        actions.push({
          type: "SHOWERROR",
          target: action.dataElement,
          content: action.content
        });
        break;
      case "SHOWWARNING":
        actions.push({
          type: "SHOWWARNING",
          target: action.dataElement,
          value: action.content
        });
        break;
      case "HIDEOPTION":
        actions.push({
          type: "HIDEOPTION",
          target: action.dataElement,
          optionCode: action.option.code
        });
        break;
      case "HIDEOPTIONGROUP":
        actions.push({
          type: "HIDEOPTIONGROUP",
          target: action.dataElement,
          optionCodes: action.optionGroup.options.map((option) => option.code)
        });
        break;
      default:
        break;
    }
  }
};

const runProgramRules = (currentEvent, programRules) => {
  let actions = [];

  programRules.forEach((pr) => {
    // console.log("pr", pr);
    const result = evaluate(currentEvent, pr.condition);
    // console.log("result", result);
    pr.programRuleActions.forEach((action) => {
      generateAction(result, currentEvent, action, actions);
    });
  });
  return actions;
};

const convertExpression = (expression, programRulesVariables) => {
  //CONVERT NORMAL programRulesVariables
  expression = convertVariables(expression, programRulesVariables);

  //CONVERT BUILT-IN VARIABLES
  expression = convertBuildInVariables(expression);

  //CONVERT BUILT-IN FUNCTIONS
  expression = convertBuildInFuctions(expression);
  return expression;
};

const evaluate = (currentEvent, expression) => {
  // eslint-disable-next-line no-unused-vars
  let dataValues = [...currentEvent.dataValues];
  dataValues = dataValues.reduce((previousValue, currentValue, index) => {
    previousValue[currentValue.dataElement] = currentValue.value;
    return previousValue;
  }, {});
  let valid = true;
  try {
    // console.log(`Evaluating: ${expression}`);
    eval(expression);
  } catch (err) {
    // console.log("err");
    if (err instanceof SyntaxError) {
      // console.error(err);
      valid = false;
    }
  } finally {
    if (valid) {
      // console.log(`Evaluating: ${expression}`);

      const evaluationFunction = new Function(
        ["currentEvent", "dataValues", ...functionNames],
        `
         const result = ${expression};
         return result;
        `
      );
      return evaluationFunction(currentEvent, dataValues, ...functions);
    } else {
      return false;
    }
  }
};

const initProgramRules = (programRules, programRuleVariables) => {
  const convertedProgramRules = programRules.map((pr) => {
    pr.condition = convertExpression(pr.condition, programRuleVariables);
    pr.programRuleActions.forEach((action, index) => {
      if (action.programRuleActionType === "ASSIGN") {
        action.data = convertExpression(action.data, programRuleVariables);
        pr.programRuleActions[index] = action;
      }
    });
    return pr;
  });
  return convertedProgramRules;
};

module.exports = { checkValue, runProgramRules, initProgramRules };
