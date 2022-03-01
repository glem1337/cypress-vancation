import { shallow } from 'enzyme';

import intl from 'utils/testHelpers/fakeIntl';
import ListYourCampervan from '../component';

describe('ListYourCampervan component', () => {
  const props = {
    intl,
  };

  it('snapshot', () => {
    const wrapper = shallow(<ListYourCampervan {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
