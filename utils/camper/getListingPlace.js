import * as R from 'ramda';

const getListingPlace = (camper) => R.pipe(
    R.props(['vehicleTypeName', 'place']),
    R.filter((elem) => R.is(String, elem) || R.is(Number, elem)),
    R.join(' in '),
  )(camper);

export default getListingPlace;
