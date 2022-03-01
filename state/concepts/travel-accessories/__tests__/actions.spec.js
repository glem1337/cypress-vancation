import { fetchTravelAccessoriesConfig } from 'state/concepts/travel-accessories/actions';

it('fetchTravelAccessoriesConfig()', () => {
  const expectedAction = {
    type: 'travel-accessories/FETCH_TRAVEL_ACCESSORIES_CONFIG',
  };

  expect(fetchTravelAccessoriesConfig()).toEqual(expectedAction);
});
