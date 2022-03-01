import { shallow } from 'enzyme';

import SlideSkeleton from '../component';

describe('SlideSkeleton component', () => {
  const props = {
    amountLocationOnSlide: 4,
  };

  it('snapshot', () => {
    const wrapper = shallow(<SlideSkeleton {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
