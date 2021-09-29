const { Schema } = require("mongoose");

const mongoose = require("./connection");

const {
  Types: { Mixed },
} = Schema;

const schema = new Schema(
  {
    loyaltyId: String,
    // idBinding: Array,
    clients: Array,
    uuid: String,
    consumerId: String,
    deviceId: String,
    joined: Date,
    lastAppUsed: Date,
    status: String,
    locale: String,
    programcode: String,
    janrain: { type: Mixed, default: {} },
    registrationSettings: Array,
    acceptanceDate: String,
    testUser: Boolean,
    webUser: Boolean,
    migrated: Boolean,
  },
  {
    collection: "users",
    shardKey: {
      uuid: 1,
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("User", schema);
