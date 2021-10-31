import request from 'supertest';
import { expect } from 'chai';

import { createServer } from 'server';
import { Flow, Alert } from 'validators/validator';
import { validFlow } from 'validators/flowValidator';
import { validAlert } from 'validators/alertValidator';

const server = createServer();

const flow = JSON.parse(
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
    estimatedValue: 10500000,
    goldenSweep: true,
    sentiment: 'BULLISH',
  }),
) as Flow;

const alert = JSON.parse(
  JSON.stringify({
    messageType: 'ALERT',
    symbol: 'SPY',
    time: '1:11:15',
    expiration: '11/11/2021',
    strike: 500,
    position: 'PUT',
    sentiment: 'BEARISH',
    alertPrice: 5.05,
  }),
) as Alert;

describe('endpoint check', () => {
  it('should error on root', (done) => {
    void request(server).get('/').expect(404, done);
  });
});

describe('validation checks', () => {
  it('should be valid flow', () => {
    expect(validFlow(flow)).to.equal(true);
  });

  it('should be valid alert', () => {
    expect(validAlert(alert)).to.equal(true);
  });

  after(() => {
    server.close();
  });
});
