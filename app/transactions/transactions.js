const { ENVIRONMENT, MODE } = process.env;

const { TransactionsT1 } = require("../t1-models");

const { TransactionsT2 } = require("../t2-models");

const path = `../records/${ENVIRONMENT}/transactions`;

const { downloadRecords, migrateRecords } = require("../lib");

function transformTransaction(transaction) {
  delete transaction._id;
  delete transaction.locale;
  delete transaction.id;

  transaction.programcode = "ES";

  transaction.migrated = true;

  return transaction;
}

async function start() {
  if (MODE === "download") {
    await downloadRecords(path, TransactionsT1);
  } else if (MODE === "migrate") {
    await migrateRecords(path, TransactionsT2, transformTransaction);
  }
}

module.exports = start;
