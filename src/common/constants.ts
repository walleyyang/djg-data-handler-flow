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

const mongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSiZe: 50,
  autoIndex: false,
  retryWrites: false,
};
const mongoUsername = process.env.MONGO_INITDB_ROOT_USERNAME || '';
const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD || '';
const mongoHost = process.env.MONGO || '';
const mongoPort = process.env.MONGO_PORT || '';
const mongoDatabase = process.env.MONGO_INITDB_DATABASE || '';
const mongoCollection = process.env.MONGO_COLLECTION || '';
const mongoUrl = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`;

export const mongo = {
  host: mongoHost,
  username: mongoUsername,
  password: mongoPassword,
  options: mongoOptions,
  url: mongoUrl,
  collection: mongoCollection,
};
