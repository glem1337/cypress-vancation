import { shallow } from 'enzyme';
import * as R from 'ramda';
import configureStore from 'redux-mock-store';

import { DEFAULT_VISIBLE_RULES_COUNT } from 'constants/camperDetails/rules';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import mockedCamper from 'views/__mocks__/camper';
import HealthAndSafety, { HealthAndSafetyContainer } from '../container';

jest.mock('state/data/selectors', () => ({
  loadingSelector: jest.fn(() => false),
}));

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
}));

jest.mock(
  'utils/hocs/withIntersectionObserver',
  () => () => (Component) => (props) => <Component onRef={jest.fn()} isVisible {...props} />,
);

describe('HealthAndSafety container tests', () => {
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
    wrapper = shallow(<HealthAndSafety {...props} />);
    container = diveTo(wrapper, HealthAndSafetyContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `items` instance getter', () => {
    const { camperAddition } = mockedCamper;

    const expected = R.pipe(
      R.pathOr([], ['amenityHealthSafetyItems']),
      R.map(({ healthSafety }) => ({
        id: healthSafety.id,
        icon: healthSafety.iconUrl,
        title: healthSafety.name,
        available: true,
      })),
    )(camperAddition);

    expect(instance.items).toEqual(expected);
  });

  describe('checks `visibleItems` instance getter', () => {
    it('should show default visible items', () => {
      const expected = instance.items.slice(0, DEFAULT_VISIBLE_RULES_COUNT);

      expect(instance.visibleItems).toEqual(expected);
    });

    it('should show all items', () => {
      instance.setState({
        allItemsVisible: true,
      });

      expect(instance.visibleItems).toEqual(instance.items);
    });
  });

  it('checks `toggleVisibleItems` instance method', () => {
    instance.toggleVisibleItems();

    expect(container.state().allItemsVisible).toBe(true);

    instance.toggleVisibleItems();

    expect(container.state().allItemsVisible).toBe(false);
  });
});
