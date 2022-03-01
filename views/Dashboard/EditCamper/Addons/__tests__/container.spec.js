import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';

import { PRICE_UNIT_TYPES } from 'constants/dashboardAddons';
import { CAMPER_INCLUSION } from 'constants/camper';

import { hideModal, showModal } from 'state/modal/actions';
import { fetchTravelAccessoriesConfig } from 'state/concepts/travel-accessories/actions';
import { fetchCamper } from 'state/concepts/camper/actions';

import mockedCamper from 'views/__mocks__/camper';
import mockedAddons from 'views/__mocks__/mockedAddons';

import Addons, { AddonsContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/travel-accessories/selectors', () => ({
  travelAccessoriesSelector: jest.fn(() => mockedAddons),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
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

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4'),
}));

describe('Addons container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'test id',
    setFieldValue: jest.fn(),
    handleSubmit: jest.fn(),
    isValid: true,
    values: {
      customAddons: [
        {
          id: 1,
        },
      ],
    },
  };

  let wrapper;
  let container;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<Addons {...props} />);
    container = diveTo(wrapper, AddonsContainer);
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
        camper: props.camperId,
      },
    };

    await AddonsContainer.getInitialProps(ctx);

    expect(store.dispatch).toHaveBeenCalledWith(fetchTravelAccessoriesConfig());

    const inclusions = [
      CAMPER_INCLUSION.CAMPER_ADDITION.CAMPER_TRAVEL_ACCESSORIES,
      CAMPER_INCLUSION.CAMPER_ADDITION.CUSTOM_TRAVEL_ACCESSORIES,
    ];

    expect(store.dispatch).toHaveBeenCalledWith(
      fetchCamper(props.camperId, inclusions.join(',')),
    );
  });

  it('tests "removeCustomAddon" instance method', async () => {
    await instance.removeCustomAddon(0);

    const customAddons = props.values.customAddons.filter(
      (_, index) => index !== 0,
    );

    expect(props.setFieldValue).toHaveBeenCalledWith(
      'customAddons',
      customAddons,
    );
    expect(store.dispatch).toHaveBeenCalledWith(hideModal());
  });

  it('tests "onRemoveCustomAddon" instance method', () => {
    instance.onRemoveCustomAddon({ index: 0, addonId: 'addonId' })();

    expect(store.dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'REMOVE_CUSTOM_ADDON_MODAL',
        modalProps: {
          onRemove: instance.removeCustomAddon,
          index: 0,
          addonId: 'addonId',
          camperId: props.camperId,
        },
      }),
    );
  });

  it('tests "onAddCustomAddon" instance method', () => {
    instance.onAddCustomAddon();

    const customAddons = [
      ...props.values.customAddons,
      {
        listId: 'uuid/v4',
        id: null,
        active: true,
        name: '',
        price: undefined,
        description: '',
        maxAmount: undefined,
        priceUnit: PRICE_UNIT_TYPES.EACH,
      },
    ];

    expect(props.setFieldValue).toHaveBeenCalledWith(
      'customAddons',
      customAddons,
    );
  });
});
