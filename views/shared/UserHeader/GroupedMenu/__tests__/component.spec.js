import React from 'react';
import { shallow } from 'enzyme';

import GroupedMenu from '../component';

const mockedHookData = true;
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('GroupedMenu component tests', () => {
  const component = shallow(<GroupedMenu showOwnersDashboard />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('component prop getPopupContainer snapshot', () => {
    const popupContainer = component.find('Dropdown').renderProp('getPopupContainer')();

    expect(popupContainer).toMatchSnapshot();
  });
});
