import { shallow } from 'enzyme';

import Loader from '../component';

describe('Loader component', () => {
  const props = {
    fontSize: 24,
  };

  const component = shallow(<Loader {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
