import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import {
  CAMPER_INCLUSION,
  POLICIES_FORM_DEFAULT_VALUES,
  POLICIES_FORM_VALUES,
} from 'constants/camper';
import intl from 'utils/testHelpers/fakeIntl';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import { fetchCamper } from 'state/concepts/camper/actions';
import { showModal, hideModal } from 'state/modal/actions';
import { dataDeleteEntity } from 'state/data/actions';
import { camperSelector } from 'state/concepts/camper/selectors';

import mockedCamperPolicies from 'views/__mocks__/camperPolicy';
import mockedCamper from 'views/__mocks__/camper';

import PoliciesWrapper, { PoliciesContainer } from '../container';

jest.mock('state/concepts/camper/selectors', () => ({
  camperPoliciesSelector: jest.fn(() => mockedCamperPolicies),
  isCamperExistSelector: jest.fn(() => true),
  camperSelector: jest.fn(() => mockedCamper),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('formik', () => ({
  withFormik: (config) => (Component) => (props) => {
    const extended = {
      ...config,
      ...props,
      validationSchema: () => config.validationSchema,
    };

    return <Component {...extended} />;
  },
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<PoliciesWrapper {...props} />, {
    disableLifecycleMethods: false,
  });
  const container = diveTo(wrapper, PoliciesContainer);
  const instance = container.instance();

  return {
    container,
    instance,
  };
};

describe('Policies container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    intl,
    camperId: 'camperId',
    isValid: true,
    setFormikState: jest.fn(),
    setFieldValue: jest.fn(),
    handleSubmit: jest.fn(),
    values: {
      bookingApprovalPolicy:
        POLICIES_FORM_DEFAULT_VALUES.BOOKING_APPROVAL_POLICY,
      cancellationPolicy: POLICIES_FORM_DEFAULT_VALUES.CANCELLATION_POLICY,
      requestNotice: POLICIES_FORM_DEFAULT_VALUES.REQUEST_NOTICE,
      autoBlockedDays: POLICIES_FORM_DEFAULT_VALUES.AUTO_BLOCKED_DAYS,
    },
    errors: {},
    touched: {},
    router: {
      push: jest.fn(),
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

  describe('tests `leavePage` instance method', () => {
    it('with saving', async () => {
      const handleValidateOnSubmitSpy = jest.spyOn(
        instance,
        'onSaveClickHandler',
      );

      await instance.leavePage(true, 'test')();

      expect(handleValidateOnSubmitSpy).toHaveBeenCalled();
    });

    it('without saving', async () => {
      const handleValidateOnSubmitSpy = jest.spyOn(
        instance,
        'onSaveClickHandler',
      );

      await instance.leavePage(false, 'test')();

      expect(handleValidateOnSubmitSpy).not.toHaveBeenCalled();
      expect(props.router.push).toHaveBeenCalledWith('test');

      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      store,
      query: {
        camper: 'camperId',
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
      fetchCamper(ctx.query.camper, inclusions.join(',')),
    );
  });

  it('injects `intl` prop to Policies container', () => {
    expect(container.props().intl).not.toBeUndefined();
  });

  describe('tests `requestNoticeChangeHandler` instance method', () => {
    it('when isn`t checked', () => {
      instance.requestNoticeChangeHandler(false);

      expect(props.setFieldValue).toHaveBeenCalledWith(
        'autoBlockedDays',
        POLICIES_FORM_DEFAULT_VALUES.AUTO_BLOCKED_DAYS,
      );
    });

    it('when is checked', () => {
      instance.requestNoticeChangeHandler(true);

      expect(props.setFieldValue).not.toHaveBeenCalled();
    });
  });

  it('tests `onReviewSelectHandler` instance method', () => {
    instance.onReviewSelectHandler();

    const formikState = {
      errors: {},
      touched: {},
      values: {
        ...props.values,
        autoBlockedDays: POLICIES_FORM_DEFAULT_VALUES.AUTO_BLOCKED_DAYS,
        requestNotice: POLICIES_FORM_DEFAULT_VALUES.REQUEST_NOTICE,
      },
    };

    expect(props.setFormikState).toHaveBeenCalledWith(formikState);
  });

  it('tests `onReviewClickHandler` instance method', async () => {
    await instance.onReviewClickHandler();

    expect(props.setFieldValue).toHaveBeenCalledWith(
      'bookingApprovalPolicy',
      POLICIES_FORM_VALUES.REVIEW,
    );

    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    expect(props.handleSubmit).toHaveBeenCalled();
  });

  describe('tests `onSaveClickHandler` instance method', () => {
    it('when user id isn`t verified', async () => {
      await instance.onSaveClickHandler();

      expect(store.dispatch).toHaveBeenCalledWith(
        showModal({
          modalType: 'EDIT_POLICIES_ID_VERIFICATION_MODAL',
          modalProps: {
            onReview: instance.onReviewClickHandler,
          },
        }),
      );
    });

    it('when user id is verified', async () => {
      camperSelector.mockReturnValueOnce({
        owner: {
          idVerified: true,
        },
      });

      const { instance: newInstance } = layoutContainer(props);

      await newInstance.onSaveClickHandler();

      expect(store.dispatch).not.toHaveBeenCalledWith(
        showModal({
          modalType: 'EDIT_POLICIES_ID_VERIFICATION_MODAL',
          modalProps: {
            onReview: instance.onReviewClickHandler,
          },
        }),
      );
    });

    it('when bookingApprovalPolicy !== instant_book', async () => {
      const newProps = {
        ...props,
        values: {
          ...props.values,
          bookingApprovalPolicy: POLICIES_FORM_VALUES.REVIEW,
        },
      };

      const { instance: newInstance } = layoutContainer(newProps);

      await newInstance.onSaveClickHandler();

      expect(store.dispatch).not.toHaveBeenCalledWith(
        showModal({
          modalType: 'EDIT_POLICIES_ID_VERIFICATION_MODAL',
          modalProps: {
            onReview: instance.onReviewClickHandler,
          },
        }),
      );
    });
  });
});
