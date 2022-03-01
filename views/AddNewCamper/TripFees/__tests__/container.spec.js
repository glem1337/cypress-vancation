import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ROUTES from 'constants/routes';
import { CAMPER_INCLUSION, TRIP_FEES } from 'constants/camper';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import { checkPreviousStepCompleteness, deleteCustomTripFee, fetchCamper } from 'state/concepts/camper/actions';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import mockedTripFee from 'views/__mocks__/tripFee';
import mockedCamper from 'views/__mocks__/camper';
import { showModal, hideModal } from 'state/modal/actions';
import fakeIntl from 'utils/testHelpers/fakeIntl';
import { dataDeleteEntity } from 'state/data/actions';

import TripFees, { TripFeesContainer } from '../container';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
  camperCompletenessSelector: jest.fn(() => 44),
  leavePageMethodSelector: jest.fn(() => jest.fn()),
}));

jest.mock('formik', () => ({
  withFormik: (config) => (Component) => props => {
    const extended = {
      ...config,
      ...props,
      validationSchema: config.validationSchema,
    };

    return <Component {...extended} />;
  },
}));

describe('TripFees container tests', () => {
  window.scrollTo = jest.fn();

  const store = configureStore()({});
  store.dispatch = jest.fn();
  store.logicMiddleware = {
    whenComplete: jest.fn(),
  };

  const props = {
    store,
    camperId: 'test id',
    setFieldValue: jest.fn(),
    setFormikState: jest.fn(),
    touched: {},
    errors: {},
    values: {
      cleaningAndPreparationFee: '',
      mileage: {
        mode: 'unlimited',
        included: 150,
        overage: 0.5,
      },
      generator: {
        hasGenerator: false,
        mode: 'unlimited',
        included: 4,
        overage: 5,
      },
      customFees: {},
    },
    router: {
      push: jest.fn(),
    },
    intl: fakeIntl,
    isValid: true,
    dirty: true,
    handleSubmit: jest.fn(),
    validateForm: jest.fn(),
  };

  let wrapper = null;
  let container = null;
  let instance = null;
  let scrollContainerToBottomSpy = null;

  beforeEach(() => {
    wrapper = shallow(<TripFees {...props} />, { disableLifecycleMethods: true });
    container = diveTo(wrapper, TripFeesContainer);
    instance = container.instance();
    scrollContainerToBottomSpy = jest.spyOn(instance, 'scrollContainerToBottom');
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(container.props().mapPropsToValues((container.props()))).toMatchSnapshot();
  });

  it('checks validationSchema configs', () => {
    expect(container.props().validationSchema).toMatchSnapshot();
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      store,
      query: {
        camper_id: 'camper_id',
      },
    };

    await TripFeesContainer.getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      1,
      dataDeleteEntity({
        kind: 'tripFee',
      }),
    );

    const inclusions = [
      CAMPER_INCLUSION.TRIP_FEE.INDEX,
      CAMPER_INCLUSION.TRIP_FEE.TRIP_FEE_MILEAGE,
      CAMPER_INCLUSION.TRIP_FEE.TRIP_FEE_GENERATOR,
      CAMPER_INCLUSION.TRIP_FEE.CUSTOM_FEES,
      CAMPER_INCLUSION.PRICING_INFO.WEEK_NIGHT_PRICE,
      CAMPER_INCLUSION.PRICING_INFO.INDEX,
    ];

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      2,
      fetchCamper(ctx.query.camper_id, inclusions.join(',')),
    );

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      3,
      checkPreviousStepCompleteness({
        key: ROUTES.ADD_NEW_CAMPER.LISTING_FEES.KEY,
        camperId: 'camper_id',
        ctx,
      }),
    );

    expect(store.logicMiddleware.whenComplete).toHaveBeenCalled();
  });

  describe('checks `isUnlimitedMileageMode` static method', () => {
    it('should return false', () => {
      const res = TripFeesContainer.isUnlimitedMileageMode(TRIP_FEES.MILEAGE_VALUES.LIMITED);

      expect(res).toBe(false);
    });

    it('should return true', () => {
      const res = TripFeesContainer.isUnlimitedMileageMode(TRIP_FEES.MILEAGE_VALUES.UNLIMITED);

      expect(res).toBe(true);
    });
  });

  describe('checks `isUnlimitedGeneratorMode` static method', () => {
    it('should return false', () => {
      const res = TripFeesContainer.isUnlimitedGeneratorMode(TRIP_FEES.GENERATOR_VALUES.LIMITED);

      expect(res).toBe(false);
    });

    it('should return true', () => {
      const res = TripFeesContainer.isUnlimitedGeneratorMode(TRIP_FEES.GENERATOR_VALUES.UNLIMITED);

      expect(res).toBe(true);
    });
  });

  it('checks `getCustomFeeSchema` static method', () => {
    const schema = TripFeesContainer.getCustomFeeSchema({ id: 1 });

    expect(schema).toMatchSnapshot();
  });

  describe('checks `componentDidUpdate` instance method', () => {
    const scrollingElement = document.createElement('div');
    scrollingElement.classList.add('main-listing');
    document.body.appendChild(scrollingElement);

    it('when props are equal', () => {
      const prevProps = {
        values: {
          customFees: {},
        },
        isSidebarVisible: true,
      };

      instance.componentDidUpdate(prevProps);

      expect(scrollContainerToBottomSpy).not.toHaveBeenCalled();
    });

    it('when props are different', () => {
      const prevProps = {
        values: {
          customFees: {
            1: { id: 1 },
          },
        },
        isSidebarVisible: true,
      };

      instance.componentDidUpdate(prevProps);

      expect(scrollContainerToBottomSpy).toHaveBeenCalled();
    });
  });

  it('checks `scrollContainerToBottom` instance method', () => {
    const res = instance.scrollContainerToBottom();

    expect(res).toBe(true);
  });

  describe('checks `onMilesModeChange` instance method', () => {
    it('for limited mode', () => {
      const event = {
        target: {
          value: TRIP_FEES.MILEAGE_VALUES.LIMITED,
        },
      };

      const res = instance.onMilesModeChange(event);

      expect(res).toMatchSnapshot();
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });

    it('for unlimited mode', () => {
      const event = {
        target: {
          value: TRIP_FEES.MILEAGE_VALUES.UNLIMITED,
        },
      };

      const res = instance.onMilesModeChange(event);

      expect(res).toMatchSnapshot();
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });
  });

  describe('checks `onGeneratorExistenceChange` instance method', () => {
    it('when is checked', () => {
      const isChecked = true;

      const res = instance.onGeneratorExistenceChange(isChecked);

      expect(res).toMatchSnapshot();
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });

    it('when is not checked', () => {
      const isChecked = false;

      const res = instance.onGeneratorExistenceChange(isChecked);

      expect(res).toMatchSnapshot();
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });
  });

  describe('checks `onGeneratorModeChange` instance method', () => {
    it('for limited mode', () => {
      const event = {
        target: {
          value: TRIP_FEES.GENERATOR_VALUES.LIMITED,
        },
      };

      const res = instance.onGeneratorModeChange(event);

      expect(res).toMatchSnapshot();
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });

    it('for unlimited mode', () => {
      const event = {
        target: {
          value: TRIP_FEES.GENERATOR_VALUES.UNLIMITED,
        },
      };

      const res = instance.onGeneratorModeChange(event);

      expect(res).toMatchSnapshot();
      expect(props.setFormikState).toHaveBeenCalledWith(res);
    });
  });

  it('checks `addCustomFee` instance method', () => {
    instance.addCustomFee();

    expect(props.setFieldValue).toHaveBeenCalledWith('customFees', {
      ...props.values.customFees,
      'uuid/v4': {
        id: 'uuid/v4',
        name: '',
        price: '',
        frequency: TRIP_FEES.FREQUENCY_OPTIONS.PER_DAY.VALUE,
      },
    });
  });

  it('checks `determineInitialValues` static method', () => {
    const containerProps = {
      camper: { tripFee: mockedTripFee },
    };

    const res = TripFeesContainer.determineInitialValues(containerProps);

    expect(res).toMatchSnapshot();
  });

  describe('checks `removeCustomFee` instance method', () => {
    it('for local fee', () => {
      container.setProps({
        values: {
          ...props.values,
          customFees: {
            1: { id: 1 },
          },
        },
      });

      instance.removeCustomFee({ id: 1 })();

      expect(props.setFieldValue).toHaveBeenCalledWith('customFees', {});
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });

    it('for remote fee', () => {
      container.setProps({
        values: {
          ...props.values,
          customFees: {
            1: { id: 1, fromServer: true },
          },
        },
      });

      instance.removeCustomFee({ id: 1, fromServer: true })();

      expect(props.setFieldValue).toHaveBeenCalledWith('customFees', {});
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(deleteCustomTripFee({
        feeId: 1,
        camperId: props.camperId,
      }));
    });
  });

  it('checks `removeCustomFeePrepare` static method', () => {
    const fee = {
      id: 1,
    };

    jest.spyOn(instance, 'removeCustomFee').mockReturnValueOnce('removeCustomFee');

    instance.removeCustomFeePrepare(fee)();

    expect(store.dispatch).toHaveBeenCalledWith(showModal({
      modalType: 'REMOVE_SIGNATURE_MODAL',
      modalProps: {
        id: fee.id,
        title: fakeIntl.formatMessage({ id: 'addNewCamper.tripFees.removeModal.title' }),
        subTitle: fakeIntl.formatMessage({ id: 'addNewCamper.tripFees.removeModal.subTitle' }),
        cancel: instance.props.hideModal,
        remove: 'removeCustomFee',
      },
    }));
  });

  it('checks `onFrequencyChanged` instance method', () => {
    container.setProps({
      values: {
        ...props.values,
        customFees: {
          1: { id: 1, frequency: '' },
        },
      },
    });

    instance.onFrequencyChanged(1)('test');

    const newCustomFeeSection = {
      1: { id: 1, frequency: 'test' },
    };

    expect(props.setFieldValue).toHaveBeenCalledWith('customFees', newCustomFeeSection);
  });

  describe('tests `onBackButtonClick` instance method', () => {
    it('when form is valid', async () => {
      await instance.onBackButtonClick();

      expect(props.validateForm).toHaveBeenCalled();

      expect(store.dispatch).toHaveBeenCalledWith(
        showModal({
          modalType: 'LEAVE_PAGE_MODAL',
          modalProps: {
            discard: instance.goBack,
            save: instance.saveAndGoBack,
          },
        }),
      );
    });

    it('when form is not valid', async () => {
      container.setProps({
        isValid: false,
      });

      const goBackSpy = jest.spyOn(instance, 'goBack').mockImplementationOnce(() => jest.fn());

      await instance.onBackButtonClick();

      expect(props.validateForm).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(goBackSpy).toHaveBeenCalled();
    });
  });

  it('tests `goBack` instance method', async () => {
    instance.goBack();

    expect(props.router.push).toHaveBeenCalledWith(
      createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.PRICING.PATH, props.camperId),
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      hideModal(),
    );
  });

  it('tests `saveAndGoBack` instance method', async () => {
    await instance.saveAndGoBack();

    const route = createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.PRICING.PATH,
      props.camperId,
    );

    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    expect(props.setFieldValue).toHaveBeenCalledWith('redirectRoute', route);
    expect(props.handleSubmit).toHaveBeenCalled();
  });
});
