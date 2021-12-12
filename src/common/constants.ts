import 'dotenv/config';

import config from '../../config.json';

const minGoldenSweepValue = config.minGoldenSweepValue;
const maxGoldenSweepDays = config.maxGoldenSweepDays;
const secondsInDay = config.secondsInDay;
const millisecondsInSecond = config.millisecondsInSecond;
const maxGoldenSweepDayAsMilliseconds = secondsInDay * millisecondsInSecond * maxGoldenSweepDays;
const maxGoldenSweepDayMilliseconds = Date.now() + maxGoldenSweepDayAsMilliseconds;

const minValue = config.minValue;
const minLargeValueFlowStockValue = config.minLargeValueFlowStockValue;
const maxDays = config.maxDays;
const maxDayAsMilliseconds = secondsInDay * millisecondsInSecond * maxDays;
const maxDayMilliseconds = Date.now() + maxDayAsMilliseconds;

export const flowConfig = {
  minGoldenSweepValue: minGoldenSweepValue,
  maxGoldenSweepDays: maxGoldenSweepDays,
  secondsInDay: secondsInDay,
  millisecondsInSecond: millisecondsInSecond,
  maxGoldenSweepDayAsMilliseconds: maxGoldenSweepDayAsMilliseconds,
  maxGoldenSweepDayMilliseconds: maxGoldenSweepDayMilliseconds,
  minValue: minValue,
  minLargeValueFlowStockValue: minLargeValueFlowStockValue,
  maxDays: maxDays,
  maxDayAsMilliseconds: maxDayAsMilliseconds,
  maxDayMilliseconds: maxDayMilliseconds,
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
