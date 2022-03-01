import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';
import Works from '../component';

describe('Works component', () => {
  const props = {
    intl,
  };

  it('snapshot', () => {
    const wrapper = shallow(<Works {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
