import { shallow } from 'enzyme';

import BigCheckbox from '../component';

describe('BigCheckbox component tests', () => {
  const props = {
    title: 'title',
    icon: '/path/to/icon',
  };

  const component = shallow(<BigCheckbox {...props}>Foo</BigCheckbox>);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when tooltip is present', () => {
    component.setProps({
      tooltip: 'tooltip',
    });

    expect(component).toMatchSnapshot();
  });
});
