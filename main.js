const dotenv = require("dotenv");

dotenv.config({ path: "./.env_prod" });

const transactionsStart = require("./transactions/transactions");

const checkConnectivity = async () => {
  try {
    await transactionsStart();
  } catch (error) {
    console.log({ error });
    process.exit(1);
  }
};

checkConnectivity();
