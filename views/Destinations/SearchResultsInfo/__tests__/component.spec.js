import React from 'react';
import { shallow } from 'enzyme';

import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

import SearchResultsInfo from '../component';
import useContainer from '../hook';

const mockedDestinationPageStatsData = {
  isSearchResultsPage: false,
};
jest.mock('utils/hooks/useDestinationPageStats', () => jest.fn(() => mockedDestinationPageStatsData));

const mockedHookData = {
  areExisted: true,
  areFetched: true,
  total: 22,
  state: 'state',
  location: 'location',
  slug: 'slug',
};
jest.mock('../hook', () => jest.fn(() => mockedHookData));

describe('SearchResultsInfo component tests', () => {
  const props = {
    additionalClassNames: undefined,
  };

  let component = shallow(<SearchResultsInfo {...props} />);

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when location does not exist', () => {
    useContainer.mockReturnValueOnce({
      ...mockedHookData,
      location: undefined,
    });

    component = shallow(<SearchResultsInfo {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isSearchResultsPage equals true', () => {
    useDestinationPageStats.mockReturnValueOnce({
      isSearchResultsPage: true,
    });

    component = shallow(<SearchResultsInfo {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when areExisted equals false', () => {
    useContainer.mockReturnValueOnce({
      ...mockedHookData,
      areExisted: false,
      areFetched: true,
    });

    component = shallow(<SearchResultsInfo {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when areFetched equals false', () => {
    useContainer.mockReturnValueOnce({
      ...mockedHookData,
      areExisted: true,
      areFetched: false,
    });

    component = shallow(<SearchResultsInfo {...props} />);

    expect(component).toMatchSnapshot();
  });
});
