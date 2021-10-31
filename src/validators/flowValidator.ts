import { Flow } from 'validators/validator';

const validFlow = (flow: Flow) => {
  return containsFlowLength(flow) &&
    containsMessageType(flow) &&
    containsTime(flow) &&
    containsSymbol(flow) &&
    containsExpiration(flow) &&
    containsStrike(flow) &&
    containsPosition(flow) &&
    containsStockPrice(flow) &&
    containsDetails(flow) &&
    containsType(flow) &&
    containsValue(flow) &&
    containsEstimatedValue(flow) &&
    containsGoldenSweep(flow) &&
    containsSentiment(flow)
    ? true
    : false;
};

const containsFlowLength = (flow: Flow) => {
  const length = 13;
  return Object.keys(flow).length === length ? true : false;
};

const containsMessageType = (flow: Flow) => {
  return flow.hasOwnProperty('messageType');
};

const containsTime = (flow: Flow) => {
  return flow.hasOwnProperty('time');
};

const containsSymbol = (flow: Flow) => {
  return flow.hasOwnProperty('symbol');
};

const containsExpiration = (flow: Flow) => {
  return flow.hasOwnProperty('expiration');
};

const containsStrike = (flow: Flow) => {
  return flow.hasOwnProperty('strike');
};

const containsPosition = (flow: Flow) => {
  return flow.hasOwnProperty('position');
};

const containsStockPrice = (flow: Flow) => {
  return flow.hasOwnProperty('stockPrice');
};

const containsDetails = (flow: Flow) => {
  return flow.hasOwnProperty('details');
};

const containsType = (flow: Flow) => {
  return flow.hasOwnProperty('type');
};

const containsValue = (flow: Flow) => {
  return flow.hasOwnProperty('value');
};

const containsEstimatedValue = (flow: Flow) => {
  return flow.hasOwnProperty('estimatedValue');
};

const containsGoldenSweep = (flow: Flow) => {
  return flow.hasOwnProperty('goldenSweep');
};

const containsSentiment = (flow: Flow) => {
  return flow.hasOwnProperty('sentiment');
};

export { validFlow };
