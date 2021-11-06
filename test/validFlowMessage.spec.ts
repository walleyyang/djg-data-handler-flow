import { expect } from 'chai';

import { Flow } from 'common/models';
import { modifyFlow } from 'modifiers/flowModifier';
import { validFlowMessage } from 'validators/validFlowMessage';

const maxDaysDate = new Date();
maxDaysDate.setDate(maxDaysDate.getDate() + 14);
const maxDaysDateString = maxDaysDate.toLocaleDateString();

const maxDaysDateInvalid = new Date();
maxDaysDateInvalid.setDate(maxDaysDateInvalid.getDate() + 15);
const maxDaysDateInvalidString = maxDaysDateInvalid.toLocaleDateString();

const maxGoldenSweepDaysDate = new Date();
maxGoldenSweepDaysDate.setDate(maxGoldenSweepDaysDate.getDate() + 30);
const maxGoldenSweepDaysDateString = maxGoldenSweepDaysDate.toLocaleDateString();

const maxGoldenSweepDaysDateInvalid = new Date();
maxGoldenSweepDaysDateInvalid.setDate(maxGoldenSweepDaysDateInvalid.getDate() + 31);
const maxGoldenSweepDaysDateInvalidString = maxGoldenSweepDaysDateInvalid.toLocaleDateString();

describe('valid flow message validation expiration checks', () => {
  const expirationMaxDays = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'MSFT',
        expiration: maxDaysDateString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$50.5K',
      }),
    ) as Flow,
  );

  const expirationMaxDaysInvalid = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'MSFT',
        expiration: maxDaysDateInvalidString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$50.5K',
      }),
    ) as Flow,
  );

  const expirationMaxGoldenSweepDays = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'MSFT',
        expiration: maxGoldenSweepDaysDateString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$10.5M',
      }),
    ) as Flow,
  );

  const expirationMaxGoldenSweepDaysInvalid = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'MSFT',
        expiration: maxGoldenSweepDaysDateInvalidString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$10.5M',
      }),
    ) as Flow,
  );

  it('should be valid message if expiration within maxDays', () => {
    expect(validFlowMessage(expirationMaxDays)).to.equal(true);
  });

  it('should be invalid message if expiration more than maxDays', () => {
    expect(validFlowMessage(expirationMaxDaysInvalid)).to.equal(false);
  });

  it('should be valid message if golden sweep and expiration within maxGoldenSweepDays', () => {
    expect(validFlowMessage(expirationMaxGoldenSweepDays)).to.equal(true);
  });

  it('should be invalid message if golden sweep and expiration more than maxGoldenSweepDays', () => {
    expect(validFlowMessage(expirationMaxGoldenSweepDaysInvalid)).to.equal(false);
  });
});

describe('valid flow message validation stock group check', () => {
  const validStock = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'MSFT',
        expiration: maxDaysDateString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$50.5K',
      }),
    ) as Flow,
  );

  const invalidStock = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'XYZ',
        expiration: maxDaysDateString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$50.5K',
      }),
    ) as Flow,
  );

  it('should be valid message if symbol in validStocks', () => {
    expect(validFlowMessage(validStock)).to.equal(true);
  });

  it('should be invalid message if symbol not in validStocks', () => {
    expect(validFlowMessage(invalidStock)).to.equal(false);
  });
});

describe('valid flow message validation estimated value check', () => {
  const largeValue = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'AMZN',
        expiration: maxDaysDateString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$250.5K',
      }),
    ) as Flow,
  );

  const largeValueInvalid = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'AMZN',
        expiration: maxDaysDateString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$50.5K',
      }),
    ) as Flow,
  );

  const minValue = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'MSFT',
        expiration: maxDaysDateString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$50.5K',
      }),
    ) as Flow,
  );

  const minValueInvalid = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'MSFT',
        expiration: maxDaysDateString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$49.5K',
      }),
    ) as Flow,
  );

  it('should be valid message if symbol in largeValueFlowStocks and estimatedValue >= minLargeValueFlowStockValue', () => {
    expect(validFlowMessage(largeValue)).to.equal(true);
  });

  it('should be valid message if symbol in largeValueFlowStocks and estimatedValue <= minLargeValueFlowStockValue', () => {
    expect(validFlowMessage(largeValueInvalid)).to.equal(false);
  });

  it('should be valid message if symbol in validStocks and estimatedValue >= minValue', () => {
    expect(validFlowMessage(minValue)).to.equal(true);
  });

  it('should be valid message if symbol in validStocks and estimatedValue <= minValue', () => {
    expect(validFlowMessage(minValueInvalid)).to.equal(false);
  });
});

describe('valid flow message validation type check', () => {
  const validFlow = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'MSFT',
        expiration: maxDaysDateString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'SWEEP',
        value: '$250.5K',
      }),
    ) as Flow,
  );

  const invalidFlow = modifyFlow(
    JSON.parse(
      JSON.stringify({
        messageType: 'FLOW',
        time: '11:15:50',
        symbol: 'MSFT',
        expiration: maxDaysDateString,
        strike: 500,
        position: 'PUT',
        stockPrice: 445,
        details: '450@10.00 BB',
        type: 'BLOCK',
        value: '$50.5K',
      }),
    ) as Flow,
  );

  it('should be valid message if type is SWEEP', () => {
    expect(validFlowMessage(validFlow)).to.equal(true);
  });

  it('should be invalid message if type is not SWEEP', () => {
    expect(validFlowMessage(invalidFlow)).to.equal(false);
  });
});
