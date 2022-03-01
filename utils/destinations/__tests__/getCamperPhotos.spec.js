import { mockedV4Value } from '__mocks__/uuid';

import getCamperPhotos from '../getCamperPhotos';

describe('getCamperPhotos helper', () => {
  it('when has photos with correct positions', () => {
    const camper = {
      camperPhotos: [
        { id: 1, position: 1 },
        { id: 2, position: 2 },
      ],
    };

    const res = getCamperPhotos(camper);

    expect(res).toEqual([
      { id: 1, position: 1 },
      { id: 2, position: 2 },
    ]);
  });

  it('when has photos with not correct positions', () => {
    const camper = {
      camperPhotos: [
        { id: 2, position: 2 },
        { id: 1, position: 1 },
      ],
    };

    const res = getCamperPhotos(camper);

    expect(res).toEqual([
      { id: 1, position: 1 },
      { id: 2, position: 2 },
    ]);
  });

  it('when doe not have photos', () => {
    const camper = {
      camperPhotos: [],
    };

    const res = getCamperPhotos(camper);

    expect(res).toEqual([{
      id: mockedV4Value,
      photoUrl274: '/images/camper-default.jpg',
      photoUrl360: '/images/camper-default.jpg',
      photoUrl1100: '/images/camper-default.jpg',
    }]);
  });
});
