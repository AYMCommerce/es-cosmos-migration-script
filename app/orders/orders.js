const { ENVIRONMENT, MODE } = process.env;

const { OrdersT1 } = require("../t1-models");

const { OrdersT2 } = require("../t2-models");

const path = `../records/${ENVIRONMENT}/orders`;

const { downloadRecords, migrateRecords } = require("../lib");

function transformOrders(order) {
  delete order._id;
  delete order.locale;

  order.programcode = "ES";

  order.migrated = true;

  return order;
}

async function start() {
  if (MODE === "download") {
    await downloadRecords(path, OrdersT1);
  } else if (MODE === "migrate") {
    await migrateRecords(path, OrdersT2, transformOrders);
  }
}

module.exports = start;
