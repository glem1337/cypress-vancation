import { shallow } from 'enzyme';
import * as R from 'ramda';

import { GLAMPER_DEFAULT_VISIBLE_ITEMS } from 'constants/camperDetails/amenities';

import isPresent from 'utils/isPresent';

import mockedAmenity from 'views/CamperDetails/Amenities/__mocks__/mockedAmenity';
import GlamperSection from '../container';

describe('GlamperSection container tests', () => {
  const props = {
    amenity: mockedAmenity,
    onCollapse: jest.fn(),
    activeKey: ['1'],
  };

  let container = null;
  let instance = null;

  beforeEach(() => {
    container = shallow(<GlamperSection {...props} />);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `toggleVisibility` instance method', () => {
    instance.toggleVisibility();

    expect(container.state().allItemsVisible).toBe(true);

    instance.toggleVisibility();

    expect(container.state().allItemsVisible).toBe(false);
  });

  it('checks `sortByAvailability` instance method', () => {
    const result = instance.sortByAvailability(
      { available: true },
      { available: false },
    );

    expect(result).toBe(1);
  });

  describe('checks `subAmenities` instance getter', () => {
    const {
      amenity: { subAmenities, configurationAmenity },
    } = props;

    it('when visible default count of items', () => {
      const expected = R.pipe(
        R.map((item) => {
          const selected = R.find(
            R.pipe(R.prop('configurationSubAmenity'), R.propEq('id', item.id)),
          )(subAmenities);

          return {
            id: item.id,
            iconUrl: item.iconUrl,
            title: item.title,
            tooltip: item.tooltip,
            available: isPresent(selected),
            quantity: selected?.quantity || 0,
          };
        }),
        R.sort((a, b) => a.available - b.available),
        R.reverse,
        R.filter((item) => item.available),
        R.slice(0, GLAMPER_DEFAULT_VISIBLE_ITEMS),
      )(configurationAmenity.configurationSubAmenities);

      expect(instance.subAmenities).toEqual(expected);
    });

    it('when visible all items', () => {
      const expected = R.pipe(
        R.map((item) => {
          const selected = R.find(
            R.pipe(R.prop('configurationSubAmenity'), R.propEq('id', item.id)),
          )(subAmenities);

          return {
            id: item.id,
            iconUrl: item.iconUrl,
            title: item.title,
            tooltip: item.tooltip,
            available: isPresent(selected),
            quantity: selected?.quantity || 0,
          };
        }),
        R.sort((a, b) => a.available - b.available),
        R.reverse,
      )(configurationAmenity.configurationSubAmenities);

      instance.toggleVisibility();

      expect(instance.subAmenities).toEqual(expected);
    });
  });
});
