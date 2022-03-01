import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import mockedSelectedSlots from 'views/Dashboard/Calendar/__mocks__/mockedSelectedSlots';
import mockedCamperPricing from 'views/AddNewCamper/Pricing/__mocks__/mockedCamperPricing';

import MinNightStay, { MinNightStayContainer } from '../container';

jest.mock('formik', () => ({
  withFormik: (config) => (Component) => props => {
    const extended = {
      ...props,
      ...config,
      validationSchema: () => config.validationSchema,
    };

    return <Component {...extended} />;
  },
}));

jest.mock('state/concepts/calendar/selectors', () => ({
  selectedSlotsSelector: jest.fn(() => mockedSelectedSlots),
  customMinNightStayForSingleDateSelector: jest.fn(() => 34),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperPricingSelector: jest.fn(() => mockedCamperPricing),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('utils/calendar/withPopovers', () => jest.fn((Component) => (props) => (
  <Component
    {...props}
    isOpened={false}
    isBackPopoverVisible={false}
    isDiscardPopoverVisible={false}
    isSavePopoverVisible={false}
    checkOpenedState={jest.fn()}
    showPopover={jest.fn()}
    showPopoverOrBack={jest.fn()}
    closePopover={jest.fn()}
    closeAllPopovers={jest.fn()}
    closePopoversAndBack={jest.fn()}
    closePopoversAndSave={jest.fn()}
    toggleOpenedState={jest.fn()}
  />
)));

describe('MinNightStay container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    values: {
      isOpened: true,
      minimalNightStay: 9,
    },
    setFieldValue: jest.fn(),
    isLoading: false,
    isSubmitting: false,
    camperId: 'camperId',
    isValid: true,
    submitForm: jest.fn(),
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<MinNightStay {...props} />);
    container = diveTo(wrapper, MinNightStayContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(container.props().mapPropsToValues((container.props()))).toMatchSnapshot();
  });

  it('checks `componentDidUpdate` instance method', () => {
    instance.componentDidUpdate(props);

    expect(instance.props.checkOpenedState).toHaveBeenCalled();
  });
});
