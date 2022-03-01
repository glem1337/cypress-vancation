import { shallow } from 'enzyme';

import SmallSwitchCard from '../component';

describe('SmallSwitchCard component tests', () => {
  const props = {
    icon: 'icon',
    title: 'title',
    checked: false,
    onChange: jest.fn(),
    onCardClick: jest.fn(),
  };

  const component = shallow(<SmallSwitchCard {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when title is object', () => {
    component.setProps({
      title: {
        id: 'title',
      },
    });

    expect(component).toMatchSnapshot();
  });

  it('when description is object', () => {
    component.setProps({
      description: {
        id: 'description',
      },
    });

    expect(component).toMatchSnapshot();
  });
});
