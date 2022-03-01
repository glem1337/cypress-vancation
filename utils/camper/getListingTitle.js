import * as R from 'ramda';
import getListingDescription from './getListingDescription';
import getListingPlace from './getListingPlace';

const getListingTitle = (camper) => {
  const name = R.prop('name', camper);

  if (name) {
    return name;
  }

  const camperDescription = getListingDescription(camper);
  const camperPlace = getListingPlace(camper);

  return `${camperDescription} ${camperPlace}`;
};

export default getListingTitle;
