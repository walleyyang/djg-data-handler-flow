import { ModifiedFlow } from 'common/models';

const validFlow = (modifiedFlow: ModifiedFlow) => {
  return containsFlowLength(modifiedFlow) &&
    containsMessageType(modifiedFlow) &&
    containsTime(modifiedFlow) &&
    containsSymbol(modifiedFlow) &&
    containsExpiration(modifiedFlow) &&
    containsStrike(modifiedFlow) &&
    containsPosition(modifiedFlow) &&
    containsStockPrice(modifiedFlow) &&
    containsDetails(modifiedFlow) &&
    containsType(modifiedFlow) &&
    containsValue(modifiedFlow) &&
    containsEstimatedValue(modifiedFlow) &&
    containsSentiment(modifiedFlow) &&
    containsGoldenSweep(modifiedFlow)
    ? true
    : false;
};

const containsFlowLength = (modifiedFlow: ModifiedFlow) => {
  const length = 13;
  return Object.keys(modifiedFlow).length === length ? true : false;
};

const containsMessageType = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('messageType');
};

const containsTime = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('time');
};

const containsSymbol = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('symbol');
};

const containsExpiration = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('expiration');
};

const containsStrike = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('strike');
};

const containsPosition = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('position');
};

const containsStockPrice = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('stockPrice');
};

const containsDetails = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('details');
};

const containsType = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('type');
};

const containsValue = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('value');
};

const containsEstimatedValue = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('estimatedValue');
};

const containsGoldenSweep = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('goldenSweep');
};

const containsSentiment = (modifiedFlow: ModifiedFlow) => {
  return modifiedFlow.hasOwnProperty('sentiment');
};

export { validFlow };
