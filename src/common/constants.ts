import config from '../../config.json';

export const minGoldenSweepValue = config.minGoldenSweepValue;
export const maxGoldenSweepDays = config.maxGoldenSweepDays;
export const secondsInDay = config.secondsInDay;
export const millisecondsInSecond = config.millisecondsInSecond;
export const maxGoldenSweepDayAsMilliseconds = secondsInDay * millisecondsInSecond * maxGoldenSweepDays;
export const maxGoldenSweepDayMilliseconds = Date.now() + maxGoldenSweepDayAsMilliseconds;

export const largeValueFlowStocks = config.largeValueFlowStocks;
export const validStocks = config.validStocks;
export const minValue = config.minValue;
export const minLargeValueFlowStockValue = config.minLargeValueFlowStockValue;
export const maxDays = config.maxDays;
export const maxDayAsMilliseconds = secondsInDay * millisecondsInSecond * maxDays;
export const maxDayMilliseconds = Date.now() + maxDayAsMilliseconds;
