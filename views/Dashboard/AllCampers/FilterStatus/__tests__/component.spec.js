import { shallow } from 'enzyme';

import { CAMPER_STATUS } from 'constants/camper';

import FilterStatus from '../component';

describe('FilterStatus component tests', () => {
  const props = {
    onStatusChange: jest.fn(),
    status: CAMPER_STATUS.ALL,
  };

  const component = shallow(<FilterStatus {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
