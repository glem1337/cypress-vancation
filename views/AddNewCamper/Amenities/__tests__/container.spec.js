import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as R from 'ramda';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import ROUTES from 'constants/routes';
import {
  CAMPER_AMENITIES_INCLUSIONS,
  FETCH_CAMPER_AMENITIES_INCLUSIONS,
} from 'constants/camperAmenities';

import {
  checkPreviousStepCompleteness,
  fetchCamper,
  fetchCamperAmenities,
} from 'state/concepts/camper/actions';
import { hideModal, showModal } from 'state/modal/actions';
import { showMessage } from 'state/flash-messages/actions';
import { MESSAGE_TYPE } from 'state/flash-messages/messagesTypes';

import mockedAmenities from 'views/__mocks__/mockedAmenities';
import Amenities, { AmenitiesContainer } from '../container';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

jest.mock('formik', () => ({
  withFormik: (config) => (Component) => (props) => {
    const extended = {
      ...props,
      ...config,
      validationSchema: () => config.validationSchema,
    };

    return <Component {...extended} />;
  },
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('utils/form/handleSubmit', () => ({
  handleSubmitWithProps: jest.fn(() => jest.fn()),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperPossibleAmenitiesSelector: jest.fn(() => mockedAmenities),
  isCamperExistSelector: jest.fn(() => true),
  camperCompletenessSelector: jest.fn(() => 44),
  leavePageMethodSelector: jest.fn(() => jest.fn()),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<Amenities {...props} />, {
    disableLifecycleMethods: false,
  });
  const container = diveTo(wrapper, AmenitiesContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('Amenities container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();
  store.logicMiddleware = {
    whenComplete: jest.fn(),
  };

  const props = {
    store,
    router: {
      push: jest.fn(),
    },
    isValid: true,
    dirty: true,
    camperId: 'camperId',
    errors: {},
    touched: {},
    showMessage: jest.fn(),
    showModal: jest.fn(),
    hideModal: jest.fn(),
    setFieldValue: jest.fn(),
    setFormikState: jest.fn(),
    validateForm: jest.fn(),
    handleSubmit: jest.fn(),
    values: {
      amenities: [
        {
          id: '1',
          title: 'Climate control',
          icon: '/images/listing/amenities-svg/climate_control/air_conditioning.svg',
          configurationAmenityOptions: [
            {
              id: '1',
              title: 'Сeiling fan',
              icon: '/images/listing/amenities-svg/climate_control/ceiling-fan.svg',
              state: false,
              configurationSubAmenities: [
                {
                  id: '1',
                  title: 'Сeiling fan',
                  icon: '/images/listing/amenities-svg/climate_control/ceiling-fan.svg',
                  state: false,
                },
              ],
            },
          ],
        },
      ],
    },
  };

  let container = null;
  let instance = null;

  beforeEach(() => {
    ({ container, instance } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(
      container.props().mapPropsToValues(container.props()),
    ).toMatchSnapshot();
  });

  it('checks validationSchema configs', () => {
    expect(container.props().validationSchema).toMatchSnapshot();
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

      const goBackSpy = jest
        .spyOn(instance, 'goBack')
        .mockImplementationOnce(() => jest.fn());

      await instance.onBackButtonClick();

      expect(props.validateForm).toHaveBeenCalled();
      expect(store.dispatch).not.toHaveBeenCalled();
      expect(goBackSpy).toHaveBeenCalled();
    });
  });

  it('tests `goBack` instance method', async () => {
    instance.goBack();

    expect(props.router.push).toHaveBeenCalledWith(
      createRouteFromPathname(
        ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
        props.camperId,
      ),
    );

    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
  });

  it('tests `saveAndGoBack` instance method', async () => {
    await instance.saveAndGoBack();

    const route = createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.SPECIFICATIONS.PATH,
      props.camperId,
    );

    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    expect(props.setFieldValue).toHaveBeenCalledWith('redirectRoute', route);
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      store,
      query: {
        camper_id: 'camperId',
      },
    };

    await AmenitiesContainer.getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenCalledTimes(3);

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      1,
      fetchCamperAmenities(FETCH_CAMPER_AMENITIES_INCLUSIONS.join(',')),
    );

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      2,
      fetchCamper(ctx.query.camper_id, CAMPER_AMENITIES_INCLUSIONS.join(',')),
    );

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      3,
      checkPreviousStepCompleteness({
        key: ROUTES.ADD_NEW_CAMPER.AMENITIES.KEY,
        camperId: ctx.query.camper_id,
        ctx,
      }),
    );

    expect(store.logicMiddleware.whenComplete).toHaveBeenCalled();
  });

  describe('checks `handleSwitchChange` instance method', () => {
    const amenityIndex = 0;
    const optionIndex = 0;

    it('when is checked', () => {
      const isChecked = true;

      instance.handleSwitchChange({ amenityIndex, optionIndex })(isChecked);

      expect(props.setFormikState).toHaveBeenCalledTimes(0);
    });

    it('when is not checked', () => {
      const isChecked = false;

      instance.handleSwitchChange({ amenityIndex, optionIndex })(isChecked);

      expect(props.setFormikState).toHaveBeenCalledTimes(1);
      expect(props.setFormikState).toHaveBeenCalledWith({
        errors: props.errors,
        touched: props.touched,
        values: props.values,
      });
    });
  });

  describe('checks `addCustomAccommodation` instance method', () => {
    it('default', () => {
      instance.addCustomAccommodation(0)();

      const fieldValue = props.values.amenities;

      fieldValue[0].configurationCustomAmenities = [
        {
          id: 'uuid/v4',
          name: '',
          quantity: 1,
        },
      ];

      expect(props.setFieldValue).toHaveBeenCalledWith('amenities', fieldValue);
    });

    it('when configurationCustomAmenities.length === MAX_CUSTOM_ACCOMMODATIONS', () => {
      const newProps = {
        ...props,
        values: {
          amenities: [
            {
              id: '1',
              title: 'Climate control',
              icon: '/images/listing/amenities-svg/climate_control/air_conditioning.svg',
              configurationCustomAmenities: R.repeat(
                {
                  id: '1',
                  name: '',
                  quantity: 1,
                },
                10,
              ),
            },
          ],
        },
      };

      const { instance: newInstance } = layoutContainer(newProps);

      newInstance.addCustomAccommodation(0)();

      expect(store.dispatch).toHaveBeenCalledWith(
        showMessage({
          messageSubTitle: {
            id: 'validations.maxAllowedNumber',
          },
          messageType: MESSAGE_TYPE.WARN,
        }),
      );
      expect(newProps.setFieldValue).not.toHaveBeenCalled();
    });
  });

  it('checks `removeCustomAccommodation` instance method', () => {
    instance.removeCustomAccommodation({ amenityIndex: 0, index: 0 })();

    const fieldValue = props.values.amenities;

    fieldValue[0].configurationCustomAmenities.splice(0, 1);

    expect(props.setFieldValue).toHaveBeenCalledWith('amenities', fieldValue);
  });

  it('checks `onMaxAccommodationQuantityCallback` instance method', () => {
    instance.onMaxAccommodationQuantityCallback();

    expect(store.dispatch).toHaveBeenCalledWith(
      showMessage({
        messageSubTitle: {
          id: 'addNewCamper.amenities.maxAccommodationNumber',
        },
        messageType: MESSAGE_TYPE.WARN,
      }),
    );
  });

  it('checks `onMaxCustomAccommodationQuantityCallback` instance method', () => {
    instance.onMaxCustomAccommodationQuantityCallback();

    expect(store.dispatch).toHaveBeenCalledWith(
      showMessage({
        messageSubTitle: {
          id: 'validations.maxAllowedNumber',
        },
        messageType: MESSAGE_TYPE.WARN,
      }),
    );
  });

  describe('checks `handleValidateOnSubmit` instance method', () => {
    it('default', () => {
      expect(instance.handleValidateOnSubmit()).toEqual(false);
    });

    it('when data is valid', () => {
      const newProps = {
        ...props,
        values: {
          amenities: [
            {
              title: 'Accomodation',
              configurationSubAmenities: [
                {
                  state: true,
                },
              ],
            },
          ],
        },
      };
      const { instance: newInstance } = layoutContainer(newProps);

      newInstance.handleValidateOnSubmit();

      expect(newInstance.handleValidateOnSubmit()).toEqual(true);
    });

    it('when data isn`t valid', () => {
      const newProps = {
        ...props,
        values: {
          amenities: [
            {
              title: 'Accomodation',
              configurationSubAmenities: [
                {
                  state: false,
                },
              ],
              configurationAmenityOptions: [
                {
                  state: true,
                  configurationSubAmenities: [
                    {
                      state: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      };
      const { instance: newInstance } = layoutContainer(newProps);
      jest.clearAllMocks();

      newInstance.handleValidateOnSubmit();

      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenNthCalledWith(
        1,
        showMessage({
          messageSubTitle: {
            id: 'addNewCamper.amenities.accommodationRequired',
          },
          messageType: MESSAGE_TYPE.WARN,
        }),
      );

      expect(store.dispatch).toHaveBeenNthCalledWith(
        2,
        showMessage({
          messageSubTitle: {
            id: 'addNewCamper.amenities.amenityRequired',
          },
          messageType: MESSAGE_TYPE.WARN,
        }),
      );
    });
  });

  describe('tests `leavePage` instance method', () => {
    it('with saving', async () => {
      const handleValidateOnSubmitSpy = jest.spyOn(
        instance,
        'handleValidateOnSubmit',
      );

      await instance.leavePage(true, 'test')();

      expect(handleValidateOnSubmitSpy).toHaveBeenCalled();

      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });

    it('without saving', async () => {
      const handleValidateOnSubmitSpy = jest.spyOn(
        instance,
        'handleValidateOnSubmit',
      );

      await instance.leavePage(false, 'test')();

      expect(handleValidateOnSubmitSpy).not.toHaveBeenCalled();
      expect(props.router.push).toHaveBeenCalledWith('test');

      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });
  });
});
