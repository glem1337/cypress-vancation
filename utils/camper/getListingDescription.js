import * as R from 'ramda';

const getListingDescription = (camper) => R.pipe(
    R.prop('specificationDetail'),
    R.props(['name', 'modelNaming', 'drivetrain']),
    R.filter((elem) => R.is(String, elem) || R.is(Number, elem)),
    R.join(' '),
  )(camper);

export default getListingDescription;
