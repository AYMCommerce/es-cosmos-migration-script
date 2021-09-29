const { ENVIRONMENT, MODE } = process.env;

const { PersonalizedRewardsT1 } = require("../t1-models");

const { PersonalizedRewardsT2 } = require("../t2-models");

const path = `../records/${ENVIRONMENT}/personalized-rewards`;

const { downloadRecords, migrateRecords } = require("../lib");

function transform(personalizedReward) {
  delete personalizedReward._id;
  delete personalizedReward.locale;

  personalizedReward.programcode = "ES";

  personalizedReward.migrated = true;

  return personalizedReward;
}

async function start() {
  if (MODE === "download") {
    await downloadRecords(path, PersonalizedRewardsT1);
  } else if (MODE === "migrate") {
    await migrateRecords(path, PersonalizedRewardsT2, transform);
  }
}

module.exports = start;
