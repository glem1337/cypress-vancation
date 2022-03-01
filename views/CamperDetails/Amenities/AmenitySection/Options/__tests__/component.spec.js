import { shallow } from 'enzyme';

import Options from '../component';

describe('Options component tests', () => {
  const props = {
    items: [
      {
        id: 'some id',
        title: 'some title',
        tooltip: 'some tooltip',
        iconUrl: '/path/to/some/icon',
        available: false,
        subAmenities: [
          {
            id: '2',
          },
        ],
      },
    ],
  };

  const component = shallow(<Options {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
