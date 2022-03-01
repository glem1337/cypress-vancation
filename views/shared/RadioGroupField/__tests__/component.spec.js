import { shallow } from 'enzyme';

import RadioGroupField from '../component';

describe('RadioGroupField component tests', () => {
  const props = {
    field: { value: 'test' },
    radioGroupProps: { size: 'large' },
  };

  const component = shallow(<RadioGroupField {...props}>Foo</RadioGroupField>);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
