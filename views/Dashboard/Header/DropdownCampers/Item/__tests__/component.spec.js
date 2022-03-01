import React from 'react';
import { shallow } from 'enzyme';

import { DASHBOARD_CAMPER_MASTER_VIEW_ITEM } from 'constants/dashboard';
import Item from '../component';

describe('Item component tests', () => {
  const props = {
    img: 'test.jpg',
    id: 'test.id',
    label: 'test.label',
    showArrow: true,
    handlerClick: jest.fn(),
  };

  const component = shallow(<Item {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('id is equal master view', () => {
    component.setProps({
      id: DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id,
    });

    const el = component.find('.font-600');

    expect(el.isEmptyRender()).not.toBe(true);
  });

  it('when arrow not shown', () => {
    component.setProps({
      showArrow: false,
    });

    const el = component.find('.master-view__menu-arrow');

    expect(el.isEmptyRender()).not.toBe(false);
  });
});
