import { shallow } from 'enzyme';

import Questions from '../component';

describe('Questions component tests', () => {
  const props = {
    onAdd: jest.fn(),
    onRemove: jest.fn(),
    questions: [
      {
        id: 1,
        text: 'some phrase',
        required: false,
      },
    ],
  };

  const component = shallow(<Questions {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
