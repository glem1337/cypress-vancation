import React from 'react';
import { shallow } from 'enzyme';

import ownerCamperListItems from 'views/Dashboard/__mocks__/ownerCamperListItems';
import ListCampersMobile from '../component.mobile';

describe('ListCampersMobile component tests', () => {
  const props = {
    handlerClick: jest.fn(),
    items: ownerCamperListItems,
    selectedCamper: ownerCamperListItems[0],
    activeKey: [],
    onCollapseChangeHandler: jest.fn(),
  };

  const component = shallow(<ListCampersMobile {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
