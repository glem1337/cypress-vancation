import { shallow } from 'enzyme';

import OwnerProfile from '../component';

describe('OwnerProfile component tests', () => {
  const props = {
    initialized: true,
    onRef: jest.fn(),
    isCamperExist: true,
    isLoading: false,
    toggleDescription: jest.fn(),
    description: 'description',
    allDescriptionVisible: true,
    onAskQuestion: jest.fn(),
    owner: {
      avatarUrl: '/path/to/some/avatar/url',
      businessTitle: 'businessTitle',
      createdAt: 'createdAt',
      averageRating: 40,
      campersCount: 5,
      idVerified: true,
      description: 'description',
    },
    fullName: ['firstName', 'lastName'],
    ratingProps: {
      isHigh: false,
      isNormal: true,
      isMiddle: false,
      isLow: false,
    },
  };

  let component = null;

  beforeEach(() => {
    component = shallow(<OwnerProfile {...props} />);
  });

  describe('matches snapshot', () => {
    it('default', () => {
      expect(component).toMatchSnapshot();
    });

    it('when camper doesnt exist', () => {
      component.setProps({ isCamperExist: false });

      expect(component).toMatchSnapshot();
    });
  });
});
