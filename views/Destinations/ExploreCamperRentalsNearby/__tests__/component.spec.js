import React from 'react';
import { shallow } from 'enzyme';

import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

import ExploreCamperRentalsNearby from '../component';
import useContainer from '../hook';

const mockedDestinationPageStatsData = {
  isSearchResultsPage: true,
};
jest.mock('utils/hooks/useDestinationPageStats', () => jest.fn(() => mockedDestinationPageStatsData));

const mockedHookData = {
  destinations: [{ id: 1, landingName: 'Alaska' }],
  constructDestinationLink: jest.fn(() => 'constructDestinationLink'),
  campers: [],
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('ExploreCamperRentalsNearby component tests', () => {
  let component = shallow(<ExploreCamperRentalsNearby />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isSearchResultsPage equals false', () => {
    useDestinationPageStats.mockReturnValueOnce({ isSearchResultsPage: false });

    component = shallow(<ExploreCamperRentalsNearby />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when campers exist', () => {
    useContainer.mockReturnValueOnce({
      ...mockedHookData,
      campers: [{ id: 1 }],
    });

    component = shallow(<ExploreCamperRentalsNearby />);

    expect(component).toMatchSnapshot();
  });
});
