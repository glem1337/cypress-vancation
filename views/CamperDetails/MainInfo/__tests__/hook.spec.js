import { renderHook } from '@testing-library/react-hooks';

import { RATING_BOUNDARIES } from 'constants/camperDetails/owner';
import { camperSelector } from 'state/concepts/camper/selectors';

import useContainer from '../hook';

const mockedCamper = {
  tripFee: {
    tripFeeMileage: {
      limit: true,
      available: 23,
    },
  },
  deliveryInformation: {
    distance: 22,
  },
  raiting: 100,
  amenities: [],
};
jest.mock('state/concepts/camper/selectors', () => ({
  camperSelector: jest.fn(() => mockedCamper),
}));

describe('MainInfo useContainer hook', () => {
  let result = null;

  beforeEach(() => {
    ({ result } = renderHook(useContainer));

    jest.clearAllMocks();
  });

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot();
  });

  it('matches snapshot with Off grid capable system', () => {
    camperSelector.mockReturnValueOnce({
      ...mockedCamper,
      amenities: [
        {
          configurationAmenity: {
            title: 'Power System',
          },
          amenityOptions: [
            {
              configurationAmenityOption: {
                title: 'Off Grid Capable System',
              },
            },
          ],
        },
      ],
    });

    ({ result } = renderHook(useContainer));

    expect(result.current).toMatchSnapshot();
  });

  it(`matches snapshot with '${RATING_BOUNDARIES.NORMAL.END}' rating`, () => {
    camperSelector.mockReturnValueOnce({
      ...mockedCamper,
      raiting: RATING_BOUNDARIES.NORMAL.END,
    });

    ({ result } = renderHook(useContainer));

    expect(result.current.ratingColors).toMatchSnapshot();
  });

  it(`matches snapshot with '${RATING_BOUNDARIES.NORMAL.START}' rating`, () => {
    camperSelector.mockReturnValueOnce({
      ...mockedCamper,
      raiting: RATING_BOUNDARIES.NORMAL.START,
    });

    ({ result } = renderHook(useContainer));

    expect(result.current.ratingColors).toMatchSnapshot();
  });

  it(`matches snapshot with '${RATING_BOUNDARIES.MIDDLE.END}' rating`, () => {
    camperSelector.mockReturnValueOnce({
      ...mockedCamper,
      raiting: RATING_BOUNDARIES.MIDDLE.END,
    });

    ({ result } = renderHook(useContainer));

    expect(result.current.ratingColors).toMatchSnapshot();
  });

  it(`matches snapshot with '${RATING_BOUNDARIES.MIDDLE.START}' rating`, () => {
    camperSelector.mockReturnValueOnce({
      ...mockedCamper,
      raiting: RATING_BOUNDARIES.MIDDLE.START,
    });

    ({ result } = renderHook(useContainer));

    expect(result.current.ratingColors).toMatchSnapshot();
  });

  it(`matches snapshot with '${RATING_BOUNDARIES.LOW}' rating`, () => {
    camperSelector.mockReturnValueOnce({
      ...mockedCamper,
      raiting: RATING_BOUNDARIES.LOW,
    });

    ({ result } = renderHook(useContainer));

    expect(result.current.ratingColors).toMatchSnapshot();
  });
});
