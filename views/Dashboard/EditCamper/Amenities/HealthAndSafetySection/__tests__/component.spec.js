import { shallow } from 'enzyme';

import HealthAndSafetySection from '../component';

describe('HealthAndSafetySection component tests', () => {
  const props = {
    items: [
      {
        id: 'some id',
        title: 'some title',
        icon: 'some icon',
      },
    ],
  };

  const component = shallow(<HealthAndSafetySection {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when items isn`t present', () => {
    component.setProps({ items: undefined });

    expect(component).toMatchSnapshot();
  });
});
