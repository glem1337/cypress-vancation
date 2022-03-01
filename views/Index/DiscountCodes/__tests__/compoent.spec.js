import { shallow } from 'enzyme';

import DiscountCodes from '../component';

describe('DiscountCodes component', () => {
  const props = {
    handleSubmit: jest.fn(),
    isLoading: false,
  };

  const wrapper = shallow(<DiscountCodes {...props} />);

  it('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
