import { initAnalytics, trackAppError, trackEvent } from '../analyticsService';
import { CONFIG } from '../../config/env';
import mixpanel from 'mixpanel-browser';
import { AppError } from '../../redux/slices/appStateSlice';

const oldConsoleLog = console.log;
const oldConsoleError = console.error;

jest.mock('mixpanel-browser');

beforeAll(() => {
  console.log = jest.fn();
  console.error = jest.fn();

  mixpanel.init = jest.fn();
  mixpanel.track = jest.fn();
});

const eventName = 'PROVA';
const eventBody = { PROP1: 'VAL1', PROP2: 'VAL2' };
const trackEventTest = () => trackEvent(eventName, eventBody);

const appError: AppError = {
  id: 'ERROR',
  blocking: false,
  toNotify: true,
  error: new Error(),
  techDescription: 'ERROR_DESC',
};
const trackErrorTest = () => trackAppError(appError);

describe('test if not init', () => {
  test('test event', () => {
    trackEventTest();

    checkNoEventSent();
    checkNoEventInConsole();
    checkNoErrorInConsole();
  });

  test('test error', () => {
    trackErrorTest();

    checkNoEventInConsole();
    checkNoEventInConsole();

    checkErrorInConsole();
  });
});

describe('test if disabled', () => {
  beforeEach(() => {
    CONFIG.ANALYTCS.ENABLE = false;

    initAnalytics();
  });

  test('test event', () => {
    trackEventTest();

    checkNoEventSent();
    checkNoEventInConsole();
    checkNoErrorInConsole();
  });

  test('test error', () => {
    trackErrorTest();

    checkNoEventSent();
    checkNoEventInConsole();

    checkErrorInConsole();
  });
});

describe('test if mocked', () => {
  beforeEach(() => {
    CONFIG.ANALYTCS.ENABLE = true;
    CONFIG.ANALYTCS.MOCK = true;

    initAnalytics();
  });

  test('test event', () => {
    trackEventTest();

    checkNoEventSent();
    checkNoErrorInConsole();

    checkEventInConsole();
  });

  test('test error', () => {
    trackErrorTest();
    checkNoEventSent();
    checkNoErrorInConsole();

    checkErrorEventInConsole();
  });
});

describe('test regular send', () => {
  beforeEach(() => {
    CONFIG.ANALYTCS.ENABLE = true;
    CONFIG.ANALYTCS.MOCK = false;
    initAnalytics();
  });

  test('test event', () => {
    trackEventTest();

    checkNoEventInConsole();
    checkNoErrorInConsole();

    checkEventSent();
  });

  test('test error', () => {
    trackErrorTest();

    checkNoEventInConsole();
    checkNoErrorInConsole();

    checkErrorEventSent();
  });
});

describe('test regular send library in error', () => {
  beforeEach(() => {
    CONFIG.ANALYTCS.ENABLE = true;
    CONFIG.ANALYTCS.MOCK = false;
    initAnalytics();
    (mixpanel.track as jest.Mock).mockImplementation(() => {
      throw new Error('DUMMY ERROR');
    });
  });

  test('test event', () => {
    trackEventTest();

    checkEventSent();
    checkEventInConsole();
    expect(console.error).toBeCalledWith(
      'Something gone wrong while sending data to mixpanel:',
      new Error('DUMMY ERROR')
    );
  });

  test('test error', () => {
    trackErrorTest();

    checkErrorEventSent();
    checkErrorEventInConsole();
    expect(console.error).toBeCalledWith(
      'Something gone wrong while sending data to mixpanel:',
      new Error('DUMMY ERROR')
    );
  });
});

// common methods

const checkNoEventSent = () => {
  expect(mixpanel.track).toBeCalledTimes(0);
};
const checkEventSent = () => {
  expect(mixpanel.track).toBeCalledWith(eventName, eventBody);
};

const checkNoEventInConsole = () => {
  expect(console.log).toBeCalledTimes(0);
};
const checkEventInConsole = () => {
  expect(console.log).toBeCalledWith(eventName, eventBody);
};

const checkNoErrorInConsole = () => {
  expect(console.error).toBeCalledTimes(0);
};

const checkErrorEventSent = () => {
  expect(mixpanel.track).toBeCalledWith('GENERIC_ERROR', appError);
};
const checkErrorEventInConsole = () => {
  expect(console.log).toBeCalledWith('GENERIC_ERROR', appError);
};
const checkErrorInConsole = () => {
  expect(console.error).toBeCalledWith(appError);
};
