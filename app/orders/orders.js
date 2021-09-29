const { ENVIRONMENT, MODE } = process.env;

const { OrdersT1 } = require("../t1-models");

const { OrdersT2 } = require("../t2-models");

const path = `../records/${ENVIRONMENT}/orders`;

const { downloadRecords, migrateRecords } = require("../lib");

async function start() {
  if (MODE === "download") {
    downloadRecords(path, OrdersT1);
  } else if (MODE === "migrate") {
    await migrateRecords(path, OrdersT2);
  }
}

module.exports = start;
