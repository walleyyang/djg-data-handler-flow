// import { Flow, UnfilteredFlow } from 'validators/models';
// import config from '../../config.json';

// const largeValueFlowStocks = config.largeValueFlowStocks;
// const validStocks = config.validStocks;

// const minValue = config.minValue;
// const minLargeValueFlowStockValue = config.minLargeValueFlowStockValue;
// const minGoldenSweepValue = config.minGoldenSweepValue;

// const maxDays = config.maxDays;
// const maxGoldenSweepDays = config.maxGoldenSweepDays;
// const secondsInDay = config.secondsInDay;
// const millisecondsInSecond = config.millisecondsInSecond;
// const maxDayAsMilliseconds = secondsInDay * millisecondsInSecond * maxDays;
// const maxDayMilliseconds = Date.now() + maxDayAsMilliseconds;
// const maxGoldenSweepDayAsMilliseconds = secondsInDay * millisecondsInSecond * maxGoldenSweepDays;
// const maxGoldenSweepDayMilliseconds = Date.now() + maxGoldenSweepDayAsMilliseconds;
// const validFilterCheck = isValidFilter(dataExpiration, dataEstimatedValue, goldenSweepCheck, dataSymbol, dataType);

// const dataEstimatedValue = getEstimatedValue(dataValue);
//   const flowSentiment = getSentiment(dataPosition, dataDetails);

// const filterValidator = (unfilteredFlow: UnfilteredFlow): Flow => {
//   return JSON.parse(
//     JSON.stringify({
//       messageType: unfilteredFlow.messageType,
//       time: unfilteredFlow.time,
//       symbol: unfilteredFlow.symbol,
//       expiration: unfilteredFlow.expiration,
//       strike: unfilteredFlow.strike,
//       position: unfilteredFlow.position,
//       stockPrice: unfilteredFlow.stockPrice,
//       details: unfilteredFlow.details,
//       type: unfilteredFlow.type,
//       value: unfilteredFlow.value,
//       // estimatedValue: getEstimatedValue(),
//       // sentiment: getSentiment(),
//       // goldenSweep: isGoldenSweep(),
//     }),
//   ) as Flow;
// };

// const getEstimatedValue() => {

// }

// const goldenSweepCheck = isGoldenSweep(dataEstimatedValue, dataType, dataExpiration);

/*
  Expiration needs to be within max day or max golden sweep day.
  Requires stock to be within valid stock group.
  Requires value to meet minimum value or larger minimum value for large value stocks.
  Requires flow to be a sweep.
*/
// const isValidFilter = (
//   expiration: string,
//   estimatedValue: number,
//   isGoldenSweep: boolean,
//   symbol: string,
//   type: string,
// ) => {
//   const validExpiration = isExpirationWithinFilteredDay(expiration);
//   const validStock = validStocks.includes(symbol);
//   const validValue = largeValueFlowStocks.includes(symbol)
//     ? estimatedValue >= minLargeValueFlowStockValue
//     : estimatedValue >= minValue;
//   const validType = type === 'SWEEP' ? true : false;

//   const validFilter = isGoldenSweep ? true : validExpiration && validStock && validValue && validType;

//   return validFilter;
// };

// const isExpirationWithinFilteredDay = (expiration: string) => {
//   return maxDayMilliseconds - Date.parse(expiration) >= 1;
// };

// export { filterValidator };
export {};
