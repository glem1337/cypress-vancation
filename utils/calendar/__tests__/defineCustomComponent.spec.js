import { shallow } from 'enzyme';

import defineCustomComponent from '../defineCustomComponent';

const Component = () => null;

describe('defineCustomComponent tests', () => {
  const Enhanced = defineCustomComponent(Component, { testProperty: 'test property value' });
  const component = shallow(<Enhanced />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
