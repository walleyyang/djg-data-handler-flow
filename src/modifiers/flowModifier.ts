import { Sentiment, Position, Type } from 'common/enums';
import { Flow, ModifiedFlow } from 'common/models';
import { minGoldenSweepValue, maxGoldenSweepDayMilliseconds } from 'common/constants';

// Modify initial flow with additional information.
const modifyFlow = (flow: Flow): ModifiedFlow => {
  const estimatedValue = getEstimatedValue(flow);

  return JSON.parse(
    JSON.stringify({
      messageType: flow.messageType,
      time: flow.time,
      symbol: flow.symbol,
      expiration: flow.expiration,
      strike: flow.strike,
      position: flow.position,
      stockPrice: flow.stockPrice,
      details: flow.details,
      type: flow.type,
      value: flow.value,
      estimatedValue: estimatedValue,
      sentiment: getSentiment(flow),
      goldenSweep: isGoldenSweep(flow, estimatedValue),
    }),
  ) as ModifiedFlow;
};

// Rough estimate... pretty much ignoring digit after decimal and adding zeros
const getEstimatedValue = (flow: Flow) => {
  const value = flow.value;
  const letter = value.slice(-1) === 'K' ? 'K' : 'M';
  const numericBeforeDecimal = value.substring(0, value.indexOf('.')).replace('$', '');
  const numeric = letter === 'K' ? `${numericBeforeDecimal}000` : `${numericBeforeDecimal}000000`;

  return parseInt(numeric);
};

// Assume ask or above ask puts are bearish and calls are bullish
// Assume bid or below bid puts are bullish and calls are bearish
const getSentiment = (flow: Flow) => {
  const position = flow.position;
  const details = flow.details;
  const letters = details.split(' ')[1];
  const verifyLetter = 'A';
  let sentiment = '';

  if (position === Position.CALL) {
    sentiment = letters === undefined || letters.includes(verifyLetter) ? Sentiment.BULLISH : Sentiment.BEARISH;
  } else {
    sentiment = letters === undefined || letters.includes(verifyLetter) ? Sentiment.BEARISH : Sentiment.BULLISH;
  }

  return sentiment;
};

const isGoldenSweep = (flow: Flow, estimatedValue: number) => {
  const type = flow.type;
  const expiration = flow.expiration;
  const validValueType = estimatedValue >= minGoldenSweepValue && type === Type.SWEEP;
  const validExpiration = maxGoldenSweepDayMilliseconds - Date.parse(expiration) >= 1;

  return validValueType && validExpiration;
};

export { modifyFlow };
