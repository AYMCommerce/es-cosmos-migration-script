const dotenv = require("dotenv");

dotenv.config({ path: "./.env_prod" });

const fs = require("fs");

const { TransactionsT1 } = require("./t1-models");

let chunckCount = 0;

class Main {
  initiate(model1, model2) {
    let data = await model1.findOne({});

    console.log("T1", data);

    data = await model2.findOne({});

    console.log("T2", data);

    this.run(model1, model2);
  }

  getRecords(model1) {
    return model1
      .find({
        locale: { $in: ["es-ES", "es-US"] },
      })
      .lean()
      .limit(10000)
      .cursor()
      .addCursorFlag("noCursorTimeout", true);
  }

  processRecords(model2, chunkData, count) {
    if (chunkData.length > 0) {
      const file = fs.createWriteStream(`./records/chunk=${count}.json`);

      file.write(JSON.stringify(chunkData));
      file.end();

      console.log("chunk done", count);
    } else {
      console.log("script done");
    }
  }

  async run(model1, model2) {
    const chunkData = [];

    const transactions = this.getRecords(model1);

    transactions.on("data", (data) => {
      chunkData.push(data);
    });

    transactions.on("error", (error) => {
      console.log({ error });
    });

    transactions.on("end", () => {
      this.processRecords(model2, chunkData, chunckCount);

      chunckCount += 1;
    });
  }
}

const main = new Main();
main.initiate(TransactionsT1, TransactionsT2);
