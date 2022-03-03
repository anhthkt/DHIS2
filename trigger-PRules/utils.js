const fetch = require("node-fetch");
const btoa = require("btoa");
const { baseUrl, username, password } = require("./config");

const sample = (d = [], fn = Math.random) => {
  if (d.length === 0) return;
  return d[Math.round(fn() * (d.length - 1))];
};

const generateUid = (limit = 11, fn = Math.random) => {
  const allowedLetters = [
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ].join("");
  const allowedChars = ["0123456789", allowedLetters].join("");

  const arr = [sample(allowedLetters, fn)];

  for (let i = 0; i < limit - 1; i++) {
    arr.push(sample(allowedChars, fn));
  }

  return arr.join("");
};
const convertToEventPayload = (headerIndexes, eventRow) => {
  // const eventDetails = ["event", "enrollment", "completedDate", "eventDate", "dueDate", "orgUnit", "status", "programStage", "program", "attributeOptionCombo"];
  let eventPayload = {};
  const eventDetailsHeaders = [
    "event",
    "enrollment",
    "created",
    "createdbyuserinfo",
    "lastUpdated",
    "lastUpdatedbyuserinfo",
    "storedBy",
    "completedBy",
    "completedDate",
    "eventDate",
    "dueDate",
    "orgUnit",
    "orgUnitName",
    "status",
    "programStage",
    "program",
    "attributeOptionCombo",
    "deleted",
    "geometry",
  ];
  const eventDetails = eventDetailsHeaders.reduce((obj, e) => {
    obj[e] = eventRow[headerIndexes[e]];
    return obj;
  }, {});
  const eventDataValuesHeader = Object.keys(headerIndexes).filter(
    (h) => !eventDetailsHeaders.includes(h)
  );
  const eventDataValues = eventDataValuesHeader.map((e) => {
    return { dataElement: e, value: eventRow[headerIndexes[e]] };
  });
  eventPayload = { ...eventDetails, dataValues: eventDataValues };
  return eventPayload;
};
const pull = (endPoint) => {
  return fetch(baseUrl + endPoint, {
    credentials: "include",
    headers: {
      Authorization: !username
        ? ""
        : "Basic " + btoa(`${username}:${password}`),
    },
  })
    .then((result) => result.json())
    .then((json) => json);
};

const push = (endPoint, payload, method) => {
  return fetch(baseUrl + endPoint, {
    method: method ? method : "POST",
    credentials: "include",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: !username
        ? ""
        : "Basic " + btoa(`${username}:${password}`),
    },
  })
    .then((result) => {
      return result.json();
    })
    .catch((err) => {
      return null;
    });
};

function getHeaderIndexes(payload) {
  return payload.headers.reduce((res, h) => {
    res[h.name] = payload.headers.map((e) => e.name).indexOf(h.name);
    return res;
  }, {});
}

const pushDataValue = async (data) => {
  return push("/api/dataValueSets", data, "POST");
};

const pushEvents = async (data) => {
  return push("/api/events?dryRun=false", data, "POST");
};

module.exports = {
  pull,
  push,
  getHeaderIndexes,
  pushDataValue,
  pushEvents,
};
