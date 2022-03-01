import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';

import { CUSTOM_RESTRICTION_KEYS } from 'constants/dashboardRulesAndTravels';
import { CAMPER_INCLUSION } from 'constants/camper';

import { deleteCamperCustomRestrictions, fetchCamper } from 'state/concepts/camper/actions';

import mockedCamper from 'views/__mocks__/camper';

import RulesAndTravels, { RulesAndTravelsContainer } from '../container';

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

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  isCamperExistSelector: jest.fn(() => true),
  camperSelector: jest.fn(() => mockedCamper),
}));

describe('RulesAndTravels container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    isValid: true,
    handleSubmit: jest.fn(),
    setFieldValue: jest.fn(),
    camperId: '1',
    values: {
      customRestrictionRules: [{ id: 1 }],
    },
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<RulesAndTravels {...props} />);
    container = diveTo(wrapper, RulesAndTravelsContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('container snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(
      container.props().mapPropsToValues(container.props()),
    ).toMatchSnapshot();
  });

  it('tests "getInitialProps" static method', async () => {
    const ctx = {
      store,
      query: {
        camper: 'id',
      },
    };

    const inclusions = [
      CAMPER_INCLUSION.CAMPER_ADDITION.RESTRICTION_RULE,
      CAMPER_INCLUSION.CAMPER_ADDITION.TRAVEL_RESTRICTION,
      CAMPER_INCLUSION.CAMPER_ADDITION.RESTRICTION_ROAD,
      CAMPER_INCLUSION.CAMPER_ADDITION.CUSTOM_RESTRICTION_RULES,
      CAMPER_INCLUSION.CAMPER_ADDITION.CUSTOM_TRAVEL_RESTRICTIONS,
      CAMPER_INCLUSION.CAMPER_ADDITION.CUSTOM_RESTRICTION_ROADS,
    ];

    await RulesAndTravelsContainer.getInitialProps(ctx);

    expect(store.dispatch).toHaveBeenCalledWith(fetchCamper('id', inclusions.join(',')));
  });

  describe('tests "onRemoveCustomRule" instance method', () => {
    it('when id is present', () => {
      instance.onRemoveCustomRule({
        id: 1,
        index: 0,
        keyProp: CUSTOM_RESTRICTION_KEYS.RULES,
      })();

      expect(store.dispatch).toHaveBeenCalledWith(
        deleteCamperCustomRestrictions({
          id: 1,
          camperId: '1',
          customRestrictionType: CUSTOM_RESTRICTION_KEYS.RULES,
        }),
      );
    });

    it('when id isn`t present', () => {
      instance.onRemoveCustomRule({
        id: null,
        index: 0,
        keyProp: CUSTOM_RESTRICTION_KEYS.RULES,
      })();

      const rules = props.values[CUSTOM_RESTRICTION_KEYS.RULES].filter(
        (_, idx) => idx !== 0,
      );

      expect(props.setFieldValue).toHaveBeenCalledWith(
        CUSTOM_RESTRICTION_KEYS.RULES,
        rules,
      );
    });
  });

  it('tests "onAddCustomRule" instance method', () => {
    instance.onAddCustomRule('customRestrictionRules')();

    const rules = [
      ...props.values.customRestrictionRules,
      {
        listId: 'uuid/v4',
        id: null,
        name: '',
        active: false,
      },
    ];

    expect(props.setFieldValue).toHaveBeenCalledWith(
      'customRestrictionRules',
      rules,
    );
  });
});
