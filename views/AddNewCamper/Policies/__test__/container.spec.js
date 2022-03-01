import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { CAMPER_INCLUSION } from 'constants/camper';
import ROUTES from 'constants/routes';
import intl from 'utils/testHelpers/fakeIntl';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import { checkPreviousStepCompleteness, fetchCamper } from 'state/concepts/camper/actions';
import { showModal, hideModal } from 'state/modal/actions';
import { createRouteFromPathname } from 'utils/createRouteHelper';
import { dataDeleteEntity } from 'state/data/actions';

import mockedCamperPolicies from 'views/__mocks__/camperPolicy';

import PoliciesWrapper, { PoliciesContainer } from '../container';

jest.mock('state/concepts/camper/selectors', () => ({
  camperPoliciesSelector: jest.fn(() => mockedCamperPolicies),
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

describe('Policies container tests', () => {
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
    intl,
    camperId: 'camperId',
    dirty: true,
    isValid: true,
    setFieldValue: jest.fn(),
    handleSubmit: jest.fn(),
    validateForm: jest.fn(),
    values: {
      booking_approval_policy: '',
      cancellation_policy: '',
    },
    isSubmitting: false,
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<PoliciesWrapper {...props} />);
    container = diveTo(wrapper, PoliciesContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(container.props().mapPropsToValues((container.props()))).toMatchSnapshot();
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      store,
      query: {
        camper_id: 'camperId',
      },
    };

    const inclusions = [
      CAMPER_INCLUSION.OWNER,
      CAMPER_INCLUSION.CAMPER_RULE,
      CAMPER_INCLUSION.PRICING_INFO.WEEK_NIGHT_PRICE,
      CAMPER_INCLUSION.PRICING_INFO.INDEX,
    ];

    await PoliciesContainer.getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      1,
      dataDeleteEntity({
        kind: 'camperRule',
      }),
    );

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      2,
      fetchCamper(ctx.query.camper_id, inclusions.join(',')),
    );

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      3,
      checkPreviousStepCompleteness({
        key: ROUTES.ADD_NEW_CAMPER.POLICIES.KEY,
        camperId: 'camperId',
        ctx,
      }),
    );

    expect(store.logicMiddleware.whenComplete).toHaveBeenCalled();
  });

  it('injects `intl` prop to Policies wrapped container', () => {
    expect(wrapper.props().intl).not.toBeUndefined();
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
      createRouteFromPathname(ROUTES.ADD_NEW_CAMPER.LISTING_FEES.PATH, props.camperId),
    );

    expect(store.dispatch).toHaveBeenCalledWith(
      hideModal(),
    );
  });

  it('tests `saveAndGoBack` instance method', async () => {
    await instance.saveAndGoBack();

    const route = createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.LISTING_FEES.PATH,
      props.camperId,
    );

    expect(props.handleSubmit).toHaveBeenCalled();
    expect(props.setFieldValue).toHaveBeenCalledWith('redirectRoute', route);
    expect(store.dispatch).toHaveBeenCalledWith(
      hideModal(),
    );
  });
});
