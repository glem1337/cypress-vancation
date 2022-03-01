import { shallow } from 'enzyme';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import NotificationsWrapper, { NotificationsContainer } from '../container';

describe('Account settings container', () => {
  const wrapper = shallow(<NotificationsWrapper />);
  const container = diveTo(wrapper, NotificationsContainer);

  it('Account settings container snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
