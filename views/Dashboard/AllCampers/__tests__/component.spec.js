import React from 'react';
import { shallow } from 'enzyme';

import { OWNER_CAMPER_PAGINATION_DEFAULT } from 'constants/dashboard';

import ownerCamperCard from '../../__mocks__/ownerCamperCard';
import DashboardAllCampersComponent from '../component';

describe('DashboardAllCampersComponent component tests', () => {
  const props = {
    campers: ownerCamperCard,
    ownerCampersPagination: {
      number: OWNER_CAMPER_PAGINATION_DEFAULT.NUMBER,
      size: OWNER_CAMPER_PAGINATION_DEFAULT.SIZE,
      total: OWNER_CAMPER_PAGINATION_DEFAULT.TOTAL,
    },
    handlerPagination: jest.fn(),
    onStatusChange: jest.fn(),
    onSearchChange: jest.fn(),
    filters: { status: 'all', search: '' },
    specificCamperIsPresent: false,
    isLoading: false,
  };

  const component = shallow(<DashboardAllCampersComponent {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('campers is empty', () => {
    component.setProps({
      campers: [],
    });

    const btnGradient = component.find('BtnGradient');
    const emptyCamper = component.find('EmptyCamper');
    const container = component.find('.container.w-100.d-flex.flex-column');

    expect(btnGradient.isEmptyRender()).toBe(true);
    expect(emptyCamper.isEmptyRender()).not.toBe(true);
    expect(container.isEmptyRender()).not.toBe(true);
  });
});
