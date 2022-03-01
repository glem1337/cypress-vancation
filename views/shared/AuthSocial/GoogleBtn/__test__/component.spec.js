import { shallow } from 'enzyme';
import GoogleBtn from 'views/shared/AuthSocial/GoogleBtn/index';

it('Google btn snapshot', () => {
  const props = {
    onClick: jest.fn(),
  };

  const component = shallow(<GoogleBtn {...props} />);
  expect(component).toMatchSnapshot();
});
