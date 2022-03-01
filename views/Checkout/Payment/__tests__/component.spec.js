import { shallow } from 'enzyme';

import Payment from '../component';

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    dateOfBirth: '01.01.1970',
  })),
  isUserLoggedInSelector: jest.fn(() => true),
}));

describe('Payment component tests', () => {
  const component = shallow(<Payment />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
