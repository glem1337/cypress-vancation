import mockedCamper from 'views/__mocks__/camper';

import getCamperDataForSearch from '../getCamperDataForSearch';

it('test getCamperDataForSearch helper', () => {
  const res = getCamperDataForSearch(mockedCamper);

  expect(res).toMatchSnapshot();
});
