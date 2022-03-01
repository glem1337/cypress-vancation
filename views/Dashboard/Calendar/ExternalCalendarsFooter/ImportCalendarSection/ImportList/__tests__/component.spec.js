import React from 'react';
import { shallow } from 'enzyme';

import ImportList from '../component';

describe('ImportList component tests', () => {
  const props = {
    onRemove: jest.fn(),
    onEdit: jest.fn(),
    items: [{ name: 'name', id: 'id' }],
  };

  const component = shallow(<ImportList {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('when items isn`t present', () => {
    component.setProps({
      items: undefined,
    });

    const items = component.find('.calendar-listing__footer-item');

    expect(items.isEmptyRender()).toBe(true);
  });
});
