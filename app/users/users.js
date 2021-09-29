const { ENVIRONMENT, MODE } = process.env;

const { UsersT1 } = require("../t1-models");

const { UsersT2 } = require("../t2-models");

const path = `../records/${ENVIRONMENT}/users`;

const { downloadRecords, migrateRecords } = require("../lib");

function transformUsers(user) {
  delete user.acceptanceDate;
  delete user.showTcConsent;
  delete user.idfaConsent;
  delete user.dataConsent;
  delete user.dataConsentScreenViewed;
  delete user.emailOptInScreenViewed;
  delete user.isNewUser;
  delete user.phoneNumber2faCount;
  delete user.idBinding;
  delete user._id;

  user.programcode = "ES";
  user.migrated = true;
  user.acceptanceDate = "2020-02-01";

  const dateTime = new Date();
  user.registrationSettings = [
    {
      type: "email",
      date: dateTime,
      opt: "",
    },
    {
      type: "idfa",
      deviceId: user.deviceId || "",
      date: dateTime,
      opt: "",
    },
    {
      type: "push",
      deviceId: user.deviceId || "",
      date: dateTime,
      opt: "",
    },
    {
      type: "appData",
      date: dateTime,
      opt: "",
    },
    {
      type: "termsAndConditions",
      date: dateTime,
      opt: "true",
    },
  ];

  return user;
}

async function start() {
  if (MODE === "download") {
    await downloadRecords(path, UsersT1);
  } else if (MODE === "migrate") {
    await migrateRecords(path, UsersT2, transformUsers);
  }
}

module.exports = start;
