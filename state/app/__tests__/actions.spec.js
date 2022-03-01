import * as actions from 'state/app/actions';

it('setPages', () => {
  const type = 'app/SET_PAGES';
  const currentPage = '/test/currentPage';
  const prevPage = '/test/prevPage';
  const isServer = false;
  const expectedAction = { type, currentPage, prevPage, isServer };

  expect(actions.setPages(expectedAction)).toEqual(expectedAction);
});

it('setCurrentCoordinates', () => {
  const expectedAction = {
    type: 'app/SET_CURRENT_COORDINATES',
    longitude: 1,
    latitude: 1,
  };

  expect(actions.setCurrentCoordinates({
    longitude: 1,
    latitude: 1,
  })).toEqual(expectedAction);
});

it('setCurrentLocation', () => {
  const location = { id: 1 };

  const expectedAction = {
    type: 'app/SET_CURRENT_LOCATION',
    location,
  };

  expect(actions.setCurrentLocation(location)).toEqual(expectedAction);
});

it('setOpenGraphData', () => {
  const data = { id: 1 };

  const expectedAction = {
    type: 'app/SET_OPEN_GRAPH_DATA',
    data,
  };

  expect(actions.setOpenGraphData(data)).toEqual(expectedAction);
});
