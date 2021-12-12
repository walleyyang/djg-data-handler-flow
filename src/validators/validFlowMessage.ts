import { Type } from 'common/enums';
import { ModifiedFlow } from 'common/models';
import { flowConfig } from 'common/constants';

// A valid flow message should be within filtered parameters.
const validFlowMessage = (modifiedFlow: ModifiedFlow) => {
  return isValidMessage(modifiedFlow);
};

/*
  Expiration needs to be within max day or max golden sweep day.
  Requires stock to be within valid stock group.
  Requires value to meet minimum value or larger minimum value for large value stocks.
  Requires flow to be a sweep.
*/
const isValidMessage = (modifiedFlow: ModifiedFlow) => {
  const expiration = modifiedFlow.expiration;
  const estimatedValue = modifiedFlow.estimatedValue;
  const isGoldenSweep = modifiedFlow.goldenSweep;
  const symbol = modifiedFlow.symbol;
  const type = modifiedFlow.type;

  const validExpiration = isExpirationWithinFilteredDay(expiration);
  const validStock = flowConfig.validStocks.includes(symbol);
  const validValue = flowConfig.largeValueFlowStocks.includes(symbol)
    ? estimatedValue >= flowConfig.minLargeValueFlowStockValue
    : estimatedValue >= flowConfig.minValue;
  const validType = type === Type.SWEEP ? true : false;

  return isGoldenSweep ? true : validExpiration && validStock && validValue && validType;
};

const isExpirationWithinFilteredDay = (expiration: string) => {
  return flowConfig.maxDayMilliseconds - Date.parse(expiration) >= 1;
};

export { validFlowMessage };
