import config from '../../config.json';

export const minGoldenSweepValue = config.minGoldenSweepValue;
export const maxGoldenSweepDays = config.maxGoldenSweepDays;
export const secondsInDay = config.secondsInDay;
export const millisecondsInSecond = config.millisecondsInSecond;
export const maxGoldenSweepDayAsMilliseconds = secondsInDay * millisecondsInSecond * maxGoldenSweepDays;
export const maxGoldenSweepDayMilliseconds = Date.now() + maxGoldenSweepDayAsMilliseconds;
