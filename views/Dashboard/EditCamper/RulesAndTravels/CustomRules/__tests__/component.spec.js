import { shallow } from 'enzyme';

import CustomRules from '../component';

describe('CustomRules component tests', () => {
  const props = {
    keyProp: 'prop',
    title: { id: 'title' },
    label: { id: 'label' },
    btnText: { id: 'btnText' },
    items: [
      {
        id: 1,
      },
    ],
    onRemove: jest.fn(),
    onAdd: jest.fn(),
  };

  const component = shallow(<CustomRules {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
