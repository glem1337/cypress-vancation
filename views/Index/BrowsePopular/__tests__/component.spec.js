import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';
import BrowsePopular from '../component';

describe('BrowsePopular component', () => {
  const props = {
    handlerNext: jest.fn(),
    handlerPrev: jest.fn(),
    breakpoints: {
      768: {
        spaceBetween: 32,
      },
      1200: {
        freeMode: false,
      },
    },
    swiperRef: null,
    intl,
  };

  it('snapshot', () => {
    const wrapper = shallow(<BrowsePopular {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
