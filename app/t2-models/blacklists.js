const { Schema } = require("mongoose");

const mongoose = require("./connection");

const schema = new Schema(
  {
    ip: String,
    deviceId: String,
    status: String,
    functions: [String],
    createdBy: String,
    programcode: String,
    migrated: Boolean,
  },
  {
    shardKey: {
      status: 1,
    },
    collection: "blacklists",
    timestamps: true,
  }
);

/**
 * To check if the ip  address or device id is blacklisted
 * @param {object} param param will have func, ip, programcode and deviceId
 * @return {Promise<boolean>} is blacklisted
 */
schema.statics.isBlackListed = async function ({
  functionName,
  ip,
  programcode,
  deviceId = "none",
}) {
  // get count of active blacklisted IPs
  const isBlackListed = await this.findOne({
    programcode,
    $and: [
      {
        ip,
      },
      {
        deviceId,
      },
    ],
    functions: functionName,
    status: "active",
  });

  return Boolean(isBlackListed);
};

module.exports = mongoose.model("BlackList", schema);
