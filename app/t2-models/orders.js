const { Schema, Types } = require("mongoose");

const mongoose = require("./connection");

const {
  Types: { Mixed },
} = Schema;

const objectId = Types.ObjectId;

const schema = new Schema(
  {
    device: {
      default: {},
      type: Mixed,
    },
    // locale: String,
    programcode: String,
    userId: String,
    reward: {
      default: {},
      type: Mixed,
    },
    success: Boolean,
    error: Boolean,
    failed: Boolean,
    transactionId: Mixed,
    migrated: Boolean,
  },
  {
    shardKey: {
      userId: 1,
    },
    collection: "orders",
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", schema);
