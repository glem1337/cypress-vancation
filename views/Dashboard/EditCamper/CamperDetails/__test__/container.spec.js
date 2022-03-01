import { shallow } from 'enzyme';
import * as R from 'ramda';
import configureStore from 'redux-mock-store';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import { createRouteFromPathname } from 'utils/createRouteHelper';

import ROUTES from 'constants/routes';
import {
  START_RANGE_LENGTH_CAMPER,
  FINISH_RANGE_LENGTH_CAMPER,
  START_RANGE_LENGTH_CAMPER_FLOAT,
  FINISH_RANGE_LENGTH_CAMPER_FLOAT,
  START_RANGE_AGE_CAMPER,
  CAMPER_INCLUSION,
} from 'constants/camper';

import {
  fetchCamper,
  updateCamperSpecification,
  fetchSpecificationsAction,
} from 'state/concepts/camper/actions';
import { hideModal } from 'state/modal/actions';
import CamperDetailsWrapper, {
  CamperDetailsContainer,
} from 'views/Dashboard/EditCamper/CamperDetails/container';

import {
  mockedVehicleModel,
  mockedVehicleTypes,
  mockedVehicleMake,
} from 'views/__mocks__/mockSpecifications';
import mockedCamper from 'views/__mocks__/camper';

jest.mock('state/concepts/camper/selectors', () => ({
  vehicleMakeSelector: jest.fn(() => mockedVehicleMake),
  vehicleTypeSelector: jest.fn(() => mockedVehicleTypes),
  vehicleModelSelector: jest.fn(() => mockedVehicleModel),
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

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

describe('CamperDetails container tests', () => {
  let wrapper;
  let container;
  let instance;
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    setValues: jest.fn(),
    setFieldValue: jest.fn(),
    camperId: 'test',
    isLoading: true,
    isValid: true,
    values: {},
    router: {
      push: jest.fn(),
    },
  };

  beforeEach(() => {
    wrapper = shallow(<CamperDetailsWrapper {...props} />);
    container = diveTo(wrapper, CamperDetailsContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('container snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(container.props().validationSchema()).toMatchSnapshot();
  });

  it('checks mapPropsToValues configs', () => {
    expect(
      container.props().mapPropsToValues(container.props()),
    ).toMatchSnapshot();
  });

  describe('tests `leavePage` instance method', () => {
    it('with saving', async () => {
      await instance.leavePage(true, 'test')();

      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });

    it('without saving', async () => {
      await instance.leavePage(false, 'test')();

      expect(props.router.push).toHaveBeenCalledWith('test');

      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });
  });

  it('tests "getInitialProps" static method', async () => {
    const ctx = {
      store,
      query: {
        camper: 'id',
      },
    };

    await CamperDetailsContainer.getInitialProps(ctx);

    expect(store.dispatch).toHaveBeenCalledWith(fetchSpecificationsAction());

    expect(store.dispatch).toHaveBeenCalledWith(
      fetchCamper('id', CAMPER_INCLUSION.SPECIFICATIONS_DETAILS),
    );
  });

  it('tests "submitData" instance getter', () => {
    const { camperId } = container.props();

    const result = R.compose(
      R.append({ camperId }),
      R.props([
        'values',
        'setErrors',
        'setSubmitting',
        'resetForm',
        'setErrors',
        'setValues',
      ]),
    )(container.props());

    expect(instance.submitData).toEqual(result);
  });

  it('tests "getYears" instance method', () => {
    const exp = R.range(START_RANGE_AGE_CAMPER, new Date().getFullYear() + 1)
      .map((elem) => ({ value: `${elem}`, label: `${elem}` }))
      .reverse();

    const result = instance.getYears();

    expect(result).toEqual(exp);
  });

  it('tests "getCamperLength" instance method', () => {
    const exp = [];
    const floatLength = R.range(
      START_RANGE_LENGTH_CAMPER_FLOAT,
      FINISH_RANGE_LENGTH_CAMPER_FLOAT,
    );

    for (
      let start = START_RANGE_LENGTH_CAMPER;
      start <= FINISH_RANGE_LENGTH_CAMPER;
      start += 1
    ) {
      exp.push({ value: `${start}`, label: `${start} \`` });
      if (floatLength.includes(start)) {
        exp.push({ value: `${start + 0.5}`, label: `${start + 0.5} \`` });
      }
    }

    const result = instance.getCamperLength();

    expect(result).toEqual(exp);
  });

  it('tests "currentMake" instance method', () => {
    const currentModelId = mockedVehicleModel[0].id;
    const models = ({ vehicleModels, id }) => ({
      id,
      models: R.map((elem) => R.prop(['id'], elem), vehicleModels),
    });
    const getMake = (elem) => elem.models.some((model) => model === currentModelId);
    const { id } = R.find(getMake, R.map(models, mockedVehicleMake));

    expect(instance.currentMake(currentModelId)).toEqual({
      id,
      name: mockedVehicleMake[0].name,
    });
  });

  it('tests "currentType" instance method', () => {
    const currentMakeId = mockedVehicleMake[0].id;
    const currentModel = R.compose(
      R.find(({ makes }) => makes.some((make) => make === currentMakeId)),
      R.map(({ vehicleMakes, id }) => ({
        id,
        makes: R.map((elem) => R.prop(['id'], elem), vehicleMakes),
      })),
    )(mockedVehicleTypes);

    expect(instance.currentType(currentMakeId)).toEqual({
      id: currentModel.id,
      name: mockedVehicleTypes[0].name,
    });
  });

  it('tests "firstModel" instance method', () => {
    const currentMakeName = mockedVehicleMake[0].name;
    const value = R.compose(
      R.prop(0),
      R.propOr([], 'vehicleModels'),
      R.find((item) => item.name === currentMakeName),
      R.defaultTo([]),
    )(mockedVehicleMake);

    expect(instance.firstModel(currentMakeName)).toEqual(value);
  });

  it('tests "handlerMake" instance method', () => {
    const currentItem = { value: mockedVehicleMake[0].name, name: 'name' };
    const setItem = ({ id, name, iconUrl }) => ({
      id,
      value: name,
      img: iconUrl,
      label: name,
    });

    const currentTypeSpyOn = jest.spyOn(instance, 'currentType');
    const firstModelSpyOn = jest.spyOn(instance, 'firstModel');

    const prepareMakeItem = R.map(setItem, mockedVehicleMake);
    const currentMake = R.find(
      (modelElem) => modelElem.label === currentItem.value,
      prepareMakeItem,
    );

    instance.handlerMake(currentItem, prepareMakeItem);

    expect(currentTypeSpyOn).toHaveBeenCalledTimes(1);
    expect(currentTypeSpyOn).toHaveBeenCalledWith(currentMake.id);

    expect(firstModelSpyOn).toHaveBeenCalledTimes(1);
    expect(firstModelSpyOn).toHaveBeenCalledWith(currentItem.value);
  });

  it('tests "vehicleTypes" instance getter', () => {
    const exp = R.compose(
      R.map(({ id, name, iconUrl, estimatedEarning }) => ({
        id,
        value: name,
        img: iconUrl,
        label: name,
        estimatedEarning,
      })),
    )(mockedVehicleTypes);

    expect(instance.vehicleTypes).toEqual(exp);
  });

  it('tests "vehicleMake" instance getter', () => {
    const prepareMakes = R.compose(
      R.map(({ id, name, iconUrl }) => ({
        id,
        value: name,
        img: iconUrl,
        label: name,
      })),
    )(mockedVehicleMake);

    const exp = R.unionWith(
      R.eqBy(R.prop('value')),
      prepareMakes,
      prepareMakes,
    );

    expect(instance.vehicleMake).toEqual(exp);
  });

  it('tests "builtCamper" instance getter', () => {
    const exp = mockedVehicleModel.map(({ builderName }) => ({
      value: builderName,
      label: builderName,
    }));

    expect(instance.builtCamper).toEqual(exp);
  });

  describe('tests "vehicleModel" instance getter', () => {
    it('without filter', () => {
      const model = R.compose(
        R.sortBy(R.prop('value')),
        R.map(({
 id, name, builderName, insideHeigh, length,
}) => ({
          id,
          value: name,
          label: name,
          builderName,
          insideHeigh,
          length,
        })),
      )(mockedVehicleModel);

      expect(instance.vehicleModel).toEqual(model);
    });

    it('with filter', () => {
      const nameMake = mockedVehicleMake[0].name;

      container.setProps({
        values: { ...props.values, name: nameMake },
      });

      const filteredModels = R.compose(
        R.map((elem) => elem.id),
        R.propOr([], 'vehicleModels'),
        R.find((elem) => elem.name === nameMake),
      )(mockedVehicleMake);

      const model = R.compose(
        R.sortBy(R.prop('value')),
        R.filter((elem) => filteredModels.includes(elem.id)),
        R.map(({
 id, name, builderName, insideHeigh, length,
}) => ({
          id,
          value: name,
          label: name,
          builderName,
          insideHeigh,
          length,
        })),
      )(mockedVehicleModel);

      expect(instance.vehicleModel).toEqual(model);
    });
  });

  it('tests "handleSubmit" instance method', async () => {
    await instance.handleSubmit();

    const { camperId } = container.props();

    const result = R.compose(
      R.append({ camperId }),
      R.props([
        'values',
        'setErrors',
        'setSubmitting',
        'resetForm',
        'setErrors',
        'setValues',
      ]),
    )(container.props());

    const route = createRouteFromPathname(
      ROUTES.OWNER_DASHBOARD.EDIT_CAMPER.ADDONS.PATH,
      null,
      {
        camper: camperId,
      },
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(props.setFieldValue).toHaveBeenCalledWith('redirectRoute', route);
    expect(store.dispatch).toHaveBeenCalledWith(
      updateCamperSpecification(...result),
    );
  });
});
