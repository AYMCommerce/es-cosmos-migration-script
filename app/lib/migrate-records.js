const { readdir } = require("fs/promises");

function transformTransaction(transaction) {
  delete transaction._id;
  delete transaction.locale;
  delete transaction.id;

  transaction.programcode = "ES";

  transaction.migrated = true;

  return transaction;
}

async function migrateData(records, model2) {
  console.log("migration started");

  let insertRecords = [];

  for (const [i, record] of records.entries()) {
    console.log(i, record);

    const newRecord = transformTransaction(record);

    insertRecords.push(newRecord);

    if (insertRecords.length >= 1000 || i === records.length - 1) {
      const inserted = await model2.insertMany(insertRecords);

      console.log(i, inserted);

      insertRecords = [];
    }
  }
}

async function migrate(path, model2) {
  try {
    const dir = await readdir(path);

    if (dir && dir.length) {
      for (const file of dir) {
        const records = require(path + "/" + file);

        console.log(file, records.length);

        if (records.length > 0) {
          await migrateData(records, model2);
        }
      }
    }
  } catch (error) {
    console.log("migration error", { error });
    process.exit(1);
  }
}

module.exports = migrate;
