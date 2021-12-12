import { expect } from 'chai';

import { Flow } from 'common/models';
import { modifyFlow } from 'modifiers/flowModifier';
import { Sentiment } from 'common/enums';

interface FlowParameters {
  messageType?: string;
  time?: string;
  symbol?: string;
  expiration?: string;
  strike?: number;
  position?: string;
  stockPrice?: number;
  details?: string;
  type?: string;
  value?: string;
}

const maxGoldenSweepDaysDate = new Date();
maxGoldenSweepDaysDate.setDate(maxGoldenSweepDaysDate.getDate() + 30);
const maxGoldenSweepDaysDateString = maxGoldenSweepDaysDate.toLocaleDateString();

const maxDaysDate = new Date();
maxDaysDate.setDate(maxDaysDate.getDate() + 7);
const maxValidDaysDateString = maxDaysDate.toLocaleDateString();

const maxInvalidDaysDate = new Date();
maxInvalidDaysDate.setDate(maxInvalidDaysDate.getDate() + 50);
const maxInvalidDaysDateString = maxInvalidDaysDate.toLocaleDateString();

const getFlow = ({
  messageType,
  time,
  symbol,
  expiration,
  strike,
  position,
  stockPrice,
  details,
  type,
  value,
}: FlowParameters) => {
  return modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: messageType !== undefined ? messageType : 'FLOW',
        time: time !== undefined ? time : '11:15:50',
        symbol: symbol !== undefined ? symbol : 'SPY',
        expiration: expiration !== undefined ? expiration : maxValidDaysDateString,
        strike: strike !== undefined ? strike : 500,
        position: position !== undefined ? position : 'PUT',
        stockPrice: stockPrice !== undefined ? stockPrice : 475,
        details: details !== undefined ? details : '450@10.00 BB',
        type: type !== undefined ? type : 'SWEEP',
        value: value !== undefined ? value : '$10.5M',
      }),
    ) as Flow,
  );
};

describe('modified flow estimated value checks', () => {
  const million = getFlow({ value: '$10.5M' });
  const thousand = getFlow({ value: '$10.5K' });

  it('should contain estimated value in the millions', () => {
    expect(million.estimatedValue).to.equal(10000000);
  });

  it('should contain estimated value in the thousands', () => {
    expect(thousand.estimatedValue).to.equal(10000);
  });
});

describe('modified flow call none sentiment check', () => {
  const none = getFlow({ position: 'CALL', details: '450@10.00' });

  it('should contain bullish position sentiment for none', () => {
    expect(none.sentiment).to.equal(Sentiment.BULLISH);
  });
});

describe('modified flow call ask side sentiment checks', () => {
  const askCall = getFlow({ position: 'CALL', details: '450@10.00 A' });

  it('should contain bullish sentiment for ask call', () => {
    expect(askCall.sentiment).to.equal(Sentiment.BULLISH);
  });
});

describe('modified flow call bid side sentiment checks', () => {
  const bidCall = getFlow({
    position: 'CALL',
    details: '450@10.00 B',
    type: 'SWEEP',
    strike: 550,
    stockPrice: 500,
    expiration: maxValidDaysDateString,
  });

  const bidCallType = getFlow({
    position: 'CALL',
    details: '450@10.00 B',
    type: 'BLOCK',
    strike: 550,
    stockPrice: 500,
  });

  const bidCallInvalidPercentage = getFlow({
    position: 'CALL',
    details: '450@10.00 B',
    type: 'SWEEP',
    strike: 1000,
    stockPrice: 500,
  });

  const bidCallInvalidMaxDay = getFlow({
    position: 'CALL',
    details: '450@10.00 B',
    type: 'SWEEP',
    strike: 550,
    stockPrice: 500,
    expiration: maxInvalidDaysDateString,
  });

  const bidCallStrikeStockComparison = getFlow({
    position: 'CALL',
    details: '450@10.00 B',
    type: 'SWEEP',
    strike: 450,
    stockPrice: 500,
  });

  it('should contain bullish sentiment for bid call (valid criteria)', () => {
    expect(bidCall.sentiment).to.equal(Sentiment.BULLISH);
  });

  it('should contain bearish sentiment for bid call (non sweep type)', () => {
    expect(bidCallType.sentiment).to.equal(Sentiment.BEARISH);
  });

  it('should contain bearish sentiment for bid call (valid percentage)', () => {
    expect(bidCallInvalidPercentage.sentiment).to.equal(Sentiment.BEARISH);
  });

  it('should contain bearish sentiment for bid call (valid max day)', () => {
    expect(bidCallInvalidMaxDay.sentiment).to.equal(Sentiment.BEARISH);
  });

  it('should contain bearish sentiment for bid call (strike and stock price comparison)', () => {
    expect(bidCallStrikeStockComparison.sentiment).to.equal(Sentiment.BEARISH);
  });
});

describe('modified flow put none sentiment check', () => {
  const none = getFlow({ position: 'PUT', details: '450@10.00' });

  it('should contain bearish position sentiment for none', () => {
    expect(none.sentiment).to.equal(Sentiment.BEARISH);
  });
});

describe('modified flow put ask side sentiment checks', () => {
  const askPut = getFlow({ position: 'PUT', details: '450@10.00 A' });

  it('should contain bearish sentiment for ask put', () => {
    expect(askPut.sentiment).to.equal(Sentiment.BEARISH);
  });
});

describe('modified flow put bid side sentiment checks', () => {
  const bidPutBearish = getFlow({
    position: 'PUT',
    details: '450@10.00 B',
    type: 'SWEEP',
    strike: 450,
    stockPrice: 500,
    expiration: maxValidDaysDateString,
  });

  const bidPutType = getFlow({
    position: 'PUT',
    details: '450@10.00 B',
    type: 'BLOCK',
    strike: 450,
    stockPrice: 500,
  });

  const bidPutInvalidPercentage = getFlow({
    position: 'PUT',
    details: '450@10.00 B',
    type: 'SWEEP',
    strike: 100,
    stockPrice: 500,
  });

  const bidPutInvalidMaxDay = getFlow({
    position: 'PUT',
    details: '450@10.00 B',
    type: 'SWEEP',
    strike: 450,
    stockPrice: 500,
    expiration: maxInvalidDaysDateString,
  });

  const bidPutInvalidStrikeStockComparison = getFlow({
    position: 'PUT',
    details: '450@10.00 B',
    type: 'SWEEP',
    strike: 550,
    stockPrice: 500,
  });

  it('should contain bearish sentiment for bid put (valid criteria)', () => {
    expect(bidPutBearish.sentiment).to.equal(Sentiment.BEARISH);
  });

  it('should contain bullish sentiment for bid put (non sweep type)', () => {
    expect(bidPutType.sentiment).to.equal(Sentiment.BULLISH);
  });

  it('should contain bullish sentiment for bid put (invalid percentage)', () => {
    expect(bidPutInvalidPercentage.sentiment).to.equal(Sentiment.BULLISH);
  });

  it('should contain bullish sentiment for bid put (invalid max day)', () => {
    expect(bidPutInvalidMaxDay.sentiment).to.equal(Sentiment.BULLISH);
  });

  it('should contain bullish sentiment for bid put (invalid strike and stock price comparison)', () => {
    expect(bidPutInvalidStrikeStockComparison.sentiment).to.equal(Sentiment.BULLISH);
  });
});

describe('modified flow golden sweep check', () => {
  const goldenSweepValueTrue = getFlow({
    type: 'SWEEP',
    value: '$10.5M',
    expiration: maxGoldenSweepDaysDateString,
  });

  const goldenSweepValueFalse = getFlow({
    type: 'SWEEP',
    value: '$999.5K',
    expiration: maxGoldenSweepDaysDateString,
  });

  const goldenSweepExpirationTrue = getFlow({
    type: 'SWEEP',
    value: '$10.5M',
    expiration: maxGoldenSweepDaysDateString,
  });

  const goldenSweepExpirationFalse = getFlow({
    type: 'SWEEP',
    value: '$10.5M',
    expiration: maxInvalidDaysDateString,
  });

  it('should contain golden sweep true if over min golden sweep value', () => {
    expect(goldenSweepValueTrue.goldenSweep).to.equal(true);
  });

  it('should contain golden sweep false if less than min golden sweep value', () => {
    expect(goldenSweepValueFalse.goldenSweep).to.equal(false);
  });

  it('should contain golden sweep true if expiration within max golden sweep days', () => {
    expect(goldenSweepExpirationTrue.goldenSweep).to.equal(true);
  });

  it('should contain golden sweep false if expiration outside of max golden sweep days', () => {
    expect(goldenSweepExpirationFalse.goldenSweep).to.equal(false);
  });
});
