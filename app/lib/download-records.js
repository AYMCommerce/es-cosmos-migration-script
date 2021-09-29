let chunckCount = 0;

let limitDate = new Date("2021-09-29T06:30:00.000Z");

const fs = require("fs/promises");

function queryWithCursor(model) {
  return model
    .find({
      locale: { $in: ["es-ES", "es-US"] },
      createdAt: { $lt: limitDate },
      ...(_id && { _id: { $gt: ObjectId(_id) } }),
    })
    .sort({ _id: -1 })
    .limit(50000)
    .lean()
    .cursor()
    .addCursorFlag("noCursorTimeout", true);
}

function createChunk(path, chunkData, count) {
  const file = fs.createWriteStream(`${path}/chunk-${count}.json`);

  file.write(JSON.stringify(chunkData, null, 2));
  file.end();
  console.log("chunk done", count, chunkData.length);
}

async function run(path, model, _id = null) {
  if (chunckCount === 0) {
    await fs.mkdir(path);
  }

  const chunkData = [];

  const query = queryWithCursor(model);

  query.on("data", (data) => {
    chunkData.push(data);
  });

  query.on("error", (error) => {
    console.log("query error", { error });
  });

  query.on("end", () => {
    if (chunkData.length > 0) {
      createChunk(path, chunkData, count);

      chunckCount += 1;

      run(path, model, chunkData[chunkData.length - 1]._id);
    } else {
      console.log("script done");

      process.exit(0);
    }
  });
}

async function runWithoutCursor(path, model, _id = null) {
  const chunkData = await model
    .find({
      locale: { $in: ["es-ES", "es-US"] },
      createdAt: { $lt: limitDate },
      ...(_id && { _id: { $gt: ObjectId(_id) } }),
    })
    .sort({ _id: -1 })
    .limit(50000)
    .lean();

  if (chunkData.length > 0) {
    createChunk(path, chunkData, count);

    chunckCount += 1;

    runWithoutCursor(path, model, chunkData[chunkData.length - 1]._id);
  } else {
    console.log("script done");

    process.exit(0);
  }
}

module.exports = runWithoutCursor;
