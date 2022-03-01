import { prevPageSelector, currentPageSelector, currentCoordinatesSelector } from '../selectors';

describe('prevPageSelector', () => {
  const prevPage = {
    path: '/test/prevPage',
  };

  const state = {
    app: { prevPage },
  };
  expect(prevPageSelector(state)).toEqual(prevPage);
});

it('currentPageSelector', () => {
  const currentPage = {
    path: '/test/currentPage',
  };

  const state = {
    app: { currentPage },
  };
  expect(currentPageSelector(state)).toEqual(currentPage);
});

it('currentCoordinatesSelector', () => {
  const state = {
    app: {
      currentCoordinates: {
        isLocationRequested: true,
        latitude: '48.3971996',
        longitude: '35.0312394',
      },
    },
  };

  expect(currentCoordinatesSelector(state)).toEqual({
    isLocationRequested: true,
    latitude: '48.3971996',
    longitude: '35.0312394',
  });
});
