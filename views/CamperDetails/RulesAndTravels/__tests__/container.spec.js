import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as R from 'ramda';

import {
  DEFAULT_VISIBLE_RESTRICTIONS_COUNT,
  DEFAULT_VISIBLE_RULES_COUNT,
  ROADS_CONFIG,
  RULES_CONFIG,
  TRAVELS_CONFIG,
} from 'constants/camperDetails/rules';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import { fetchCamperTravelAssertions } from 'state/concepts/camper/actions';

import mockedCamper from 'views/__mocks__/camper';
import RulesAndTravels, { RulesAndTravelsContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock(
  'utils/hocs/withIntersectionObserver',
  () => () => (Component) => (props) => <Component onRef={jest.fn()} isVisible {...props} />,
);

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
}));

describe('RulesAndTravels container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'camperId',
  };

  let wrapper = null;
  let container = null;
  let instance = null;
  let setStateSpy = null;

  beforeEach(() => {
    wrapper = shallow(<RulesAndTravels {...props} />);
    container = diveTo(wrapper, RulesAndTravelsContainer);
    instance = container.instance();

    setStateSpy = jest.spyOn(instance, 'setState');

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  describe('checks `componentDidUpdate` instance method', () => {
    it('default', () => {
      instance.componentDidUpdate();

      expect(store.dispatch).toHaveBeenCalledWith(
        fetchCamperTravelAssertions(props.camperId),
      );
      expect(setStateSpy).toHaveBeenCalledWith({
        initialized: true,
      });
    });

    it('when no possibility to fetch data', () => {
      container.setProps({
        isVisible: false,
        isCamperExist: false,
      });

      instance.componentDidUpdate();

      expect(store.dispatch).not.toHaveBeenCalled();
      expect(setStateSpy).not.toHaveBeenCalled();
    });
  });

  it('checks `filterRules` instance method', () => {
    const rules = {
      foo: true,
      bar: false,
    };

    const result = instance.filterRules(rules)('foo');

    expect(result).toBe(true);
  });

  it('checks `getRuleConfigByKey` instance method', () => {
    const result = instance.getRuleConfigByKey('allowPets');

    expect(result).toBe(RULES_CONFIG.allowPets);
  });

  it('checks `rules` instance getter', () => {
    const { restrictionRule } = mockedCamper.camperAddition;

    const rulesArray = R.pipe(
      R.keys,
      R.filter((key) => restrictionRule[key] && key !== 'id'),
      R.map((key) => RULES_CONFIG[key]),
    )(restrictionRule);

    const customRules = R.pipe(
      R.pathOr([], ['customRestrictionRules']),
      R.filter((rule) => rule.active),
      R.map((rule) => ({
        id: rule.id,
        title: rule.name,
        available: true,
      })),
    )(mockedCamper.camperAddition);

    const expected = [...rulesArray, ...customRules];

    expect(instance.rules).toEqual(expected);
  });

  describe('checks `visibleRules` instance getter', () => {
    it('should show default visible rules', () => {
      const expected = instance.rules.slice(0, DEFAULT_VISIBLE_RULES_COUNT);

      expect(instance.visibleRules).toEqual(expected);
    });

    it('should show all rules', () => {
      instance.setState({
        allRulesVisible: true,
      });

      expect(instance.visibleRules).toEqual(instance.rules);
    });
  });

  it('checks `toggleVisibleRules` instance method', () => {
    instance.toggleVisibleRules();

    expect(container.state().allRulesVisible).toBe(true);

    instance.toggleVisibleRules();

    expect(container.state().allRulesVisible).toBe(false);
  });

  it('checks `locations` instance getter', () => {
    const { travelRestriction } = mockedCamper.camperAddition;

    const locationsArray = R.pipe(
      R.keys,
      R.filter((key) => key !== 'id'),
      R.map((key) => ({
        ...TRAVELS_CONFIG[key],
        available: travelRestriction[key],
      })),
    )(travelRestriction);

    const customLocations = R.pipe(
      R.pathOr([], ['customTravelRestrictions']),
      R.map((location) => ({
        id: location.id,
        title: location.name,
        available: location.active,
      })),
    )(mockedCamper.camperAddition);

    const expected = R.pipe(
      R.sort((a, b) => a.available - b.available),
      R.reverse,
    )([...customLocations, ...locationsArray]);

    expect(instance.locations).toEqual(expected);
  });

  describe('checks `visibleLocations` instance getter', () => {
    it('should show default visible locations', () => {
      const expected = instance.locations.slice(
        0,
        DEFAULT_VISIBLE_RESTRICTIONS_COUNT,
      );

      expect(instance.visibleLocations).toEqual(expected);
    });

    it('should show all locations', () => {
      instance.setState({
        allLocationsVisible: true,
      });

      expect(instance.visibleLocations).toEqual(instance.locations);
    });
  });

  it('checks `toggleVisibleLocations` instance method', () => {
    instance.toggleVisibleLocations();

    expect(container.state().allLocationsVisible).toBe(true);

    instance.toggleVisibleLocations();

    expect(container.state().allLocationsVisible).toBe(false);
  });

  it('checks `hasAvailableLocation` instance getter', () => {
    expect(instance.hasAvailableLocation).toBe(true);

    container.setProps({
      ...props,
      camper: {
        ...mockedCamper,
        camperAddition: {
          ...mockedCamper.camperAddition,
          travelRestriction: {
            mexico: false,
            canada: false,
            burningMan: false,
          },
          customTravelRestrictions: [
            {
              id: 1,
              active: false,
              name: 'name',
            },
          ],
        },
      },
    });

    expect(instance.hasAvailableLocation).toBe(false);
  });

  it('checks `roads` instance getter', () => {
    const { restrictionRoad } = mockedCamper.camperAddition;

    const roadsArray = R.pipe(
      R.keys,
      R.filter((key) => key !== 'id'),
      R.map((key) => ({
        ...ROADS_CONFIG[key],
        available: restrictionRoad[key],
      })),
    )(restrictionRoad);

    const customRoads = R.pipe(
      R.pathOr([], ['customRestrictionRoads']),
      R.map((road) => ({
        id: road.id,
        title: road.name,
        available: road.active,
      })),
    )(mockedCamper.camperAddition);

    const expected = R.pipe(
      R.sort((a, b) => a.available - b.available),
      R.reverse,
    )([...customRoads, ...roadsArray]);

    expect(instance.roads).toEqual(expected);
  });

  describe('checks `visibleRoads` instance getter', () => {
    it('should show default visible roads', () => {
      const expected = instance.roads.slice(
        0,
        DEFAULT_VISIBLE_RESTRICTIONS_COUNT,
      );

      expect(instance.visibleRoads).toEqual(expected);
    });

    it('should show all roads', () => {
      instance.setState({
        allRoadsVisible: true,
      });

      expect(instance.visibleRoads).toEqual(instance.roads);
    });
  });

  it('checks `toggleVisibleRoads` instance method', () => {
    instance.toggleVisibleRoads();

    expect(container.state().allRoadsVisible).toBe(true);

    instance.toggleVisibleRoads();

    expect(container.state().allRoadsVisible).toBe(false);
  });

  it('checks `hasAvailableRoad` instance getter', () => {
    expect(instance.hasAvailableRoad).toBe(true);

    container.setProps({
      ...props,
      camper: {
        ...mockedCamper,
        camperAddition: {
          ...mockedCamper.camperAddition,
          restrictionRoad: {
            fourWheelRoad: false,
            offRoad: false,
            snowAndIceRoad: false,
            dirtryRoad: false,
          },
          customRestrictionRoads: [
            {
              id: 1,
              active: false,
              name: 'name',
            },
          ],
        },
      },
    });

    expect(instance.hasAvailableRoad).toBe(false);
  });
});
