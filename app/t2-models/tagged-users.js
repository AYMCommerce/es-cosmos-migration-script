const { Schema, Types } = require("mongoose");

const mongoose = require("./connection");

const {
  Types: { Mixed },
} = Schema;

const objectId = Types.ObjectId;

const schema = new Schema(
  {
    tag: String,
    userId: String,
    type: String,
    createdAt: Date,
    migrated: Boolean,
  },
  {
    shardKey: {
      tag: 1,
    },
    collection: "tagged_users",
    timestamps: true,
  }
);

module.exports = mongoose.model("TaggedUsers", schema);
