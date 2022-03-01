import { shallow } from 'enzyme';

import Rules from '../component';

describe('Rules component tests', () => {
  const props = {
    config: [
      {
        name: 'name',
        icon: 'name',
        title: 'title',
        description: 'description',
        disabled: false,
      },
    ],
  };

  const component = shallow(<Rules {...props}>Foo</Rules>);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
