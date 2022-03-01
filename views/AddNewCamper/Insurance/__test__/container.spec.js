import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import ROUTES from 'constants/routes';
import { checkPreviousStepCompleteness, fetchCamper, createInsuranceInfo } from 'state/concepts/camper/actions';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import InsuranceWrapper, { InsuranceContainer } from '../container';

jest.mock('state/concepts/camper/selectors', () => ({
  isCamperExistSelector: jest.fn(() => true),
  camperCompletenessSelector: jest.fn(() => 22),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

describe('Insurance container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();
  store.logicMiddleware = {
    whenComplete: jest.fn(),
  };

  const props = {
    router: {
      push: jest.fn(),
    },
    store,
    camperId: 'test_camper_id',
  };

  const wrapper = shallow(<InsuranceWrapper {...props} />, { disableLifecycleMethods: true });
  const container = diveTo(wrapper, InsuranceContainer);
  const instance = container.instance();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `onBackButtonClick` instance method', () => {
    instance.onBackButtonClick();

    const route = createRouteFromPathname(
      ROUTES.ADD_NEW_CAMPER.AMENITIES.PATH,
      props.camperId,
    );

    expect(props.router.push).toHaveBeenCalledWith(route);
  });

  it('checks `onSaveButtonClick` instance method', () => {
    instance.onSaveButtonClick();

    expect(store.dispatch).toHaveBeenCalledWith(createInsuranceInfo(props.camperId));
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      query: {
        camper_id: 'test id',
      },
      store,
    };

    await InsuranceContainer.getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenCalledTimes(2);

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      1,
      fetchCamper(ctx.query.camper_id, 'insurance_info'),
    );

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      2,
      checkPreviousStepCompleteness({
        key: ROUTES.ADD_NEW_CAMPER.INSURANCE.KEY,
        camperId: 'test id',
        ctx,
      }),
    );

    expect(store.logicMiddleware.whenComplete).toHaveBeenCalled();
  });
});
