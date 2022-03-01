import { shallow } from 'enzyme';

import PickupComponent from '../component';

describe('Pickup Component', () => {
  const props = {
    isLoading: false,
    hide: false,
  };

  const component = shallow(<PickupComponent {...props} />);

  it('snapshot default props', () => {
    expect(component).toMatchSnapshot();
  });
});
