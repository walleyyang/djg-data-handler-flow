import mongoose, { Schema } from 'mongoose';

import { FlowModel } from 'database/FlowModel';

const FlowSchema: Schema = new Schema({
  symbol: String,
  summary: {
    trend: String,
    topBullishStrike: String,
    topBearishStrike: String,
    totalFlow: Number,
    totalBullishFlow: Number,
    totalBearishFlow: Number,
  },
  trend: [Number],
  topStrikes: [{ strike: Number, estimatedValue: Number }],
  flows: [
    {
      messageType: String,
      time: String,
      symbol: String,
      expiration: String,
      strike: Number,
      position: String,
      stockPrice: Number,
      details: String,
      type: String,
      value: String,
      estimatedValue: Number,
      goldenSweep: Boolean,
      sentiment: String,
    },
  ],
});

export default mongoose.model<FlowModel>('Flow', FlowSchema);
