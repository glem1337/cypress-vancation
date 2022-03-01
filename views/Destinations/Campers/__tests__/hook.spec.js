import { act, renderHook } from '@testing-library/react-hooks';

import { CAMPER_INCLUSION as MOCKED_CAMPER_INCLUSION } from 'constants/camper';

import { fetchCampers } from 'state/concepts/campervan-rental/actions';
import { setActiveCamperId } from 'state/concepts/search-destinations/actions';
import { campersSelector } from 'state/concepts/campervan-rental/selectors';

import useContainer from '../hook';

const mockedDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn(() => mockedDispatch),
}));

jest.mock('state/concepts/campervan-rental/selectors', () => ({
  campersSelector: jest.fn(() => [{ id: 1 }]),
  campersPageSelector: jest.fn(() => 1),
  campersTotalSelector: jest.fn(() => 30),
}));

jest.mock('state/concepts/search-destinations/selectors', () => ({
  searchDestinationParamsSelector: jest.fn(() => ({
    location: {
      latitude: 'latitude',
      longitude: 'longitude',
      startDate: 'startDate',
      endDate: 'endDate',
      description: 'description',
      funFacts: [{ id: 1, text: 'fact 1' }, { id: 2, text: 'fact 2' }],
      funFactsTitle: 'test facts title',
      inclusions: MOCKED_CAMPER_INCLUSION.SPECIFICATIONS_DETAILS,
    },
  })),
}));

describe('Campers useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('checks `onPaginationChange` method', () => {
    act(() => {
      result.current.onPaginationChange(22);
    });

    expect(mockedDispatch).toHaveBeenCalledWith(fetchCampers({
      page: 22,
    }));
  });

  it('checks `onMouseLeave` method', () => {
    act(() => {
      result.current.onMouseLeave();
    });

    expect(mockedDispatch).toHaveBeenCalledWith(setActiveCamperId(null));
  });

  describe('checks `prepareCampersLayout` method', () => {
    it('for more or equal 4', () => {
      campersSelector.mockReturnValueOnce([
        { id: 111 },
        { id: 222 },
        { id: 333 },
        { id: 444 },
      ]);

      ({ result } = renderHook(useContainer));

      let res = null;

      act(() => {
        res = result.current.prepareCampersLayout();
      });

      expect(res).toMatchSnapshot();
    });

    it('for lees than 4', () => {
      campersSelector.mockReturnValueOnce([
        { id: 111 },
        { id: 222 },
        { id: 333 },
      ]);

      ({ result } = renderHook(useContainer));

      let res = null;

      act(() => {
        res = result.current.prepareCampersLayout();
      });

      expect(res).toMatchSnapshot();
    });

    it('for 0', () => {
      campersSelector.mockReturnValueOnce([]);

      ({ result } = renderHook(useContainer));

      let res = null;

      act(() => {
        res = result.current.prepareCampersLayout();
      });

      expect(res).toMatchSnapshot();
    });
  });
});
