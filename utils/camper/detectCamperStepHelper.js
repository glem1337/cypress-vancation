import * as R from 'ramda';
import isPresent from 'utils/isPresent';

const detectCamperStep = (camperRawData) => {
  const camper = R.defaultTo({}, camperRawData);

  const STEPS = {
    1: false,
    2: false,
    3: false,
    4: false,
  };

  if (isPresent(camper.specificationDetail)) {
    STEPS[1] = true;
  }

  if (isPresent(camper.insuranceInfo)) {
    STEPS[2] = true;
  }

  if (isPresent(camper.name) || isPresent(camper.deliveryInformation)) {
    STEPS[3] = true;
  }

  if (isPresent(camper.pricingInfo) || isPresent(camper.tripFee) || isPresent(camper.camperRule)) {
    STEPS[4] = true;
  }

  return STEPS;
};

export default detectCamperStep;
