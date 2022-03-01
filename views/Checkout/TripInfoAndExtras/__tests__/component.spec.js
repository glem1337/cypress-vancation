import { shallow } from 'enzyme';

import TripInfoAndExtras from '../component';

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    dateOfBirth: '01.01.1970',
  })),
  isUserLoggedInSelector: jest.fn(() => true),
}));

describe('TripInfoAndExtras component tests', () => {
  const component = shallow(<TripInfoAndExtras />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
