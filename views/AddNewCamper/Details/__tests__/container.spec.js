import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';
import ROUTES from 'constants/routes';
import { checkPreviousStepCompleteness, fetchCamper } from 'state/concepts/camper/actions';
import { showModal, hideModal } from 'state/modal/actions';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import { loadingSelector } from 'state/data/selectors';

import mockedCamper from '../__mocks__/camper';

import ListingDetails, { ListingDetailsContainer } from '../container';

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
      validationSchema: () => config.validationSchema,
    };

    return <Component {...extended} />;
  },
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<ListingDetails {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, ListingDetailsContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('ListingDetails container tests', () => {
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
    camperId: 'test id',
    dirty: true,
    isValid: true,
    setFieldValue: jest.fn(),
    handleSubmit: jest.fn(),
    validateForm: jest.fn(),
    values: {
      listingName: '',
      listingDescription: '',
    },
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    ({
      wrapper,
      container,
      instance,
    } = layoutContainer(props));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(container.props().mapPropsToValues((container.props()))).toMatchSnapshot();
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      query: {
        camper_id: 'test id',
      },
      store,
    };

    await ListingDetailsContainer.getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenCalledWith(
      fetchCamper(ctx.query.camper_id, 'delivery_information'),
    );

    expect(ctx.store.dispatch).toHaveBeenCalledWith(
      checkPreviousStepCompleteness({
        key: ROUTES.ADD_NEW_CAMPER.LISTING_DETAILS.KEY,
        camperId: 'test id',
        ctx,
      }),
    );

    expect(store.logicMiddleware.whenComplete).toHaveBeenCalled();
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
      createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.INSURANCE.PATH, props.camperId),
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      hideModal(),
    );
  });

  it('tests `saveAndGoBack` instance method', async () => {
    await instance.saveAndGoBack();

    const route = createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.INSURANCE.PATH,
      props.camperId,
    );

    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    expect(props.setFieldValue).toHaveBeenCalledWith('redirectRoute', route);
    expect(props.handleSubmit).toHaveBeenCalled();
  });

  describe('tests `canSaveAndContinue` instance getter', () => {
    it('when form is not valid', () => {
      const { canSaveAndContinue } = instance;

      expect(canSaveAndContinue).toBe(false);
    });

    it('when form is valid', () => {
      loadingSelector.mockReturnValueOnce(false);

      ({ instance } = layoutContainer({
        ...props,
        values: {
          listingName: 'test',
          listingDescription: '',
        },
      }));

      const { canSaveAndContinue } = instance;

      expect(canSaveAndContinue).toBe(true);
    });
  });
});
