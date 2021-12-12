import { Sentiment, Position, Type } from 'common/enums';
import { Flow, ModifiedFlow } from 'common/models';
import { flowConfig } from 'common/constants';

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

/*
Thoughts on assuming the bid and below bid side for bullish calls and bearish puts. Assumed position is long based on below. 
  Otherwise assumed short, closing, spreads, hedge, etc.
  - Sweeps: shows sense of urgency
  - Max Expiration Day: Within next expiration (default 7) which most flow traders will probably trade next expiration. Shows sense of urgency.
  - Percentage difference between strike and stock price at transaction: This number is more arbitrary. Used 34 as the 
      default (half a standard deviation). Naked longs tend to favor 30 deltas because it seems to be the sweet spot for 
      most gains (s curve instead of linear) and maybe even debit spreads.
  - Call Stock Price: Call strike should be higher than stock price at transaction with the intention to move ITM.
  - Put Stock Price: Put strike should be lower than stock price at transaction with the intention to move ITM.
*/
const getSentiment = (flow: Flow) => {
  const position = flow.position;
  const details = flow.details;
  const type = flow.type;
  const strike = flow.strike;
  const stockPrice = flow.stockPrice;
  const validPercentage =
    100 * Math.abs((flow.strike - flow.stockPrice) / ((flow.strike + flow.stockPrice) / 2)) <=
    flowConfig.sentimentPercentageThreshold;
  const validMaxDays = flowConfig.sentimentMaxDaysThresholdMaxDayMilliseconds - Date.parse(flow.expiration) >= 1;
  const letters = details.split(' ')[1];
  const verifyLetter = 'A';
  let sentiment = '';

  // Assume ask or above ask calls are bullish and puts are bearish
  if (letters === undefined || letters.includes(verifyLetter)) {
    sentiment = position === Position.CALL ? Sentiment.BULLISH : Sentiment.BEARISH;
  } else {
    // Assume long positions for bid or below unless criterias are not met
    if (position === Position.CALL) {
      sentiment =
        type === Type.SWEEP && validPercentage && validMaxDays && strike > stockPrice
          ? Sentiment.BULLISH
          : Sentiment.BEARISH;
    } else {
      sentiment =
        type === Type.SWEEP && validPercentage && validMaxDays && strike < stockPrice
          ? Sentiment.BEARISH
          : Sentiment.BULLISH;
    }
  }

  return sentiment;
};

const isGoldenSweep = (flow: Flow, estimatedValue: number) => {
  const type = flow.type;
  const expiration = flow.expiration;
  const validValueType = estimatedValue >= flowConfig.minGoldenSweepValue && type === Type.SWEEP;
  const validExpiration = flowConfig.maxGoldenSweepDayMilliseconds - Date.parse(expiration) >= 1;

  return validValueType && validExpiration;
};

export { modifyFlow };
