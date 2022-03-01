import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as R from 'ramda';

import { GLAMPER_ITEM_CONFIG } from 'constants/camperDetails/amenities';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import isPresent from 'utils/isPresent';

import mockedAmenity from 'views/CamperDetails/Amenities/__mocks__/mockedAmenity';
import Amenities, { AmenitiesContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => true),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => ({
    amenities: [mockedAmenity],
  })),
  isCamperExistSelector: jest.fn(() => true),
}));

describe('Amenities container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'camperId',
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<Amenities {...props} />);
    container = diveTo(wrapper, AmenitiesContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `glamper` instance getter', () => {
    const { camper } = container.props();
    const glamperConfig = [];
    const glamperSubAmenities = [];

    camper.amenities.forEach((amenity) => {
      const configSubAmenities = R.pathOr(
        [],
        ['configurationAmenity', 'configurationSubAmenities'],
        amenity,
      );

      configSubAmenities.forEach((subAmenity) => {
        if (subAmenity.glamperSubAmenity) {
          glamperConfig.push(subAmenity);
        }
      });

      const configOptions = R.pathOr(
        [],
        ['configurationAmenity', 'configurationAmenityOptions'],
        amenity,
      );

      configOptions.forEach(({ configurationSubAmenities }) => {
        configurationSubAmenities.forEach((subAmenity) => {
          if (subAmenity.glamperSubAmenity) {
            glamperConfig.push(subAmenity);
          }
        });
      });

      const subAmenities = R.pathOr([], ['subAmenities'], amenity);

      subAmenities.forEach((subAmenity) => {
        const { configurationSubAmenity } = subAmenity;
        if (configurationSubAmenity.glamperSubAmenity) {
          glamperSubAmenities.push(subAmenity);
        }
      });

      const options = R.pathOr([], ['amenityOptions'], amenity);

      options.forEach((option) => {
        // eslint-disable-next-line no-shadow
        const { subAmenities } = option;

        subAmenities.forEach((subAmenity) => {
          const { configurationSubAmenity } = subAmenity;
          if (configurationSubAmenity.glamperSubAmenity) {
            glamperSubAmenities.push(subAmenity);
          }
        });
      });
    });

    const expected = {
      configurationAmenity: {
        ...GLAMPER_ITEM_CONFIG,
        configurationSubAmenities: glamperConfig,
        configurationAmenityOptions: [],
      },
      subAmenities: glamperSubAmenities,
    };

    expect(instance.glamper).toEqual(expected);
  });

  it('checks `items` instance getter', () => {
    const { camper } = container.props();

    const expected = camper.amenities.filter(
      (item) => isPresent(item.subAmenities) || isPresent(item.amenityOptions),
    );

    expect(instance.items).toEqual(expected);
  });

  it('checks `togglePanels` instance method', () => {
    instance.togglePanels();

    const expected = [instance.glamper, ...instance.items].map(
      ({ configurationAmenity }) => configurationAmenity.id,
    );

    expect(container.state().allPanelsActive).toBe(true);
    expect(container.state().activePanelIds).toEqual(expected);

    instance.togglePanels();

    expect(container.state().allPanelsActive).toBe(false);
    expect(container.state().activePanelIds).toEqual([]);
  });

  it('checks `onCollapseChangeHandler` instance method', () => {
    const ids = ['1', '2'];
    instance.onCollapseChangeHandler(ids);

    const expected = [instance.glamper, ...instance.items].length === ids.length;

    expect(container.state().allPanelsActive).toBe(expected);
    expect(container.state().activePanelIds).toEqual(ids);
  });
});
