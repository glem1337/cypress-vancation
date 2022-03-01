import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { FETCH_CAMPER_CALENDAR_BOUNDARIES } from 'constants/calendar';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import { fetchCamperCalendar } from 'state/concepts/camper/actions';

import AskQuestionModal, { AskQuestionModalContainer } from '../container';

jest.mock('state/concepts/calendar/selectors', () => ({
  camperBlockedPeriodsSelector: jest.fn(() => ({
    '2000-02-20': true,
  })),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

describe('AskQuestionModal container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    fetchCamperCalendar: jest.fn(),
    isValid: true,
    camperId: 'camperId',
    values: {
      dateRange: null,
      description: '',
    },
    placeholder: 'Title placeholder',
    onClose: jest.fn(),
  };

  const wrapper = shallow(<AskQuestionModal {...props} />);
  const container = diveTo(wrapper, AskQuestionModalContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `onActiveStartDateChange` instance method', () => {
    const activeStartDate = new Date();
    instance.onActiveStartDateChange({ activeStartDate });

    expect(store.dispatch).toHaveBeenCalledWith(
      fetchCamperCalendar({
        camperId: props.camperId,
        startDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(activeStartDate).startDate,
        endDate: FETCH_CAMPER_CALENDAR_BOUNDARIES(activeStartDate).endDate,
      }),
    );
  });

  describe('checks `isFormValid` instance getter', () => {
    it('should return false', () => {
      expect(instance.isFormValid).toBe(false);
    });

    it('should return true', () => {
      container.setProps({
        values: {
          dateRange: [],
        },
      });

      expect(instance.isFormValid).toBe(true);
    });
  });
});
