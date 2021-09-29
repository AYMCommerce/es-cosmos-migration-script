const { Schema } = require("mongoose");

const mongoose = require("./connection");

const schema = new Schema(
  {
    rewardId: String,
    userId: String,
    personalized: Boolean,
    programcode: String,
    migrated: Boolean,
  },
  {
    shardKey: {
      userId: 1,
    },
    collection: "personalized_rewards",
    timestamps: true,
  }
);

module.exports = mongoose.model("PersonalizedReward", schema);
