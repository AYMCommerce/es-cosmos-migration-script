const { Schema, Types } = require("mongoose");

const mongoose = require("./connection");

const {
  Types: { String, Mixed },
} = Schema;

const objectId = Types.ObjectId;

const schema = new Schema(
  {
    code: String,
    programcode: String,
    method: String,
    product: String,
    userId: String,
    id: String,
    type: String,
    error: String,
    failed: Boolean,
    device: Mixed,
    success: Boolean,
    pinType: String,
    points: Object,
    transactionId: Mixed,
    analytics: Object,
    migrated: Boolean,
  },
  {
    shardKey: {
      userId: 1,
    },
    collection: "transactions-test",
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", schema);
