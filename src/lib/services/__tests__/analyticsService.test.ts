import { initAnalytics, trackAppError, trackEvent } from '../analyticsService';
import { CONFIG } from '../../config/env';
import mixpanel from 'mixpanel-browser';
import { AppError } from '../../redux/slices/appStateSlice';
import { vi, Mock } from 'vitest';


const oldConsoleLog = console.log;
const oldConsoleError = console.error;

vi.mock('mixpanel-browser');

beforeAll(() => {
  console.log = vi.fn();
  console.error = vi.fn();

  mixpanel.init = vi.fn();
  mixpanel.track = vi.fn();
});

afterAll(() => {
  console.log = oldConsoleLog;
  console.error = oldConsoleError;
});

const eventName = 'PROVA';
const eventBody = { PROP1: 'VAL1', PROP2: 'VAL2' };
const trackEventTest = (callback?: () => void) => trackEvent(eventName, eventBody, callback);

const appError: AppError = {
  id: 'ERROR',
  blocking: false,
  toNotify: true,
  error: new Error(),
  techDescription: 'ERROR_DESC',
};
const trackErrorTest = () => trackAppError(appError);

let expectedCallback = undefined;
let expectedTrackOptions = undefined;

describe('test if not init', () => {
  test('test event', () => {
    trackEventTest();
    checkTrackEventResult();
  });
  const checkTrackEventResult = () => {
    checkNoEventSent();
    checkNoEventInConsole();
    checkNoErrorInConsole();
  };

  test('test callback', () => {
    const callback = vi.fn();
    trackEventTest(callback);

    checkTrackEventResult();
    expect(callback).toHaveBeenCalledTimes(1);
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

    expectedCallback = undefined;
    expectedTrackOptions = undefined;
  });

  test('test event', () => {
    trackEventTest();
    checkTrackEventResult();
  });
  const checkTrackEventResult = () => {
    checkNoEventSent();
    checkNoEventInConsole();
    checkNoErrorInConsole();
  };

  test('test callback', () => {
    const callback = vi.fn();
    trackEventTest(callback);

    checkTrackEventResult();
    expect(callback).toHaveBeenCalledTimes(1);
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

    expectedCallback = undefined;
    expectedTrackOptions = undefined;
  });

  test('test event', () => {
    trackEventTest();
    checkTrackEventResult();
  });
  const checkTrackEventResult = () => {
    checkNoEventSent();
    checkNoErrorInConsole();

    checkEventInConsole();
  };

  test('test callback', () => {
    const callback = vi.fn();
    trackEventTest(callback);

    checkTrackEventResult();
    expect(callback).toHaveBeenCalledTimes(1);
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

    expectedCallback = undefined;
    expectedTrackOptions = undefined;

    mixpanel.track = vi
      .fn()
      .mockImplementation(
        (_eventName: string, _property: any, _options: any, callback) => callback && callback()
      );
  });

  test('test event', () => {
    trackEventTest();
    checkTrackEventResult();
  });
  const checkTrackEventResult = () => {
    checkNoEventInConsole();
    checkNoErrorInConsole();

    checkEventSent();
  };

  test('test callback', () => {
    const callback = vi.fn();
    expectedCallback = expect.any(Function);
    expectedTrackOptions = { send_immediately: true };
    trackEventTest(callback);

    checkTrackEventResult();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('test callback in error', () => {
    const error = new Error();
    const callback = vi.fn().mockImplementation(() => {
      throw error;
    });
    expectedCallback = expect.any(Function);
    expectedTrackOptions = { send_immediately: true };
    trackEventTest(callback);

    checkNoEventInConsole();
    expect(console.error).toHaveBeenCalledWith(
      'Something gone wrong while calling trackEvent PROVA callback',
      error
    );
    checkEventSent();
    expect(callback).toHaveBeenCalledTimes(1);
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
    (mixpanel.track as Mock).mockImplementation(() => {
      throw new Error('DUMMY ERROR');
    });

    expectedCallback = undefined;
    expectedTrackOptions = undefined;
  });

  test('test event', () => {
    trackEventTest();
    checkTrackEventResult();
  });
  const checkTrackEventResult = () => {
    checkEventSent();
    checkEventInConsole();
    expect(console.error).toHaveBeenCalledWith(
      'Something gone wrong while sending data to mixpanel:',
      new Error('DUMMY ERROR')
    );
  };

  test('test callback', () => {
    const callback = vi.fn();
    expectedCallback = expect.any(Function);
    expectedTrackOptions = { send_immediately: true };
    trackEventTest(callback);

    checkTrackEventResult();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('test callback when analytics called it even if in error', () => {
    (mixpanel.track as Mock).mockImplementation(
      (_eventName: string, _property: any, _options: any, callback) => {
        if (callback) {
          callback();
        }
        throw new Error('DUMMY ERROR');
      }
    );
    const callback = vi.fn();
    expectedCallback = expect.any(Function);
    expectedTrackOptions = { send_immediately: true };
    trackEventTest(callback);

    checkTrackEventResult();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('test error', () => {
    trackErrorTest();

    checkErrorEventSent();
    checkErrorEventInConsole();
    expect(console.error).toHaveBeenCalledWith(
      'Something gone wrong while sending data to mixpanel:',
      new Error('DUMMY ERROR')
    );
  });
});

// common methods

const checkNoEventSent = () => {
  expect(mixpanel.track).toHaveBeenCalledTimes(0);
};
const checkEventSent = () => {
  expect(mixpanel.track).toHaveBeenCalledWith(
    eventName,
    eventBody,
    expectedTrackOptions,
    expectedCallback
  );
};

const checkNoEventInConsole = () => {
  expect(console.log).toHaveBeenCalledTimes(0);
};
const checkEventInConsole = () => {
  expect(console.log).toHaveBeenCalledWith(eventName, eventBody);
};

const checkNoErrorInConsole = () => {
  expect(console.error).toHaveBeenCalledTimes(0);
};

const checkErrorEventSent = () => {
  expect(mixpanel.track).toHaveBeenCalledWith('GENERIC_ERROR', appError, undefined, undefined);
};
const checkErrorEventInConsole = () => {
  expect(console.log).toHaveBeenCalledWith('GENERIC_ERROR', appError);
};
const checkErrorInConsole = () => {
  expect(console.error).toHaveBeenCalledWith(appError);
};
