import React from 'react';
import { shallow } from 'enzyme';

import ownerCamperListItems from 'views/Dashboard/__mocks__/ownerCamperListItems';
import DropdownCampers from '../component';

describe('DropdownCampers component tests', () => {
  const props = {
    currentCamperId: ownerCamperListItems[0].id,
    handlerSelect: jest.fn(),
    hasOneLastCamperEdit: false,
    isDropdownCamperOpen: true,
    setDropdownCamperOpen: jest.fn(),
    items: ownerCamperListItems,
    isLoading: false,
  };

  const component = shallow(<DropdownCampers {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('component prop dropdownRender snapshot', () => {
    const result = component
      .renderProp('getPopupContainer')();

    expect(result).toMatchSnapshot();
  });
});
