import { shallow } from 'enzyme';
import diveTo from 'utils/testHelpers/diveToEnzyme';
import ProfileWrapper, { ProfileContainer } from '../container';

describe('Account settings container', () => {
  const wrapper = shallow(<ProfileWrapper />);
  const container = diveTo(wrapper, ProfileContainer);

  it('Account settings container snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
