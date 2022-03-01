import { shallow } from 'enzyme';

import isMobileView from 'utils/breakpoints/isMobileView';
import isTabletView from 'utils/breakpoints/isTabletView';

import Slide from '../component';

jest.mock('utils/breakpoints/isMobileView', () => jest.fn(() => false));
jest.mock('utils/breakpoints/isTabletView', () => jest.fn(() => false));

describe('Slide component', () => {
  const props = {
    slide: [{
      id: 'test.id',
      img: 'test.svg',
      locationName: 'location 1',
      locationSlug: 'location-1',
      state: 'state 1',
      stateSlug: 'state-1',
    }],
  };

  it('matches snapshot', () => {
    const wrapper = shallow(<Slide {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when is mobile', () => {
    isMobileView.mockReturnValueOnce(true);
    isTabletView.mockReturnValueOnce(true);

    const wrapper = shallow(<Slide {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
