const validFlow = (flowString: string) => {
  const flow = JSON.parse(flowString) as JSON;

  return containsMessageType(flow) &&
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

const containsMessageType = (flow: JSON) => {
  return flow.hasOwnProperty('messageType');
};

const containsTime = (flow: JSON) => {
  return flow.hasOwnProperty('time');
};

const containsSymbol = (flow: JSON) => {
  return flow.hasOwnProperty('symbol');
};

const containsExpiration = (flow: JSON) => {
  return flow.hasOwnProperty('expiration');
};

const containsStrike = (flow: JSON) => {
  return flow.hasOwnProperty('strike');
};

const containsPosition = (flow: JSON) => {
  return flow.hasOwnProperty('position');
};

const containsStockPrice = (flow: JSON) => {
  return flow.hasOwnProperty('stockPrice');
};

const containsDetails = (flow: JSON) => {
  return flow.hasOwnProperty('details');
};

const containsType = (flow: JSON) => {
  return flow.hasOwnProperty('type');
};

const containsValue = (flow: JSON) => {
  return flow.hasOwnProperty('value');
};

const containsEstimatedValue = (flow: JSON) => {
  return flow.hasOwnProperty('estimatedValue');
};

const containsGoldenSweep = (flow: JSON) => {
  return flow.hasOwnProperty('goldenSweep');
};

const containsSentiment = (flow: JSON) => {
  return flow.hasOwnProperty('sentiment');
};

export default validFlow;
