import React from 'react';
import { shallow } from 'enzyme';

import useDestinationPageStats from 'utils/hooks/useDestinationPageStats';

import Campers from '../component';
import useContainer, { DATA_TYPE } from '../hook';

const mockedUseDestinationPageStats = {
  isSearchResultsPage: false,
};
jest.mock('utils/hooks/useDestinationPageStats', () => jest.fn(() => mockedUseDestinationPageStats));

const mockedHookData = {
  campers: [{ id: 1 }, { id: 2 }],
  page: 1,
  perPage: 20,
  total: 200,
  onPaginationChange: jest.fn(),
  onMouseLeave: jest.fn(),
  campersData: [
    {
      id: 1,
      type: DATA_TYPE.DESCRIPTION,
      description: 'test description',
    },
    {
      id: 2,
      type: DATA_TYPE.FAN_FACTS,
      factsTitle: 'test title',
      facts: [{ id: 11, text: 'test text' }],
    },
    {
      id: 3,
      type: DATA_TYPE.SINGLE_FACT,
      text: 'test text',
    },
    {
      id: 4,
      type: DATA_TYPE.CAMPERS_CHUNK,
      campers: [{ id: 11 }],
    },
  ],
};
jest.mock('../hook', () => ({
  __esModule: true,
  ...jest.requireActual('../hook'),
  default: jest.fn(() => mockedHookData),
}));

describe('Campers component tests', () => {
  it('matches snapshot', () => {
    const component = shallow(<Campers />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when there are no campers', () => {
    useContainer.mockReturnValueOnce({
      ...mockedHookData,
      campers: null,
    });

    const component = shallow(<Campers />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isSearchResultsPage', () => {
    useDestinationPageStats.mockReturnValueOnce({ isSearchResultsPage: true });

    const component = shallow(<Campers />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isSearchResultsPage and there are no campers', () => {
    useDestinationPageStats.mockReturnValueOnce({ isSearchResultsPage: true });
    useContainer.mockReturnValueOnce({
      ...mockedHookData,
      campers: null,
    });

    const component = shallow(<Campers />);

    expect(component).toMatchSnapshot();
  });

  it('matches snapshot when isSearchResultsPage and there are campers', () => {
    useDestinationPageStats.mockReturnValueOnce({ isSearchResultsPage: true });
    useContainer.mockReturnValueOnce({
      ...mockedHookData,
      campers: [{ id: 1 }],
    });

    const component = shallow(<Campers />);

    expect(component).toMatchSnapshot();
  });
});
