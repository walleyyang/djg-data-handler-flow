import { Alert } from 'validators/validator';

const validAlert = (alert: Alert) => {
  return containsAlertLength(alert) &&
    containsMessageType(alert) &&
    containsTime(alert) &&
    containsSymbol(alert) &&
    containsExpiration(alert) &&
    containsStrike(alert) &&
    containsPosition(alert) &&
    containsAlertPrice(alert) &&
    containsSentiment(alert)
    ? true
    : false;
};

const containsAlertLength = (alert: Alert) => {
  const length = 8;
  return Object.keys(alert).length === length ? true : false;
};

const containsMessageType = (alert: Alert) => {
  return alert.hasOwnProperty('messageType');
};

const containsTime = (alert: Alert) => {
  return alert.hasOwnProperty('time');
};

const containsSymbol = (alert: Alert) => {
  return alert.hasOwnProperty('symbol');
};

const containsExpiration = (alert: Alert) => {
  return alert.hasOwnProperty('expiration');
};

const containsStrike = (alert: Alert) => {
  return alert.hasOwnProperty('strike');
};

const containsPosition = (alert: Alert) => {
  return alert.hasOwnProperty('position');
};

const containsAlertPrice = (alert: Alert) => {
  return alert.hasOwnProperty('alertPrice');
};

const containsSentiment = (alert: Alert) => {
  return alert.hasOwnProperty('sentiment');
};

export { validAlert };
