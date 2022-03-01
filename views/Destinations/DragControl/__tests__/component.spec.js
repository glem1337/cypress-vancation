import React from 'react';
import { shallow } from 'enzyme';

import DragControl from '../component';

let mockedHookData = {
  slug: 'slug',
  state: 'state',
  location: 'location',
};
jest.mock('views/Destinations/SearchResultsInfo/hook', () => jest.fn(() => mockedHookData));

describe('DragControl component tests', () => {
  let component = null;

  beforeEach(() => {
    component = shallow(<DragControl />);
    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when `location` is undefined', () => {
    mockedHookData = {
      slug: 'slug',
      state: 'state',
      location: undefined,
    };

    component = shallow(<DragControl />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when `state` is undefined', () => {
    mockedHookData = {
      slug: 'slug',
      state: undefined,
      location: 'location',
    };

    component = shallow(<DragControl />);

    expect(component).toMatchSnapshot();
  });
});
