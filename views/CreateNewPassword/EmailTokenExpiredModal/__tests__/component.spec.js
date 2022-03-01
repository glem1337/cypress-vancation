import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';
import EmailTokenExpiredModal from '../component';

describe('EmailTokenExpiredModal component tests', () => {
  const props = {
    onClose: jest.fn(),
    intl,
  };

  const component = shallow(<EmailTokenExpiredModal {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
