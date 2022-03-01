import { shallow } from 'enzyme';

import CamperDetails from '../component';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(),
}));

describe('CamperDetails component tests', () => {
  const props = {
    camperId: 'camperId',
    active: 'active',
    isCamperExist: true,
    isStartInputVisible: true,
    scrolled: true,
    isDestinationParamsFilled: true,
    isChooseDestinationSmallVisible: true,
    onStartInputFocus: jest.fn(),
    destinationsInputRef: {},
    headerRef: {},
    intl: { formatMessage: jest.fn() },
    camper: { name: 'camper name', tripFee: {} },
    price: 375,
    camperPhoto: 'camperPhoto',
  };

  const component = shallow(<CamperDetails {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
