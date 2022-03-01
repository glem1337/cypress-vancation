import { shallow } from 'enzyme';

import AuthLayout from '../component';

describe('AuthLayout component tests', () => {
  const props = {
    className: null,
    withSidebar: false,
  };

  let component = null;

  beforeEach(() => {
    component = shallow(<AuthLayout {...props}>Foo</AuthLayout>);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when className', () => {
    component.setProps({
      className: 'class-test',
    });

    expect(component).toMatchSnapshot();
  });

  it('when withSidebar', () => {
    component.setProps({
      withSidebar: true,
    });

    expect(component).toMatchSnapshot();
  });
});
