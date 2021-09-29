const { ENVIRONMENT, MODE } = process.env;

const { PersonalizedRewardsT1 } = require("../t1-models");

const { PersonalizedRewardsT2 } = require("../t2-models");

const path = `../records/${ENVIRONMENT}/personalized-rewards`;

const { downloadRecords, migrateRecords } = require("../lib");

async function start() {
  if (MODE === "download") {
    downloadRecords(path, PersonalizedRewardsT1);
  } else if (MODE === "migrate") {
    await migrateRecords(path, PersonalizedRewardsT2);
  }
}

module.exports = start;
