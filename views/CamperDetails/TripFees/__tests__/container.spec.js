import { shallow } from 'enzyme';
import * as R from 'ramda';
import configureStore from 'redux-mock-store';

import { DEFAULT_VALUES } from 'constants/camperTripFees';

import isPresent from 'utils/isPresent';
import diveTo from 'utils/testHelpers/diveToEnzyme';

import mockedCamper from 'views/__mocks__/camper';
import TripFees, { TripFeesContainer } from '../container';

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
}));

describe('TripFees container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
  };

  const wrapper = shallow(<TripFees {...props} />);
  const container = diveTo(wrapper, TripFeesContainer);
  const instance = container.instance();

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `isMileageLimited` instance getter', () => {
    const expected = R.pathOr(false, ['tripFee', 'tripFeeMileage', 'limit'], mockedCamper);

    expect(instance.isMileageLimited).toBe(expected);
  });

  it('checks `availableMiles` instance getter', () => {
    const expected = R.pathOr(
      DEFAULT_VALUES.MILEAGE.INCLUDED,
      ['tripFee', 'tripFeeMileage', 'available'],
      mockedCamper,
    );

    expect(instance.availableMiles).toBe(expected);
  });

  it('checks `overageMiles` instance getter', () => {
    const expected = R.pathOr(
      DEFAULT_VALUES.MILEAGE.OVERAGE,
      ['tripFee', 'tripFeeMileage', 'overage'],
      mockedCamper,
    );

    expect(instance.overageMiles).toBe(expected);
  });

  it('checks `hasGenerator` instance getter', () => {
    const expected = isPresent(mockedCamper.tripFee.tripFeeGenerator);

    expect(instance.hasGenerator).toBe(expected);
  });

  it('checks `isGeneratorLimited` instance getter', () => {
    const expected = R.pathOr(false, ['tripFee', 'tripFeeGenerator', 'limit'], mockedCamper);

    expect(instance.isGeneratorLimited).toBe(expected);
  });

  it('checks `availableGeneratorHours` instance getter', () => {
    const expected = R.pathOr(
      DEFAULT_VALUES.GENERATOR.INCLUDED,
      ['tripFee', 'tripFeeGenerator', 'available'],
      mockedCamper,
    );

    expect(instance.availableGeneratorHours).toBe(expected);
  });

  it('checks `overageGenerator` instance getter', () => {
    const expected = R.pathOr(
      DEFAULT_VALUES.GENERATOR.OVERAGE,
      ['tripFee', 'tripFeeGenerator', 'overage'],
      mockedCamper,
    );

    expect(instance.overageGenerator).toBe(expected);
  });

  it('checks `cleaningFee` instance getter', () => {
    const expected = R.pathOr(0, ['tripFee', 'cleaning'], mockedCamper);

    expect(instance.cleaningFee).toBe(expected);
  });

  it('checks `dumpingFee` instance getter', () => {
    const expected = R.pathOr(0, ['tripFee', 'dumpingFee'], mockedCamper);

    expect(instance.dumpingFee).toBe(expected);
  });

  it('checks `fuelFee` instance getter', () => {
    const expected = R.pathOr(0, ['tripFee', 'flue'], mockedCamper);

    expect(instance.fuelFee).toBe(expected);
  });

  it('checks `lateDropOff` instance getter', () => {
    const expected = R.pathOr(0, ['tripFee', 'lateDropOff'], mockedCamper);

    expect(instance.lateDropOff).toBe(expected);
  });

  it('checks `customFees` instance getter', () => {
    const expected = R.pathOr([], ['tripFee', 'customFees'], mockedCamper);

    expect(instance.customFees).toEqual(expected);
  });

  it('checks `ownerFeesIsPresent` instance getter', () => {
    const {
      cleaningFee,
      dumpingFee,
      fuelFee,
      lateDropOff,
      customFees,
    } = instance;

    const expected = Boolean(
      cleaningFee
        || dumpingFee
        || fuelFee
        || lateDropOff
        || isPresent(customFees),
    );

    expect(instance.ownerFeesIsPresent).toEqual(expected);
  });
});
