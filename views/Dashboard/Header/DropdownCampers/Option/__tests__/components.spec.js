import React from 'react';
import { shallow } from 'enzyme';

import { DASHBOARD_CAMPER_MASTER_VIEW_ITEM } from 'constants/dashboard';

import Option from '../component';

describe('Option component tests', () => {
  const props = {
    img: 'test.jpg',
    id: 'test.id',
    label: 'test.label',
    subtitle: 'test.subtitle',
  };

  const component = shallow(<Option {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('subtitle is empty', () => {
    component.setProps({
      subtitle: null,
    });

    const subtitle = component.find('.font-style-italic');

    expect(subtitle.isEmptyRender()).toBe(true);
  });

  it('id is equal master view', () => {
    component.setProps({
      id: DASHBOARD_CAMPER_MASTER_VIEW_ITEM.id,
    });

    const subtitle = component.find('.icon-file-list');

    expect(subtitle.isEmptyRender()).not.toBe(true);
  });
});
