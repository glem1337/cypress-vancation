import { v4 as uuid } from 'uuid';

import isPresent from 'utils/isPresent';

const getCamperPhotos = (camper) => {
  if (!isPresent(camper?.camperPhotos)) {
    return [{
      id: uuid(),
      photoUrl274: '/images/camper-default.jpg',
      photoUrl360: '/images/camper-default.jpg',
      photoUrl1100: '/images/camper-default.jpg',
    }];
  }

  if (camper.camperPhotos[0].position !== 1) {
    camper.camperPhotos.sort((a, b) => a.position - b.position);
  }

  return camper?.camperPhotos;
};

export default getCamperPhotos;
