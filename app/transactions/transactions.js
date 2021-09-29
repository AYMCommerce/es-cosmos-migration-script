const { ENVIRONMENT, MODE } = process.env;

const { TransactionsT1 } = require("../t1-models");

const { TransactionsT2 } = require("../t2-models");

const path = `../records/${ENVIRONMENT}/transactions`;

const { downloadRecords, migrateRecords } = require("../lib");

async function start() {
  if (MODE === "download") {
    downloadRecords(path, TransactionsT1);
  } else if (MODE === "migrate") {
    await migrateRecords(path, TransactionsT2);
  }
}

module.exports = start;
