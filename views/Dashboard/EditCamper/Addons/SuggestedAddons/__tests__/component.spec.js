import { shallow } from 'enzyme';

import SuggestedAddons from '../component';

describe('SuggestedAddons component tests', () => {
  const props = {
    items: [
      {
        id: 'id',
        iconUrl: 'iconUrl',
        name: 'name',
        active: true,
      },
    ],
  };

  const component = shallow(<SuggestedAddons {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when items active is false', () => {
    component.setProps({
      items: [
        {
          id: 'id',
          iconUrl: 'iconUrl',
          name: 'name',
          active: false,
        },
      ],
    });

    expect(component).toMatchSnapshot();
  });
});
