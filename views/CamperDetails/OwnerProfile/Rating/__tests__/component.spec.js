import { shallow } from 'enzyme';

import Rating from '../component';

describe('Rating component tests', () => {
  const props = {
    rating: 80,
    isHigh: false,
    isNormal: true,
    isMiddle: false,
    isLow: false,
  };

  const component = shallow(<Rating {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
