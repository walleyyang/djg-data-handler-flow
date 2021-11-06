import { expect } from 'chai';

import { Flow } from 'common/models';
import { modifyFlow } from 'modifiers/flowModifier';
import { Sentiment } from 'common/enums';

describe('modified flow estimated value checks', () => {
  const million = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$10.5M',
      }),
    ) as Flow,
  );

  const thousand = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$10.5K',
      }),
    ) as Flow,
  );

  it('should contain estimated value in the millions', () => {
    expect(million.estimatedValue).to.equal(10000000);
  });

  it('should contain estimated value in the thousands', () => {
    expect(thousand.estimatedValue).to.equal(10000);
  });
});

describe('modified flow call sentiment checks', () => {
  const askCall = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'CALL',
        stockPrice: 445,
        details: '450@10.00 A',
        type: 'SWEEP',
        value: '$10.5M',
      }),
    ) as Flow,
  );

  const aboveAskCall = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'CALL',
        stockPrice: 445,
        details: '450@10.00 AA',
        type: 'SWEEP',
        value: '$10.5K',
      }),
    ) as Flow,
  );

  const bidCall = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'CALL',
        stockPrice: 445,
        details: '450@10.00 B',
        type: 'SWEEP',
        value: '$10.5M',
      }),
    ) as Flow,
  );

  const belowBidCall = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'CALL',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$10.5K',
      }),
    ) as Flow,
  );

  it('should contain bullish sentiment for ask call', () => {
    expect(askCall.sentiment).to.equal(Sentiment.BULLISH);
  });

  it('should contain bullish sentiment for above ask call', () => {
    expect(aboveAskCall.sentiment).to.equal(Sentiment.BULLISH);
  });

  it('should contain bearish sentiment for bid call', () => {
    expect(bidCall.sentiment).to.equal(Sentiment.BEARISH);
  });

  it('should contain bearish sentiment for below bid call', () => {
    expect(belowBidCall.sentiment).to.equal(Sentiment.BEARISH);
  });
});

describe('modified flow put sentiment checks', () => {
  const askPut = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 A',
        type: 'SWEEP',
        value: '$10.5M',
      }),
    ) as Flow,
  );

  const aboveAskPut = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 AA',
        type: 'SWEEP',
        value: '$10.5K',
      }),
    ) as Flow,
  );

  const bidPut = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 B',
        type: 'SWEEP',
        value: '$10.5M',
      }),
    ) as Flow,
  );

  const belowBidPut = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$10.5K',
      }),
    ) as Flow,
  );

  const none = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00',
        type: 'SWEEP',
        value: '$10.5K',
      }),
    ) as Flow,
  );

  it('should contain bearish sentiment for ask put', () => {
    expect(askPut.sentiment).to.equal(Sentiment.BEARISH);
  });

  it('should contain bearish sentiment for above ask put', () => {
    expect(aboveAskPut.sentiment).to.equal(Sentiment.BEARISH);
  });

  it('should contain bullish sentiment for bid put', () => {
    expect(bidPut.sentiment).to.equal(Sentiment.BULLISH);
  });

  it('should contain bullish sentiment for below bid put', () => {
    expect(belowBidPut.sentiment).to.equal(Sentiment.BULLISH);
  });

  it('should contain position sentiment for none', () => {
    expect(none.sentiment).to.equal(Sentiment.BEARISH);
  });
});

describe('modified flow golden sweep check', () => {
  const goldenSweepTrue = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 B',
        type: 'SWEEP',
        value: '$10.5M',
      }),
    ) as Flow,
  );

  const goldenSweepFalse = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'SPY',
        expiration: '11/11/2021',
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$999.5K',
      }),
    ) as Flow,
  );

  it('should contain golden sweep true if over minGoldenSweepValue', () => {
    expect(goldenSweepTrue.goldenSweep).to.equal(true);
  });

  it('should contain golden sweep false if less than minGoldenSweepValue', () => {
    expect(goldenSweepFalse.goldenSweep).to.equal(false);
  });
});
