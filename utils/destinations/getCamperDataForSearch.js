import moment from 'moment';
import * as R from 'ramda';

import isInstantBook from 'utils/camper/isInstantBook';

const COUNT_DAYS = 90;

const getCamperDataForSearch = (camper) => {
  const now = moment();
  const createdAt = camper.createdAt || moment();

  const days = Math.abs(now.diff(createdAt, 'days'));

  return ({
    id: camper.id,
    isBooked: false,
    isGlamper: camper.glamper || false,
    isHighDemand: false,
    isInstantBook: isInstantBook(camper),
    isNew: days <= COUNT_DAYS,
    name: camper.name,
    vehicleTypeName: `${camper.vehicleTypeName} in ${camper?.specificationDetail?.stateRegistred}`,
    makeModel: `${camper?.specificationDetail?.whoBuiltCamper} ${camper?.specificationDetail?.modelNaming}`,
    model: camper?.specificationDetail?.modelNaming,
    sleeps: camper?.specificationDetail?.sleeps || 0,
    seats: camper?.specificationDetail?.seats || 0,
    rating: camper?.raiting ? `${camper?.raiting}%` : '100%',
    cost: camper?.minimalPrice ? `${camper?.minimalPrice}` : '$0',
    costPeriod: '/ night',
    modelNaming: R.pathOr('camper', ['specificationDetail', 'modelNaming'], camper),
  });
};

export default getCamperDataForSearch;
