import request from 'supertest';
import { expect } from 'chai';
import createServer from 'server';
import validFlow from 'flowValidator';

const server = createServer();
const flow = JSON.stringify({
  messageType: 'FLOW',
  time: '11:15:50',
  symbol: 'SPY',
  expiration: '11/11/2021',
  strike: '500',
  position: 'PUT',
  stockPrice: '445',
  details: '450@10.00 BB',
  type: 'SWEEP',
  value: '$10.5M',
  estimatedValue: '10500000',
  goldenSweep: true,
  sentiment: 'BULLISH',
});

describe('endpoint check', () => {
  it('should error on root', (done) => {
    void request(server).get('/').expect(404, done);
  });
});

describe('validation checks', () => {
  it('should be valid flow', () => {
    expect(validFlow(flow)).to.equal(true);
  });

  after(() => {
    server.close();
  });
});
