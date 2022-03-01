import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import moment from 'moment';
import { Navigate } from 'react-big-calendar';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import redirect from 'utils/redirect';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';
import { fetchSelf } from 'state/concepts/users/actions';
import {
  setCurrentDate,
  setSelectedSlots,
  setAvailabilityVisibility,
} from 'state/concepts/calendar/actions';
import mockedCamper from 'views/__mocks__/camper';
import { fetchCamperCalendar } from 'state/concepts/camper/actions';

import DashboardCalendar, { DashboardCalendarContainer } from '../container';

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    session: {
      currentUser: {
        email: 'test@gmail.com',
        user: {
          lastName: 'lastName_test',
          firstName: 'firstName_test',
          avatarUrl: 'test_url',
        },
      },
    },
  })),
  isUserLoggedInSelector: jest.fn(() => true),
}));

const mockedMoment = moment();
jest.mock('state/concepts/calendar/selectors', () => ({
  currentDateSelector: jest.fn(() => mockedMoment),
  isAvailabilityVisibleSelector: jest.fn(() => true),
  isSettingsVisibleSelector: jest.fn(() => true),
  isFooterVisibleSelector: jest.fn(() => false),
  camperBlockedEventsSelector: jest.fn(() => []),
  camperBlockedExternalCalendarSelector: jest.fn(() => []),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  camperExternalCalendarsSelector: jest.fn(),
}));

const mockedQuerySelector = jest.fn(() => [
  {
    scrollHeight: 123,
    clientHeight: 12,
    parentElement: {
      style: {},
      parentElement: {
        style: {},
      },
    },
  },
]);

jest.mock('utils/redirect', () => jest.fn());

describe('DashboardCalendar container', () => {
  Object.defineProperty(
    document,
    'querySelectorAll',
    { value: mockedQuerySelector },
  );

  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'test id',
    router: {
      pathname: '/some/path/to/page',
      query: {
        camper: 'test-id',
      },
    },
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<DashboardCalendar {...props} />);
    container = diveTo(wrapper, DashboardCalendarContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('tests "getInitialProps" static method', () => {
    const ctx = {
      store,
      query: {
        camper: 'test id',
      },
    };

    it('should fetch specifications', async () => {
      await DashboardCalendarContainer.getInitialProps(ctx);

      expect(store.dispatch).toHaveBeenNthCalledWith(
        1,
        fetchCamperCalendar({ camperId: ctx.query.camper }),
      );
    });

    it('should not fetch specifications', async () => {
      isUserLoggedInSelector.mockReturnValueOnce(false);

      await DashboardCalendarContainer.getInitialProps(ctx);

      expect(store.dispatch).not.toHaveBeenCalledWith(fetchSelf());
    });
  });

  it('checks `formats` instance method', () => {
    const formats = instance.formats();

    expect(formats).toEqual({
      weekdayFormat: instance.weekdayFormat,
    });
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('when camper id is same', () => {
      const checkScrollContainersSpy = jest.spyOn(
        instance,
        'checkScrollContainers',
      );

      instance.componentDidUpdate({ router: props.router });

      expect(redirect).not.toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(checkScrollContainersSpy).toHaveBeenCalled();
    });

    it('when camper id isn`t same', () => {
      const checkScrollContainersSpy = jest.spyOn(
        instance,
        'checkScrollContainers',
      );

      instance.componentDidUpdate({
        router: {
          query: {
            camper: 'not-the-same-test-id',
          },
        },
      });

      expect(redirect).toHaveBeenCalledWith(props.router);
      expect(store.dispatch).toHaveBeenCalledWith(setCurrentDate(moment()));
      expect(checkScrollContainersSpy).toHaveBeenCalled();
    });
  });

  it('checks `weekdayFormat` instance method', () => {
    const formatter = { format: jest.fn(() => 'format') };

    instance.weekdayFormat('date', null, formatter);

    expect(formatter.format).toHaveBeenCalledWith('date', 'dddd', null);
  });

  describe('checks `onNavigate` instance method', () => {
    it('when prev step is disabled', async () => {
      const date = moment(new Date('2/20/2000')).subtract(20, 'month').startOf('month');

      instance.onNavigate(date, null, Navigate.PREVIOUS);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('when next step is disabled', async () => {
      const date = moment(new Date('2/20/2000')).add(40, 'month').startOf('month');

      instance.onNavigate(date, null, Navigate.NEXT);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('with correct date', async () => {
      const date = moment(new Date('2/20/2000')).add(4, 'month');

      instance.onNavigate(date, null, Navigate.NEXT);

      expect(store.dispatch).toHaveBeenCalledWith(setCurrentDate(moment(date)));
      expect(store.dispatch).toHaveBeenCalledWith(
        fetchCamperCalendar({
          camperId: props.camperId,
          startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).startDate,
          endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(date).endDate,
        }),
      );
    });
  });

  describe('checks `onSelectSlot` instance method', () => {
    it('for actual dates', () => {
      const data = {
        start: new Date(),
        end: new Date(),
        slots: [new Date()],
      };

      instance.onSelectSlot(data);

      expect(store.dispatch).toHaveBeenNthCalledWith(1, setSelectedSlots(data));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, setAvailabilityVisibility(true));
    });

    it('for not actual dates', () => {
      const data = {
        start: new Date(),
        end: new Date(),
        slots: [
          moment().subtract(1, 'days').toDate(),
          moment().subtract(2, 'days').toDate(),
        ],
      };

      instance.onSelectSlot(data);

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('checks `checkScrollContainers` instance method', () => {
    it('should return false', async () => {
      instance.isAdjustingHeight = true;

      const res = await instance.checkScrollContainers();

      expect(res).toBe(false);
    });

    it('should return true', async () => {
      const res = await instance.checkScrollContainers();

      expect(res).toBe(true);
    });

    it('should return false as error', async () => {
      mockedQuerySelector.mockReturnValueOnce([{
        scrollHeight: 111,
        clientHeight: 11,
      }]);

      const res = await instance.checkScrollContainers();

      expect(res).toBe(false);
    });
  });
});
