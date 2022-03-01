import { shallow } from 'enzyme';
import SettingLayoutComponent from '../component';

const mockedHookData = {
  headerRef: {},
  isStartInputVisible: true,
  isChooseDestinationSmallVisible: true,
  isChooseDestinationBigVisible: true,
  onStartInputFocus: jest.fn(),
};
jest.mock('utils/hooks/useSearchDestinationsHeader', () => jest.fn(() => mockedHookData));

describe('Index component', () => {
  let wrapper = null;
  const defaultProps = {
    active: '',
    currentUser: {
      email: 'test-email',
      user: {
        firstName: 'firstName',
        lastName: 'lastName',
        avatarUrl: 'test_url',
      },
    },
    destinationsInputRef: {},
  };

  beforeEach(() => {
    wrapper = shallow(<SettingLayoutComponent {...defaultProps} />);
  });

  it('Index default props snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
