import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import moment from 'moment';

import ROUTES from 'constants/routes';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import {
  setSearchDestinationDates,
  searchDestination,
} from 'state/concepts/search-destinations/actions';
import isMobileView from 'utils/breakpoints/isMobileView';

import SearchDates, { SearchDatesContainer } from '../container';

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    dateRange: null,
    location: null,
  })),
}));

jest.mock('utils/breakpoints/isMobileView', () => jest.fn());

const layoutContainer = (props) => {
  const wrapper = shallow(<SearchDates {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, SearchDatesContainer);
  const instance = container.instance();
  const setStateSpy = jest.spyOn(instance, 'setState');

  return {
    wrapper,
    container,
    instance,
    setStateSpy,
  };
};

describe('SearchDates container tests', () => {
  const mockedQuerySelector = jest.fn(() => [
    { parentNode: { insertBefore: jest.fn() } },
    { parentNode: { insertBefore: jest.fn() } },
  ]);
  Object.defineProperty(
    document,
    'querySelectorAll',
    { value: mockedQuerySelector },
  );

  Object.defineProperty(
    document,
    'getElementById',
    {
      value: jest.fn(() => ({
        innerHTML: '',
        scrollTop: 0,
        scrollHeight: 0,
      })),
    },
  );

  Object.defineProperty(
    window,
    'addEventListener',
    { value: jest.fn() },
  );

  Object.defineProperty(
    window,
    'removeEventListener',
    { value: jest.fn() },
  );

  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    router: {
      replace: jest.fn(),
      back: jest.fn(),
    },
  };

  let container = null;
  let instance = null;
  let setStateSpy = null;

  beforeEach(() => {
    ({
      container,
      instance,
      setStateSpy,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      query: {
        test: true,
      },
    };

    const res = await SearchDatesContainer.getInitialProps(ctx);

    expect(res).toEqual({ test: true });
  });

  it('checks `onClose` instance method', () => {
    instance.onClose();

    expect(props.router.back).toHaveBeenCalled();
  });

  it('checks `onDateRangeChanged` instance method', () => {
    instance.onDateRangeChanged([new Date(), new Date()]);

    expect(store.dispatch).toHaveBeenCalledWith(
      setSearchDestinationDates([new Date(), new Date()]),
    );
  });

  it('checks `formatShortWeekday` instance method', () => {
    const value = instance.formatShortWeekday(null, new Date());

    expect(value).toMatchSnapshot();
  });

  it('checks `tileContent` instance method', () => {
    const value = instance.tileContent(new Date());

    expect(value).toMatchSnapshot();
  });

  it('checks `componentWillUnmount` instance method', () => {
    instance.componentWillUnmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('resize', instance.resizeHandler);
  });

  it('checks `componentDidMount` instance method', () => {
    const injectMonthsSpy = jest.spyOn(instance, 'injectMonths');

    instance.componentDidMount();

    expect(window.addEventListener).toHaveBeenCalledWith('resize', instance.resizeHandler);
    expect(injectMonthsSpy).toHaveBeenCalled();
  });

  describe('checks `resizeHandler` instance method', () => {
    it('should redirect', () => {
      isMobileView.mockReturnValue(false);

      ({ instance } = layoutContainer(props));

      instance.resizeHandler();

      expect(props.router.replace).toHaveBeenCalledWith(ROUTES.INDEX.PATH);
    });

    it('should not redirect', () => {
      isMobileView.mockReturnValue(true);

      ({ instance } = layoutContainer(props));

      instance.resizeHandler();

      expect(props.router.replace).not.toHaveBeenCalled();
    });
  });

  describe('checks `injectMonths` instance method', () => {
    it('when elements do not exist', () => {
      mockedQuerySelector.mockReturnValueOnce([]);

      const retVal = instance.injectMonths();

      expect(retVal).toBe(false);
    });

    it('when elements exist', () => {
      const retVal = instance.injectMonths();

      expect(retVal).toBe(true);
    });
  });

  it('checks `clearDateRange` instance method', () => {
    instance.clearDateRange();

    expect(store.dispatch).toHaveBeenCalledWith(setSearchDestinationDates(null));
  });

  it('checks `createMinMonth` instance method', () => {
    const min = instance.createMinMonth();

    expect(min).toMatchSnapshot();
  });

  describe('checks `loadPrevMonth` instance method', () => {
    it('should load prev month', () => {
      jest.spyOn(instance, 'createMinMonth').mockImplementationOnce(() => moment(new Date('2/20/2000')).subtract(20, 'month'));

      const retVal = instance.loadPrevMonth();

      expect(retVal).toBe(true);
    });

    it('should not load prev month', () => {
      const retVal = instance.loadPrevMonth();

      expect(retVal).toBe(false);
    });
  });

  it('checks `loadNextMonth` instance method', () => {
    const date = instance.loadNextMonth();

    expect(setStateSpy).toHaveBeenCalledWith(
      { activeStartDate: date.toDate() },
      instance.updateMonthNames,
    );
  });

  it('checks `updateMonthNames` instance method', () => {
    const retVal = instance.updateMonthNames();

    expect(retVal).toBe(true);
  });

  describe('checks `tileDisabled` instance method', () => {
    it('should return false', () => {
      const retVal = instance.tileDisabled({ date: new Date() });

      expect(retVal).toBe(false);
    });

    it('should return true', () => {
      const date = moment(new Date('2/20/2000')).subtract(20, 'month');

      const retVal = instance.tileDisabled({ date });

      expect(retVal).toBe(true);
    });
  });

  describe('checks `search` instance method', () => {
    it('should back', () => {
      instance.search();

      expect(store.dispatch).toHaveBeenCalledWith(searchDestination());
    });

    it('should search', () => {
      container.setProps({ shouldGoBack: 'true' });

      instance.search();

      expect(props.router.back).toHaveBeenCalled();
    });
  });
});
