import { shallow } from 'enzyme';
import { clone } from 'ramda';
import Account from '../component';

describe('Account setting Component', () => {
  const props = {
    showAlertNewPassword: true,
    currentUser: {
      email: 'test@gmail.com',
      user: {
        lastName: 'lastName_test',
        firstName: 'firstName_test',
        avatarUrl: 'test_url',
      },
    },
  };

  it('snapshot with showAlertNewPassword true', () => {
    const component = shallow(<Account {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('snapshot with showAlertNewPassword false', () => {
    const cloneProps = clone(props);
    cloneProps.showAlertNewPassword = false;
    const component = shallow(<Account {...cloneProps} />);

    expect(component).toMatchSnapshot();
  });
});
