import { shallow } from 'enzyme';
import * as R from 'ramda';
import configureStore from 'redux-mock-store';

import {
  DEFAULT_VISIBLE_DETAILS,
  DETAILS_CONFIG,
  MAX_DESCRIPTION_VISIBLE_SYMBOLS,
} from 'constants/camperDetails';

import diveTo from 'utils/testHelpers/diveToEnzyme';

import mockedCamper from 'views/__mocks__/camper';
import Specifications, { SpecificationsContainer } from '../container';

jest.mock('utils/breakpoints/isMobileView', () => jest.fn(() => false));
jest.mock('utils/breakpoints/isTabletView', () => jest.fn(() => false));

jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
  isCamperExistSelector: jest.fn(() => true),
}));

describe('Specifications container tests', () => {
  const store = configureStore()({});
  store.dispatch = jest.fn();

  const props = {
    store,
  };

  let wrapper = null;
  let container = null;
  let instance = null;

  beforeEach(() => {
    wrapper = shallow(<Specifications {...props} />);
    container = diveTo(wrapper, SpecificationsContainer);
    instance = container.instance();

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  it('checks `toggleDescription` instance method', () => {
    instance.toggleDescription();

    expect(container.state().allDescriptionVisible).toBe(true);

    instance.toggleDescription();

    expect(container.state().allDescriptionVisible).toBe(false);
  });

  describe('checks `description` instance getter', () => {
    it('should return not truncated description', () => {
      const expected = R.pathOr('', ['description'], mockedCamper);

      expect(instance.description).toEqual(expected);
    });

    it('should return truncated description', () => {
      container.setProps({
        ...props,
        camper: {
          ...mockedCamper,
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essenti",
        },
      });

      const { camper } = container.props();

      const description = R.pathOr('', ['description'], camper);

      const expected = `${description.substring(
        0,
        MAX_DESCRIPTION_VISIBLE_SYMBOLS,
      )}...`;

      expect(instance.description).toBe(expected);
    });
  });

  it('checks `toggleDetails` instance method', () => {
    instance.toggleDetails();

    expect(container.state().allDetailsVisible).toBe(true);

    instance.toggleDetails();

    expect(container.state().allDetailsVisible).toBe(false);
  });

  it('checks `detailsConfig` instance getter', () => {
    const expected = DETAILS_CONFIG.slice(0, DEFAULT_VISIBLE_DETAILS.DESKTOP);

    expect(instance.detailsConfig).toEqual(expected);
  });
});
