import { shallow } from 'enzyme';

import SwitchField from '../component';

describe('SwitchField component matches snapshot', () => {
  const props = {
    field: { value: true, name: 'fieldName' },
    handleChange: jest.fn(),
  };

  const component = shallow(<SwitchField {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
