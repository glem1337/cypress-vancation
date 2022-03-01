import { shallow } from 'enzyme';
import * as R from 'ramda';

import isPresent from 'utils/isPresent';

import mockedAmenity from 'views/CamperDetails/Amenities/__mocks__/mockedAmenity';
import AmenitySection from '../container';

describe('AmenitySection container tests', () => {
  const props = {
    amenity: mockedAmenity,
    onCollapse: jest.fn(),
    activeKey: ['1'],
  };

  let container = null;
  let instance = null;

  beforeEach(() => {
    container = shallow(<AmenitySection {...props} />);
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

  describe('checks `prepareSubAmenities` instance method', () => {
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
      )(configurationAmenity.configurationSubAmenities);

      expect(
        instance.prepareSubAmenities(
          subAmenities,
          configurationAmenity.configurationSubAmenities,
        ),
      ).toEqual(expected);
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

      expect(
        instance.prepareSubAmenities(
          subAmenities,
          configurationAmenity.configurationSubAmenities,
        ),
      ).toEqual(expected);
    });
  });

  it('checks `subAmenities` instance getter', () => {
    const {
      amenity: { subAmenities, configurationAmenity },
    } = props;

    const expected = instance.prepareSubAmenities(
      subAmenities,
      configurationAmenity.configurationSubAmenities,
    );

    expect(instance.subAmenities).toEqual(expected);
  });

  describe('checks `options` instance getter', () => {
    const {
      amenity: { amenityOptions, configurationAmenity },
    } = props;

    it('when visible default count of items', () => {
      const expected = R.pipe(
        R.map((item) => {
          const selected = R.find(
            R.pipe(
              R.prop('configurationAmenityOption'),
              R.propEq('id', item.id),
            ),
          )(amenityOptions);

          return {
            id: item.id,
            iconUrl: item.iconUrl,
            title: item.title,
            tooltip: item.tooltip,
            subAmenities: instance.prepareSubAmenities(
              selected?.subAmenities,
              selected?.configurationAmenityOption.configurationSubAmenities,
            ),
            available: isPresent(selected),
          };
        }),
        R.sort((a, b) => a.available - b.available),
        R.reverse,
        R.filter((item) => item.available),
      )(configurationAmenity.configurationAmenityOptions);

      expect(instance.options).toEqual(expected);
    });

    it('when visible all items', () => {
      const expected = R.pipe(
        R.map((item) => {
          const selected = R.find(
            R.pipe(
              R.prop('configurationAmenityOption'),
              R.propEq('id', item.id),
            ),
          )(amenityOptions);

          return {
            id: item.id,
            iconUrl: item.iconUrl,
            title: item.title,
            tooltip: item.tooltip,
            subAmenities: instance.prepareSubAmenities(
              selected?.subAmenities,
              selected?.configurationAmenityOption.configurationSubAmenities,
            ),
            available: isPresent(selected),
          };
        }),
        R.sort((a, b) => a.available - b.available),
        R.reverse,
        R.filter((item) => item.available),
      )(configurationAmenity.configurationAmenityOptions);

      instance.toggleVisibility();

      expect(instance.options).toEqual(expected);
    });
  });
});
