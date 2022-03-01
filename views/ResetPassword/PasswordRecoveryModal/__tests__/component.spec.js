import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';
import PasswordRecoveryModal from '../component';

describe('PasswordRecoveryModal component tests', () => {
  const props = {
    email: 'test@examle.com',
    onClose: jest.fn(),
    intl,
    isSubmitting: false,
    handleSubmit: jest.fn(),
  };

  let component = null;

  beforeEach(() => {
    component = shallow(<PasswordRecoveryModal {...props} />);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when status present', () => {
    component.setProps({
      status: { email: 'Email error' },
    });

    expect(component).toMatchSnapshot();
  });
});
