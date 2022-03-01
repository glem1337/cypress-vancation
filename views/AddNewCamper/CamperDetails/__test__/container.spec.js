import { shallow } from 'enzyme';
import * as R from 'ramda';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import configureStore from 'redux-mock-store';
import describeValidationSchema from 'utils/testHelpers/describeValidationSchema';
import {
  fetchSpecificationsAction,
  fetchCamper,
  setEstimateEarningData,
} from 'state/concepts/camper/actions';
import CamperDetailsWrapper, { CamperDetailsContainer } from 'views/AddNewCamper/CamperDetails/container';
import {
  START_RANGE_LENGTH_CAMPER, FINISH_RANGE_LENGTH_CAMPER,
  START_RANGE_LENGTH_CAMPER_FLOAT, FINISH_RANGE_LENGTH_CAMPER_FLOAT, START_RANGE_AGE_CAMPER,
} from 'constants/camper';
import {
  mockedVehicleModel, mockedVehicleTypes, mockedVehicleMake,
} from 'views/__mocks__/mockSpecifications';
import { isUserLoggedInSelector } from 'state/concepts/session/selectors';
import mockedCamper from 'views/__mocks__/camper';

import { hideModal } from '../../../../state/modal/actions';

jest.mock('utils/form/isSubmitDisabled', () => jest.fn(() => true));

jest.mock('state/concepts/camper/selectors', () => ({
  vehicleMakeSelector: jest.fn(() => mockedVehicleMake),
  vehicleTypeSelector: jest.fn(() => mockedVehicleTypes),
  vehicleModelSelector: jest.fn(() => mockedVehicleModel),
  camperSelector: jest.fn(() => mockedCamper),
  camperCompletenessSelector: jest.fn(() => 22),
  isCamperExistSelector: jest.fn(() => true),
  isSidebarVisibleSelector: jest.fn(() => true),
  estimateEarningStateSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/session/selectors', () => ({
  ...jest.requireActual('state/concepts/session/selectors'),
  isUserLoggedInSelector: jest.fn(() => true),
}));

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

describe('CamperDetails Container', () => {
  let wrapper;
  let container;
  let instance;
  const store = configureStore()({});
  store.dispatch = jest.fn();
  store.logicMiddleware = {
    whenComplete: jest.fn(),
  };

  const defaultProps = {
    store,
    setValues: jest.fn(),
    setFieldValue: jest.fn(),
    camperId: 'test',
    router: {
      push: jest.fn(),
    },
    handleSubmit: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<CamperDetailsWrapper {...defaultProps} />);
    container = diveTo(wrapper, CamperDetailsContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('container snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('has validation schema', () => {
    expect(describeValidationSchema(wrapper)).toMatchSnapshot();
  });

  describe('tests "getInitialProps" static method', () => {
    const ctx = {
      store,
      query: {
        camper_id: 'id',
      },
    };

    it('should fetch specifications', async () => {
      await CamperDetailsContainer.getInitialProps(ctx);

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenNthCalledWith(1, fetchSpecificationsAction());
    });

    it('should not fetch specifications', async () => {
      isUserLoggedInSelector.mockReturnValueOnce(false);

      await CamperDetailsContainer.getInitialProps(ctx);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should fetch camper', async () => {
      const newCtx = {
        store,
        query: {
          camper_id: 'test id',
        },
      };

      await CamperDetailsContainer.getInitialProps(newCtx);

      expect(store.dispatch).toHaveBeenCalledWith(fetchCamper('test id', 'specification_detail'));
      expect(store.logicMiddleware.whenComplete).toHaveBeenCalled();
    });
  });

  it('tests "isLoading" instance getter', () => {
    expect(instance.isLoading).toEqual(false);
  });

  it('tests "submitData" instance getter', () => {
    const { camperId } = container.props();

    const result = R.compose(
      R.append({ camperId }),
      R.props(['values', 'setErrors', 'setSubmitting', 'resetForm', 'setErrors', 'setValues']),
    )(container.props());

    expect(instance.submitData).toEqual(result);
  });

  it('tests "getYears" instance method', () => {
    const exp = R.range(START_RANGE_AGE_CAMPER, new Date().getFullYear() + 1)
      .map(elem => ({ value: `${elem}`, label: `${elem}` }))
      .reverse();

    const result = instance.getYears();

    expect(result).toEqual(exp);
  });

  it('tests "getCamperLength" instance method', () => {
    const exp = [];
    const floatLength = R.range(START_RANGE_LENGTH_CAMPER_FLOAT, FINISH_RANGE_LENGTH_CAMPER_FLOAT);

    for (let start = START_RANGE_LENGTH_CAMPER; start <= FINISH_RANGE_LENGTH_CAMPER; start += 1) {
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
      models: R.map(elem => R.prop(['id'], elem), vehicleModels),
    });
    const getMake = elem => elem.models.some(model => model === currentModelId);
    const { id } = R.find(getMake, R.map(models, mockedVehicleMake));

    expect(instance.currentMake(currentModelId)).toEqual({ id, name: mockedVehicleMake[0].name });
  });

  it('tests "currentType" instance method', () => {
    const currentMakeId = mockedVehicleMake[0].id;
    const currentModel = R.compose(
      R.find(({ makes }) => makes.some(make => make === currentMakeId)),
      R.map(({ vehicleMakes, id }) => ({ id, makes: R.map(elem => R.prop(['id'], elem), vehicleMakes) })),
    )(mockedVehicleTypes);

    expect(instance.currentType(currentMakeId))
      .toEqual({ id: currentModel.id, name: mockedVehicleTypes[0].name });
  });

  it('tests "firstModel" instance method', () => {
    const currentMakeName = mockedVehicleMake[0].name;
    const value = R.compose(
      R.prop(0),
      R.propOr([], 'vehicleModels'),
      R.find(item => item.name === currentMakeName),
      R.defaultTo([]),
    )(mockedVehicleMake);

    expect(instance.firstModel(currentMakeName)).toEqual(value);
  });

  it('tests "handlerMake" instance method', () => {
    const currentItem = { value: mockedVehicleMake[0].name, name: 'name' };
    const setItem = ({ id, name, iconUrl }) => ({ id, value: name, img: iconUrl, label: name });

    const currentTypeSpyOn = jest.spyOn(instance, 'currentType');
    const firstModelSpyOn = jest.spyOn(instance, 'firstModel');

    const prepareMakeItem = R.map(setItem, mockedVehicleMake);
    const currentMake = R.find(modelElem => modelElem.label === currentItem.value, prepareMakeItem);

    instance.handlerMake(currentItem, prepareMakeItem);

    expect(currentTypeSpyOn).toHaveBeenCalledTimes(1);
    expect(currentTypeSpyOn).toHaveBeenCalledWith(currentMake.id);

    expect(firstModelSpyOn).toHaveBeenCalledTimes(1);
    expect(firstModelSpyOn).toHaveBeenCalledWith(currentItem.value);
  });

  it('tests "vehicleTypes" instance getter', () => {
    const exp = R.compose(
      R.map(({
        id, name, iconUrl, estimatedEarning,
      }) => ({
        id, value: name, img: iconUrl, label: name, estimatedEarning,
      })),
    )(mockedVehicleTypes);

    expect(instance.vehicleTypes).toEqual(exp);
  });

  it('tests "vehicleMake" instance getter', () => {
    const prepareMakes = R.compose(
      R.map(({ id, name, iconUrl }) => ({ id, value: name, img: iconUrl, label: name })),
    )(mockedVehicleMake);

    const exp = R.unionWith(R.eqBy(R.prop('value')), prepareMakes, prepareMakes);

    expect(instance.vehicleMake).toEqual(exp);
  });

  it('tests "builtCamper" instance getter', () => {
    const exp = mockedVehicleModel
      .map(({ builderName }) => ({ value: builderName, label: builderName }));

    expect(instance.builtCamper).toEqual(exp);
  });

  describe('tests "vehicleModel" instance getter', () => {
    it('without filter', () => {
      const model = R.compose(
        R.sortBy(R.prop('value')),
        R.map(({
           id, name, builderName, insideHeigh, length,
        }) => ({
            id, value: name, label: name, builderName, insideHeigh, length,
        })),
      )(mockedVehicleModel);

      expect(instance.vehicleModel).toEqual(model);
    });

    it('with filter', () => {
      const nameMake = mockedVehicleMake[0].name;

      container.setProps({ values: { ...defaultProps.values, name: nameMake } });

      const filteredModels = R.compose(
        R.map(elem => elem.id),
        R.propOr([], 'vehicleModels'),
        R.find(elem => elem.name === nameMake),
      )(mockedVehicleMake);

      const model = R.compose(
        R.sortBy(R.prop('value')),
        R.filter(elem => filteredModels.includes(elem.id)),
        R.map(({
          id, name, builderName, insideHeigh, length,
        }) => ({
          id, value: name, label: name, builderName, insideHeigh, length,
        })),
      )(mockedVehicleModel);

      expect(instance.vehicleModel).toEqual(model);
    });
  });

  it('tests "componentDidUpdate" instance method', () => {
    const estimateEarning = {
      name: mockedVehicleTypes[0].name,
      iconUrl: mockedVehicleTypes[0].iconUrl,
      estimatedEarning: mockedVehicleTypes[0].estimatedEarning,
    };

    container.setProps({ values: {
        vehicleTypeName: mockedVehicleTypes[0].name,
      } });

    instance.componentDidUpdate({
      values: {
        vehicleTypeName: '',
      },
    });

    expect(store.dispatch).toHaveBeenCalledWith(setEstimateEarningData(estimateEarning));
  });

  describe('tests `isFormValid` instance getter', () => {
    it('when camper id is correct', () => {
      container.setProps({ camperId: 'test' });

      const { isFormValid } = instance;

      expect(isFormValid).toBe(true);
    });

    it('when camper id is incorrect', () => {
      container.setProps({ camperId: 'id' });

      const { isFormValid } = instance;

      expect(isFormValid).toBe(false);
    });
  });

  describe('tests `leavePage` instance method', () => {
    it('with saving', async () => {
      await instance.leavePage(true, 'test')();

      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });

    it('without saving', async () => {
      await instance.leavePage(false, 'test')();

      expect(defaultProps.router.push).toHaveBeenCalledWith('test');

      expect(store.dispatch).toHaveBeenCalledWith(hideModal());
    });
  });
});
