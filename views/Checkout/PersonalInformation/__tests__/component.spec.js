import { shallow } from 'enzyme';

import PersonalInformation from '../component';

jest.mock('state/concepts/session/selectors', () => ({
  currentUserSelector: jest.fn(() => ({
    dateOfBirth: '01.01.1970',
  })),
  isUserLoggedInSelector: jest.fn(() => true),
}));

jest.mock('utils/redirect', () => jest.fn());

describe('PersonalInformation component tests', () => {
  const component = shallow(<PersonalInformation />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
