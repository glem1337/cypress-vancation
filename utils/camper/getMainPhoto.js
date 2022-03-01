import * as R from 'ramda';

import { APP_HOST } from 'constants';
import { CAMPER_PHOTO_DEFAULT } from 'constants/camper';

const getMainPhoto = (camper, photoName = 'photo', fullUrl = false) => {
  const photos = R.prop('camperPhotos', camper);

  if (!photos?.length && !fullUrl) {
    return CAMPER_PHOTO_DEFAULT;
  }

  if (!photos?.length && fullUrl) {
    return `${APP_HOST}${CAMPER_PHOTO_DEFAULT}`;
  }

  return R.pipe(
    R.sort((a, b) => a.position - b.position),
    R.path([0, photoName]),
  )(photos);
};

export default getMainPhoto;
