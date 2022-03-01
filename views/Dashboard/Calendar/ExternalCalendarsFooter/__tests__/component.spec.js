import { shallow } from 'enzyme';

import ExternalCalendarsFooter from '../component';

describe('ExternalCalendarsFooter component tests', () => {
  const props = {
    toggleFooter: jest.fn(),
    camperId: 'camperId',
  };

  const component = shallow(<ExternalCalendarsFooter {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
