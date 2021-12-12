import { Document } from 'mongoose';

import { ModifiedFlow } from 'common/models';

interface Summary {
  trend: string;
  topBullishStrike: number;
  topBearishStrike: number;
  totalFlow: number;
  totalBullishFlow: number;
  totalBearishFlow: number;
}

interface Strike {
  strike: number;
  estimatedValue: number;
}

export interface FlowModel extends Document {
  symbol: string;
  summary: Summary;
  trend: number[];
  topStrikes: Strike[];
  flows: ModifiedFlow[];
}
