import { shallow } from 'enzyme';

import GuestLayout from '../component';

const TestComponent = () => <div>Test</div>;

describe('GuestLayout component', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<GuestLayout><TestComponent /></GuestLayout>);

    expect(wrapper).toMatchSnapshot();
  });
});
