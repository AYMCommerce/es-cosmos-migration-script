const { ENVIRONMENT, MODE } = process.env;

const { UsersT1 } = require("../t1-models");

const { UsersT2 } = require("../t2-models");

const path = `../records/${ENVIRONMENT}/users`;

const { downloadRecords, migrateRecords } = require("../lib");

async function start() {
  if (MODE === "download") {
    downloadRecords(path, UsersT1);
  } else if (MODE === "migrate") {
    await migrateRecords(path, UsersT2);
  }
}

module.exports = start;
