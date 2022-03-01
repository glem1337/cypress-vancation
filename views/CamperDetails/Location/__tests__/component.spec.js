import React from 'react';
import { shallow } from 'enzyme';

import Location from '../component';

let mockedHookData = {
  latitude: 1,
  longitude: 2,
  place: 'Place',
  vehicleTypeIconUrl: 'vehicleTypeIconUrl',
  circle: { id: 1 },
  mapRef: {},
  vehicleTypeName: 'vehicleTypeName',
  containerRef: {},
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('Location component tests', () => {
  it('matches snapshot', () => {
    const component = shallow(<Location />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot without coordinates', () => {
    mockedHookData = {
      ...mockedHookData.mock,
      latitude: undefined,
      longitude: undefined,
    };

    const component = shallow(<Location />);

    expect(component).toMatchSnapshot();
  });
});
