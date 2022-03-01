import { shallow } from 'enzyme';

import ProtectionPlan from '../component';

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    dateOfBirth: '01.01.1970',
  })),
  isUserLoggedInSelector: jest.fn(() => true),
}));

describe('ProtectionPlan component tests', () => {
  const component = shallow(<ProtectionPlan />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
