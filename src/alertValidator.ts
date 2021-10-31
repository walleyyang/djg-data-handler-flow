const validAlert = (flowString: string) => {
  const flow = JSON.parse(flowString) as JSON;

  return containsMessageType(flow) &&
    containsTime(flow) &&
    containsSymbol(flow) &&
    containsExpiration(flow) &&
    containsStrike(flow) &&
    containsPosition(flow) &&
    containsAlertPrice(flow) &&
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

const containsAlertPrice = (flow: JSON) => {
  return flow.hasOwnProperty('alertPrice');
};

const containsSentiment = (flow: JSON) => {
  return flow.hasOwnProperty('sentiment');
};

export default validAlert;
