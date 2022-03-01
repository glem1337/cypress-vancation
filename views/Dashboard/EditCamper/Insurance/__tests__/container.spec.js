import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';

import { CAMPER_INCLUSION } from 'constants/camper';
import { INSURANCE_STATUS } from 'constants/camperInsurance';

import { fetchCamper } from 'state/concepts/camper/actions';
import { camperSelector } from 'state/concepts/camper/selectors';

import mockedCamper from 'views/__mocks__/camper';
import InsuranceWrapper, { InsuranceContainer } from '../container';

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

const layoutContainer = (props) => {
  const wrapper = shallow(<InsuranceWrapper {...props} />, {
    disableLifecycleMethods: false,
  });
  const container = diveTo(wrapper, InsuranceContainer);
  const instance = container.instance();

  return {
    wrapper,
    container,
    instance,
  };
};

describe('Insurance container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'test_camper_id',
    updateInsuranceInfo: jest.fn(),
    isValid: true,
    values: {
      stateRegistered: '',
    },
  };

  let container = null;
  let wrapper = null;
  let instance = null;

  beforeEach(() => {
    ({ container, wrapper, instance } = layoutContainer(props));
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  it('checks `getInitialProps` static method', async () => {
    const ctx = {
      query: {
        camper: 'test id',
      },
      store,
    };

    await InsuranceContainer.getInitialProps(ctx);

    expect(ctx.store.dispatch).toHaveBeenCalledTimes(1);

    expect(ctx.store.dispatch).toHaveBeenNthCalledWith(
      1,
      fetchCamper(ctx.query.camper, CAMPER_INCLUSION.INSURANCE_INFO),
    );
  });

  describe('checks `insuranceStatus` instance getter', () => {
    it('when status pending ', () => {
      expect(instance.insuranceStatus).toBe(INSURANCE_STATUS.PENDING);
    });

    it('when status approved ', () => {
      camperSelector.mockReturnValueOnce({
        insuranceInfo: {
          status: INSURANCE_STATUS.APPROVED,
        },
      });
      const newProps = {
        ...props,
        insuranceInfo: {
          status: INSURANCE_STATUS.APPROVED,
        },
      };
      const { instance: newInstance } = layoutContainer(newProps);

      expect(newInstance.insuranceStatus).toBe(INSURANCE_STATUS.APPROVED);
    });
  });

  describe('tests `canSave` instance getter', () => {
    it('when form is not valid', () => {
      expect(instance.canSave).toBe(false);
    });

    it('when form is valid', () => {
      camperSelector.mockReturnValueOnce({
        insuranceInfo: {
          stateRegistred: 'Alabama',
        },
      });

      ({ instance } = layoutContainer(props));

      expect(instance.canSave).toBe(true);
    });
  });
});
