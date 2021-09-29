let chunckCount = 0;

let limitDate = new Date("2021-09-29T06:30:00.000Z");

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

function run(path, model, _id = null) {
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
      const file = fs.createWriteStream(`${path}/chunk-${chunckCount}.json`);

      file.write(JSON.stringify(chunkData, null, 2));
      file.end();
      console.log("chunk done", chunckCount, chunkData.length);

      chunckCount += 1;

      run(model1, chunkData[chunkData.length - 1]._id);
    } else {
      console.log("script done");

      process.exit(0);
    }
  });
}

module.exports = run;
