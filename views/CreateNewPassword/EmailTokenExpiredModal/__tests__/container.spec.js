import { shallow } from 'enzyme';

import EmailTokenExpiredModal from '../container';

describe('EmailTokenExpiredModal container tests', () => {
  const props = {
    onClose: jest.fn(),
  };

  const wrapper = shallow(<EmailTokenExpiredModal {...props} />);

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('injects `intl` prop to EmailTokenExpiredModal component', () => {
    expect(wrapper.props().intl).not.toBeUndefined();
  });
});
