import { shallow } from 'enzyme';

import Rules from '../component';

describe('Rules component tests', () => {
  const props = {
    visibleItems: [
      {
        title: {
          id: 'titleId',
        },
        available: false,
        icon: '/path/to/icon',
      },
    ],
    totalItems: 4,
    onToggle: jest.fn(),
    allItemsVisible: false,
    defaultVisibleCount: 3,
  };

  const component = shallow(<Rules {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
