import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import mockedSelectedSlots from 'views/Dashboard/Calendar/__mocks__/mockedSelectedSlots';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import mockedCamperPricing from 'views/AddNewCamper/Pricing/__mocks__/mockedCamperPricing';

import DefaultNightRate, { DefaultNightRateContainer } from '../container';

jest.mock('state/concepts/calendar/selectors', () => ({
  selectedSlotsSelector: jest.fn(() => mockedSelectedSlots),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperPricingSelector: jest.fn(() => mockedCamperPricing),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

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

describe('DefaultNightRate container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    setFieldValue: jest.fn(),
    setValues: jest.fn(),
    setFormikState: jest.fn(),
    values: {
      isOpened: true,
      isCustomCost: true,
    },
    dirty: true,
    isValid: true,
    submitForm: jest.fn(),
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<DefaultNightRate {...props} />);
    container = diveTo(wrapper, DefaultNightRateContainer);
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

  describe('checks `toggleCustomPrice` instance method', () => {
    it('when is checked', () => {
      const isChecked = true;

      const res = instance.toggleCustomPrice(isChecked);

      expect(res).toMatchSnapshot();
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });

    it('when is not checked', () => {
      const isChecked = false;

      const res = instance.toggleCustomPrice(isChecked);

      expect(res).toMatchSnapshot();
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });
  });
});
