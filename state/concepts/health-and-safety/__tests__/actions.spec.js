import { fetchHealthAndSafetyConfig } from 'state/concepts/health-and-safety/actions';

it('fetchTravelAccessoriesConfig()', () => {
  const expectedAction = {
    type: 'health-and-safety/FETCH_HEALTH_AND_SAFETY_CONFIG',
  };

  expect(fetchHealthAndSafetyConfig()).toEqual(expectedAction);
});
