import { shallow } from 'enzyme';

import ListYourCampervan from '../container';

describe('ListYourCampervan container', () => {
  const wrapper = shallow(<ListYourCampervan />);

  it('injects `intl` prop to component', () => {
    expect(wrapper.props().intl).not.toBeUndefined();
  });

  it('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
