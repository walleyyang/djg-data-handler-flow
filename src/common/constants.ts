import 'dotenv/config';

const secondsInDay = 86400;
const millisecondsInSecond = 1000;
const sentimentPercentageThreshold = Number(process.env.DH_SENTIMENT_PERCENTAGE_THRESHOLD || 0);
const sentimentMaxDaysThreshold = Number(process.env.DH_SENTIMENT_MAX_DAYS_THRESHOLD || 0);
const sentimentMaxDaysThresholdAsMilliseconds = secondsInDay * millisecondsInSecond * sentimentMaxDaysThreshold;
const sentimentMaxDaysThresholdMaxDayMilliseconds = Date.now() + sentimentMaxDaysThresholdAsMilliseconds;
const minGoldenSweepValue = process.env.DH_MIN_GOLDEN_SWEEP_VALUE || 0;
const maxGoldenSweepDays = Number(process.env.DH_MAX_GOLDEN_SWEEP_DAYS || 0);
const maxGoldenSweepDayAsMilliseconds = secondsInDay * millisecondsInSecond * maxGoldenSweepDays;
const maxGoldenSweepDayMilliseconds = Date.now() + maxGoldenSweepDayAsMilliseconds;

export const flowConfig = {
  sentimentPercentageThreshold: sentimentPercentageThreshold,
  sentimentMaxDaysThresholdMaxDayMilliseconds: sentimentMaxDaysThresholdMaxDayMilliseconds,
  minGoldenSweepValue: minGoldenSweepValue,
  maxGoldenSweepDayMilliseconds: maxGoldenSweepDayMilliseconds,
};

export const dataHandlerPort = process.env.DH_PORT || '';
