import { shallow } from 'enzyme';

import FilterStatus from '../component';

describe('FilterStatus component tests', () => {
  const props = {
    onChange: jest.fn(),
  };

  const component = shallow(<FilterStatus {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
