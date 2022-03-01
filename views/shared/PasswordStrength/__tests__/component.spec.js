import { shallow } from 'enzyme';

import PasswordStrength from '../component';

describe('PasswordStrength component matches snapshot', () => {
  it('with empty password', () => {
    const password = '';
    const wrapper = shallow(<PasswordStrength value={password} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with short password', () => {
    const password = 'foo';
    const wrapper = shallow(<PasswordStrength value={password} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with valid password', () => {
    const password = 'foobar';
    const wrapper = shallow(<PasswordStrength value={password} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('with strong password', () => {
    const password = 'foobar1B';
    const wrapper = shallow(<PasswordStrength value={password} />);

    expect(wrapper).toMatchSnapshot();
  });
});
