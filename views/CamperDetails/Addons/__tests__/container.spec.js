import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as R from 'ramda';

import { DEFAULT_VISIBLE_ADDONS } from 'constants/camperDetails/addons';

import diveTo from 'utils/testHelpers/diveToEnzyme';
import isTabletView from 'utils/breakpoints/isTabletView';

import { fetchCamperTravelExtention } from 'state/concepts/camper/actions';
import { fetchTravelAccessoriesConfig } from 'state/concepts/travel-accessories/actions';

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

jest.mock(
  'utils/hocs/withIntersectionObserver',
  () => () => (Component) => (props) => <Component onRef={jest.fn()} isVisible {...props} />,
);

jest.mock('utils/breakpoints/isMobileView', () => jest.fn(() => false));
jest.mock('utils/breakpoints/isTabletView', () => jest.fn(() => false));

describe('Addons container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
    camperId: 'camperId',
  };

  let wrapper;
  let container;
  let instance;
  let setStateSpy = null;

  beforeEach(() => {
    wrapper = shallow(<Addons {...props} />);
    container = diveTo(wrapper, AddonsContainer);
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
        fetchCamperTravelExtention(props.camperId),
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        fetchTravelAccessoriesConfig(),
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

  it('checks `toggleVisibleItems` instance method', () => {
    instance.toggleVisibleItems();

    expect(container.state().allItemsVisible).toBe(true);

    instance.toggleVisibleItems();

    expect(container.state().allItemsVisible).toBe(false);
  });

  it('checks `items` instance getter', () => {
    const customAddons = R.pathOr(
      [],
      ['camperAddition', 'customTravelAccessories'],
      mockedCamper,
    );

    const expected = [...mockedAddons, ...customAddons].filter(
      (item) => item.active,
    );

    expect(instance.items).toEqual(expected);
  });

  describe('checks `defaultVisibleCount` instance getter', () => {
    it('on desktop', () => {
      expect(instance.defaultVisibleCount).toEqual(
        DEFAULT_VISIBLE_ADDONS.DESKTOP,
      );
    });

    it('on table/mobile', () => {
      isTabletView.mockReturnValueOnce(true);

      expect(instance.defaultVisibleCount).toEqual(
        DEFAULT_VISIBLE_ADDONS.MOBILE,
      );
    });
  });
});
