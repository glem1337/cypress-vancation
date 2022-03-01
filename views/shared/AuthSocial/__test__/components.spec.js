import { shallow } from 'enzyme';
import AuthSocialComponent from '../component';

it('AuthSocial component snapshot', () => {
  const props = {
    handlerGoogle: jest.fn(),
    handlerFacebook: jest.fn(),
  };

  const component = shallow(<AuthSocialComponent {...props} />);
  expect(component).toMatchSnapshot();
});
