import { shallow } from 'enzyme';

import InputNumericField from '../component';

describe('InputNumericField component tests', () => {
  const props = {
    field: { value: 1, name: 'name' },
    form: {},
    onIncrease: jest.fn(),
    onDecrease: jest.fn(),
  };

  const component = shallow(<InputNumericField {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
